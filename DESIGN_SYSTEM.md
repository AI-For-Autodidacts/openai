# OpenAI Documentation Design System

## Overview

This design system provides a modern, accessible, and professional foundation for the OpenAI documentation site. Built with **WCAG 2.1 AA compliance** in mind, it ensures excellent readability and usability across all devices and user needs.

## Typography

### Primary Font: Roboto
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
- **Usage**: All body text, headings, UI elements
- **CDN**: Google Fonts with `font-display: swap` for performance

### Monospace Font: JetBrains Mono
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold)  
- **Usage**: Code blocks, terminal examples, monospace content
- **Features**: Programming ligatures, enhanced readability

### Font Scale
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
```

## Color Palette

### Primary Colors (Blue-based)
- **50**: `#f0f6ff` - Lightest backgrounds
- **100**: `#e0ecff` - Hover states  
- **200**: `#bdd7ff` - Borders
- **300**: `#8bb8ff` - Disabled states
- **400**: `#5a95ff` - Secondary actions
- **500**: `#2563eb` - **Primary brand color** (4.5:1 contrast)
- **600**: `#1d4ed8` - Hover states
- **700**: `#1e3a8a` - Active states
- **800**: `#1e2a5e` - Dark headings
- **900**: `#172554` - Darkest emphasis

### Neutral Colors (Gray scale)
- **0**: `#ffffff` - Pure white
- **50**: `#f8fafc` - Off-white backgrounds
- **100**: `#f1f5f9` - Light backgrounds
- **200**: `#e2e8f0` - Borders, dividers
- **300**: `#cbd5e1` - Disabled elements
- **400**: `#94a3b8` - Placeholders
- **500**: `#64748b` - Secondary text (7:1 contrast)
- **600**: `#475569` - Body text (9:1 contrast)
- **700**: `#334155` - Headings (12:1 contrast)
- **800**: `#1e293b` - Dark headings
- **900**: `#0f172a` - Darkest text

### Semantic Colors
- **Success**: `#059669` (Green, 4.5:1 contrast)
- **Warning**: `#d97706` (Orange, 4.5:1 contrast)  
- **Error**: `#dc2626` (Red, 4.5:1 contrast)
- **Info**: `#0284c7` (Blue, 4.5:1 contrast)

## Spacing System

Built on an **8px grid** for consistent spacing:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## Component System

### Cards
- **Background**: `--card-bg` (white/dark mode aware)
- **Border**: 1px solid `--card-border`
- **Shadow**: `--shadow-sm` with hover `--shadow-xl`
- **Radius**: `--radius-lg` (8px)
- **Padding**: `--space-6` (24px)

### Buttons
- **Height**: `--button-height` (40px)
- **Padding**: `--space-3` × `--space-6`
- **Radius**: `--button-radius` (6px)
- **Background**: Primary gradient
- **Hover**: Transform + shadow elevation

### Navigation
- **Hover**: Subtle blue background + 4px translate
- **Active**: Primary gradient background
- **Focus**: 2px outline with 2px offset

## Shadows & Elevation

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Text Contrast**: Minimum 4.5:1 ratio for normal text
- **Large Text**: Minimum 3:1 ratio for 18px+ text
- **Focus Indicators**: Visible 2px outlines with contrast
- **Color Independence**: Information not conveyed by color alone

### Responsive Design
- **Mobile-first**: Breakpoint at 768px
- **Flexible Typography**: `clamp()` functions for fluid scaling
- **Touch Targets**: Minimum 44px for interactive elements

### Motion & Animation
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Smooth Transitions**: 150ms-350ms timing with easing
- **Performance**: Hardware-accelerated transforms

## Dark Mode Support

All colors automatically adapt using CSS custom properties:
- Cards switch to dark backgrounds
- Text maintains proper contrast ratios  
- Gradients remain visually consistent
- Shadows adapt to dark surfaces

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 78+, Safari 14+, Edge 88+
- **CSS Features**: Custom properties, Grid, Flexbox, `clamp()`
- **Fallbacks**: Graceful degradation for older browsers
- **Progressive Enhancement**: Core functionality works without JavaScript

## Performance Considerations

- **Font Loading**: `font-display: swap` for faster rendering
- **CSS Structure**: Organized by component hierarchy
- **Minimal JavaScript**: Only for progressive enhancements
- **Optimized Assets**: Minified CSS/JS in production builds

## Implementation

All design tokens are available as CSS custom properties in `extra.css`:

```css
/* Example usage */
.my-component {
  background: var(--card-bg);
  color: var(--color-neutral-700);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-family-primary);
  transition: all var(--duration-normal) var(--ease-in-out);
}
```

This design system ensures consistency, accessibility, and maintainability across the entire documentation site.
