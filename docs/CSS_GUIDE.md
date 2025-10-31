# CSS Properties Guide - AT Solutions Resume Builder

This guide explains every CSS property used in the project and where it's applied.

## Table of Contents
1. [Layout Properties](#layout-properties)
2. [Flexbox Properties](#flexbox-properties)
3. [Spacing Properties](#spacing-properties)
4. [Typography Properties](#typography-properties)
5. [Color & Background Properties](#color--background-properties)
6. [Border & Shadow Properties](#border--shadow-properties)
7. [Position & Z-Index Properties](#position--z-index-properties)
8. [Animation & Transition Properties](#animation--transition-properties)
9. [Responsive Properties](#responsive-properties)

---

## Layout Properties

### `display`
**Purpose**: Defines how an element is displayed
**Values Used**:
- `flex` - Creates a flexbox container (used in navbar, sidebars, buttons)
- `grid` - Creates a grid container (used in template selection, skills grid)
- `block` - Element takes full width (used in sections)
- `inline-block` - Element flows inline but can have width/height
- `none` - Hides element completely

**Where Used**:
- `.modern-editor-page` - flex (vertical layout)
- `.editor-navbar` - flex (horizontal navbar)
- `.templates-grid` - grid (template cards)
- `.nav-tabs` - grid (navigation tabs)

### `min-height` / `height` / `max-height`
**Purpose**: Controls element height
**Where Used**:
- `.modern-editor-page { min-height: 100vh }` - Full viewport height
- `.editor-navbar { height: 64px }` - Fixed navbar height
- `.zoom-btn { height: 32px }` - Fixed button height

### `width` / `max-width` / `min-width`
**Purpose**: Controls element width
**Where Used**:
- `.preview-container-modern { width: 210mm }` - A4 paper width
- `.zoom-btn { width: 32px }` - Square button
- `.templates-drawer { width: 400px }` - Fixed drawer width

---

## Flexbox Properties

### `flex-direction`
**Purpose**: Sets direction of flex items
**Values**: `row` (horizontal), `column` (vertical)
**Where Used**:
- `.modern-editor-page { flex-direction: column }` - Stack navbar and content vertically
- `.modern-sidebar { flex-direction: column }` - Stack sidebar sections vertically

### `align-items`
**Purpose**: Aligns items on cross axis
**Values**: `center`, `flex-start`, `flex-end`, `stretch`
**Where Used**:
- `.editor-navbar { align-items: center }` - Vertically center navbar items
- `.zoom-btn { align-items: center }` - Center icon in button

### `justify-content`
**Purpose**: Aligns items on main axis
**Values**: `center`, `space-between`, `flex-start`, `flex-end`
**Where Used**:
- `.editor-navbar { justify-content: space-between }` - Space navbar sections
- `.navbar-center { justify-content: center }` - Center zoom controls

### `gap`
**Purpose**: Space between flex/grid items
**Where Used**:
- `.navbar-left { gap: 24px }` - Space between back button and title
- `.zoom-controls { gap: 8px }` - Space between zoom buttons
- `.nav-tabs { gap: 8px }` - Space between tab buttons

### `flex`
**Purpose**: Shorthand for flex-grow, flex-shrink, flex-basis
**Where Used**:
- `.navbar-left { flex: 1 }` - Take up available space
- `.sidebar-content { flex: 1 }` - Expand to fill sidebar

---

## Spacing Properties

### `padding`
**Purpose**: Internal spacing inside element
**Format**: `padding: top right bottom left` or `padding: vertical horizontal`
**Where Used**:
- `.editor-navbar { padding: 0 24px }` - Horizontal padding only
- `.nav-back-btn { padding: 8px 16px }` - Vertical 8px, horizontal 16px
- `.resume-template { padding: 5% }` - Percentage-based padding

### `margin`
**Purpose**: External spacing outside element
**Where Used**:
- `.editor-title h1 { margin: 0 }` - Remove default margin
- `.editor-title .subtitle { margin-top: 2px }` - Small top margin
- `.resume-section { margin-bottom: 1.5em }` - Space between sections

---

## Typography Properties

### `font-size`
**Purpose**: Size of text
**Where Used**:
- `.editor-title h1 { font-size: 18px }` - Title size
- `.nav-back-btn { font-size: 14px }` - Button text size
- `.resume-template { font-size: 14px }` - Base resume text size

### `font-weight`
**Purpose**: Boldness of text
**Values**: 400 (normal), 500 (medium), 600 (semi-bold), 700 (bold)
**Where Used**:
- `.editor-title h1 { font-weight: 600 }` - Semi-bold title
- `.nav-back-btn { font-weight: 500 }` - Medium weight button text
- `.section-title { font-weight: 600 }` - Bold section headings

### `font-family`
**Purpose**: Typeface for text
**Where Used**:
- `.resume-template { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif }`

### `line-height`
**Purpose**: Vertical spacing between lines of text
**Where Used**:
- `.editor-title h1 { line-height: 1.2 }` - Tight line height for headings
- `.resume-template { line-height: 1.5 }` - Comfortable reading line height

### `letter-spacing`
**Purpose**: Space between characters
**Where Used**:
- `.section-title { letter-spacing: 0.05em }` - Slightly spaced uppercase text
- `.logo-symbol { letter-spacing: -0.5px }` - Tighter spacing for logo

### `text-transform`
**Purpose**: Change text case
**Where Used**:
- `.section-title { text-transform: uppercase }` - All caps section titles

---

## Color & Background Properties

### `color`
**Purpose**: Text color
**Where Used**:
- `.nav-back-btn { color: #374151 }` - Dark gray text
- `.editor-title .subtitle { color: #6b7280 }` - Medium gray text
- `.resume-template { color: #1f2937 }` - Very dark gray for resume text

### `background` / `background-color`
**Purpose**: Background color or gradient
**Where Used**:
- `.modern-editor-page { background: #f8f9fa }` - Light gray page background
- `.editor-navbar { background: white }` - White navbar
- `.logo-symbol { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) }` - Purple gradient

### `background-clip`
**Purpose**: Defines how background extends
**Where Used**:
- `.brand-text { background-clip: text }` - Clip background to text shape (for gradient text)

---

## Border & Shadow Properties

### `border`
**Purpose**: Border around element
**Format**: `border: width style color`
**Where Used**:
- `.editor-navbar { border-bottom: 1px solid #e5e7eb }` - Bottom border only
- `.nav-back-btn { border: 1px solid #e5e7eb }` - All-around border
- `.zoom-btn { border: 1px solid #e5e7eb }` - Button border

### `border-radius`
**Purpose**: Rounded corners
**Where Used**:
- `.nav-back-btn { border-radius: 8px }` - Rounded button corners
- `.zoom-btn { border-radius: 6px }` - Slightly rounded button
- `.logo-symbol { border-radius: 10px }` - Rounded logo square

### `box-shadow`
**Purpose**: Drop shadow effect
**Format**: `box-shadow: x y blur spread color`
**Where Used**:
- `.editor-navbar { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) }` - Subtle navbar shadow
- `.logo-symbol { box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) }` - Purple glow
- `.preview-container-modern { box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1) }` - Paper shadow

---

## Position & Z-Index Properties

### `position`
**Purpose**: Positioning method
**Values**: `static`, `relative`, `absolute`, `fixed`, `sticky`
**Where Used**:
- `.editor-navbar { position: sticky }` - Stick to top when scrolling
- `.templates-drawer { position: fixed }` - Fixed position drawer
- `.selected-badge { position: absolute }` - Absolute positioning for badge

### `top` / `right` / `bottom` / `left`
**Purpose**: Position offset
**Where Used**:
- `.editor-navbar { top: 0 }` - Stick at top
- `.templates-drawer { right: 0 }` - Align to right edge
- `.selected-badge { top: 12px; right: 12px }` - Position in corner

### `z-index`
**Purpose**: Stacking order (higher = on top)
**Where Used**:
- `.editor-navbar { z-index: 100 }` - Above content
- `.templates-drawer { z-index: 90 }` - Below navbar
- `.drawer-overlay { z-index: 80 }` - Below drawer

---

## Animation & Transition Properties

### `transition`
**Purpose**: Smooth property changes
**Format**: `transition: property duration timing-function`
**Where Used**:
- `.nav-back-btn { transition: all 0.2s }` - Smooth hover effect
- `.zoom-btn { transition: all 0.2s }` - Smooth button hover
- `.template-card { transition: all 0.2s }` - Smooth card hover

### `transform`
**Purpose**: Visual transformations
**Values**: `scale()`, `rotate()`, `translate()`, etc.
**Where Used**:
- `.preview-container-modern { transform: scale(1) }` - Zoom effect
- `.templates-drawer { transform: translateX(100%) }` - Slide drawer
- `.logo-symbol:hover { transform: translateY(-2px) }` - Lift on hover

### `animation`
**Purpose**: Keyframe animations
**Where Used**:
- `.export-btn-modern .spinner { animation: spin 0.6s linear infinite }` - Spinning loader
- `.modern-form-section { animation: fadeInUp 0.3s ease-out }` - Fade in animation

### `@keyframes`
**Purpose**: Define animation steps
**Where Used**:
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Responsive Properties

### `@media`
**Purpose**: Apply styles based on screen size
**Where Used**:
```css
@media (max-width: 768px) {
  /* Mobile styles */
}

@media (min-width: 1400px) {
  /* Large desktop styles */
}
```

### `overflow`
**Purpose**: Handle content that exceeds container
**Values**: `visible`, `hidden`, `scroll`, `auto`
**Where Used**:
- `.sidebar-content { overflow-y: auto }` - Vertical scrolling
- `.preview-canvas { overflow: auto }` - Both directions scrolling
- `.a4-page { overflow: hidden }` - Hide overflow

### `cursor`
**Purpose**: Mouse cursor appearance
**Where Used**:
- `.nav-back-btn { cursor: pointer }` - Pointer for clickable items
- `.inline-edit-display { cursor: pointer }` - Pointer for editable text

---

## Grid Properties

### `grid-template-columns`
**Purpose**: Define grid column structure
**Where Used**:
- `.modern-editor-layout { grid-template-columns: 360px 1fr }` - Sidebar + content
- `.nav-tabs { grid-template-columns: repeat(2, 1fr) }` - 2 equal columns
- `.skills-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) }` - Responsive grid

---

## Common CSS Patterns in This Project

### 1. **Flexbox Centering**
```css
display: flex;
align-items: center;      /* Vertical center */
justify-content: center;  /* Horizontal center */
```

### 2. **Sticky Header**
```css
position: sticky;
top: 0;
z-index: 100;
```

### 3. **Hover Effects**
```css
transition: all 0.2s;
```
```css
.element:hover {
  background: #f9fafb;
  transform: translateY(-1px);
}
```

### 4. **Gradient Background**
```css
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
```

### 5. **Responsive Grid**
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 16px;
```

---

## File-Specific CSS Usage

### `styles/editor.css`
- Main editor page layout
- Navbar, sidebar, preview area
- Zoom controls, buttons
- Form inputs and sections

### `styles/globals.css`
- Global resets and base styles
- Landing page layout
- Navigation and footer
- Hero section and features

### `components/templates/base.css`
- Resume template base styles
- A4 page sizing
- Typography and spacing
- Print styles

### `components/templates/ClassicTemplate/ClassicTemplate.css`
- Classic template specific styles
- Header and section styling
- Contact info layout

### `components/Logo.module.css`
- Logo component styles
- Size variants (small, medium, large)
- Gradient effects
- Hover animations

---

## Tips for Understanding CSS

1. **Box Model**: Every element has content, padding, border, and margin
2. **Flexbox**: Use for one-dimensional layouts (row or column)
3. **Grid**: Use for two-dimensional layouts (rows and columns)
4. **Specificity**: More specific selectors override less specific ones
5. **Cascade**: Later styles override earlier ones (if same specificity)

---

**Need Help?** Refer to this guide when working with CSS in the project!
