# Best Practices

<div class="hero-section">
  <h1 class="hero-title">Best Practices</h1>
  <p class="hero-subtitle">Essential guidelines for building robust and secure OpenAI applications</p>
</div>

## <span class="gradient-text">Security & Authentication</span>

### API Key Management

!!! danger "Never Expose API Keys"

    - **Client-side code**: Never include API keys in frontend JavaScript
    - **Version control**: Add `.env` files to `.gitignore`
    - **Environment variables**: Use secure environment variable storage
    - **Rotation**: Regularly rotate API keys and monitor usage

<div class="modern-card">
  <h4 class="card-title">✅ Secure API Key Practices</h4>
  
  ```python
  # ✅ Good: Use environment variables
  import os
  openai.api_key = os.getenv("OPENAI_API_KEY")
  
  # ✅ Good: Use configuration files (not in version control)
  with open("config.json") as f:
      config = json.load(f)
      openai.api_key = config["api_key"]
  
  # ❌ Bad: Hardcoded API keys
  openai.api_key = "sk-proj-abc123..."  # Never do this!
  ```
</div>

### Rate Limiting & Error Handling

```python
import time
import random
from functools import wraps

def retry_with_exponential_backoff(
    max_retries=5,
    base_delay=1,
    exponential_base=2,
    jitter=True,
    max_delay=60
):
    """Decorator for exponential backoff retry logic"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            retries = 0
            while retries < max_retries:
                try:
                    return func(*args, **kwargs)
                except openai.error.RateLimitError:
                    if retries == max_retries - 1:
                        raise
                    
                    delay = min(
                        base_delay * (exponential_base ** retries),
                        max_delay
                    )
                    
                    if jitter:
                        delay *= (0.5 + 0.5 * random.random())
                    
                    time.sleep(delay)
                    retries += 1
                except Exception as e:
                    # For non-rate-limit errors, fail immediately
                    raise e
            
        return wrapper
    return decorator

@retry_with_exponential_backoff()
def safe_api_call(messages):
    """API call with automatic retry logic"""
    return openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=150
    )
```

## <span class="gradient-text-accent">Cost Optimization</span>

### Token Management

<div class="feature-grid">
  <div class="modern-card">
    <h4 class="card-title">💰 Monitor Usage</h4>
    <ul>
      <li>Track token consumption per request</li>
      <li>Set up billing alerts in OpenAI dashboard</li>
      <li>Log API usage for analysis</li>
      <li>Implement usage quotas per user</li>
    </ul>
  </div>

  <div class="modern-card">
    <h4 class="card-title">🎯 Choose Right Models</h4>
    <ul>
      <li><strong>GPT-3.5-turbo</strong>: Cost-effective for most tasks</li>
      <li><strong>GPT-4</strong>: Complex reasoning, higher quality</li>
      <li><strong>GPT-4-turbo</strong>: Balanced performance and cost</li>
    </ul>
  </div>

  <div class="modern-card">
    <h4 class="card-title">📏 Optimize Prompts</h4>
    <ul>
      <li>Be concise and specific</li>
      <li>Use appropriate max_tokens settings</li>
      <li>Implement conversation pruning</li>
      <li>Cache responses when possible</li>
    </ul>
  </div>
</div>

---

<div class="text-center mt-xl">
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="../api/overview/" class="md-button md-button--primary">API Reference</a>
    <a href="../examples/advanced/" class="md-button md-button--secondary">Advanced Examples</a>
    <a href="user-guide/" class="md-button">User Guide</a>
  </div>
</div>