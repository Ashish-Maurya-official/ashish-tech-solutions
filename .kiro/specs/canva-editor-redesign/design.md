# Design Document - Canva-Style Editor Redesign

## Overview

This document outlines the technical design for transforming the current document editor into a professional Canva-style design tool. The redesign focuses on creating a modern, intuitive interface with advanced features while maintaining performance and code maintainability.

## Architecture

### High-Level Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    TopToolbar Component                      │
│  (File, Undo/Redo, Zoom, Title, Share, Profile)            │
├──────────┬──────────────────────────────────────┬───────────┤
│          │                                      │           │
│  Left    │                                      │  Right    │
│ Sidebar  │        Canvas Component              │ Sidebar   │
│          │                                      │           │
│ Tabbed   │   - Rulers                          │Properties │
│ Content  │   - Grid                            │  Panel    │
│          │   - Elements                        │           │
│          │   - Selection                       │Context    │
│          │   - Transform                       │Sensitive  │
│          │                                      │           │
├──────────┴──────────────────────────────────────┴───────────┤
│                    BottomBar Component                       │
│              (Pages, Zoom %, Fit to Screen)                  │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
EditorPage
├── TopToolbar
│   ├── Logo
│   ├── FileMenu
│   ├── UndoRedoButtons
│   ├── ZoomControls
│   ├── ProjectTitle
│   └── UserProfile
├── EditorLayout
│   ├── LeftSidebar
│   │   ├── TabNavigation
│   │   ├── TemplatesPanel
│   │   ├── ElementsPanel
│   │   ├── TextPanel
│   │   ├── PhotosPanel
│   │   ├── BackgroundPanel
│   │   └── UploadsPanel
│   ├── CanvasArea
│   │   ├── Rulers
│   │   ├── Grid
│   │   ├── Canvas
│   │   │   ├── Page
│   │   │   └── Elements[]
│   │   ├── SelectionBox
│   │   ├── TransformHandles
│   │   └── ContextMenu
│   └── RightSidebar
│       ├── PropertiesPanel
│       │   ├── PageProperties
│       │   ├── TextProperties
│       │   ├── ImageProperties
│       │   └── ShapeProperties
│       └── LayersPanel
└── BottomBar
    ├── PageThumbnails
    ├── AddPageButton
    └── ZoomIndicator
```

## Data Models

### Project Structure

```typescript
interface Project {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  pages: Page[];
  settings: ProjectSettings;
}

interface ProjectSettings {
  defaultPageSize: PageSize;
  gridEnabled: boolean;
  gridSize: number;
  snapToGrid: boolean;
  snapToElements: boolean;
  backgroundColor: string;
}

interface Page {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  elements: Element[];
}

interface Element {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  zIndex: number;
  groupId?: string;
  properties: ElementProperties;
}

type ElementType = 'text' | 'image' | 'shape' | 'icon' | 'line';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface TextElement extends Element {
  type: 'text';
  properties: {
    content: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    fontStyle: 'normal' | 'italic';
    textAlign: 'left' | 'center' | 'right' | 'justify';
    color: string;
    lineHeight: number;
    letterSpacing: number;
    textDecoration: 'none' | 'underline' | 'line-through';
  };
}

interface ImageElement extends Element {
  type: 'image';
  properties: {
    src: string;
    alt: string;
    crop: CropData;
    filters: ImageFilters;
    borderRadius: number;
  };
}

interface ShapeElement extends Element {
  type: 'shape';
  properties: {
    shapeType: 'rectangle' | 'circle' | 'triangle' | 'star' | 'polygon';
    fill: string;
    stroke: string;
    strokeWidth: number;
    borderRadius?: number;
  };
}
```

### State Management

```typescript
interface EditorState {
  // Project data
  project: Project;
  currentPageId: string;
  
  // Selection
  selectedElementIds: string[];
  hoveredElementId: string | null;
  
  // History
  history: HistoryState[];
  historyIndex: number;
  
  // UI State
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  activeLeftTab: LeftTab;
  zoomLevel: number;
  gridVisible: boolean;
  rulersVisible: boolean;
  
  // Clipboard
  clipboard: Element[];
  
  // Drag state
  isDragging: boolean;
  dragStartPosition: Position | null;
}

interface HistoryState {
  action: string;
  timestamp: number;
  before: any;
  after: any;
}
```

## Components and Interfaces

### 1. TopToolbar Component

**Purpose**: Provide global controls and navigation

**Props**:
```typescript
interface TopToolbarProps {
  projectTitle: string;
  onTitleChange: (title: string) => void;
  onNew: () => void;
  onSave: () => void;
  onExport: (format: 'png' | 'jpg' | 'pdf') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}
```

**Key Features**:
- Fixed positioning at top
- Responsive layout
- Dropdown menus
- Keyboard shortcut hints in tooltips

### 2. LeftSidebar Component

**Purpose**: Provide access to templates, elements, and assets

**Props**:
```typescript
interface LeftSidebarProps {
  activeTab: LeftTab;
  onTabChange: (tab: LeftTab) => void;
  isOpen: boolean;
  onToggle: () => void;
  onAddElement: (element: Partial<Element>) => void;
  onAddTemplate: (template: Template) => void;
}
```

**Tabs**:
- Templates: Grid of pre-designed layouts
- Elements: Categorized shapes, icons, lines
- Text: Pre-styled text options
- Photos: Stock photo search
- Background: Colors, gradients, patterns
- Uploads: User-uploaded files

### 3. Canvas Component

**Purpose**: Main design workspace with element rendering and interaction

**Props**:
```typescript
interface CanvasProps {
  page: Page;
  elements: Element[];
  selectedIds: string[];
  zoomLevel: number;
  gridVisible: boolean;
  rulersVisible: boolean;
  onElementSelect: (id: string, multi: boolean) => void;
  onElementMove: (id: string, position: Position) => void;
  onElementResize: (id: string, size: Size) => void;
  onElementRotate: (id: string, rotation: number) => void;
}
```

**Key Features**:
- Viewport culling for performance
- Transform handles for selected elements
- Multi-select with bounding box
- Snap-to-grid and snap-to-elements
- Context menu on right-click
- Keyboard navigation

### 4. RightSidebar Component

**Purpose**: Context-sensitive properties panel

**Props**:
```typescript
interface RightSidebarProps {
  selectedElements: Element[];
  isOpen: boolean;
  onToggle: () => void;
  onPropertyChange: (elementId: string, property: string, value: any) => void;
}
```

**Panels**:
- Page Properties (when nothing selected)
- Text Properties (for text elements)
- Image Properties (for images)
- Shape Properties (for shapes)
- Layers Panel (always visible)

### 5. LayersPanel Component

**Purpose**: Show and manage element hierarchy

**Props**:
```typescript
interface LayersPanelProps {
  elements: Element[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onToggleLock: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onRename: (id: string, name: string) => void;
}
```

## Error Handling

### Strategy

1. **Validation**: Validate all user inputs before applying changes
2. **Try-Catch**: Wrap critical operations in try-catch blocks
3. **Error Boundaries**: Use React Error Boundaries for component errors
4. **User Feedback**: Show toast notifications for errors
5. **Logging**: Log errors to console in development, send to analytics in production

### Error Types

```typescript
enum ErrorType {
  VALIDATION_ERROR = 'validation_error',
  SAVE_ERROR = 'save_error',
  LOAD_ERROR = 'load_error',
  EXPORT_ERROR = 'export_error',
  NETWORK_ERROR = 'network_error',
  UNKNOWN_ERROR = 'unknown_error',
}

interface EditorError {
  type: ErrorType;
  message: string;
  details?: any;
  timestamp: Date;
}
```

## Testing Strategy

### Unit Tests
- Test individual components in isolation
- Test utility functions (coordinate calculations, transformations)
- Test state management logic
- Test data serialization/deserialization

### Integration Tests
- Test component interactions
- Test undo/redo system
- Test save/load functionality
- Test export functionality

### E2E Tests
- Test complete user workflows
- Test keyboard shortcuts
- Test drag and drop
- Test multi-select and grouping

### Performance Tests
- Test with 100+ elements
- Test zoom and pan performance
- Test export time for large designs
- Test memory usage

## Performance Considerations

### Optimization Strategies

1. **Virtual Rendering**: Only render elements in viewport
2. **Memoization**: Use React.memo for expensive components
3. **Debouncing**: Debounce auto-save and property updates
4. **Lazy Loading**: Lazy load images and thumbnails
5. **Web Workers**: Use workers for export operations
6. **Canvas Optimization**: Use layered canvases for static/dynamic content

### Performance Metrics

- Initial load: < 2 seconds
- Element add/move: < 16ms (60fps)
- Zoom/pan: < 16ms (60fps)
- Export (single page): < 5 seconds
- Auto-save: < 500ms

## Security Considerations

1. **Input Sanitization**: Sanitize all user inputs to prevent XSS
2. **File Upload Validation**: Validate file types and sizes
3. **API Security**: Use API keys securely (environment variables)
4. **Data Privacy**: Don't store sensitive user data
5. **CORS**: Configure CORS properly for API requests

## Accessibility

1. **Keyboard Navigation**: Full keyboard support for all features
2. **Screen Readers**: Proper ARIA labels and roles
3. **Focus Management**: Clear focus indicators
4. **Color Contrast**: WCAG AA compliance
5. **Alt Text**: Require alt text for images

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

### Core
- React 18+
- Next.js 13+
- TypeScript 5+

### Canvas Rendering
- Fabric.js or Konva.js (TBD based on requirements)

### State Management
- Zustand (lightweight, simple API)

### UI Components
- Radix UI (accessible primitives)
- Lucide React (icons)

### Export
- html2canvas
- jsPDF

### Utilities
- lodash (debounce, throttle)
- date-fns (date formatting)
- nanoid (ID generation)

## Migration Strategy

### Phase 1: Layout Restructure
1. Create new layout components
2. Integrate TopToolbar
3. Add tabbed LeftSidebar
4. Keep existing canvas temporarily
5. Add RightSidebar with properties

### Phase 2: Canvas Enhancement
1. Implement multi-select
2. Add transform handles
3. Add context menu
4. Implement snap-to-grid
5. Add rulers

### Phase 3: State Management
1. Implement undo/redo system
2. Add history tracking
3. Implement clipboard operations
4. Add keyboard shortcuts

### Phase 4: File Operations
1. Implement save to JSON
2. Implement load from JSON
3. Add auto-save
4. Implement export (PNG, JPG, PDF)

### Phase 5: Advanced Features
1. Add layers panel
2. Implement grouping
3. Add alignment tools
4. Add stock photos integration
5. Polish and optimize

## Rollout Plan

1. **Alpha**: Internal testing with core features
2. **Beta**: Limited user testing with feedback collection
3. **Release**: Full rollout with documentation and tutorials
4. **Post-Release**: Monitor performance, fix bugs, add enhancements

## Success Metrics

- User engagement: Time spent in editor
- Feature adoption: Usage of new features
- Performance: Load time, interaction latency
- Error rate: Crashes, failed exports
- User satisfaction: Feedback scores, NPS
