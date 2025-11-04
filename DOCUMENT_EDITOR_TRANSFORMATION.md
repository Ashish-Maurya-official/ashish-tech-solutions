# Document Editor Transformation - Action Plan

## Current Issues
1. ❌ Drag and drop doesn't actually reorder sections
2. ❌ Sections render in fixed order, not based on `sectionOrder`
3. ❌ No position controls (relative/absolute/fixed)
4. ❌ Drag works everywhere (should only work in editor)
5. ❌ Still feels like resume builder, not document editor

## Solutions Implemented

### 1. Position Controls ✅
Added to section container styling:
- Position Type: relative, absolute, fixed, sticky
- Top/Left positioning for absolute/fixed
- Z-Index (layering) control
- Visual controls with sliders

### 2. What Still Needs to Be Done

#### A. Fix Section Rendering Order
**Problem**: Sections render in hardcoded order
**Solution**: Create dynamic section renderer

```javascript
// In ClassicTemplate
const renderSectionByName = (sectionName) => {
  switch(sectionName) {
    case 'summary': return <SummarySection />;
    case 'experience': return <ExperienceSection />;
    // ... etc
  }
};

// Render in order
{sectionOrder.map(sectionName => renderSectionByName(sectionName))}
```

#### B. Make Drag & Drop Actually Work
**Problem**: Reorder function called but sections don't move
**Solution**: 
1. Extract each section into separate component
2. Map over `sectionOrder` array
3. When dropped, update `sectionOrder` in state
4. Sections re-render in new order

#### C. Only Enable in Editor
**Problem**: Drag works in preview/export
**Solution**:
```javascript
// Pass isEditing prop
<ClassicTemplate 
  data={data}
  isEditing={true}  // Only true in editor
  enableDragDrop={dragMode}
/>

// In template
{isEditing && <DragHandle />}
```

#### D. Document Editor Mindset
**Changes Needed**:
1. Rename "Resume" to "Document" throughout
2. Add more generic sections (not just resume-specific)
3. Allow custom element types (text blocks, images, shapes)
4. Free-form canvas mode
5. Grid/guides for alignment

## Recommended Architecture

### 1. Document Structure
```json
{
  "document": {
    "id": "doc_123",
    "name": "My Document",
    "type": "resume", // or "letter", "report", etc.
    "sections": [
      {
        "id": "section_1",
        "type": "text",
        "content": "...",
        "position": {
          "type": "relative",
          "top": 0,
          "left": 0,
          "zIndex": 1
        },
        "styling": {...}
      }
    ],
    "sectionOrder": ["section_1", "section_2", ...]
  }
}
```

### 2. Component Structure
```
components/
  DocumentEditor/
    index.js              # Main editor
    Canvas.js             # Document canvas
    Section.js            # Draggable section
    Toolbar.js            # Editor toolbar
    Inspector.js          # Properties panel
  Elements/
    TextBlock.js
    ImageBlock.js
    ShapeBlock.js
    TableBlock.js
```

### 3. Canva-Like Features

**Essential:**
- ✅ Drag to reorder
- ✅ Click to select
- ✅ Properties panel
- ✅ Visual feedback
- ⚠️ Free positioning (partial)
- ❌ Resize handles
- ❌ Rotation
- ❌ Grouping
- ❌ Layers panel

**Nice to Have:**
- ❌ Snap to grid
- ❌ Alignment guides
- ❌ Duplicate (Ctrl+D)
- ❌ Undo/Redo (Ctrl+Z)
- ❌ Copy/Paste
- ❌ Keyboard shortcuts
- ❌ Multi-select
- ❌ Lock elements

## Quick Fixes for Immediate Improvement

### 1. Fix Drag & Drop (Priority 1)
```javascript
// In ClassicTemplate, replace static sections with:
<div className="resume-body">
  {sectionOrder.map((sectionName, index) => (
    <div key={sectionName} data-section={sectionName}>
      {renderSectionContent(sectionName)}
    </div>
  ))}
</div>
```

### 2. Add Resize Handles (Priority 2)
```javascript
<div className="section-wrapper">
  <div className="resize-handle top-left" />
  <div className="resize-handle top-right" />
  <div className="resize-handle bottom-left" />
  <div className="resize-handle bottom-right" />
  {children}
</div>
```

### 3. Add Layers Panel (Priority 3)
```javascript
<div className="layers-panel">
  {sections.map(section => (
    <div className="layer-item">
      <span>{section.name}</span>
      <button onClick={() => toggleVisibility(section.id)}>👁</button>
      <button onClick={() => lockSection(section.id)}>🔒</button>
    </div>
  ))}
</div>
```

## Implementation Steps

### Phase 1: Fix Core Functionality (Now)
1. ✅ Add position controls
2. ⚠️ Fix section ordering (in progress)
3. ⚠️ Make drag & drop work properly
4. ⚠️ Only enable in editor mode

### Phase 2: Document Editor Features (Next)
1. Rename throughout codebase
2. Add generic sections
3. Free-form canvas
4. Resize handles
5. Layers panel

### Phase 3: Advanced Features (Future)
1. Snap to grid
2. Alignment guides
3. Keyboard shortcuts
4. Multi-select
5. Grouping
6. Templates library

## Code Changes Needed

### 1. Update ResumeContext to DocumentContext
```javascript
// Rename file and exports
export const DocumentContext = createContext();
export function useDocument() {
  return useContext(DocumentContext);
}
```

### 2. Update Template to Use Section Order
```javascript
// Current (wrong):
<div>
  {isSectionVisible('summary') && <SummarySection />}
  {isSectionVisible('experience') && <ExperienceSection />}
</div>

// Correct:
<div>
  {sectionOrder.map(name => renderSection(name))}
</div>
```

### 3. Add isEditing Prop Throughout
```javascript
// In editor.js
<InlineEditableResume
  isEditing={true}
  enableDragDrop={dragMode}
  ...
/>

// In preview/export
<ResumePreview
  isEditing={false}
  ...
/>
```

## Testing Checklist

- [ ] Drag section → Order changes
- [ ] Drop section → Stays in new position
- [ ] Refresh page → Order persists
- [ ] Export PDF → Drag disabled
- [ ] Position: absolute → Element moves freely
- [ ] Z-index → Layering works
- [ ] Mobile → Touch drag works
- [ ] Undo → Reverts changes

## Summary

**Completed:**
- ✅ Position controls (relative/absolute/fixed/sticky)
- ✅ Top/Left positioning
- ✅ Z-Index control
- ✅ Long press drag activation
- ✅ Visual feedback

**In Progress:**
- ⚠️ Section ordering (reorder function exists but not used)
- ⚠️ Drag & drop (handlers exist but sections don't reorder)

**Still Needed:**
- ❌ Dynamic section rendering based on order
- ❌ isEditing prop to disable in preview
- ❌ Resize handles
- ❌ Layers panel
- ❌ Document editor branding

The foundation is there, but sections need to be refactored to render dynamically based on `sectionOrder` array for drag & drop to actually work.
