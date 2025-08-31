<div align="center">

# OpenAI For Autodidacts

A collection of Run & Explore labs and exercises for exploring OpenAI APIs and AI development concepts.

![Python](https://img.shields.io/badge/Python-3.7+-green)
![OpenAI](https://img.shields.io/badge/OpenAI-API-blue)
![MkDocs Material](https://img.shields.io/badge/MkDocs-Material-blue)
![Documentation](https://img.shields.io/badge/Documentation-Live-brightgreen)

</div>

## 🎯 What You'll Learn

### 🚀 1. Quickstart
Get up and running with OpenAI APIs in minutes with practical examples and step-by-step instructions.

### 🤖 2. Model Inference
Master the art of prompting and interacting with OpenAI models for optimal performance and results.

### ⚙️ 3. Model Customization
Learn to fine-tune and customize models for your specific use cases and domain requirements.

### 📊 4. Model Evaluation
Master comprehensive techniques to measure and improve model performance, safety, and reliability.

### 🎯 5. Agentic AI
Build autonomous AI agents that can reason, plan, and take action independently in complex environments.

### 🔬 6. Advanced Topics
Explore cutting-edge research, experimental techniques, and emerging AI technologies.

## 🚀 Quick Start

### 1. Prerequisites

- Python 3.11 or higher
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com))

### 2. Setup Environment

1. **Fork this repository** on GitHub

2. **Choose your development environment**:
   - **GitHub Codespaces**: Click "Code" → "Codespaces" → "Create codespace on main"
   - **Local Docker**: Clone your fork and open in Docker Desktop

3. **Set up your OpenAI API key**:
   ```bash
   cp .env.sample .env
   # Edit .env and replace 'your-api-key-here' with your actual API key
   ```

### 3. Preview Guide

Start the documentation server to browse the learning materials:
```bash
mkdocs serve
```
Navigate to `http://localhost:8000` to view the interactive guide.

### 4. GitHub Copilot

For the best learning experience, use **GitHub Copilot Chat mode**:
- Open the Chat panel in VS Code (Ctrl+Shift+I or Cmd+Shift+I)
- Ask questions about the code exercises as you work through them
- Get real-time explanations and suggestions for OpenAI API usage

## 📁 Project Structure

```
openai/
├── docs/                      # Learning documentation and guides
│   ├── index.md              # Homepage
│   ├── 1-quickstart/         # 🚀 Getting started with OpenAI APIs
│   ├── 2-model-inference/    # 🤖 Prompting and model interaction
│   ├── 3-model-customization/# ⚙️ Fine-tuning and customization
│   ├── 4-model-evaluation/   # 📊 Performance measurement and testing
│   ├── 5-agentic-ai/         # 🎯 Autonomous AI agents and workflows
│   ├── 6-advanced-topics/    # 🔬 Cutting-edge research and techniques
│   ├── assets/               # Images and data files
│   ├── stylesheets/          # Documentation styling
│   ├── javascripts/          # Documentation interactions
│   └── overrides/            # Template customizations
├── labs/                     # Hands-on lab exercises (coming soon)
├── mkdocs.yml                # Documentation configuration
├── requirements.txt          # Python dependencies
├── DESIGN_SYSTEM.md          # Design system documentation
├── LICENSE                   # License information
└── README.md                # This file
```

---

Happy learning! 🤖✨
