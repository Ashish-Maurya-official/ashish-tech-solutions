# Template Development Guide

## Quick Reference for Creating Resume Templates

### Template Structure

Every template follows this basic structure:

```jsx
export default function TemplateName({ data }) {
  return (
    <div className="resume-template template-name-template">
      {/* Header Section */}
      <div className="resume-header">
        <h1>{data.name || 'Your Name'}</h1>
        <h2>{data.title || 'Your Title'}</h2>
        <div className="contact-info">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>

      {/* Body Sections */}
      <div className="resume-body">
        {/* Summary */}
        {data.summary && (
          <section className="resume-section">
            <h3 className="section-title">Summary</h3>
            <p>{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <strong>{exp.role}</strong>
                <span>{exp.company}</span>
                <span>{exp.years}</span>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <strong>{edu.degree}</strong>
                <span>{edu.school}</span>
                <span>{edu.years}</span>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title">Skills</h3>
            <div className="skills-list">
              {data.skills.map((skill, index) => (
                skill && <span key={index}>{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
```

## Data Structure

### Resume Data Object
```javascript
{
  // Personal Information
  name: "John Doe",
  title: "Software Engineer",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  
  // Professional Summary
  summary: "Experienced developer with 5+ years...",
  
  // Work Experience (Array)
  experience: [
    {
      role: "Senior Developer",
      company: "Tech Corp",
      years: "2020 - Present",
      description: "Led development of..."
    }
  ],
  
  // Education (Array)
  education: [
    {
      degree: "BS Computer Science",
      school: "University Name",
      years: "2015 - 2019"
    }
  ],
  
  // Skills (Array of strings)
  skills: ["React", "Node.js", "TypeScript"]
}
```

## CSS Guidelines

### A4 Page Constraints
```css
/* Your template MUST fit within these dimensions */
.resume-template {
  width: 100%;
  height: 100%;
  padding: 20mm;  /* Standard margin */
  box-sizing: border-box;
}

/* Available space after padding */
/* Width: 170mm (210mm - 40mm padding) */
/* Height: 257mm (297mm - 40mm padding) */
```

### Base Classes
```css
/* Use these base classes for consistency */
.resume-header { }
.resume-body { }
.resume-section { }
.section-title { }
.experience-item { }
.education-item { }
.skills-list { }
.contact-info { }
```

### Template-Specific Classes
```css
/* Prefix with your template name */
.your-template .resume-header { }
.your-template .section-title { }
/* etc. */
```

## Template Types

### 1. Single Column Layout
**Best for**: Traditional resumes, executive positions

```jsx
<div className="resume-template">
  <header>...</header>
  <section>Experience</section>
  <section>Education</section>
  <section>Skills</section>
</div>
```

### 2. Two Column Layout (Sidebar)
**Best for**: Creative fields, visual appeal

```jsx
<div className="resume-template">
  <div className="sidebar">
    <header>...</header>
    <section>Contact</section>
    <section>Skills</section>
  </div>
  <div className="main-content">
    <section>Experience</section>
    <section>Education</section>
  </div>
</div>
```

**CSS**:
```css
.your-template {
  display: grid;
  grid-template-columns: 35% 65%;
  padding: 0;
}

.sidebar {
  padding: 25px 20px;
}

.main-content {
  padding: 25px 20px;
}
```

### 3. Timeline Layout
**Best for**: Showing career progression

```jsx
<div className="experience-item">
  <div className="timeline-dot"></div>
  <div className="content">
    <h4>{exp.role}</h4>
    <p>{exp.description}</p>
  </div>
</div>
```

**CSS**:
```css
.experience-item {
  position: relative;
  padding-left: 25px;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 6px;
  width: 12px;
  height: 12px;
  background: #color;
  border-radius: 50%;
}

.timeline-dot::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 12px;
  width: 2px;
  height: 100%;
  background: #color;
}
```

## Color Schemes

### Choosing Colors
- **Primary Color**: Main brand color (headers, accents)
- **Secondary Color**: Supporting elements
- **Text Color**: #1f2937 (dark gray) for body text
- **Light Text**: #6b7280 for secondary text

### Example Color Palettes

**Professional Blue**:
```css
--primary: #3B82F6;
--secondary: #2563eb;
--accent: #60a5fa;
```

**Corporate Red**:
```css
--primary: #DC2626;
--secondary: #991b1b;
--accent: #f87171;
```

**Creative Purple**:
```css
--primary: #8B5CF6;
--secondary: #7C3AED;
--accent: #a78bfa;
```

## Typography

### Font Sizes
```css
/* Recommended sizes for A4 */
h1 (Name): 28-36px
h2 (Title): 16-20px
h3 (Section Titles): 16-18px
Body Text: 13-15px
Small Text: 11-13px
```

### Font Weights
```css
Name: 700 (Bold)
Section Titles: 600 (Semi-bold)
Job Titles: 600 (Semi-bold)
Body Text: 400 (Regular)
```

### Line Heights
```css
Headers: 1.2
Body Text: 1.6-1.8
Compact Sections: 1.4
```

## Spacing Guidelines

### Margins
```css
/* Between sections */
.resume-section {
  margin-bottom: 20-25px;
}

/* Between items */
.experience-item,
.education-item {
  margin-bottom: 15-20px;
}

/* Within items */
.exp-header {
  margin-bottom: 8px;
}
```

### Padding
```css
/* Page padding */
.resume-template {
  padding: 20mm; /* Standard */
}

/* Section padding */
.resume-section {
  padding-bottom: 15px;
}
```

## Print Considerations

### Page Breaks
```css
/* Prevent breaking inside items */
.experience-item,
.education-item,
.resume-section {
  page-break-inside: avoid;
}

/* Force break after page */
.a4-page {
  page-break-after: always;
}
```

### Print Colors
```css
/* Ensure colors print */
* {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
```

### Print-Specific Styles
```css
@media print {
  .resume-template {
    padding: 15mm; /* Slightly less for printing */
  }
  
  /* Adjust font sizes if needed */
  body {
    font-size: 12pt;
  }
}
```

## Responsive Design

### Mobile Scaling
```css
@media screen and (max-width: 768px) {
  /* Single column for sidebar layouts */
  .your-template {
    grid-template-columns: 1fr;
  }
  
  /* Adjust padding */
  .resume-template {
    padding: 10mm;
  }
}
```

## Testing Checklist

### Visual Testing
- [ ] Renders correctly with sample data
- [ ] Handles empty fields gracefully
- [ ] Long text doesn't overflow
- [ ] Fits within A4 page (no scrolling)
- [ ] Colors are readable
- [ ] Spacing is consistent

### Content Testing
- [ ] Name displays correctly
- [ ] All contact info shows
- [ ] Summary text wraps properly
- [ ] Multiple experience items display
- [ ] Multiple education items display
- [ ] Skills list wraps correctly
- [ ] Empty sections hide properly

### Print Testing
- [ ] Print preview looks good
- [ ] Colors print correctly
- [ ] No content cut off
- [ ] Page breaks work correctly
- [ ] PDF export works

### Responsive Testing
- [ ] Looks good on desktop
- [ ] Scales properly on tablet
- [ ] Readable on mobile
- [ ] Sidebar collapses on mobile

## Common Patterns

### Flex Header
```jsx
<div className="exp-header">
  <div className="exp-left">
    <strong>{exp.role}</strong>
    <span>{exp.company}</span>
  </div>
  <span className="exp-years">{exp.years}</span>
</div>
```

```css
.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.exp-years {
  white-space: nowrap;
  flex-shrink: 0;
}
```

### Icon Integration
```jsx
<div className="contact-item">
  <span className="icon">📧</span>
  <span>{data.email}</span>
</div>
```

### Skill Tags
```jsx
<div className="skills-list">
  {data.skills.map((skill, index) => (
    <span key={index} className="skill-tag">
      {skill}
    </span>
  ))}
</div>
```

```css
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #e5e7eb;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
}
```

## Best Practices

### 1. Always Provide Fallbacks
```jsx
{data.name || 'Your Name'}
{data.email && <span>{data.email}</span>}
```

### 2. Use Semantic HTML
```jsx
<header>...</header>
<section>...</section>
<article>...</article>
```

### 3. Keep It Simple
- Don't overcomplicate layouts
- Use standard CSS properties
- Avoid complex animations
- Focus on readability

### 4. Test with Real Data
- Long names
- Long job titles
- Many experience items
- Long descriptions
- Many skills

### 5. Consider ATS Compatibility
- Use standard HTML tags
- Avoid complex layouts for critical info
- Keep text selectable
- Use proper heading hierarchy

## Example: Creating a New Template

### Step 1: Create Component
```jsx
// templates/ProfessionalTemplate.js
export default function ProfessionalTemplate({ data }) {
  return (
    <div className="resume-template professional-template">
      {/* Your template code */}
    </div>
  );
}
```

### Step 2: Add Styles
```css
/* styles/templates.css */
.professional-template {
  font-family: 'Georgia', serif;
}

.professional-template .resume-header {
  border-bottom: 3px double #1f2937;
  padding-bottom: 15px;
}

.professional-template .section-title {
  color: #1f2937;
  font-variant: small-caps;
  letter-spacing: 2px;
}
```

### Step 3: Register
```javascript
// templates/index.js
import ProfessionalTemplate from './ProfessionalTemplate';

export const templates = {
  // ... existing
  professional: {
    id: 'professional',
    name: 'Professional',
    component: ProfessionalTemplate,
    category: 'Business',
    color: '#1f2937',
    description: 'Classic professional design'
  }
};
```

### Step 4: Test
```bash
npm run dev
# Navigate to /select
# Choose your new template
# Test in editor
# Export PDF
```

## Resources

### Inspiration
- Look at real resume examples
- Check design portfolios
- Review competitor templates
- Study typography guides

### Tools
- Chrome DevTools for testing
- Print preview for PDF testing
- Responsive design mode
- Color contrast checkers

### References
- A4 dimensions: 210mm × 297mm
- Standard margins: 15-25mm
- Safe print area: 170mm × 257mm
- DPI for print: 300 (for images)

---

**Happy Template Building!** 🎨

For questions or issues, refer to ARCHITECTURE.md or open a GitHub issue.
