# OpenAI Documentation Site

A modern, professional MkDocs Material documentation site for OpenAI APIs with custom CSS styling and animations.

![Documentation Preview](https://img.shields.io/badge/Documentation-Live-brightgreen)
![MkDocs](https://img.shields.io/badge/MkDocs-Material-blue)
![Python](https://img.shields.io/badge/Python-3.7+-green)

## ✨ Features

- **Modern Design**: Clean, accessible design with Roboto typography and WCAG 2.1 AA compliant colors
- **Professional Styling**: Blue-based color palette with subtle gradients and modern CSS design tokens
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices with 8px grid system
- **Advanced Animations**: Smooth transitions, hover effects, and scroll-triggered animations
- **Interactive Elements**: Dynamic search, progress indicators, and tooltips
- **Code Examples**: Comprehensive examples in Python, JavaScript, and cURL
- **Best Practices**: Security guidelines and optimization techniques
- **Accessibility First**: Screen reader support, keyboard navigation, and high contrast mode
- **Dark/Light Theme**: Toggle between color schemes with consistent design tokens
- **Fast Performance**: Optimized font loading and minified assets

## 🎨 Design System

### Typography
- **Primary Font**: Roboto (300, 400, 500, 700 weights)
- **Monospace Font**: JetBrains Mono for code blocks
- **Responsive Scale**: 12px to 48px with consistent line heights

### Color Palette (WCAG 2.1 AA Compliant)
- **Primary**: Blue-based palette (#2563eb base) with 9 shades
- **Neutral**: Gray scale (#64748b base) for text and backgrounds  
- **Semantic**: Success (#059669), Warning (#d97706), Error (#dc2626), Info (#0284c7)

### Spacing & Layout
- **Grid System**: 8px base unit for consistent spacing
- **Container**: 65rem max-width with responsive padding
- **Shadows**: 5-level elevation system for depth
- **Borders**: 4px to 16px radius scale for modern aesthetics

### Visual Features
- **Gradient Hero Sections**: Eye-catching headers with animated backgrounds
- **Modern Cards**: Elevated cards with hover effects and gradient accents
- **Advanced Styling**: Custom CSS with Roboto typography and accessible color palette
- **Smooth Animations**: CSS transitions and JavaScript-enhanced interactions
- **Professional Color Palette**: Deep purple theme with accent colors

### Interactive Components
- **Reading Progress Bar**: Shows scroll progress
- **Scroll Animations**: Elements animate into view
- **Search Enhancement**: Visual feedback and loading states
- **Hover Effects**: Lift, scale, and glow animations
- **Parallax Elements**: Subtle depth effects

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Serve the documentation**:
   ```bash
   mkdocs serve
   ```

3. **Open in browser**:
   Navigate to `http://localhost:8000`

### Building for Production

```bash
# Build static files
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## 📁 Project Structure

```
openai-docs/
├── docs/                      # Documentation content
│   ├── index.md              # Homepage
│   ├── getting-started/       # Installation and setup guides
│   ├── guides/               # User and developer guides
│   ├── api/                  # API reference documentation
│   ├── examples/             # Code examples and tutorials
│   ├── about/                # Project information
│   ├── assets/               # Images and static files
│   ├── stylesheets/          # Custom CSS
│   │   ├── extra.css         # Main custom styles
│   │   └── animations.css    # Animation definitions
│   ├── javascripts/          # Custom JavaScript
│   │   └── extra.js          # Interactive enhancements
│   └── overrides/            # Template overrides
├── mkdocs.yml                # MkDocs configuration
├── requirements.txt          # Python dependencies
└── README.md                # This file
```

## ⚙️ Key Features Implemented

### Custom CSS Styling
- **Modern gradient themes** with CSS custom properties
- **Professional card components** with hover effects
- **Responsive typography** using Roboto font family with WCAG 2.1 AA compliance
- **Smooth animations** and transitions throughout
- **Dark/light theme support** with seamless switching

### Interactive JavaScript
- **Scroll-triggered animations** using Intersection Observer
- **Reading progress indicator** that tracks scroll position
- **Enhanced search experience** with visual feedback
- **Smooth scrolling** for internal navigation
- **Performance optimizations** with debouncing and throttling

### Content Structure
- **Comprehensive guides** from installation to advanced usage
- **Code examples** in multiple programming languages
- **API reference** with detailed endpoint documentation
- **Best practices** for security and optimization
- **Real-world examples** and use cases

## 🎯 Customization

### Changing Colors

Update the CSS custom properties in `docs/stylesheets/extra.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
  --brand-primary: #your-primary-color;
}
```

### Adding Content

1. Create new Markdown files in the appropriate `docs/` subdirectory
2. Update the navigation in `mkdocs.yml`
3. Use the custom CSS classes for styling

## 📄 License

This project explores OpenAI APIs with modern documentation tooling.

---

Built with ❤️ using [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
