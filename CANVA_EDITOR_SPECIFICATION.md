# 🎨 Full Canva-Style Editor Specification

## Overview
Transform the current document editor into a complete Canva-inspired design tool with professional layout, interactions, and features.

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     TOP TOOLBAR (60px)                       │
│  Logo | File | Undo/Redo | Zoom | Title | Share | Profile  │
├──────────┬──────────────────────────────────────┬───────────┤
│          │                                      │           │
│   LEFT   │                                      │   RIGHT   │
│ SIDEBAR  │          MAIN CANVAS                 │  SIDEBAR  │
│ (260px)  │        (Design Area)                 │  (300px)  │
│          │                                      │           │
│ Elements │      [Workspace with rulers]         │Properties │
│ Templates│                                      │ Panel     │
│ Photos   │                                      │           │
│ Text     │                                      │           │
│ Upload   │                                      │           │
│          │                                      │           │
├──────────┴──────────────────────────────────────┴───────────┤
│              BOTTOM BAR (Optional - 40px)                    │
│         Pages | Zoom % | Fit to Screen                       │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Implementation Phases

### Phase 1: Layout Restructure ✅ (Current Priority)
- [ ] Create new top toolbar component
- [ ] Restructure left sidebar with tabs
- [ ] Keep canvas in center
- [ ] Create collapsible right properties panel
- [ ] Add bottom bar for pagination

### Phase 2: Top Toolbar Features
- [ ] Logo and branding
- [ ] File menu (New, Open, Save, Export)
- [ ] Undo/Redo with history
- [ ] Zoom controls
- [ ] Editable project title
- [ ] Share button
- [ ] User profile dropdown

### Phase 3: Left Sidebar Enhancement
- [ ] Tab navigation (Templates, Elements, Text, Photos, Uploads)
- [ ] Templates grid with previews
- [ ] Enhanced elements library
- [ ] Text presets
- [ ] Photo search integration
- [ ] Upload manager

### Phase 4: Canvas Improvements
- [ ] Rulers and grid
- [ ] Snap to grid/guides
- [ ] Multi-select with bounding box
- [ ] Context menu (right-click)
- [ ] Keyboard shortcuts
- [ ] Layer management
- [ ] Group/ungroup

### Phase 5: Right Properties Panel
- [ ] Context-sensitive properties
- [ ] Expandable sections
- [ ] Advanced text controls
- [ ] Image filters
- [ ] Shape properties
- [ ] Layer controls

### Phase 6: Advanced Features
- [ ] Multi-page support
- [ ] Auto-save functionality
- [ ] Export options (PNG, JPG, PDF)
- [ ] Clipboard operations
- [ ] Lock/unlock elements
- [ ] Animation panel (future)

## 🎨 Design System

### Colors
```css
--bg-primary: #F9FAFB;
--bg-panel: #FFFFFF;
--accent: #1A73E8;
--border: #E5E7EB;
--text-primary: #111827;
--text-secondary: #6B7280;
--shadow: rgba(0,0,0,0.1);
```

### Typography
- Font Family: 'Inter', 'Roboto', 'Poppins'
- Sizes: 12px, 14px, 16px, 18px, 24px

### Spacing
- Base unit: 4px
- Common: 8px, 12px, 16px, 20px, 24px

### Borders
- Radius: 8px, 12px
- Width: 1px, 2px

### Transitions
- Duration: 150ms, 200ms
- Easing: ease-in-out

## 🔧 Technical Stack

### Current
- Next.js
- React
- Context API for state

### Recommended Additions
- **Canvas Library**: Fabric.js or Konva.js
- **State Management**: Zustand (lightweight)
- **Export**: html2canvas + jsPDF
- **Icons**: Lucide React or Heroicons
- **Drag & Drop**: react-dnd or native HTML5

## 📋 Feature Checklist

### Core Features
- [x] Basic element creation
- [x] Drag and drop positioning
- [x] Element styling
- [x] Page background
- [ ] Multi-select
- [ ] Group/ungroup
- [ ] Layers panel
- [ ] Undo/redo
- [ ] Copy/paste
- [ ] Keyboard shortcuts

### File Operations
- [ ] New project
- [ ] Save as JSON
- [ ] Load from JSON
- [ ] Auto-save
- [ ] Export PNG
- [ ] Export JPG
- [ ] Export PDF
- [ ] Multi-page PDF

### UI/UX
- [x] Canva-style properties panel
- [ ] Top toolbar
- [ ] Tabbed left sidebar
- [ ] Collapsible panels
- [ ] Context menus
- [ ] Tooltips
- [ ] Loading states
- [ ] Error handling

### Advanced
- [ ] Rulers and guides
- [ ] Snap to grid
- [ ] Alignment tools
- [ ] Text formatting toolbar
- [ ] Image filters
- [ ] Shape library
- [ ] Icon library
- [ ] Stock photos integration

## 🚀 Next Steps

### Immediate (This Session)
1. Create new top toolbar component
2. Restructure layout with proper sections
3. Add tab navigation to left sidebar
4. Implement collapsible panels

### Short Term (Next Session)
1. Add undo/redo functionality
2. Implement multi-select
3. Add keyboard shortcuts
4. Create layers panel

### Medium Term
1. File operations (save/load)
2. Export functionality
3. Stock photos integration
4. Advanced text controls

### Long Term
1. Real-time collaboration
2. Animation support
3. AI features
4. Mobile responsive

## 📝 Notes

This is a comprehensive upgrade that will transform the editor into a professional design tool. We'll implement it incrementally to ensure stability and usability at each step.

The current editor already has:
- ✅ Element creation and positioning
- ✅ Canva-style properties panel
- ✅ Basic styling controls
- ✅ Template system

We need to add:
- Top toolbar with file operations
- Tabbed left sidebar
- Undo/redo system
- Multi-select and grouping
- Export functionality
- Keyboard shortcuts
