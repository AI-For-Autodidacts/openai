# Installation Guide

<div class="hero-section">
  <h1 class="hero-title">Get Started in Minutes</h1>
  <p class="hero-subtitle">Follow our step-by-step installation guide to start building with OpenAI APIs</p>
</div>

## <span class="gradient-text">Prerequisites</span>

Before you begin, ensure you have the following:

!!! info "System Requirements"

    - **Python**: 3.7 or higher
    - **Node.js**: 14.0 or higher (for JavaScript/TypeScript projects)
    - **OpenAI Account**: Sign up at [platform.openai.com](https://platform.openai.com)
    - **API Key**: Generate from your OpenAI dashboard

## <span class="gradient-text-accent">Installation Methods</span>

=== "Python"

    ### Install the OpenAI Python Library

    ```bash
    # Using pip
    pip install openai

    # Using conda
    conda install -c conda-forge openai

    # For development (with async support)
    pip install openai[datalib]
    ```

    ### Verify Installation

    ```python
    import openai
    print(openai.__version__)
    ```

=== "JavaScript/Node.js"

    ### Install the OpenAI Node.js Library

    ```bash
    # Using npm
    npm install openai

    # Using yarn
    yarn add openai

    # Using pnpm
    pnpm add openai
    ```

    ### Verify Installation

    ```javascript
    const { Configuration, OpenAIApi } = require('openai');
    console.log('OpenAI library installed successfully!');
    ```

=== "cURL"

    ### Direct API Access

    No installation required! You can use OpenAI APIs directly with cURL:

    ```bash
    curl https://api.openai.com/v1/models \
      -H "Authorization: Bearer $OPENAI_API_KEY"
    ```

## <span class="gradient-text-secondary">Environment Setup</span>

### 1. Get Your API Key

<div class="modern-card">
  <ol>
    <li>Visit <a href="https://platform.openai.com" target="_blank">OpenAI Platform</a></li>
    <li>Sign in to your account</li>
    <li>Navigate to the API section</li>
    <li>Create a new API key</li>
    <li>Copy and securely store your key</li>
  </ol>
</div>

!!! warning "Security Best Practice"

    Never commit your API key to version control. Always use environment variables or secure configuration files.

### 2. Configure Environment Variables

=== "Linux/macOS"

    ```bash
    # Add to your ~/.bashrc or ~/.zshrc
    export OPENAI_API_KEY="your-api-key-here"

    # Or create a .env file
    echo "OPENAI_API_KEY=your-api-key-here" > .env
    ```

=== "Windows"

    ```cmd
    # Command Prompt
    set OPENAI_API_KEY=your-api-key-here

    # PowerShell
    $env:OPENAI_API_KEY="your-api-key-here"

    # Or create a .env file
    echo OPENAI_API_KEY=your-api-key-here > .env
    ```

### 3. Test Your Setup

=== "Python"

    ```python
    import os
    import openai

    # Configure the API key
    openai.api_key = os.getenv("OPENAI_API_KEY")

    # Test the connection
    try:
        models = openai.Model.list()
        print("Connection successful!")
        print(f"Available models: {len(models['data'])}")
    except Exception as e:
        print(f"Connection failed: {e}")
    ```

=== "JavaScript"

    ```javascript
    require('dotenv').config();
    const { Configuration, OpenAIApi } = require('openai');

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    async function testConnection() {
      try {
        const response = await openai.listModels();
        console.log('Connection successful!');
        console.log(`Available models: ${response.data.data.length}`);
      } catch (error) {
        console.error('Connection failed:', error.message);
      }
    }

    testConnection();
    ```

## <span class="gradient-text">Project Setup</span>

### Create a New Project

=== "Python"

    ```bash
    # Create project directory
    mkdir my-openai-project
    cd my-openai-project

    # Create virtual environment
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

    # Install dependencies
    pip install openai python-dotenv

    # Create project structure
    touch main.py .env requirements.txt
    ```

=== "JavaScript"

    ```bash
    # Create project directory
    mkdir my-openai-project
    cd my-openai-project

    # Initialize npm project
    npm init -y

    # Install dependencies
    npm install openai dotenv

    # Create project structure
    touch index.js .env
    ```

### Project Structure

```
my-openai-project/
├── .env                 # Environment variables
├── .gitignore          # Git ignore file
├── README.md           # Project documentation
├── requirements.txt    # Python dependencies (Python)
├── package.json        # Node.js dependencies (JS)
├── main.py            # Main Python file
├── index.js           # Main JavaScript file
└── src/               # Source code directory
    ├── config/        # Configuration files
    ├── utils/         # Utility functions
    └── examples/      # Example scripts
```

## <span class="gradient-text-accent">Common Issues & Solutions</span>

<div class="feature-grid">
  <div class="modern-card">
    <h4 class="card-title">1. Authentication Errors</h4>
    <p class="card-description"><strong>Problem:</strong> "Invalid API key" or 401 errors</p>
    <p><strong>Solution:</strong></p>
    <ul>
      <li>Verify your API key is correct</li>
      <li>Check environment variable spelling</li>
      <li>Ensure key has proper permissions</li>
    </ul>
  </div>

  <div class="modern-card">
    <h4 class="card-title">2. Network Issues</h4>
    <p class="card-description"><strong>Problem:</strong> Connection timeouts or network errors</p>
    <p><strong>Solution:</strong></p>
    <ul>
      <li>Check your internet connection</li>
      <li>Verify firewall settings</li>
      <li>Try different network environment</li>
    </ul>
  </div>

  <div class="modern-card">
    <h4 class="card-title">3. Import Errors</h4>
    <p class="card-description"><strong>Problem:</strong> Module not found or import errors</p>
    <p><strong>Solution:</strong></p>
    <ul>
      <li>Verify library installation</li>
      <li>Check Python/Node.js version</li>
      <li>Activate virtual environment</li>
    </ul>
  </div>
</div>

## <span class="gradient-text-secondary">Next Steps</span>

Congratulations! You've successfully installed and configured OpenAI APIs. Here's what to do next:

<div class="modern-card">
  <h3 class="card-title">Quick Wins</h3>
  <ul>
    <li><a href="../quick-start/">Complete the Quick Start tutorial</a></li>
    <li><a href="../configuration/">Learn about advanced configuration</a></li>
    <li><a href="../../examples/basic/">Try basic examples</a></li>
    <li><a href="../../guides/best-practices/">Review best practices</a></li>
  </ul>
</div>

---

<div class="text-center mt-xl">
  <a href="../quick-start/" class="md-button md-button--primary">Continue to Quick Start →</a>
</div>
