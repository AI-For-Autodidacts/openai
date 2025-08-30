# API Overview

<div class="hero-section">
  <h1 class="hero-title">OpenAI API Reference</h1>
  <p class="hero-subtitle">Complete documentation for all OpenAI API endpoints and capabilities</p>
</div>

## <span class="gradient-text">Base URL & Authentication</span>

All API requests should be made to:
```
https://api.openai.com/v1
```

### Authentication

Include your API key in the Authorization header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Common Headers

```http
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
OpenAI-Organization: YOUR_ORG_ID  # Optional
```

## <span class="gradient-text-accent">Available Models</span>

<div class="feature-grid">
  <div class="modern-card">
    <h4 class="card-title">Chat Models</h4>
    <ul>
      <li><code>gpt-4</code> - Most capable model</li>
      <li><code>gpt-4-turbo</code> - Faster GPT-4</li>
      <li><code>gpt-3.5-turbo</code> - Fast and efficient</li>
    </ul>
  </div>

  <div class="modern-card">
    <h4 class="card-title">Image Models</h4>
    <ul>
      <li><code>dall-e-3</code> - Latest image generation</li>
      <li><code>dall-e-2</code> - Previous generation</li>
    </ul>
  </div>

  <div class="modern-card">
    <h4 class="card-title">Audio Models</h4>
    <ul>
      <li><code>whisper-1</code> - Speech to text</li>
      <li><code>tts-1</code> - Text to speech</li>
    </ul>
  </div>
</div>

## <span class="gradient-text-secondary">Core Endpoints</span>

### Chat Completions

**Endpoint:** `POST /v1/chat/completions`

Generate conversational responses using GPT models.

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | ID of the model to use |
| `messages` | array | Yes | List of messages in the conversation |
| `temperature` | number | No | Sampling temperature (0-2) |
| `max_tokens` | integer | No | Maximum tokens in response |
| `stream` | boolean | No | Stream partial results |

#### Response Format

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
      "content": "Hello! How can I help you today?"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 10,
    "total_tokens": 30
  }
}
```

### Image Generation

**Endpoint:** `POST /v1/images/generations`

Generate images from text descriptions.

```bash
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A futuristic city at sunset",
    "n": 1,
    "size": "1024x1024"
  }'
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | Model to use (dall-e-2, dall-e-3) |
| `prompt` | string | Yes | Text description of image |
| `n` | integer | No | Number of images (1-10) |
| `size` | string | No | Image dimensions |
| `quality` | string | No | Image quality (standard, hd) |

### Audio Transcription

**Endpoint:** `POST /v1/audio/transcriptions`

Convert audio to text using Whisper.

```bash
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F file="@audio.mp3" \
  -F model="whisper-1"
```

### Text-to-Speech

**Endpoint:** `POST /v1/audio/speech`

Generate spoken audio from text.

```bash
curl https://api.openai.com/v1/audio/speech \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "Hello, this is a test.",
    "voice": "alloy"
  }' \
  --output speech.mp3
```

## <span class="gradient-text">Error Handling</span>

### HTTP Status Codes

<div class="feature-grid">
  <div class="modern-card">
    <h4 class="card-title">Success (200)</h4>
    <p class="card-description">Request completed successfully</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">Bad Request (400)</h4>
    <p class="card-description">Invalid request parameters</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">Unauthorized (401)</h4>
    <p class="card-description">Invalid or missing API key</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">Forbidden (403)</h4>
    <p class="card-description">Insufficient permissions</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">Rate Limited (429)</h4>
    <p class="card-description">Too many requests</p>
  </div>

  <div class="modern-card">
    <h4 class="card-title">Server Error (500+)</h4>
    <p class="card-description">OpenAI server issues</p>
  </div>
</div>

### Error Response Format

```json
{
  "error": {
    "message": "You exceeded your current quota",
    "type": "insufficient_quota",
    "param": null,
    "code": "insufficient_quota"
  }
}
```

## <span class="gradient-text-accent">Rate Limits</span>

Rate limits vary by model and organization tier:

| Model | Requests/min | Tokens/min |
|-------|-------------|------------|
| GPT-4 | 10,000 | 150,000 |
| GPT-3.5-turbo | 10,000 | 1,000,000 |
| DALL-E-3 | 200 | N/A |
| Whisper | 500 | N/A |

### Rate Limit Headers

```http
x-ratelimit-limit-requests: 10000
x-ratelimit-remaining-requests: 9999
x-ratelimit-reset-requests: 6m0s
x-ratelimit-limit-tokens: 1000000
x-ratelimit-remaining-tokens: 999950
x-ratelimit-reset-tokens: 6m0s
```

## <span class="gradient-text-secondary">Best Practices</span>

!!! tip "Optimize API Usage"

    - **Use appropriate models**: Choose the right model for your use case
    - **Implement caching**: Cache responses when possible
    - **Batch requests**: Group similar requests together
    - **Monitor usage**: Track tokens and costs

!!! warning "Handle Errors Gracefully"

    - **Implement retry logic**: Use exponential backoff for rate limits
    - **Validate inputs**: Check parameters before sending requests
    - **Log errors**: Maintain logs for debugging
    - **Provide fallbacks**: Have backup strategies for failures

!!! success "Security Considerations"

    - **Protect API keys**: Never expose keys in client-side code
    - **Use HTTPS**: All requests should use secure connections
    - **Validate responses**: Check response format and content
    - **Implement timeouts**: Set appropriate request timeouts

---

<div class="text-center mt-xl">
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="authentication/" class="md-button md-button--primary">Authentication Guide</a>
    <a href="endpoints/" class="md-button md-button--secondary">Detailed Endpoints</a>
    <a href="../examples/basic/" class="md-button">View Examples</a>
  </div>
</div>
