"""
Sahayak AI Chatbot - Main Service
Integrates all components into a single interface
"""

import json
import os
from pathlib import Path
from typing import Dict, Optional
from django.conf import settings
from groq import Groq

from .knowledge_retriever import KnowledgeRetriever
from .ai_controller import AIController
from .handlers import CitizenHandler, EmployeeHandler, LeaderHandler, HandlerRegistry


class SahayakChatbot:
    """
    Main Sahayak AI Chatbot class
    Provides a unified interface for the chatbot functionality
    """

    # Greeting messages for different languages
    GREETINGS = {
        "English": """👋 Welcome to Thane Social Welfare Assistant!

I can help you with:
• ✅ Check Eligibility for Schemes
• 📝 Guided Application Process
• 📊 Track Application Status
• 🔍 View Your Benefits
• 📢 Lodge & Track Grievances
• 📈 View Ward Performance
• 💬 Ask Questions in Natural Language""",
        "Hindi": """👋 ठाणे सामाजिक कल्याण सहायक में आपका स्वागत है!

मैं आपकी मदद कर सकता हूं:
• ✅ योजनाओं के लिए पात्रता जांचें
• 📝 निर्देशित आवेदन प्रक्रिया
• 📊 आवेदन स्थिति ट्रैक करें
• 🔍 अपने लाभ देखें
• 📢 शिकायत दर्ज करें और ट्रैक करें
• 📈 वार्ड प्रदर्शन देखें
• 💬 स्वाभाविक भाषा में प्रश्न पूछें""",
        "Marathi": """👋 ठाणे सामाजिक कल्याण सहाय्यकामध्ये आपले स्वागत आहे!

मी तुम्हाला मदत करू शकतो:
• ✅ योजनांसाठी पात्रता तपासा
• 📝 मार्गदर्शित अर्ज प्रक्रिया
• 📊 अर्ज स्थिती ट्रॅक करा
• 🔍 तुमचे लाभ पहा
• 📢 तक्रार नोंदवा आणि ट्रॅक करा
• 📈 प्रभाग कामगिरी पहा
• 💬 नैसर्गिक भाषेत प्रश्न विचारा""",
    }

    LANGUAGE_MAP = {
        "1": "English",
        "2": "Hindi",
        "3": "Marathi",
        "en": "English",
        "hi": "Hindi",
        "mr": "Marathi",
        "english": "English",
        "hindi": "Hindi",
        "marathi": "Marathi",
    }

    def __init__(self, dataset_path: str = None):
        """
        Initialize the Sahayak Chatbot

        Args:
            dataset_path: Path to the JSON knowledge base file
        """
        # Initialize Groq client
        api_key = getattr(settings, "GROQ_API_KEY", os.environ.get("GROQ_API_KEY"))
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in settings or environment")

        self.client = Groq(api_key=api_key)

        # Load knowledge base
        if dataset_path is None:
            dataset_path = getattr(settings, "WELFARE_DATASET_PATH", None)
            if dataset_path is None:
                # Default path
                dataset_path = (
                    Path(settings.BASE_DIR).parent / "SOCIAL_WELFAER_DATASET1.json"
                )

        self.knowledge_base = self._load_knowledge_base(dataset_path)

        # Initialize components
        self.retriever = KnowledgeRetriever(self.knowledge_base)
        self.controller = AIController()

        # Initialize handlers
        citizen_handler = CitizenHandler(self.retriever, self.client)
        employee_handler = EmployeeHandler(self.retriever, self.client)
        leader_handler = LeaderHandler(self.retriever, self.client)

        self.registry = HandlerRegistry(
            citizen_handler, employee_handler, leader_handler
        )

        # Session storage for conversation history
        self.conversation_history = {}

    def _load_knowledge_base(self, path) -> Dict:
        """Load the knowledge base from JSON file"""
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Knowledge base not found at: {path}")
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON in knowledge base: {e}")

    def get_greeting(self, language: str = "English") -> str:
        """Get greeting message in specified language"""
        lang = self.LANGUAGE_MAP.get(language.lower(), "English")
        return self.GREETINGS.get(lang, self.GREETINGS["English"])

    def set_language(self, language_input: str) -> str:
        """
        Set/change language and return the normalized language name

        Args:
            language_input: Can be '1', '2', '3', 'en', 'hi', 'mr', or full names
        """
        return self.LANGUAGE_MAP.get(language_input.lower(), "English")

    def chat(
        self, user_message: str, session_id: str = "default", language: str = None
    ) -> Dict:
        """
        Process a chat message and return response

        Args:
            user_message: The user's input message
            session_id: Unique session identifier for conversation history
            language: Override language (optional)

        Returns:
            Dictionary with response and metadata
        """
        # Check for language change request
        if user_message.strip() in ["1", "2", "3"]:
            new_lang = self.set_language(user_message.strip())
            return {
                "response": self.get_greeting(new_lang),
                "language": new_lang,
                "persona": None,
                "intent": "language_change",
                "language_changed": True,
            }

        # Analyze the input
        context = self.controller.analyze(user_message, language_override=language)

        # Get response from appropriate handler
        response = self.registry.route(context)

        # Store in conversation history
        if session_id not in self.conversation_history:
            self.conversation_history[session_id] = []

        self.conversation_history[session_id].append(
            {"user": user_message, "assistant": response, "metadata": context}
        )

        return {
            "response": response,
            "language": context["language"],
            "persona": context["persona"],
            "intent": context["intent"],
            "language_changed": False,
        }

    def get_conversation_history(self, session_id: str = "default") -> list:
        """Get conversation history for a session"""
        return self.conversation_history.get(session_id, [])

    def clear_conversation_history(self, session_id: str = "default"):
        """Clear conversation history for a session"""
        if session_id in self.conversation_history:
            del self.conversation_history[session_id]

    def get_stats(self) -> Dict:
        """Get knowledge base statistics"""
        return self.retriever.get_stats()


# Singleton instance
_chatbot_instance = None


def get_chatbot_instance() -> SahayakChatbot:
    """
    Get or create the singleton chatbot instance
    Use this in views to avoid reloading the knowledge base on each request
    """
    global _chatbot_instance
    if _chatbot_instance is None:
        _chatbot_instance = SahayakChatbot()
    return _chatbot_instance
