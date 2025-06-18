# Components

This directory contains reusable UI components for the CPE website.

## Available Components

### Header
A dynamic navigation header with scroll effects and mobile menu functionality.
- **Props**: `isHomePage?: boolean` - Determines header styling behavior
- **Features**: Transparent background on scroll, mobile menu, active state highlighting

### Footer
A comprehensive footer with company information, social links, and newsletter signup.
- **Features**: Social media links, quick navigation, contact information, newsletter subscription

### Layout
A wrapper component that combines Header and Footer around page content.
- **Props**: 
  - `children: React.ReactNode` - Page content to wrap
  - `isHomePage?: boolean` - Passes through to Header component

## Usage

```tsx
// Using individual components
import { Header, Footer } from '../components';

// Using Layout wrapper (recommended)
import { Layout } from '../components';

function MyPage() {
  return (
    <Layout isHomePage={true}>
      <main>
        {/* Your page content */}
      </main>
    </Layout>
  );
}
```

## Benefits

- **Consistency**: Ensures all pages have the same header/footer styling and behavior
- **Maintainability**: Changes to header/footer only need to be made in one place
- **Reusability**: Easy to add new pages with consistent layout
- **Props Support**: Components accept props to customize behavior as needed 