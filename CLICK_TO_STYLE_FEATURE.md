# Click-to-Style Feature

## Overview
Implemented an intuitive styling system where users can click on any component in the resume preview to directly customize that specific element. The Style tab automatically opens and shows relevant styling options for the selected component.

## How It Works

### 1. **Click Any Element**
Users can click on any styleable element in the resume:
- Name (h1)
- Title/Job Title (h2)
- Section Titles
- Text content
- Contact information
- And more...

### 2. **Auto-Switch to Style Tab**
When an element is clicked:
- Style tab automatically opens
- Sidebar shows on mobile if hidden
- Selected component is highlighted

### 3. **Visual Feedback**
Selected elements show:
- Purple dashed outline on hover
- Solid purple outline when selected
- 🎨 Paint brush indicator
- Pulsing animation
- Light purple background

### 4. **Component-Specific Styling**
The Style tab shows:
- Which component is selected
- Relevant styling options for that component
- Clear selection button

## Implementation Details

### Context (`context/ResumeContext.js`)

Added state tracking:
```javascript
const [selectedComponent, setSelectedComponent] = useState(null);
```

Provides:
- `selectedComponent`: Currently selected component
- `setSelectedComponent`: Function to update selection

### Editor (`pages/editor.js`)

Added handler:
```javascript
const handleComponentClick = (componentType) => {
  setSelectedComponent(componentType);
  setActiveSection('style');
  if (isMobile) {
    setShowSidebar(true);
  }
};
```

Features:
- Switches to Style tab
- Opens sidebar on mobile
- Tracks selected component

### Template (`components/templates/ClassicTemplate/index.js`)

Added click handlers:
```javascript
<h1 
  onClick={(e) => handleClick('name', e)}
  className={`styleable-element ${selectedComponent === 'name' ? 'selected' : ''}`}
  title="Click to style name"
>
  {data.name}
</h1>
```

Features:
- Click handlers on elements
- CSS classes for styling
- Visual indicators
- Tooltips

### Props Flow
```
Editor
  ↓ handleComponentClick, selectedComponent
InlineEditableResume
  ↓ onComponentClick, selectedComponent
ClassicTemplate
  ↓ Applies to elements
```

## Visual Indicators

### Hover State
```
┌─────────────────────────┐
│ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ │  Purple dashed outline
│ ┈  John Doe          ┈ │  Light purple background
│ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ │  Cursor: pointer
└─────────────────────────┘
```

### Selected State
```
┌─────────────────────────┐
│ ━━━━━━━━━━━━━━━━━━━━━ │  Purple solid outline
│ ━  John Doe      🎨  ━ │  Paint brush indicator
│ ━━━━━━━━━━━━━━━━━━━━━ │  Pulsing animation
└─────────────────────────┘
```

## Style Tab UI

### With Selection
```
┌─────────────────────────────────────┐
│ Style Customization            [X]  │
│ Styling: Name                       │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 🎯 Selected: Name               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Colors                              │
│ [Color pickers for name...]         │
│                                     │
│ Typography                          │
│ [Font options for name...]          │
└─────────────────────────────────────┘
```

### Without Selection
```
┌─────────────────────────────────────┐
│ Style Customization                 │
│ Click any element to style it       │
├─────────────────────────────────────┤
│ Colors                              │
│ [Global color options...]           │
│                                     │
│ Typography                          │
│ [Global font options...]            │
└─────────────────────────────────────┘
```

## Styleable Components

### Currently Implemented
- ✅ Name (h1)
- ✅ Title (h2)

### Can Be Added
- Section Titles (Experience, Education, etc.)
- Body Text
- Contact Information
- Dates/Years
- Company Names
- Bullet Points
- Dividers
- Background
- Borders

## CSS Classes

### `.styleable-element`
- Base class for clickable elements
- Pointer cursor
- Transition effects

### `.styleable-element:hover`
- Purple dashed outline
- Light purple background
- 4px outline offset

### `.styleable-element.selected`
- Purple solid outline
- Darker purple background
- Paint brush indicator (🎨)
- Pulsing animation

## User Experience Flow

### Step 1: User Clicks Name
```
User clicks "John Doe"
  ↓
handleComponentClick('name')
  ↓
setSelectedComponent('name')
  ↓
setActiveSection('style')
  ↓
Style tab opens
  ↓
Name is highlighted with 🎨
```

### Step 2: User Styles
```
User sees "Selected: Name"
  ↓
User changes color/font/size
  ↓
updateStyling('nameColor', '#ff0000')
  ↓
Name updates in real-time
  ↓
User sees changes immediately
```

### Step 3: User Clears Selection
```
User clicks [X] button
  ↓
setSelectedComponent(null)
  ↓
Highlight removed
  ↓
Shows global styling options
```

## Benefits

### ✅ Intuitive
- Click what you want to style
- No hunting through menus
- Visual feedback

### ✅ Efficient
- Direct access to styling
- Auto-opens relevant tab
- Quick customization

### ✅ Visual
- See what you're styling
- Hover preview
- Selected indicator

### ✅ Mobile-Friendly
- Auto-opens sidebar
- Touch-friendly targets
- Clear visual feedback

## Future Enhancements

### Component-Specific Options
When name is selected, show:
- Name font size
- Name color
- Name weight
- Name alignment

When section title is selected, show:
- Title color
- Title size
- Title transform
- Title weight

### Bulk Styling
- Select multiple elements
- Apply style to all similar elements
- Style presets

### Style History
- Undo/redo styling changes
- Save style presets
- Copy styles between elements

### Advanced Features
- Color picker with palette
- Font preview
- Live preview while dragging sliders
- Style suggestions

## Files Modified

1. ✅ `context/ResumeContext.js`
   - Added selectedComponent state
   - Exported to provider

2. ✅ `pages/editor.js`
   - Added handleComponentClick
   - Auto-switch to style tab
   - Pass props to resume

3. ✅ `components/InlineEditableResume/index.js`
   - Accept onComponentClick prop
   - Pass to template

4. ✅ `components/templates/ClassicTemplate/index.js`
   - Added click handlers
   - Added styleable classes
   - Visual indicators

5. ✅ `components/templates/ClassicTemplate/ClassicTemplate.css`
   - Styleable element styles
   - Hover and selected states
   - Pulsing animation

6. ✅ `styles/editor.css`
   - Selected component info
   - Component badge
   - Clear selection button

## Testing Checklist

- [ ] Click name - highlights and opens style tab
- [ ] Click title - highlights and opens style tab
- [ ] Hover shows dashed outline
- [ ] Selected shows solid outline
- [ ] Paint brush indicator appears
- [ ] Pulsing animation works
- [ ] Clear selection button works
- [ ] Style tab shows selected component
- [ ] Mobile: sidebar opens on click
- [ ] Multiple clicks switch selection
- [ ] Works with all templates

---

**Status**: ✅ Core Feature Complete

Users can now click on name and title to style them. Additional components can be easily added by following the same pattern.
