from django.urls import path
from . import views

urlpatterns = [
    # Main chat endpoint
    path("chat/", views.chat_api, name="chat"),
    # Greeting message
    path("greeting/", views.get_greeting, name="greeting"),
    # Statistics
    path("stats/", views.get_stats, name="stats"),
    # Conversation history
    path("history/", views.get_conversation_history, name="history"),
    path("history/clear/", views.clear_history, name="clear_history"),
    # Health check
    path("health/", views.health_check, name="health"),
    # Available languages
    path("languages/", views.get_languages, name="languages"),
]
