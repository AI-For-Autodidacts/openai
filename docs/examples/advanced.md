# Advanced Examples

<div class="hero-section">
  <h1 class="hero-title">Advanced Examples</h1>
  <p class="hero-subtitle">Complex implementations showcasing advanced OpenAI API features</p>
</div>

## <span class="gradient-text">Multi-Modal Applications</span>

### Image Analysis & Description

=== "Python"

    ```python
    import openai
    import base64
    from PIL import Image
    import io

    def encode_image(image_path):
        """Encode image to base64"""
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    def analyze_image(image_path, question="What do you see in this image?"):
        """Analyze image using GPT-4 Vision"""
        base64_image = encode_image(image_path)
        
        response = openai.ChatCompletion.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": question},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=300
        )
        
        return response.choices[0].message.content

    # Example usage
    description = analyze_image(
        "path/to/image.jpg", 
        "Describe this image in detail and identify any objects or people."
    )
    print(description)
    ```

### Advanced Function Calling System

```python
import openai
import json
import requests
from datetime import datetime
import sqlite3

class FunctionHandler:
    def __init__(self):
        self.functions = {
            "get_weather": self.get_weather,
            "save_note": self.save_note,
            "calculate": self.calculate
        }
        
        # Initialize database for notes
        self.init_database()
    
    def init_database(self):
        """Initialize SQLite database for notes"""
        conn = sqlite3.connect('notes.db')
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY,
                title TEXT,
                content TEXT,
                created_at TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()
    
    def get_weather(self, location):
        """Get weather information for a location"""
        return {
            "location": location,
            "temperature": "22°C",
            "condition": "Sunny",
            "humidity": "65%"
        }
    
    def save_note(self, title, content):
        """Save a note to the database"""
        conn = sqlite3.connect('notes.db')
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO notes (title, content, created_at) VALUES (?, ?, ?)",
            (title, content, datetime.now())
        )
        conn.commit()
        note_id = cursor.lastrowid
        conn.close()
        return f"Note saved with ID: {note_id}"
    
    def calculate(self, expression):
        """Safely evaluate mathematical expressions"""
        try:
            # Simple calculator - in production, use a proper math parser
            allowed_chars = set('0123456789+-*/.() ')
            if all(c in allowed_chars for c in expression):
                result = eval(expression)
                return f"Result: {result}"
            else:
                return "Invalid expression"
        except:
            return "Error in calculation"

def advanced_chat_with_functions(user_message):
    """Chat with function calling capabilities"""
    handler = FunctionHandler()
    
    functions = [
        {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and country"
                    }
                },
                "required": ["location"]
            }
        },
        {
            "name": "save_note",
            "description": "Save a note with title and content",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string", "description": "Note title"},
                    "content": {"type": "string", "description": "Note content"}
                },
                "required": ["title", "content"]
            }
        }
    ]
    
    # Initial API call
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant with access to various tools."},
            {"role": "user", "content": user_message}
        ],
        functions=functions,
        function_call="auto"
    )
    
    message = response.choices[0].message
    
    # Check if function was called
    if message.get("function_call"):
        function_name = message.function_call.name
        function_args = json.loads(message.function_call.arguments)
        
        # Execute function
        if function_name in handler.functions:
            function_result = handler.functions[function_name](**function_args)
            
            # Continue conversation with function result
            follow_up_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_message},
                    message,
                    {
                        "role": "function",
                        "name": function_name,
                        "content": str(function_result)
                    }
                ]
            )
            
            return follow_up_response.choices[0].message.content
    
    return message.content
```

---

<div class="text-center mt-xl">
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="../api/overview/" class="md-button md-button--primary">API Reference</a>
    <a href="../guides/best-practices/" class="md-button md-button--secondary">Best Practices</a>
    <a href="basic/" class="md-button">← Basic Examples</a>
  </div>
</div>