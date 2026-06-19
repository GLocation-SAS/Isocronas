# GLocation — Design System Reference
> Enterprise-grade location intelligence and logistics management interface

**Theme:** multi-theme (light/dark supported via `data-theme`)

GLocation operates with a professional, enterprise-focused aesthetic, balancing high-density data visualization with clean, modern UI principles. The system uses a robust semantic token architecture that ensures accessibility and visual consistency across complex workflows. Typography is optimized for readability, using Montserrat for strong, commanding titles and Nunito Sans for clear, legible body text. The overall design language communicates reliability, precision, and efficiency, essential for logistics and location-based decision-making.

## Tokens — Colors

### Primitive Palette (Foundational)
| Group | Base Hex | Token Range | Purpose |
|-------|----------|-------------|---------|
| **Primary** | `#5a3988` | `--primitive-primary-50-950` | Brand identity, main actions, and emphasis |
| **Secondary** | `#2d5f7c` | `--primitive-secondary-50-950` | Complementary actions and UI depth |
| **Success** | `#67DC67` | `--primitive-success-50-900` | Positive actions, completion, and health status |
| **Warning** | `#FCCF2E` | `--primitive-warning-50-900` | Cautions, pending states, and alerts |
| **Danger** | `#E43241` | `--primitive-danger-50-900` | Error states, destructive actions, and critical alerts |
| **Info** | `#41B5F1` | `--primitive-info-50-950` | Neutral information and system updates |
| **Neutral** | `#728588` | `--primitive-neutral-50-950` | Backgrounds, surfaces, borders, and typography |

### Semantic Tokens (Functional)
| Name | Light Value | Dark Value | Role |
|------|-------------|------------|------|
| Background | `--primitive-neutral-50` | `--primitive-neutral-950` | Primary page background |
| Foreground | `--primitive-neutral-950` | `--primitive-neutral-50` | Primary text color |
| Surface | `--primitive-neutral-100` | `--primitive-neutral-900` | Cards, panels, and elevated surfaces |
| Primary | `--primitive-primary-600` | `--primitive-primary-400` | Main action color |
| Secondary | `--primitive-secondary-600` | `--primitive-secondary-400` | Secondary action color |
| Accent | `--primitive-primary-100` | `--primitive-primary-900` | Highlights and subtle backgrounds |
| Border | `--primitive-neutral-200` | `--primitive-neutral-800` | Standard UI borders and dividers |

## Tokens — Typography

### Montserrat — High-impact typeface for headings and branding elements. · `--font-heading`
- **Substitute:** ui-sans-serif, system-ui, sans-serif
- **Weights:** 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Sizes:** 20px to 48px
- **Role:** Used exclusively for titles and headlines to provide an enterprise-grade, authoritative feel.

### Nunito Sans — Highly legible sans-serif for body text, UI labels, and data points. · `--font-sans`
- **Substitute:** ui-sans-serif, system-ui, sans-serif
- **Weights:** 400 (Regular), 600 (SemiBold)
- **Sizes:** 12px to 18px
- **Role:** The primary workhorse font for all interface content, ensuring readability in data-heavy screens.

### Type Scale

| Role | Size | Weight | Tracking | Token |
|------|------|--------|----------|-------|
| Display | 48px | 700 | -0.02em | `--text-display` |
| Heading 1 | 32px | 700 | -0.01em | `--text-h1` |
| Heading 2 | 24px | 600 | -0.01em | `--text-h2` |
| Heading 3 | 20px | 600 | normal | `--text-h3` |
| Body Lg | 18px | 400 | normal | `--text-body-lg` |
| Body Base | 16px | 400 | normal | `--text-body` |
| Body Sm | 14px | 400 | normal | `--text-body-sm` |
| Caption | 12px | 400 | 0.01em | `--text-caption` |

## Tokens — Spacing & Shapes

**Base unit:** 4px (1rem = 16px)

**Density:** balanced (compact for data views, spacious for marketing/landing)

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 28 | 28px | `--spacing-28` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 68 | 68px | `--spacing-68` |
| 152 | 152px | `--spacing-152` |

### Border Radius
| Element | Value | Token |
|---------|-------|-------|
| Small | 4px | `--radius-sm` |
| Base | 8px | `--radius-md` |
| Large (Cards) | 10px | `--radius-lg` |
| Extra Large | 14px | `--radius-xl` |

### Layout
- **Container max-width:** 1280px
- **Content Gutter:** 24px
- **Section gap:** 64px
- **Card padding:** 24px
- **Grid gap:** 16px

## Components

### Buttons
**Description:** Essential interactive triggers for actions and navigation.
- **Purpose:** Provide clear, accessible touchpoints for user intent.
- **Visual Behavior:** Subtle scale on click, distinct hover state transitions (bg-color shifts).
- **Semantic Mapping:** 
  - `Primary`: Uses `--primary` / `--primary-foreground`.
  - `Secondary`: Uses `--secondary` / `--secondary-foreground`.
  - `Ghost`: Transparent background, uses `--accent` on hover.
- **Usage Rules:** Use Primary for the single most important action. Limit to one Primary per view.
- **Interaction States:** 
  - `Default`: Base semantic color.
  - `Hover`: +10% brightness/saturation or darkened depending on theme.
  - `Active`: Slight inner shadow or scale (0.98).
  - `Disabled`: Opacity 50%, grayscale, `cursor-not-allowed`.
- **Variants:** Primary, Secondary, Success, Info, Warning, Danger, Ghost, Link.
- **Accessibility Notes:** [Placeholders for future ARIA specs]
- **Interaction States:** [Placeholders for focused/loading/success states]

### Cards
**Description:** Flexible containers for grouping related information.
- **Purpose:** Create visual hierarchy and separate distinct content modules.
- **Visual Behavior:** Subtle borders in light mode, surface elevation in dark mode.
- **Semantic Mapping:** Uses `--surface` for background and `--border` for outlines.
- **Usage Rules:** Use consistent padding (`--card-padding`). Group related data inside.
- **Interaction States:** 
  - `Static`: Default view.
  - `Hover (Interactive)`: Subtle shadow increase or border color change.
- **Variants:** Default, Flat (No border), Bordered, Interactive (Clickable).
- **Accessibility Notes:** [Placeholders for future ARIA specs]
- **Interaction States:** [Placeholders for focused/loading/success states]

### Inputs
**Description:** Interactive fields for data entry.
- **Purpose:** Collect structured information from the user safely and clearly.
- **Visual Behavior:** Active focus state clearly highlighted by a primary-colored ring.
- **Semantic Mapping:** Uses `--input` for border, `--background` for field area.
- **Usage Rules:** Always include a persistent label. Use placeholders only for examples.
- **Interaction States:** 
  - `Empty`: Default border.
  - `Filled`: Persistent text.
  - `Focus`: `--ring` outline (2px).
  - `Error`: `--danger` border and text.
- **Variants:** Text, Password, Number, Textarea, Select.
- **Accessibility Notes:** [Placeholders for future ARIA specs]
- **Interaction States:** [Placeholders for focused/loading/success states]

## Do's and Don'ts

### Do
- Use semantic tokens (`--primary`, `--background`) instead of primitives to ensure dark mode compatibility.
- Maintain high contrast for all text (WCAG 2.1 AA minimum).
- Use Montserrat for H1-H3 and Nunito Sans for everything else.
- Apply `--radius-lg` (10px) to main containers and cards for a consistent soft-industrial look.
- Use the 4px grid for all spacing and layout alignments.
- Group related actions in the header/footer of cards.
- Implement `:focus-visible` for keyboard navigation.

### Don't
- Never use hardcoded hex values in component code.
- Avoid using Primary color for non-interactive elements (unless they are status indicators).
- Do not use Montserrat for body text or long paragraphs.
- Avoid stacking more than 3 levels of elevation/nesting.
- Don't use small font sizes (below 12px) for critical information.
- Never remove the focus ring without providing a high-contrast alternative.

## Elevation

Hierarchy is communicated through a combination of:
1. **Surface Tints:** Using `--surface` and `--muted` to create layers.
2. **Subtle Borders:** Using `--border` (1px) to define boundaries.
3. **Soft Shadows:** Reserved for floating elements like Modals, Popovers, and interactive Card hovers. Shadows use semi-transparent neutral primitives.

## Imagery

GLocation uses a mix of:
- **Photography:** High-quality, professional imagery related to logistics, maps, and technology. Always use subtle overlays to ensure text readability.
- **Icons:** Lucide-react outlined icons. Stroke width: 2px. Consistent sizing (16px/20px/24px).
- **Maps:** Clean, minimal map styles that match the application's color palette (muted roads, primary-colored markers).
- **Empty States:** Custom illustrations or themed icons using the secondary and accent palettes.

## Layout Principles

The application follows a structured grid system:
- **Desktop:** 12-column grid, 24px gutter.
- **Tablet:** 8-column grid, 16px gutter.
- **Mobile:** 4-column grid, 16px gutter.
- **Consistency:** Use fixed sidebar for navigation in complex dashboards and a top bar for utility actions.

## Agent Prompt Guide

### Quick Color Reference:
- **Brand Primary:** `#5a3988`
- **Brand Secondary:** `#2d5f7c`
- **Text:** `--foreground`
- **Background:** `--background`
- **Border:** `--border`

### Component Prompts for Agents:
1. **Create a Dashboard Card:** "Create a Card component with `--surface` background, `--border` 1px, and `--radius-lg`. Add a header with Montserrat SemiBold at 18px and a body section with Nunito Sans 14px."
2. **Create a Primary Action Button:** "Create a Button using `--primary` background, `--primary-foreground` text, and `--radius-md`. Add a subtle hover state that darkens the background."
3. **Generate a Data Input Field:** "Create a text input with `--background` fill, `--input` border, and 0.625rem radius. On focus, add a 2px ring using `--ring` color."

## Quick Start

### CSS Custom Properties
```css
:root {
  /* Primitive Tokens (Sample) */
  --primitive-primary-500: #5a3988;
  --primitive-secondary-500: #2d5f7c;

  /* Semantic Tokens */
  --primary: var(--primitive-primary-600);
  --background: var(--primitive-neutral-50);
  --foreground: var(--primitive-neutral-950);
  
  /* Typography */
  --font-heading: 'Montserrat', sans-serif;
  --font-sans: 'Nunito Sans', sans-serif;
  
  /* Radii */
  --radius: 0.625rem;
}
```

### Tailwind v4
```css
@theme {
  --font-heading: var(--font-heading);
  --font-sans: var(--font-sans);
  
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  
  --radius-lg: var(--radius);
  --spacing-container: 1280px;
}
```
