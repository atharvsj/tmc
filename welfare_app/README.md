# Sahayak AI - Django Backend Integration

## 🏗️ Project Structure

```
welfare_main/
├── manage.py
├── requirements.txt
├── SOCIAL_WELFAER_DATASET1.json     # Knowledge base
├── welfare_main/                     # Django project settings
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── welfare_app/                      # Chatbot application
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── urls.py                       # API routes
    ├── views.py                      # API endpoints
    └── services/                     # Chatbot logic
        ├── __init__.py
        ├── ai_controller.py          # Intent/Persona detection
        ├── chatbot.py                # Main chatbot class
        ├── handlers.py               # Persona handlers
        └── knowledge_retriever.py    # Data retrieval
```

## 🚀 Quick Start

### 1. Activate Virtual Environment
```bash
# Windows
cd d:\tmc\social_welfare
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Install Dependencies
```bash
cd welfare_main
pip install -r requirements.txt
```

### 3. Set Environment Variables (Optional but Recommended)
```bash
# Windows PowerShell
$env:GROQ_API_KEY = "your-groq-api-key"

# Linux/Mac
export GROQ_API_KEY="your-groq-api-key"
```

### 4. Run Migrations
```bash
python manage.py migrate
```

### 5. Start Development Server
```bash
python manage.py runserver 8000
```

The API will be available at `http://127.0.0.1:8000/api/`

---

## 📡 API Endpoints

### 1. Chat Endpoint (Main)
**POST** `/api/chat/`

Send a message to the chatbot and receive a response.

**Request Body:**
```json
{
    "message": "How can I apply for elderly pension?",
    "session_id": "user-123",
    "language": "English"
}
```

**Response:**
```json
{
    "success": true,
    "response": "Here's how to apply for elderly pension...",
    "language": "English",
    "persona": "citizen",
    "intent": "apply_scheme",
    "language_changed": false
}
```

### 2. Get Greeting
**GET** `/api/greeting/?language=English`

Get the welcome message in specified language.

**Query Parameters:**
- `language`: English | Hindi | Marathi

**Response:**
```json
{
    "success": true,
    "greeting": "👋 Welcome to Thane Social Welfare Assistant!...",
    "language": "English"
}
```

### 3. Get Statistics
**GET** `/api/stats/`

Get knowledge base statistics.

**Response:**
```json
{
    "success": true,
    "stats": {
        "total_schemes": 25,
        "total_wards": 60,
        "total_citizens": 50000
    }
}
```

### 4. Get Conversation History
**GET** `/api/history/?session_id=user-123`

Get conversation history for a session.

**Response:**
```json
{
    "success": true,
    "session_id": "user-123",
    "history": [
        {
            "user": "How can I apply?",
            "assistant": "Here's how...",
            "metadata": {...}
        }
    ]
}
```

### 5. Clear History
**POST** `/api/history/clear/`

Clear conversation history for a session.

**Request Body:**
```json
{
    "session_id": "user-123"
}
```

### 6. Health Check
**GET** `/api/health/`

Check if the service is healthy.

**Response:**
```json
{
    "success": true,
    "status": "healthy",
    "service": "Sahayak AI",
    "knowledge_base_loaded": true,
    "schemes_count": 25,
    "wards_count": 60
}
```

### 7. Get Languages
**GET** `/api/languages/`

Get available languages.

**Response:**
```json
{
    "success": true,
    "languages": [
        {"code": "1", "name": "English", "native": "English"},
        {"code": "2", "name": "Hindi", "native": "हिंदी"},
        {"code": "3", "name": "Marathi", "native": "मराठी"}
    ]
}
```

---

## 🌐 Frontend Integration Examples

### JavaScript (Fetch API)
```javascript
// Chat with the bot
async function sendMessage(message, sessionId = 'default', language = 'English') {
    const response = await fetch('http://127.0.0.1:8000/api/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            session_id: sessionId,
            language: language
        })
    });
    return await response.json();
}

// Example usage
const result = await sendMessage('How to apply for pension?', 'user-123', 'English');
console.log(result.response);
```

### React Example
```jsx
import { useState } from 'react';

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sessionId] = useState(`session-${Date.now()}`);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: input }]);

        // Send to API
        const response = await fetch('http://127.0.0.1:8000/api/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: input,
                session_id: sessionId,
                language: 'English'
            })
        });

        const data = await response.json();

        // Add bot response
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: data.response,
            persona: data.persona
        }]);

        setInput('');
    };

    return (
        <div className="chatbot">
            <div className="messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
```

---

## 🔧 Configuration

### Settings (settings.py)

```python
# Groq API Key (use environment variable in production!)
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', 'your-api-key')
GROQ_MODEL = 'llama-3.1-8b-instant'

# Knowledge Base Path
WELFARE_DATASET_PATH = BASE_DIR.parent / 'SOCIAL_WELFAER_DATASET1.json'

# CORS (for frontend on different port/domain)
CORS_ALLOW_ALL_ORIGINS = True  # Only for development!
```

### CORS Configuration for Production

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-frontend-domain.com",
]
```

---

## 🎭 Personas & Routing

The chatbot automatically detects user personas based on query keywords:

| Persona | Keywords | Response Style |
|---------|----------|----------------|
| **Citizen** | apply, eligibility, pension, help | Simple, friendly, step-by-step |
| **Employee** | pending, approve, workflow, applications | Concise, operational, with IDs |
| **Leader** | report, KPI, performance, compare | Analytical, bullet points, data-driven |

---

## 🌍 Multi-Language Support

Supported languages:
- **English** (default)
- **Hindi** (हिंदी)
- **Marathi** (मराठी)

Send `"1"`, `"2"`, or `"3"` as a message to switch languages.

---

## 📝 Testing the API

### Using curl
```bash
# Health check
curl http://127.0.0.1:8000/api/health/

# Send a message
curl -X POST http://127.0.0.1:8000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "How to apply for pension?", "session_id": "test"}'
```

### Using PowerShell
```powershell
# Health check
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/health/" -Method GET

# Send a message
$body = @{
    message = "How to apply for pension?"
    session_id = "test"
    language = "English"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/chat/" -Method POST -Body $body -ContentType "application/json"
```

---

## 🚀 Production Deployment

### Using Gunicorn (Linux)
```bash
gunicorn welfare_main.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

### Using Waitress (Windows)
```bash
pip install waitress
waitress-serve --port=8000 welfare_main.wsgi:application
```

### Environment Variables for Production
```bash
export GROQ_API_KEY="your-production-api-key"
export DJANGO_SECRET_KEY="your-secure-secret-key"
export DEBUG="False"
```

---

## 📊 Architecture

```
Frontend (React/Next.js/etc.)
         ↓
    HTTP Request
         ↓
┌─────────────────────────────────────────┐
│          Django Backend                  │
├─────────────────────────────────────────┤
│  /api/chat/  →  views.chat_api()        │
│                     ↓                    │
│            SahayakChatbot.chat()        │
│                     ↓                    │
│            AIController.analyze()        │
│         (detect persona, intent, lang)   │
│                     ↓                    │
│            HandlerRegistry.route()       │
│                     ↓                    │
│    ┌──────────┬──────────┬───────────┐  │
│    │ Citizen  │ Employee │  Leader   │  │
│    │ Handler  │ Handler  │  Handler  │  │
│    └────┬─────┴────┬─────┴─────┬─────┘  │
│         └──────────┼───────────┘        │
│                    ↓                     │
│         KnowledgeRetriever              │
│         (fetch relevant data)            │
│                    ↓                     │
│            Groq LLM API                  │
│         (generate response)              │
└─────────────────────────────────────────┘
         ↓
    JSON Response
         ↓
      Frontend
```

---

## 🤖 Developed for Thane Municipal Corporation

**Sahayak AI** - Making welfare accessible to all
