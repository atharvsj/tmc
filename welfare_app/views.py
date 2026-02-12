from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.views import View
from django.utils.decorators import method_decorator

from .services import get_chatbot_instance


@csrf_exempt
@require_http_methods(["POST"])
def chat_api(request):
    """
    Main chat endpoint

    POST /api/chat/
    Body: {
        "message": "user message here",
        "session_id": "optional-session-id",
        "language": "English|Hindi|Marathi" (optional)
    }

    Response: {
        "success": true,
        "response": "AI response",
        "language": "detected language",
        "persona": "citizen|employee|leader",
        "intent": "detected intent"
    }
    """
    try:
        # Parse request body
        body = json.loads(request.body.decode("utf-8"))
        message = body.get("message", "").strip()
        session_id = body.get("session_id", "default")
        language = body.get("language")

        if not message:
            return JsonResponse(
                {"success": False, "error": "Message is required"}, status=400
            )

        # Get chatbot instance and process message
        chatbot = get_chatbot_instance()
        result = chatbot.chat(message, session_id=session_id, language=language)

        return JsonResponse(
            {
                "success": True,
                "response": result["response"],
                "language": result["language"],
                "persona": result["persona"],
                "intent": result["intent"],
                "language_changed": result.get("language_changed", False),
            }
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"success": False, "error": "Invalid JSON in request body"}, status=400
        )
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def get_greeting(request):
    """
    Get greeting message in specified language

    GET /api/greeting/?language=English
    """
    try:
        language = request.GET.get("language", "English")
        chatbot = get_chatbot_instance()
        greeting = chatbot.get_greeting(language)

        return JsonResponse(
            {"success": True, "greeting": greeting, "language": language}
        )
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def get_stats(request):
    """
    Get knowledge base statistics

    GET /api/stats/
    """
    try:
        chatbot = get_chatbot_instance()
        stats = chatbot.get_stats()

        return JsonResponse({"success": True, "stats": stats})
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def get_conversation_history(request):
    """
    Get conversation history for a session

    GET /api/history/?session_id=xxx
    """
    try:
        session_id = request.GET.get("session_id", "default")
        chatbot = get_chatbot_instance()
        history = chatbot.get_conversation_history(session_id)

        return JsonResponse(
            {"success": True, "session_id": session_id, "history": history}
        )
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def clear_history(request):
    """
    Clear conversation history for a session

    POST /api/history/clear/
    Body: {"session_id": "xxx"}
    """
    try:
        body = json.loads(request.body.decode("utf-8"))
        session_id = body.get("session_id", "default")

        chatbot = get_chatbot_instance()
        chatbot.clear_conversation_history(session_id)

        return JsonResponse(
            {"success": True, "message": f"History cleared for session: {session_id}"}
        )
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def health_check(request):
    """
    Health check endpoint

    GET /api/health/
    """
    try:
        chatbot = get_chatbot_instance()
        stats = chatbot.get_stats()

        return JsonResponse(
            {
                "success": True,
                "status": "healthy",
                "service": "Sahayak AI",
                "knowledge_base_loaded": True,
                "schemes_count": stats["total_schemes"],
                "wards_count": stats["total_wards"],
            }
        )
    except Exception as e:
        return JsonResponse(
            {"success": False, "status": "unhealthy", "error": str(e)}, status=500
        )


@csrf_exempt
@require_http_methods(["GET"])
def get_languages(request):
    """
    Get available languages

    GET /api/languages/
    """
    return JsonResponse(
        {
            "success": True,
            "languages": [
                {"code": "1", "name": "English", "native": "English"},
                {"code": "2", "name": "Hindi", "native": "हिंदी"},
                {"code": "3", "name": "Marathi", "native": "मराठी"},
            ],
        }
    )