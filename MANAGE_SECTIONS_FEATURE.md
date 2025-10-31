# Manage Sections Feature

## Overview
Added a new "Manage" tab that allows users to show/hide predefined sections and edit their headings.

## Features

### ✅ Show/Hide Sections
Users can toggle visibility of any predefined section:
- Summary
- Experience
- Education
- Projects
- Skills
- Languages
- Links

### ✅ Edit Section Headings
Users can customize the heading text for each visible section.

### ✅ Visual Toggle Switch
Beautiful toggle switch with purple gradient for active state.

## Changes Made

### 1. **Added Section Visibility Management** to `context/ResumeContext.js`

#### New State:
```javascript
sectionVisibility: {
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  languages: true,
  links: true
}
```

#### New Function:
```javascript
toggleSectionVisibility(section) {
  // Toggles visibility of a section
}
```

### 2. **Added "Manage" Tab** to `pages/editor.js`

#### New Tab:
- Icon: ⚙️ (gear/settings)
- Label: "Manage"
- Position: Between "Links" and "Add Sections"

#### UI Features:
- List of all predefined sections
- Toggle switch for each section
- Heading editor (shown when section is visible)
- Section icons for visual identification

### 3. **Updated Template** in `components/templates/ClassicTemplate/index.js`

#### Visibility Checks:
```javascript
const isSectionVisible = (sectionName) => {
  return data.sectionVisibility?.[sectionName] !== false;
};
```

#### Dynamic Headings:
```javascript
<h3 className="section-title">
  {(data.headings?.summary || 'SUMMARY').toUpperCase()}
</h3>
```

All sections now:
- Check visibility before rendering
- Use custom heading if provided
- Fall back to default heading

### 4. **Added CSS Styling** to `styles/editor.css`

#### New Styles:
- `.manage-sections-list` - Container for section items
- `.manage-section-item` - Individual section card
- `.toggle-switch` - Toggle switch component
- `.toggle-slider` - Animated slider
- `.section-heading-editor` - Heading input area

## How It Works

### 1. **Toggle Section Visibility**
```
User clicks toggle switch
  ↓
toggleSectionVisibility() called
  ↓
sectionVisibility state updated
  ↓
Template checks visibility
  ↓
Section shown/hidden in preview
```

### 2. **Edit Section Heading**
```
User types in heading input
  ↓
updateHeading() called
  ↓
headings state updated
  ↓
Template uses custom heading
  ↓
Heading updated in preview
```

## UI Layout

```
┌─────────────────────────────────────┐
│ Manage Sections                     │
│ Show/hide sections and edit headings│
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 📝 Summary              [ON/OFF]│ │
│ │ Section Heading:                │ │
│ │ [Summary                      ] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 💼 Experience           [ON/OFF]│ │
│ │ Section Heading:                │ │
│ │ [Work Experience              ] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🎓 Education            [ON/OFF]│ │
│ │ Section Heading:                │ │
│ │ [Education                    ] │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Toggle Switch Design

### Off State:
```
┌──────────────┐
│ ○            │  Gray background
└──────────────┘  White circle on left
```

### On State:
```
┌──────────────┐
│            ○ │  Purple gradient background
└──────────────┘  White circle on right
```

## Use Cases

### 1. **Hide Unused Sections**
If you don't have work experience yet:
- Toggle off "Experience" section
- Section disappears from resume
- More space for other content

### 2. **Customize Section Names**
Change "Technical Skills" to:
- "Core Competencies"
- "Expertise"
- "Proficiencies"
- Any custom name you prefer

### 3. **Minimal Resume**
For a one-page resume:
- Hide "Languages" if not relevant
- Hide "Links" if not needed
- Focus on most important sections

### 4. **Industry-Specific Naming**
Academic resume:
- "Education" → "Academic Background"
- "Experience" → "Research Experience"
- "Projects" → "Publications"

Creative resume:
- "Projects" → "Portfolio"
- "Skills" → "Creative Tools"
- "Experience" → "Client Work"

## Benefits

### ✅ Full Control
- Show only relevant sections
- No empty sections in resume
- Clean, focused presentation

### ✅ Customization
- Rename sections to match industry
- Use terminology that fits your field
- Personalize your resume

### ✅ Easy Management
- Visual toggle switches
- Instant preview updates
- No complex settings

### ✅ Professional
- Clean interface
- Intuitive controls
- Smooth animations

## Files Modified

1. ✅ `context/ResumeContext.js`
   - Added `sectionVisibility` state
   - Added `toggleSectionVisibility` function

2. ✅ `pages/editor.js`
   - Added "Manage" tab
   - Added section management UI
   - Added toggle switches

3. ✅ `components/templates/ClassicTemplate/index.js`
   - Added visibility checks
   - Added dynamic heading support
   - Updated all sections

4. ✅ `styles/editor.css`
   - Added manage sections styles
   - Added toggle switch styles
   - Added heading editor styles

## Testing Checklist

- [x] "Manage" tab appears in navigation
- [x] All 7 sections listed
- [x] Toggle switches work
- [x] Sections hide when toggled off
- [x] Sections show when toggled on
- [x] Heading editor appears when section is visible
- [x] Heading editor hidden when section is hidden
- [x] Custom headings display in preview
- [x] Default headings used when not customized
- [x] Toggle animation smooth
- [x] Purple gradient on active state
- [x] Section icons display correctly
- [x] Works with PDF export
- [x] Hidden sections don't appear in PDF

## Before vs After

### Before
- ❌ All sections always visible
- ❌ Can't hide unused sections
- ❌ Can't customize section headings easily
- ❌ Empty sections take up space

### After
- ✅ Toggle any section on/off
- ✅ Hide sections you don't need
- ✅ Customize all section headings
- ✅ Clean, focused resume
- ✅ Professional management interface

## Example Scenarios

### Scenario 1: Student Resume
```
Visible Sections:
✅ Summary
✅ Education
✅ Projects
✅ Skills
❌ Experience (no work experience yet)
❌ Languages (not relevant)
❌ Links (no portfolio yet)
```

### Scenario 2: Senior Professional
```
Visible Sections:
✅ Summary
✅ Experience
✅ Education
✅ Skills
❌ Projects (focus on work experience)
✅ Languages (international work)
✅ Links (LinkedIn, portfolio)
```

### Scenario 3: Creative Professional
```
Custom Headings:
Summary → "About Me"
Experience → "Client Work"
Projects → "Portfolio"
Skills → "Creative Tools"
Links → "Online Presence"
```

---

**Status**: ✅ Complete - Users now have full control over section visibility and headings!

The Manage tab provides an intuitive interface for customizing which sections appear in the resume and what they're called.
