# Document Editor Implementation Guide

## ✅ Created Components

### 1. BlankCanvas.js
- Empty canvas to start
- Renders all elements
- Handles element selection
- Shows empty state
- A4 page size default

### 2. ElementsPanel.js
- Add text elements
- Add shapes
- Add media
- Grid layout
- Click to add

## 🔧 Next Steps to Complete

### 1. Update Editor Sidebar (pages/editor.js)

**Remove these tabs:**
```javascript
// DELETE:
{ id: 'personal', icon: '👤', label: 'Personal' },
{ id: 'experience', icon: '💼', label: 'Experience' },
{ id: 'education', icon: '🎓', label: 'Education' },
{ id: 'skills', icon: '⚡', label: 'Skills' },
{ id: 'links', icon: '🔗', label: 'Links' },
{ id: 'manage', icon: '⚙️', label: 'Manage' },
{ id: 'custom', icon: '➕', label: 'Add Sections' }
```

**Keep only:**
```javascript
{ id: 'elements', icon: '➕', label: 'Elements' },
{ id: 'style', icon: '🎨', label: 'Style' }
```

### 2. Update Context (context/ResumeContext.js → DocumentContext.js)

**Add functions:**
```javascript
// Add element to canvas
const addElement = (elementType, elementData) => {
  const newElement = {
    id: `el_${Date.now()}`,
    type: elementType,
    position: { x: 100, y: 100 },
    ...elementData
  };
  
  setDocumentData(prev => ({
    ...prev,
    elements: [...prev.elements, newElement]
  }));
};

// Update element
const updateElement = (elementId, updates) => {
  setDocumentData(prev => ({
    ...prev,
    elements: prev.elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    )
  }));
};

// Delete element
const deleteElement = (elementId) => {
  setDocumentData(prev => ({
    ...prev,
    elements: prev.elements.filter(el => el.id !== elementId)
  }));
};
```

### 3. Update Editor Layout

**Replace template rendering with:**
```javascript
<BlankCanvas
  elements={documentData.elements}
  pageStyle={documentData.pageStyle}
  onElementSelect={setSelectedElement}
  onElementUpdate={updateElement}
  selectedElementId={selectedElement}
  isEditing={true}
/>
```

### 4. Context-Aware Styling

**When page selected (default):**
```javascript
if (!selectedElement) {
  return (
    <>
      <h4>Page Style</h4>
      <ColorPicker label="Background" />
      <Select label="Page Size" options={['A4', 'Letter', 'Custom']} />
      <RangeSlider label="Padding" />
    </>
  );
}
```

**When text selected:**
```javascript
if (selectedElement.type === 'text' || selectedElement.type === 'heading') {
  return (
    <>
      <h4>Text Style</h4>
      <Select label="Font" />
      <RangeSlider label="Size" />
      <ColorPicker label="Color" />
      <Select label="Alignment" />
    </>
  );
}
```

**When shape selected:**
```javascript
if (selectedElement.type === 'rectangle' || selectedElement.type === 'circle') {
  return (
    <>
      <h4>Shape Style</h4>
      <ColorPicker label="Fill" />
      <ColorPicker label="Border" />
      <RangeSlider label="Border Width" />
      <RangeSlider label="Border Radius" />
    </>
  );
}
```

### 5. Download Functionality

**Add to editor:**
```javascript
const handleDownloadPDF = async () => {
  const canvas = await html2canvas(canvasRef.current);
  const pdf = new jsPDF();
  pdf.addImage(canvas.toDataURL(), 'PNG', 0, 0);
  pdf.save('document.pdf');
};

const handleDownloadPNG = async () => {
  const canvas = await html2canvas(canvasRef.current);
  const link = document.createElement('a');
  link.download = 'document.png';
  link.href = canvas.toDataURL();
  link.click();
};
```

### 6. Save to Database (Future)

**API endpoint:**
```javascript
// POST /api/documents
{
  "name": "My Design",
  "elements": [...],
  "pageStyle": {...},
  "userId": "user_123"
}

// GET /api/documents/:id
// PUT /api/documents/:id
// DELETE /api/documents/:id
```

**Admin features:**
```javascript
// POST /api/admin/templates
// Publish user design as template
{
  "documentId": "doc_123",
  "name": "Modern Resume",
  "category": "Resume",
  "isPublic": true
}
```

## 📝 Data Structure

### Document Data
```json
{
  "id": "doc_123",
  "name": "My Document",
  "elements": [
    {
      "id": "el_1",
      "type": "heading",
      "level": "h1",
      "content": "John Doe",
      "position": { "x": 200, "y": 50 },
      "styling": {
        "fontSize": 32,
        "color": "#000",
        "fontFamily": "Arial",
        "fontWeight": 700
      }
    },
    {
      "id": "el_2",
      "type": "rectangle",
      "position": { "x": 100, "y": 150 },
      "size": { "width": 400, "height": 2 },
      "styling": {
        "fill": "#6366f1"
      }
    },
    {
      "id": "el_3",
      "type": "text",
      "content": "Software Engineer",
      "position": { "x": 200, "y": 100 },
      "styling": {
        "fontSize": 18,
        "color": "#6b7280"
      }
    }
  ],
  "pageStyle": {
    "width": "210mm",
    "height": "297mm",
    "backgroundColor": "#ffffff",
    "padding": "40px"
  }
}
```

## 🎨 Element Types

### Text Elements
- heading (h1, h2, h3)
- text (paragraph)
- list (bullet, numbered)

### Shapes
- rectangle
- circle
- triangle
- line
- arrow

### Media
- image
- icon

### Layout
- container
- divider
- spacer

## 🚀 Quick Implementation

### Step 1: Update Sidebar
```javascript
// In pages/editor.js, replace nav-tabs array
const tabs = [
  { id: 'elements', icon: '➕', label: 'Elements' },
  { id: 'style', icon: '🎨', label: 'Style' }
];
```

### Step 2: Add Elements Tab Content
```javascript
{activeSection === 'elements' && (
  <ElementsPanel onAddElement={handleAddElement} />
)}
```

### Step 3: Replace Canvas
```javascript
<BlankCanvas
  elements={documentData.elements || []}
  pageStyle={documentData.pageStyle || {}}
  onElementSelect={setSelectedElement}
  onElementUpdate={updateElement}
  selectedElementId={selectedElement}
/>
```

### Step 4: Context-Aware Styling
```javascript
{activeSection === 'style' && (
  <ContextAwareStylePanel
    selectedElement={selectedElement}
    pageStyle={documentData.pageStyle}
    onUpdate={updateElement}
  />
)}
```

## ✨ Result

Users will have:
- ✅ Blank canvas to start
- ✅ Elements panel to add content
- ✅ Drag elements anywhere
- ✅ Context-aware styling
- ✅ Download as PDF/PNG
- ✅ Save designs
- ✅ True document editor experience

No more predefined templates - pure creative freedom!
