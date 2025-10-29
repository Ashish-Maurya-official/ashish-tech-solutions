# Project Structure

## 📁 Current Project Organization

```
futuristic-resume-builder/
├── 📂 components/              # React Components
│   ├── 📂 InlineEditableResume/
│   │   ├── index.js
│   │   └── InlineEditableResume.css
│   ├── 📂 ResumePreview/
│   │   └── index.js
│   └── 📂 templates/           # Resume Templates
│       ├── 📂 ModernTemplate/
│       │   ├── index.js
│       │   └── ModernTemplate.css
│       ├── 📂 ClassicTemplate/
│       │   ├── index.js
│       │   └── ClassicTemplate.css
│       ├── 📂 CreativeTemplate/
│       │   ├── index.js
│       │   └── CreativeTemplate.css
│       ├── 📂 MinimalTemplate/
│       │   ├── index.js
│       │   └── MinimalTemplate.css
│       ├── 📂 ExecutiveTemplate/
│       │   ├── index.js
│       │   └── ExecutiveTemplate.css
│       ├── 📂 TechTemplate/
│       │   ├── index.js
│       │   └── TechTemplate.css
│       ├── base.css            # Shared template styles
│       └── index.js            # Template registry
│
├── 📂 pages/                   # Next.js Pages
│   ├── _app.js                 # App wrapper
│   ├── index.js                # Landing page
│   ├── select.js               # Template selection
│   ├── editor.js               # Resume editor
│   ├── 404.js                  # Error page
│   └── 📂 api/                 # API routes (if any)
│
├── 📂 styles/                  # Stylesheets
│   ├── globals.css             # Global styles
│   ├── modern-editor.css       # Editor page styles
│   └── 📂 pages/               # Page-specific styles
│       ├── landing.css
│       ├── select.css
│       └── 404.css
│
├── 📂 context/                 # React Context
│   └── ResumeContext.js        # Resume data context
│
├── 📂 public/                  # Static Assets
│   ├── favicon.ico
│   └── images/
│
├── 📂 docs/                    # Documentation
│   └── README.md               # Documentation index
│
├── 📂 .next/                   # Next.js build output (gitignored)
├── 📂 node_modules/            # Dependencies (gitignored)
│
├── 📄 .gitignore               # Git ignore rules
├── 📄 package.json             # Dependencies & scripts
├── 📄 package-lock.json        # Dependency lock file
├── 📄 next.config.js           # Next.js configuration
├── 📄 README.md                # Project README
│
└── 📄 Documentation Files      # Project documentation
    ├── QUICKSTART.md
    ├── PROJECT_OVERVIEW.md
    ├── FEATURES.md
    ├── ARCHITECTURE.md
    ├── TEMPLATE_GUIDE.md
    ├── DEPLOYMENT.md
    ├── CHANGELOG.md
    └── ... (other docs)
```

## 🗂️ Folder Descriptions

### `/components`
React components organized by feature. Each component has its own folder with:
- `index.js` - Component logic
- `ComponentName.css` - Component styles (if needed)

**Templates** are special components in `/components/templates/`:
- Each template has its own folder
- Contains component JS and CSS files
- `index.js` exports all templates and metadata

### `/pages`
Next.js pages (routes):
- `index.js` → `/` (landing page)
- `select.js` → `/select` (template selection)
- `editor.js` → `/editor` (resume editor)
- `404.js` → `/404` (error page)
- `_app.js` → App wrapper (global setup)

### `/styles`
Global and page-specific styles:
- `globals.css` - Global styles, resets, utilities
- `modern-editor.css` - Editor page specific styles
- `/pages/` - Individual page stylesheets

### `/context`
React Context providers for state management:
- `ResumeContext.js` - Resume data and operations

### `/public`
Static assets served directly:
- Images, fonts, icons
- Favicon
- Any public files

### `/docs`
Project documentation organized in one place

## 📋 File Naming Conventions

### Components
- **Folders**: PascalCase (e.g., `ModernTemplate/`)
- **JS Files**: `index.js` for main component
- **CSS Files**: Match component name (e.g., `ModernTemplate.css`)

### Pages
- **Files**: camelCase or kebab-case (e.g., `index.js`, `select.js`)
- **CSS**: Match page name in `/styles/pages/`

### Styles
- **Global**: `globals.css`
- **Page-specific**: `page-name.css`
- **Component-specific**: In component folder

## 🎯 Design Principles

### Co-location
- Related files are grouped together
- Component JS and CSS in same folder
- Easy to find all files for a feature

### Separation of Concerns
- Components handle UI logic
- Context handles state management
- Styles are modular and scoped

### Scalability
- Easy to add new templates
- Simple to add new pages
- Clear structure for new features

## 🔄 Import Patterns

### From Pages
```javascript
// Import templates
import { templates, getTemplate } from '../components/templates';

// Import components
import InlineEditableResume from '../components/InlineEditableResume';
import ResumePreview from '../components/ResumePreview';

// Import context
import { useResume } from '../context/ResumeContext';
```

### From Components
```javascript
// Import other components
import SomeComponent from '../SomeComponent';

// Import templates
import { getTemplate } from './templates';

// Import styles
import './ComponentName.css';
```

### CSS Import Order
1. Global styles (`globals.css`)
2. Page styles (`pages/*.css`)
3. Base template styles (`templates/base.css`)
4. Editor styles (`modern-editor.css`)
5. Component styles (imported in components)

## 🧹 Cleaned Up Files

### Removed Duplicates
- ❌ Old `/templates/` folder (moved to `/components/templates/`)
- ❌ Old `/styles/templates/` folder (moved to component folders)
- ❌ Old `/styles/components/` folder (moved to component folders)
- ❌ Old component files (moved to folders):
  - `components/InlineEditableResume.js`
  - `components/ResumePreview.js`

### Removed Unnecessary
- ❌ `/temp/` folder (empty)
- ❌ `/futuristic-resume-builder/` folder (duplicate/old)
- ❌ `/scripts/restructure-project.md` (completed task)

## 📊 Project Statistics

### Components
- **6 Templates**: Modern, Classic, Creative, Minimal, Executive, Tech
- **2 Utility Components**: InlineEditableResume, ResumePreview
- **1 Context Provider**: ResumeContext

### Pages
- **4 Main Pages**: Landing, Select, Editor, 404
- **1 App Wrapper**: _app.js

### Styles
- **1 Global**: globals.css
- **1 Editor**: modern-editor.css
- **3 Page Styles**: landing, select, 404
- **1 Base Template**: base.css
- **6 Template Styles**: One per template
- **1 Component Style**: InlineEditableResume

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode
```

## 📝 Adding New Features

### New Template
1. Create folder: `components/templates/NewTemplate/`
2. Add `index.js` and `NewTemplate.css`
3. Export from `components/templates/index.js`
4. Add to template registry

### New Page
1. Create file: `pages/new-page.js`
2. Add styles: `styles/pages/new-page.css`
3. Import styles in `pages/_app.js` if needed
4. Add navigation links

### New Component
1. Create folder: `components/NewComponent/`
2. Add `index.js` and CSS if needed
3. Import and use in pages/components

## 🎨 Style Organization

### Global Styles (`globals.css`)
- CSS reset
- Typography
- Utility classes
- Common animations

### Page Styles (`styles/pages/`)
- Page-specific layouts
- Page-specific components
- Responsive breakpoints

### Component Styles
- Component-specific styling
- Scoped to component
- Imported in component file

### Template Styles
- Template-specific designs
- Shared base styles in `base.css`
- Individual styles in template folders

## 🔍 Finding Files

### "Where is the template code?"
→ `components/templates/[TemplateName]/index.js`

### "Where are the template styles?"
→ `components/templates/[TemplateName]/[TemplateName].css`

### "Where is the editor page?"
→ `pages/editor.js`

### "Where are the page styles?"
→ `styles/pages/[page-name].css`

### "Where is the resume data managed?"
→ `context/ResumeContext.js`

## ✅ Project Health

- ✅ No duplicate files
- ✅ Clear folder structure
- ✅ Co-located components
- ✅ Organized documentation
- ✅ Consistent naming
- ✅ Scalable architecture

---

**Status**: ✅ Clean and Organized
**Last Updated**: 2024
**Version**: 2.0 (Restructured)
