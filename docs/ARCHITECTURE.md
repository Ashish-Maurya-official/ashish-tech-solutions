# Project Architecture - BetterCV Resume Builder

## Overview
This document describes the restructured architecture with separate template files, A4 sizing, and improved organization.

## Project Structure

```
futuristic-resume-builder/
├── components/
│   └── ResumePreview.js          # Main preview component with A4 sizing
├── context/
│   └── ResumeContext.js          # Global state management
├── pages/
│   ├── _app.js                   # App wrapper with providers
│   ├── index.js                  # Landing page
│   ├── select.js                 # Template selection page
│   ├── editor.js                 # Resume editor page
│   └── 404.js                    # Custom 404 page
├── styles/
│   ├── globals.css               # Global styles and layout
│   └── templates.css             # Template-specific styles with A4 sizing
├── templates/
│   ├── index.js                  # Template registry and exports
│   ├── ModernTemplate.js         # Modern template component
│   ├── ClassicTemplate.js        # Classic template component
│   ├── CreativeTemplate.js       # Creative sidebar template
│   ├── MinimalTemplate.js        # Minimal template component
│   ├── ExecutiveTemplate.js      # Executive template component
│   └── TechTemplate.js           # Tech/Developer template component
└── package.json                  # Dependencies
```

## Architecture Principles

### 1. Separation of Concerns
- **Templates**: Each template is a separate component
- **Styles**: Template styles are isolated in templates.css
- **State**: Centralized in ResumeContext
- **Components**: Reusable components in components/

### 2. A4 Page Sizing
- Standard A4 dimensions: 210mm × 297mm
- Proper scaling for screen display
- Print-optimized styles
- Responsive scaling for mobile

### 3. Template System
- Registry-based template management
- Easy to add new templates
- Metadata for each template
- Consistent data structure

## Key Components

### ResumePreview Component
**Location**: `components/ResumePreview.js`

**Purpose**: Renders any template with proper A4 sizing

**Props**:
- `templateId` (string): Template identifier
- `data` (object): Resume data
- `scale` (number): Display scale (default: 1)
- `forPrint` (boolean): Print mode flag

**Usage**:
```jsx
<ResumePreview 
  templateId="modern" 
  data={resumeData}
  scale={1}
/>
```

### Template Components

Each template is a React component that receives resume data:

**Props**:
- `data` (object): Resume data with structure:
  ```javascript
  {
    name: string,
    title: string,
    email: string,
    phone: string,
    location: string,
    summary: string,
    experience: Array<{
      role: string,
      company: string,
      years: string,
      description: string
    }>,
    education: Array<{
      degree: string,
      school: string,
      years: string
    }>,
    skills: Array<string>
  }
  ```

**Example Template**:
```jsx
export default function ModernTemplate({ data }) {
  return (
    <div className="resume-template modern-template">
      <div className="resume-header modern-header">
        <h1>{data.name || 'Your Name'}</h1>
        <h2>{data.title || 'Your Title'}</h2>
        {/* ... */}
      </div>
      {/* ... */}
    </div>
  );
}
```

### Template Registry
**Location**: `templates/index.js`

**Purpose**: Central registry for all templates

**Structure**:
```javascript
export const templates = {
  modern: {
    id: 'modern',
    name: 'Modern',
    component: ModernTemplate,
    category: 'Professional',
    color: '#3B82F6',
    description: 'Clean and contemporary design'
  },
  // ... more templates
};
```

**Functions**:
- `getTemplate(id)`: Get template by ID
- `getTemplateIds()`: Get all template IDs
- `getTemplateMetadata(id)`: Get template metadata

## Styling System

### A4 Page Sizing
```css
.a4-page {
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
```

### Template-Specific Styles
Each template has its own CSS class:
- `.modern-template`
- `.classic-template`
- `.creative-template`
- `.minimal-template`
- `.executive-template`
- `.tech-template`

### Responsive Scaling
```css
@media screen and (max-width: 1024px) {
  .a4-page {
    width: 100%;
    min-height: auto;
  }
}
```

### Print Styles
```css
@media print {
  .a4-page {
    width: 210mm;
    height: 297mm;
    box-shadow: none;
    page-break-after: always;
  }
}
```

## Editor Page Layout

### Three-Column Layout
```
┌─────────────┬──────────────────┬─────────────┐
│   Editor    │   Live Preview   │  Templates  │
│   Panel     │   (A4 Size)      │   Switcher  │
│  (320px)    │   (Flexible)     │   (280px)   │
└─────────────┴──────────────────┴─────────────┘
```

### Responsive Breakpoints
- **Desktop (1400px+)**: Full three-column layout
- **Laptop (1024px-1399px)**: Editor + Preview (templates hidden)
- **Tablet (768px-1023px)**: Stacked layout
- **Mobile (<768px)**: Toggle between edit/preview

## PDF Export System

### Process
1. User clicks "Export PDF"
2. html2canvas captures the A4 page
3. jsPDF creates PDF from canvas
4. File downloads with custom name

### Implementation
```javascript
const handleExportPDF = async () => {
  const canvas = await html2canvas(resumeRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: 1200
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${data.name}_Resume.pdf`);
};
```

### Quality Settings
- **Scale**: 2x for high resolution
- **Format**: PNG for quality
- **Size**: A4 (210mm × 297mm)
- **DPI**: 96 (standard screen DPI)

## State Management

### ResumeContext
**Location**: `context/ResumeContext.js`

**State**:
- `resumeData`: Current resume data
- `selectedDesign`: Active template ID

**Methods**:
- `updateField(path, value)`: Update any field
- `addSection(section, item)`: Add experience/education/skill
- `removeSection(section, index)`: Remove item
- `setSelectedDesign(id)`: Change template

**Usage**:
```javascript
const { resumeData, selectedDesign, updateField } = useResume();

updateField('name', 'John Doe');
updateField('experience.0.role', 'Senior Developer');
```

## Adding New Templates

### Step 1: Create Template Component
```javascript
// templates/NewTemplate.js
export default function NewTemplate({ data }) {
  return (
    <div className="resume-template new-template">
      {/* Your template JSX */}
    </div>
  );
}
```

### Step 2: Add Styles
```css
/* styles/templates.css */
.new-template {
  /* Your template styles */
}
```

### Step 3: Register Template
```javascript
// templates/index.js
import NewTemplate from './NewTemplate';

export const templates = {
  // ... existing templates
  new: {
    id: 'new',
    name: 'New Template',
    component: NewTemplate,
    category: 'Category',
    color: '#COLOR',
    description: 'Description'
  }
};
```

### Step 4: Test
- Template appears in selection page
- Template appears in editor switcher
- PDF export works correctly
- Print preview looks good

## Performance Optimizations

### 1. Component Memoization
```javascript
const MiniPreview = React.memo(({ templateId, data }) => {
  // Component code
});
```

### 2. Lazy Loading
```javascript
const TemplateComponent = lazy(() => 
  import(`./templates/${templateId}Template`)
);
```

### 3. Efficient Re-renders
- Context split for data and design
- Debounced input updates
- Optimized canvas rendering

## Testing Checklist

### Template Testing
- [ ] Renders with sample data
- [ ] Renders with empty fields
- [ ] Handles long text properly
- [ ] Fits within A4 page
- [ ] Looks good in print preview
- [ ] PDF export works
- [ ] Responsive on mobile

### Integration Testing
- [ ] Template switching preserves data
- [ ] All form fields update preview
- [ ] Add/remove sections work
- [ ] PDF export includes all data
- [ ] Mobile edit/preview toggle works

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Known Issues
- IE11: Not supported (uses modern CSS)
- Safari < 14: Some gradient issues
- Mobile Safari: Occasional scaling issues

## Deployment Considerations

### Build Optimization
```bash
npm run build
```

### Environment Variables
None required for basic functionality

### Static Export (Optional)
```javascript
// next.config.js
module.exports = {
  output: 'export'
};
```

## Future Enhancements

### Planned Features
1. **More Templates**: Add 6+ more designs
2. **Custom Colors**: Let users customize template colors
3. **Font Selection**: Choose from multiple fonts
4. **Multi-page Support**: Handle resumes longer than 1 page
5. **Template Preview**: Full-size preview before selection
6. **Template Categories**: Filter templates by industry

### Technical Improvements
1. **TypeScript**: Add type safety
2. **Testing**: Unit and integration tests
3. **Accessibility**: WCAG 2.1 AAA compliance
4. **Performance**: Further optimizations
5. **PWA**: Offline support

## Troubleshooting

### Common Issues

**Issue**: Template not rendering
- **Solution**: Check template is registered in `templates/index.js`

**Issue**: PDF export cuts off content
- **Solution**: Ensure content fits within A4 dimensions

**Issue**: Styles not applying
- **Solution**: Check CSS class names match template ID

**Issue**: Mobile layout broken
- **Solution**: Test responsive breakpoints in templates.css

## Support

For issues or questions:
1. Check this documentation
2. Review template examples
3. Check browser console for errors
4. Open GitHub issue with details

---

**Last Updated**: October 28, 2024  
**Version**: 2.0.0  
**Architecture**: Modular Template System with A4 Sizing
