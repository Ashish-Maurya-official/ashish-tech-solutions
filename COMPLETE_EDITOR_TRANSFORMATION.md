# Complete Document Editor Transformation

## Vision
Transform from "Resume Builder" to "Document Editor" - a true Canva-like experience where users create from scratch.

## Changes Needed

### 1. Remove Predefined Templates ❌
- Remove Classic, Dynamic, Canvas templates
- Create single BlankCanvas component
- Start with empty page

### 2. Simplify Sidebar ✅
**Remove:**
- Personal tab
- Experience tab
- Education tab
- Skills tab
- Links tab
- Manage tab
- Custom tab

**Keep:**
- Elements tab (NEW) - Add text, shapes, images, etc.
- Style tab - Context-aware styling

### 3. Elements Panel (NEW) ✅
**Text Elements:**
- Heading (H1, H2, H3)
- Paragraph
- List (bullet, numbered)
- Quote

**Shapes:**
- Rectangle
- Circle
- Triangle
- Line
- Arrow

**Media:**
- Image upload
- Icon picker

**Layout:**
- Container/Box
- Divider
- Spacer

### 4. Context-Aware Styling ✅
**Page Selected (default):**
- Background color
- Background pattern
- Page size
- Padding
- Border

**Text Selected:**
- Font family
- Font size
- Color
- Weight
- Alignment
- Line height

**Shape Selected:**
- Fill color
- Border color
- Border width
- Border radius
- Shadow

**Image Selected:**
- Size
- Border radius
- Filters
- Shadow

### 5. Element Structure
```json
{
  "elements": [
    {
      "id": "el_123",
      "type": "text",
      "content": "Hello World",
      "position": { "x": 100, "y": 50 },
      "styling": {
        "fontSize": 24,
        "color": "#000",
        "fontFamily": "Arial"
      }
    },
    {
      "id": "el_124",
      "type": "rectangle",
      "position": { "x": 200, "y": 100 },
      "size": { "width": 200, "height": 100 },
      "styling": {
        "fill": "#6366f1",
        "borderRadius": 8
      }
    }
  ]
}
```

### 6. Implementation Plan

**Phase 1: Core Editor**
1. Create BlankCanvas component
2. Create ElementsPanel component
3. Create AddElement functions
4. Update sidebar (remove tabs, add Elements)
5. Context-aware styling

**Phase 2: Elements**
1. Text element
2. Shape elements (rect, circle, etc.)
3. Image element
4. Arrow element
5. Icon element

**Phase 3: Features**
1. Download as PDF
2. Download as PNG
3. Save to database
4. Load saved designs
5. Share designs

**Phase 4: Admin**
1. Admin panel
2. View all user designs
3. Publish as template
4. Template marketplace

## File Structure
```
components/
  Editor/
    BlankCanvas.js          # Empty canvas
    ElementsPanel.js        # Add elements
    Element.js              # Base element
    TextElement.js          # Text
    ShapeElement.js         # Shapes
    ImageElement.js         # Images
    ArrowElement.js         # Arrows
  
pages/
  editor.js                 # Main editor (simplified)
  
context/
  DocumentContext.js        # Renamed from ResumeContext
```

## Next Steps
1. Create BlankCanvas component
2. Create ElementsPanel
3. Update editor.js sidebar
4. Implement add element functions
5. Context-aware styling
6. Download functionality
