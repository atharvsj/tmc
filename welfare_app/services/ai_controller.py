"""
AI Controller for Sahayak AI
Detects language, persona, and intent from user input
"""

import re
from typing import Dict


class AIController:
    """The Brain - Detects Intent, Language & Persona"""

    def __init__(self):
        self.hindi_chars = re.compile(r"[\u0900-\u097F]")

        self.leader_keywords = [
            "report",
            "kpi",
            "summary",
            "bottleneck",
            "ward",
            "performance",
            "metrics",
            "analysis",
            "coverage",
            "vulnerability",
            "compare",
            "रिपोर्ट",
            "अहवाल",
            "कामगिरी",
            "dashboard",
            "statistics",
            "stats",
        ]

        self.employee_keywords = [
            "pending",
            "approve",
            "workflow",
            "verification",
            "process",
            "application",
            "grievance",
            "resolve",
            "audit",
            "review",
            "मंजूरी",
            "प्रक्रिया",
            "फाइल",
            "applications",
            "status update",
        ]

    def detect_language(self, text: str) -> str:
        """
        Detect language from input
        Supports: English, Hindi, Marathi
        """
        text = text.strip()

        # Check for numeric language selection
        if text == "1":
            return "English"
        elif text == "2":
            return "Hindi"
        elif text == "3":
            return "Marathi"

        # Check for Devanagari script (Hindi/Marathi)
        if self.hindi_chars.search(text):
            # Could add more sophisticated Hindi vs Marathi detection
            return "Hindi"

        return "English"

    def detect_persona(self, text: str) -> str:
        """
        Detect user persona based on query keywords
        Returns: 'citizen', 'employee', or 'leader'
        """
        text_lower = text.lower()

        leader_score = sum(1 for kw in self.leader_keywords if kw in text_lower)
        employee_score = sum(1 for kw in self.employee_keywords if kw in text_lower)

        if leader_score > 0:
            return "leader"
        elif employee_score > 0:
            return "employee"
        return "citizen"

    def detect_intent(self, text: str) -> str:
        """
        Detect user intent from query
        """
        text_lower = text.lower()

        if any(w in text_lower for w in ["status", "track", "where", "स्थिती", "स्थिति"]):
            return "check_status"
        elif any(
            w in text_lower
            for w in ["apply", "how to", "eligibility", "अर्ज", "कसे", "आवेदन"]
        ):
            return "apply_scheme"
        elif any(
            w in text_lower
            for w in ["complaint", "problem", "issue", "तक्रार", "शिकायत"]
        ):
            return "grievance"
        elif any(
            w in text_lower
            for w in ["performance", "report", "data", "कामगिरी", "रिपोर्ट"]
        ):
            return "metrics"
        elif any(w in text_lower for w in ["scheme", "योजना", "pension", "पेंशन"]):
            return "scheme_info"
        return "general_query"

    def analyze(self, user_input: str, language_override: str = None) -> Dict:
        """
        Analyze user input and return context dictionary
        """
        detected_language = self.detect_language(user_input)

        return {
            "original_query": user_input,
            "language": language_override or detected_language,
            "persona": self.detect_persona(user_input),
            "intent": self.detect_intent(user_input),
        }
