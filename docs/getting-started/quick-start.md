# Quick Start Guide

<div class="hero-section">
  <h1 class="hero-title">Build Your First AI App</h1>
  <p class="hero-subtitle">Create a working OpenAI application in under 10 minutes</p>
</div>

## <span class="gradient-text">Your First API Call</span>

Let's start with a simple example that demonstrates the power of OpenAI's GPT models.

=== "Python"

    ```python
    import os
    import openai
    from dotenv import load_dotenv

    # Load environment variables
    load_dotenv()
    openai.api_key = os.getenv("OPENAI_API_KEY")

    def chat_with_gpt(message):
        """Send a message to GPT and get a response"""
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": message}
                ],
                max_tokens=150,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"Error: {str(e)}"

    # Test the function
    if __name__ == "__main__":
        user_input = "Explain quantum computing in simple terms"
        response = chat_with_gpt(user_input)
        print(f"User: {user_input}")
        print(f"AI: {response}")
    ```

=== "JavaScript"

    ```javascript
    require('dotenv').config();
    const { Configuration, OpenAIApi } = require('openai');

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    async function chatWithGPT(message) {
      try {
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message }
          ],
          max_tokens: 150,
          temperature: 0.7,
        });

        return response.data.choices[0].message.content.trim();
      } catch (error) {
        return `Error: ${error.message}`;
      }
    }

    // Test the function
    async function main() {
      const userInput = "Explain quantum computing in simple terms";
      const response = await chatWithGPT(userInput);
      
      console.log(`User: ${userInput}`);
      console.log(`AI: ${response}`);
    }

    main();
    ```

=== "cURL"

    ```bash
    curl https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $OPENAI_API_KEY" \
      -d '{
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            "role": "user",
            "content": "Explain quantum computing in simple terms"
          }
        ],
        "max_tokens": 150,
        "temperature": 0.7
      }'
    ```

## <span class="gradient-text-accent">Understanding the Response</span>

When you run the code above, you'll get a response like this:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-3.5-turbo",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Quantum computing is like having a super-powered computer that can explore many possible solutions simultaneously..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 45,
    "total_tokens": 65
  }
}
```

<div class="modern-card">
  <h4 class="card-title">Key Response Fields</h4>
  <ul>
    <li><strong>choices[0].message.content</strong>: The AI's response text</li>
    <li><strong>usage.total_tokens</strong>: Number of tokens consumed</li>
    <li><strong>finish_reason</strong>: Why the completion stopped</li>
    <li><strong>model</strong>: The model that generated the response</li>
  </ul>
</div>

## <span class="gradient-text-secondary">Building a Chat Interface</span>

Let's create a more interactive experience:

=== "Python (Console)"

    ```python
    import os
    import openai
    from dotenv import load_dotenv

    load_dotenv()
    openai.api_key = os.getenv("OPENAI_API_KEY")

    class ChatBot:
        def __init__(self):
            self.conversation = [
                {"role": "system", "content": "You are a helpful assistant."}
            ]

        def chat(self, message):
            # Add user message to conversation
            self.conversation.append({"role": "user", "content": message})
            
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=self.conversation,
                    max_tokens=150,
                    temperature=0.7
                )
                
                ai_response = response.choices[0].message.content.strip()
                
                # Add AI response to conversation
                self.conversation.append({"role": "assistant", "content": ai_response})
                
                return ai_response
            except Exception as e:
                return f"Error: {str(e)}"

    def main():
        bot = ChatBot()
        print("🤖 AI Assistant: Hello! How can I help you today?")
        print("Type 'quit' to exit\n")

        while True:
            user_input = input("You: ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("🤖 AI Assistant: Goodbye!")
                break
            
            if user_input:
                response = bot.chat(user_input)
                print(f"🤖 AI Assistant: {response}\n")

    if __name__ == "__main__":
        main()
    ```

=== "JavaScript (Node.js)"

    ```javascript
    require('dotenv').config();
    const { Configuration, OpenAIApi } = require('openai');
    const readline = require('readline');

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    class ChatBot {
      constructor() {
        this.conversation = [
          { role: 'system', content: 'You are a helpful assistant.' }
        ];
      }

      async chat(message) {
        // Add user message to conversation
        this.conversation.push({ role: 'user', content: message });

        try {
          const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: this.conversation,
            max_tokens: 150,
            temperature: 0.7,
          });

          const aiResponse = response.data.choices[0].message.content.trim();
          
          // Add AI response to conversation
          this.conversation.push({ role: 'assistant', content: aiResponse });
          
          return aiResponse;
        } catch (error) {
          return `Error: ${error.message}`;
        }
      }
    }

    async function main() {
      const bot = new ChatBot();
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      console.log('🤖 AI Assistant: Hello! How can I help you today?');
      console.log("Type 'quit' to exit\n");

      const askQuestion = () => {
        rl.question('You: ', async (userInput) => {
          if (['quit', 'exit', 'bye'].includes(userInput.toLowerCase())) {
            console.log('🤖 AI Assistant: Goodbye!');
            rl.close();
            return;
          }

          if (userInput.trim()) {
            const response = await bot.chat(userInput);
            console.log(`🤖 AI Assistant: ${response}\n`);
          }
          
          askQuestion();
        });
      };

      askQuestion();
    }

    main();
    ```

## <span class="gradient-text">Common Parameters Explained</span>

<div class="feature-grid">
  <div class="modern-card">
    <h4 class="card-title">🎛️ Temperature</h4>
    <p class="card-description"><strong>Range:</strong> 0.0 - 2.0</p>
    <ul>
      <li><strong>0.0:</strong> Deterministic, consistent responses</li>
      <li><strong>0.7:</strong> Balanced creativity and consistency</li>
      <li><strong>1.5+:</strong> More creative and varied responses</li>
    </ul>
  </div>

  <div class="modern-card">
    <h4 class="card-title">📏 Max Tokens</h4>
    <p class="card-description">Controls response length</p>
    <ul>
      <li><strong>50-100:</strong> Short, concise answers</li>
      <li><strong>150-300:</strong> Medium-length responses</li>
      <li><strong>500+:</strong> Long, detailed explanations</li>
    </ul>
  </div>

  <div class="modern-card">
    <h4 class="card-title">🎭 Role System</h4>
    <p class="card-description">Message types in conversation</p>
    <ul>
      <li><strong>system:</strong> Sets AI behavior and context</li>
      <li><strong>user:</strong> Your messages and questions</li>
      <li><strong>assistant:</strong> AI responses</li>
    </ul>
  </div>
</div>

## <span class="gradient-text-accent">Best Practices</span>

!!! tip "💡 Optimize Your Prompts"

    - Be specific and clear in your requests
    - Provide context when needed
    - Use examples to guide the AI's response style
    - Set appropriate system messages

!!! success "⚡ Manage Costs Effectively"

    - Use appropriate max_tokens settings
    - Choose the right model for your use case
    - Implement conversation pruning for long chats
    - Monitor your usage in the OpenAI dashboard

!!! warning "🔒 Security Considerations"

    - Never expose your API key in client-side code
    - Implement rate limiting in production
    - Validate and sanitize user inputs
    - Use environment variables for configuration

## <span class="gradient-text-secondary">Testing Your Implementation</span>

Here are some test prompts to try:

<div class="modern-card">
  <h4 class="card-title">🧪 Test Scenarios</h4>
  
  **Creative Writing:**
  ```
  Write a short story about a robot learning to paint
  ```

  **Code Explanation:**
  ```
  Explain this Python code: list(map(lambda x: x**2, range(10)))
  ```

  **Problem Solving:**
  ```
  How would you approach debugging a slow web application?
  ```

  **Analysis:**
  ```
  What are the pros and cons of remote work?
  ```
</div>

## <span class="gradient-text">Troubleshooting</span>

<div class="feature-grid">
  <div class="modern-card">
    <h4 class="card-title">🚨 Rate Limiting</h4>
    <p><strong>Error:</strong> "Rate limit exceeded"</p>
    <p><strong>Solution:</strong> Implement exponential backoff and respect rate limits</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">💸 Token Limits</h4>
    <p><strong>Error:</strong> "Token limit exceeded"</p>
    <p><strong>Solution:</strong> Reduce max_tokens or truncate conversation history</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">🔌 API Errors</h4>
    <p><strong>Error:</strong> Various API errors</p>
    <p><strong>Solution:</strong> Check API status, validate parameters, handle exceptions</p>
  </div>
</div>

---

## <span class="gradient-text-accent">What's Next?</span>

Now that you have a working implementation, explore these advanced topics:

<div class="text-center mt-xl">
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="../configuration/" class="md-button md-button--primary">Advanced Configuration</a>
    <a href="../../guides/best-practices/" class="md-button md-button--secondary">Best Practices</a>
    <a href="../../examples/advanced/" class="md-button">Advanced Examples</a>
  </div>
</div>
