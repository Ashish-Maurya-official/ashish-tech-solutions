# Quick Reference Card

## 🚀 Getting Started

```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
```

Visit: `http://localhost:3000`

## 📁 Project Structure

```
├── templates/              # Resume template components
│   ├── index.js           # Template registry
│   ├── ModernTemplate.js
│   ├── ClassicTemplate.js
│   ├── CreativeTemplate.js
│   ├── MinimalTemplate.js
│   ├── ExecutiveTemplate.js
│   └── TechTemplate.js
├── components/
│   └── ResumePreview.js   # A4 preview component
├── pages/
│   ├── index.js           # Landing page
│   ├── select.js          # Template selection
│   └── editor.js          # Resume editor
├── styles/
│   ├── globals.css        # Global styles
│   └── templates.css      # Template styles (A4 sizing)
└── context/
    └── ResumeContext.js   # State management
```

## 🎨 Available Templates

| Template | Style | Best For |
|----------|-------|----------|
| Modern | Gradient header | Tech, Startups |
| Classic | Traditional B&W | Corporate, Legal |
| Creative | Sidebar layout | Design, Creative |
| Minimal | Clean & simple | Any industry |
| Executive | Corporate | Senior positions |
| Tech | Code-style | Developers |

## 📄 A4 Page Dimensions

```css
Width:  210mm (8.27 inches)
Height: 297mm (11.69 inches)
Margin: 20mm (standard)
Safe Area: 170mm × 257mm
```

## 🔧 Adding a New Template

### 1. Create Component
```jsx
// templates/NewTemplate.js
export default function NewTemplate({ data }) {
  return (
    <div className="resume-template new-template">
      {/* Your template JSX */}
    </div>
  );
}
```

### 2. Add Styles
```css
/* styles/templates.css */
.new-template {
  /* Your styles */
}
```

### 3. Register
```javascript
// templates/index.js
import NewTemplate from './NewTemplate';

export const templates = {
  // ... existing
  new: {
    id: 'new',
    name: 'New',
    component: NewTemplate,
    category: 'Category',
    color: '#COLOR',
    description: 'Description'
  }
};
```

## 💾 Data Structure

```javascript
{
  name: "John Doe",
  title: "Job Title",
  email: "email@example.com",
  phone: "+1 (555) 123-4567",
  location: "City, State",
  summary: "Professional summary...",
  experience: [
    {
      role: "Job Title",
      company: "Company Name",
      years: "2020 - Present",
      description: "Job description..."
    }
  ],
  education: [
    {
      degree: "Degree Name",
      school: "School Name",
      years: "2015 - 2019"
    }
  ],
  skills: ["Skill 1", "Skill 2", "Skill 3"]
}
```

## 🎯 Common Tasks

### Update Resume Data
```javascript
const { updateField } = useResume();

updateField('name', 'John Doe');
updateField('experience.0.role', 'Senior Developer');
```

### Add Section Item
```javascript
const { addSection } = useResume();

addSection('experience', {
  role: '',
  company: '',
  years: '',
  description: ''
});
```

### Remove Section Item
```javascript
const { removeSection } = useResume();

removeSection('experience', 0); // Remove first item
```

### Change Template
```javascript
const { setSelectedDesign } = useResume();

setSelectedDesign('modern');
```

## 📤 PDF Export

```javascript
const handleExportPDF = async () => {
  const canvas = await html2canvas(resumeRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${name}_Resume.pdf`);
};
```

## 🎨 CSS Classes

### Base Classes
```css
.resume-template        /* Main container */
.resume-header          /* Header section */
.resume-body            /* Body content */
.resume-section         /* Each section */
.section-title          /* Section headings */
.experience-item        /* Experience entry */
.education-item         /* Education entry */
.skills-list            /* Skills container */
.skill-tag              /* Individual skill */
```

### Template-Specific
```css
.modern-template        /* Modern template */
.classic-template       /* Classic template */
.creative-template      /* Creative template */
.minimal-template       /* Minimal template */
.executive-template     /* Executive template */
.tech-template          /* Tech template */
```

## 📱 Responsive Breakpoints

```css
Desktop:  1400px+       /* Full layout */
Laptop:   1024-1399px   /* Two columns */
Tablet:   768-1023px    /* Stacked */
Mobile:   <768px        /* Single column */
```

## 🔍 Debugging

### Check Template Rendering
```javascript
console.log('Template ID:', selectedDesign);
console.log('Resume Data:', resumeData);
```

### Check PDF Export
```javascript
console.log('Resume Ref:', resumeRef.current);
console.log('Canvas:', canvas);
```

### Check Styles
```css
/* Add border to see layout */
.resume-template * {
  border: 1px solid red;
}
```

## ⚡ Performance Tips

1. **Memoize Components**
```javascript
const MiniPreview = React.memo(({ templateId, data }) => {
  // Component code
});
```

2. **Debounce Input**
```javascript
const debouncedUpdate = debounce(updateField, 300);
```

3. **Lazy Load Templates**
```javascript
const Template = lazy(() => import(`./templates/${id}`));
```

## 🐛 Common Issues

### Template Not Showing
- Check template is registered in `templates/index.js`
- Verify component export is correct
- Check for console errors

### PDF Export Fails
- Ensure content fits in A4 page
- Check for CORS issues with images
- Verify html2canvas is installed

### Styles Not Applying
- Check CSS class names match
- Verify templates.css is imported
- Check for CSS specificity issues

### Mobile Layout Broken
- Test responsive breakpoints
- Check grid/flex layouts
- Verify mobile-specific styles

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Project overview |
| QUICKSTART.md | Quick start guide |
| ARCHITECTURE.md | Technical details |
| TEMPLATE_GUIDE.md | Template creation |
| DEPLOYMENT.md | Deployment guide |
| RESTRUCTURE_SUMMARY.md | Restructure details |
| QUICK_REFERENCE.md | This file |

## 🔗 Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Check for errors
npm run lint

# Format code
npm run format
```

## 📞 Getting Help

1. Check documentation files
2. Review template examples
3. Check browser console
4. Open GitHub issue

## ✅ Pre-Deployment Checklist

- [ ] All templates render correctly
- [ ] PDF export works
- [ ] Mobile responsive
- [ ] Print preview good
- [ ] No console errors
- [ ] All links work
- [ ] SEO meta tags present
- [ ] Performance optimized

## 🎉 Quick Wins

### Add a Color Variant
```javascript
// Just change the color in registry
elegant: {
  // ...
  color: '#7C3AED'  // Change this
}
```

### Adjust Spacing
```css
.resume-section {
  margin-bottom: 25px;  /* Adjust this */
}
```

### Change Font
```css
.resume-template {
  font-family: 'Georgia', serif;  /* Change this */
}
```

---

**Keep this card handy for quick reference!** 📌

For detailed information, see the full documentation files.
