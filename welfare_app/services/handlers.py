"""
Handler Classes for Sahayak AI
Each handler provides persona-specific responses
"""

import json
from typing import Dict
from groq import Groq
from django.conf import settings

from .knowledge_retriever import KnowledgeRetriever


class BaseHandler:
    """Base handler class"""

    def __init__(self, retriever: KnowledgeRetriever, client: Groq):
        self.retriever = retriever
        self.client = client
        self.model = getattr(settings, "GROQ_MODEL", "llama-3.1-8b-instant")

    def handle(self, context: Dict) -> str:
        raise NotImplementedError


class CitizenHandler(BaseHandler):
    """Handler for citizen queries - Simple, friendly responses"""

    def get_system_prompt(self, language: str) -> str:
        prompts = {
            "English": """You are Sahayak, a helpful assistant for Thane Municipal Corporation.
Rules:
- Use SIMPLE, friendly language
- Explain in numbered steps
- NO technical IDs or codes
- Keep under 150 words
- Be encouraging and supportive
- Focus on how citizens can benefit from schemes""",
            "Hindi": """आप सहायक हैं, ठाणे नगर निगम के लिए एक मददगार सहायक।
नियम:
- सरल, मित्रवत भाषा उपयोग करें
- क्रमांकित चरणों में समझाएं
- तकनीकी शब्द नहीं
- 150 शब्दों से कम
- प्रोत्साहक रहें""",
            "Marathi": """तुम्ही सहायक आहात, ठाणे महानगरपालिकेसाठी मदतगार सहाय्यक.
नियम:
- सोपी, मैत्रीपूर्ण भाषा वापरा
- क्रमांकित पायऱ्यांमध्ये समजावा
- तांत्रिक शब्द नाहीत
- 150 शब्दांपेक्षा कमी
- प्रोत्साहक असा""",
        }
        return prompts.get(language, prompts["English"])

    def handle(self, context: Dict) -> str:
        query = context["original_query"]
        language = context["language"]

        # Get relevant schemes data
        data = self.retriever.get_schemes()
        data_summary = json.dumps(data[:10], ensure_ascii=False)[
            :2000
        ]  # Limit data size

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self.get_system_prompt(language)},
                    {
                        "role": "user",
                        "content": f"Available Schemes: {data_summary}\n\nCitizen Question: {query}",
                    },
                ],
                temperature=0.7,
                max_tokens=500,
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"I apologize, but I'm having trouble processing your request. Please try again. Error: {str(e)}"


class EmployeeHandler(BaseHandler):
    """Handler for employee queries - Operational, concise responses"""

    def handle(self, context: Dict) -> str:
        query = context["original_query"]

        # Get operational data
        data = {
            "performance": self.retriever.get_performance()[:20],
            "grievances": self.retriever.get_grievances()[:20],
        }
        data_summary = json.dumps(data, ensure_ascii=False)[:3000]

        system_prompt = """You are an operational assistant for TMC employees.
Rules:
- Be CONCISE and direct
- Include IDs, status codes when relevant
- List next action steps clearly
- No filler words
- Focus on actionable information"""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {
                        "role": "user",
                        "content": f"Operational Data: {data_summary}\n\nEmployee Query: {query}",
                    },
                ],
                temperature=0.3,
                max_tokens=400,
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error processing request: {str(e)}"


class LeaderHandler(BaseHandler):
    """Handler for leader queries - Analytical, data-driven responses"""

    def handle(self, context: Dict) -> str:
        query = context["original_query"]

        # Get comprehensive analytics data
        stats = self.retriever.get_stats()
        data = {
            "stats": stats,
            "meta": self.retriever.get_meta(),
            "wards": self.retriever.get_wards()[:15],
            "performance": self.retriever.get_performance()[:15],
            "coverage": self.retriever.get_coverage()[:15],
            "vulnerability": self.retriever.get_vulnerability()[:15],
            "grievances": self.retriever.get_grievances()[:15],
        }
        data_summary = json.dumps(data, ensure_ascii=False)[:4000]

        system_prompt = """You are a data analyst for TMC Commissioner.
Rules:
- Provide BULLET POINTS only
- Focus on KPIs, delays, bottlenecks
- Compare wards when relevant
- Use percentages and numbers
- Be analytical, not descriptive
- Highlight areas needing attention
- When asked about counts (schemes, wards, citizens), use the 'stats' field"""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {
                        "role": "user",
                        "content": f"Analytics Data: {data_summary}\n\nLeadership Query: {query}",
                    },
                ],
                temperature=0.2,
                max_tokens=600,
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error generating analytics: {str(e)}"


class HandlerRegistry:
    """Routes requests to appropriate handlers based on persona"""

    def __init__(
        self,
        citizen_handler: CitizenHandler,
        employee_handler: EmployeeHandler,
        leader_handler: LeaderHandler,
    ):
        self.handlers = {
            "citizen": citizen_handler,
            "employee": employee_handler,
            "leader": leader_handler,
        }

    def route(self, context: Dict) -> str:
        """Route to appropriate handler based on detected persona"""
        handler = self.handlers.get(context["persona"])
        if handler:
            return handler.handle(context)
        return "I'm not sure how to process that request."
