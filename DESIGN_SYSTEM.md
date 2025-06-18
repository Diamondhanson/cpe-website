# CPE Website Design System

This document outlines the design system variables available in `src/app/globals.css` for consistent styling across the application.

## 🎨 Colors

### Primary Colors
- `--primary`: Main brand color (#2563eb)
- `--primary-hover`: Hover state
- `--primary-light`: Light variant
- `--primary-dark`: Dark variant

### Secondary Colors
- `--secondary`: Secondary brand color (#64748b)
- `--secondary-hover`: Hover state
- `--secondary-light`: Light variant
- `--secondary-dark`: Dark variant

### Accent Colors
- `--accent`: Accent color (#f59e0b)
- `--accent-hover`: Hover state
- `--accent-light`: Light variant
- `--accent-dark`: Dark variant

### Status Colors
- `--success`: Success messages (#10b981)
- `--warning`: Warning messages (#f59e0b)
- `--error`: Error messages (#ef4444)
- `--info`: Info messages (#3b82f6)

### Neutral Colors
- `--gray-50` through `--gray-900`: Gray scale palette

## 🔤 Typography

### Font Families
- `--font-primary`: Inter (main text)
- `--font-secondary`: Poppins (headings/special text)
- `--font-mono`: Fira Code (code blocks)

### Font Sizes
- `--text-xs`: 12px
- `--text-sm`: 14px
- `--text-base`: 16px (default)
- `--text-lg`: 18px
- `--text-xl`: 20px
- `--text-2xl`: 24px
- `--text-3xl`: 30px
- `--text-4xl`: 36px
- `--text-5xl`: 48px
- `--text-6xl`: 60px

### Font Weights
- `--font-light`: 300
- `--font-normal`: 400
- `--font-medium`: 500
- `--font-semibold`: 600
- `--font-bold`: 700
- `--font-extrabold`: 800

## 📏 Spacing
- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 16px
- `--space-lg`: 24px
- `--space-xl`: 32px
- `--space-2xl`: 48px
- `--space-3xl`: 64px

## 🔘 Border Radius
- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-full`: 9999px (fully rounded)

## 🌟 Shadows
- `--shadow-sm`: Small shadow
- `--shadow-md`: Medium shadow
- `--shadow-lg`: Large shadow
- `--shadow-xl`: Extra large shadow

## 🚀 Usage Examples

### Using CSS Variables in Styles
```css
.my-component {
  background-color: var(--primary);
  color: var(--foreground);
  font-size: var(--text-lg);
  font-family: var(--font-primary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

### Using in React Components
```jsx
<div style={{
  backgroundColor: 'var(--primary)',
  color: 'var(--foreground)',
  fontSize: 'var(--text-lg)',
  padding: 'var(--space-md)'
}}>
  Content
</div>
```

### Using Utility Classes
```jsx
<div className="text-primary bg-secondary font-primary text-lg">
  Content with utility classes
</div>
```

## 🌙 Dark Mode
The design system automatically adjusts colors for dark mode based on user preference. All variables are automatically updated when `prefers-color-scheme: dark` is detected.

## 📝 Best Practices

1. **Always use CSS variables** instead of hardcoded colors
2. **Stick to the defined font sizes** for consistency
3. **Use the spacing system** for margins and padding
4. **Test in both light and dark modes**
5. **Update this file** when adding new design tokens

## 🔄 Changing the Design System

To change the main brand color:
1. Update `--primary` in `src/app/globals.css`
2. Update related hover and variant colors
3. The change will automatically apply everywhere

To add new colors:
1. Add the variable to `:root` in `globals.css`
2. Add dark mode variant if needed
3. Add utility class if frequently used
4. Update this documentation 