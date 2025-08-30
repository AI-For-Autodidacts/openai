# Configuration

<div class="hero-section">
  <h1 class="hero-title">Advanced Configuration</h1>
  <p class="hero-subtitle">Customize OpenAI APIs for optimal performance and functionality</p>
</div>

## <span class="gradient-text">Environment Configuration</span>

### Multiple Environments

=== "Development"

    ```bash
    # .env.development
    OPENAI_API_KEY=your-dev-api-key
    OPENAI_ORGANIZATION=your-org-id
    OPENAI_BASE_URL=https://api.openai.com/v1
    LOG_LEVEL=debug
    MAX_RETRIES=3
    REQUEST_TIMEOUT=30
    ```

=== "Production"

    ```bash
    # .env.production
    OPENAI_API_KEY=your-prod-api-key
    OPENAI_ORGANIZATION=your-org-id
    OPENAI_BASE_URL=https://api.openai.com/v1
    LOG_LEVEL=info
    MAX_RETRIES=5
    REQUEST_TIMEOUT=60
    RATE_LIMIT_PER_MINUTE=1000
    ```

### Configuration Class

=== "Python"

    ```python
    import os
    from dataclasses import dataclass
    from typing import Optional

    @dataclass
    class OpenAIConfig:
        api_key: str
        organization: Optional[str] = None
        base_url: str = "https://api.openai.com/v1"
        max_retries: int = 3
        request_timeout: int = 30
        default_model: str = "gpt-3.5-turbo"
        default_temperature: float = 0.7
        default_max_tokens: int = 150

        @classmethod
        def from_env(cls) -> 'OpenAIConfig':
            return cls(
                api_key=os.getenv("OPENAI_API_KEY", ""),
                organization=os.getenv("OPENAI_ORGANIZATION"),
                base_url=os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1"),
                max_retries=int(os.getenv("MAX_RETRIES", "3")),
                request_timeout=int(os.getenv("REQUEST_TIMEOUT", "30")),
                default_model=os.getenv("DEFAULT_MODEL", "gpt-3.5-turbo"),
                default_temperature=float(os.getenv("DEFAULT_TEMPERATURE", "0.7")),
                default_max_tokens=int(os.getenv("DEFAULT_MAX_TOKENS", "150"))
            )

        def validate(self) -> bool:
            if not self.api_key:
                raise ValueError("API key is required")
            if self.temperature < 0 or self.temperature > 2:
                raise ValueError("Temperature must be between 0 and 2")
            return True
    ```

=== "JavaScript"

    ```javascript
    class OpenAIConfig {
      constructor(options = {}) {
        this.apiKey = options.apiKey || process.env.OPENAI_API_KEY;
        this.organization = options.organization || process.env.OPENAI_ORGANIZATION;
        this.baseURL = options.baseURL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
        this.maxRetries = options.maxRetries || parseInt(process.env.MAX_RETRIES) || 3;
        this.requestTimeout = options.requestTimeout || parseInt(process.env.REQUEST_TIMEOUT) || 30000;
        this.defaultModel = options.defaultModel || process.env.DEFAULT_MODEL || 'gpt-3.5-turbo';
        this.defaultTemperature = options.defaultTemperature || parseFloat(process.env.DEFAULT_TEMPERATURE) || 0.7;
        this.defaultMaxTokens = options.defaultMaxTokens || parseInt(process.env.DEFAULT_MAX_TOKENS) || 150;
      }

      static fromEnv() {
        return new OpenAIConfig();
      }

      validate() {
        if (!this.apiKey) {
          throw new Error('API key is required');
        }
        if (this.defaultTemperature < 0 || this.defaultTemperature > 2) {
          throw new Error('Temperature must be between 0 and 2');
        }
        return true;
      }

      toOpenAIConfig() {
        return {
          apiKey: this.apiKey,
          organization: this.organization,
          baseURL: this.baseURL,
          maxRetries: this.maxRetries,
          timeout: this.requestTimeout,
        };
      }
    }

    module.exports = OpenAIConfig;
    ```

## <span class="gradient-text-accent">Model Selection</span>

<div class="feature-grid">
  <div class="modern-card">
    <h4 class="card-title">1. GPT-4 Models</h4>
    <ul>
      <li><strong>gpt-4:</strong> Most capable, highest quality</li>
      <li><strong>gpt-4-32k:</strong> Extended context length</li>
      <li><strong>gpt-4-turbo:</strong> Faster, cost-effective</li>
    </ul>
    <p class="card-description">Best for: Complex reasoning, creative writing, detailed analysis</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">2. GPT-3.5 Models</h4>
    <ul>
      <li><strong>gpt-3.5-turbo:</strong> Balanced performance</li>
      <li><strong>gpt-3.5-turbo-16k:</strong> Longer context</li>
      <li><strong>gpt-3.5-turbo-instruct:</strong> Instruction following</li>
    </ul>
    <p class="card-description">Best for: General tasks, chatbots, content generation</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">3. Specialized Models</h4>
    <ul>
      <li><strong>dall-e-3:</strong> Image generation</li>
      <li><strong>whisper-1:</strong> Speech to text</li>
      <li><strong>tts-1:</strong> Text to speech</li>
    </ul>
    <p class="card-description">Best for: Multimodal applications, specialized tasks</p>
  </div>
</div>

## <span class="gradient-text-secondary">Rate Limiting & Retry Logic</span>

### Exponential Backoff Implementation

=== "Python"

    ```python
    import time
    import random
    from typing import Callable, Any
    import openai

    class RateLimiter:
        def __init__(self, max_retries: int = 5, base_delay: float = 1.0):
            self.max_retries = max_retries
            self.base_delay = base_delay

        def exponential_backoff(self, attempt: int) -> float:
            """Calculate delay with jitter"""
            delay = self.base_delay * (2 ** attempt)
            jitter = random.uniform(0, 0.1) * delay
            return delay + jitter

        def retry_with_backoff(self, func: Callable, *args, **kwargs) -> Any:
            """Execute function with exponential backoff retry"""
            last_exception = None
            
            for attempt in range(self.max_retries):
                try:
                    return func(*args, **kwargs)
                except openai.error.RateLimitError as e:
                    last_exception = e
                    if attempt == self.max_retries - 1:
                        break
                    
                    delay = self.exponential_backoff(attempt)
                    print(f"Rate limited. Retrying in {delay:.2f} seconds...")
                    time.sleep(delay)
                except Exception as e:
                    # For non-rate-limit errors, fail immediately
                    raise e
            
            raise last_exception

    # Usage example
    rate_limiter = RateLimiter(max_retries=5)

    def make_api_call():
        return openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Hello!"}]
        )

    response = rate_limiter.retry_with_backoff(make_api_call)
    ```

=== "JavaScript"

    ```javascript
    class RateLimiter {
      constructor(maxRetries = 5, baseDelay = 1000) {
        this.maxRetries = maxRetries;
        this.baseDelay = baseDelay;
      }

      exponentialBackoff(attempt) {
        const delay = this.baseDelay * Math.pow(2, attempt);
        const jitter = Math.random() * 0.1 * delay;
        return delay + jitter;
      }

      async retryWithBackoff(func, ...args) {
        let lastError;

        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
          try {
            return await func(...args);
          } catch (error) {
            lastError = error;

            if (error.response?.status === 429) {
              if (attempt === this.maxRetries - 1) break;

              const delay = this.exponentialBackoff(attempt);
              console.log(`Rate limited. Retrying in ${delay / 1000:.2f} seconds...`);
              await new Promise(resolve => setTimeout(resolve, delay));
            } else {
              throw error;
            }
          }
        }

        throw lastError;
      }
    }

    // Usage example
    const rateLimiter = new RateLimiter(5, 1000);

    async function makeApiCall() {
      return await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello!' }]
      });
    }

    const response = await rateLimiter.retryWithBackoff(makeApiCall);
    ```

## <span class="gradient-text">Advanced Features</span>

### Function Calling

```python
functions = [
    {
        "name": "get_weather",
        "description": "Get the current weather in a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"]
                }
            },
            "required": ["location"]
        }
    }
]

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
    functions=functions,
    function_call="auto"
)
```

### Streaming Responses

=== "Python"

    ```python
    def stream_chat_response(messages):
        """Stream chat completion response"""
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            stream=True
        )
        
        full_response = ""
        for chunk in response:
            if chunk.choices[0].delta.get("content"):
                content = chunk.choices[0].delta.content
                full_response += content
                print(content, end="", flush=True)
        
        return full_response
    ```

=== "JavaScript"

    ```javascript
    async function streamChatResponse(messages) {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
        stream: true,
      }, { responseType: 'stream' });

      let fullResponse = '';

      response.data.on('data', (chunk) => {
        const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          const message = line.replace(/^data: /, '');
          if (message === '[DONE]') return;
          
          try {
            const parsed = JSON.parse(message);
            const content = parsed.choices[0]?.delta?.content || '';
            if (content) {
              fullResponse += content;
              process.stdout.write(content);
            }
          } catch (error) {
            console.error('Error parsing chunk:', error);
          }
        }
      });

      return new Promise((resolve) => {
        response.data.on('end', () => resolve(fullResponse));
      });
    }
    ```

## <span class="gradient-text-accent">Monitoring & Logging</span>

### Usage Tracking

```python
import logging
from datetime import datetime
from typing import Dict, Any

class OpenAIMonitor:
    def __init__(self):
        self.usage_log = []
        self.setup_logging()

    def setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('openai_usage.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def log_api_call(self, request: Dict[str, Any], response: Dict[str, Any]):
        usage_data = {
            'timestamp': datetime.now().isoformat(),
            'model': request.get('model'),
            'prompt_tokens': response.get('usage', {}).get('prompt_tokens', 0),
            'completion_tokens': response.get('usage', {}).get('completion_tokens', 0),
            'total_tokens': response.get('usage', {}).get('total_tokens', 0),
            'request_id': response.get('id')
        }
        
        self.usage_log.append(usage_data)
        self.logger.info(f"API Call: {usage_data}")

    def get_usage_summary(self) -> Dict[str, Any]:
        total_tokens = sum(entry['total_tokens'] for entry in self.usage_log)
        total_calls = len(self.usage_log)
        
        return {
            'total_calls': total_calls,
            'total_tokens': total_tokens,
            'average_tokens_per_call': total_tokens / total_calls if total_calls > 0 else 0
        }
```

---

<div class="text-center mt-xl">
  <a href="../../guides/user-guide/" class="md-button md-button--primary">Continue to User Guide →</a>
</div>
