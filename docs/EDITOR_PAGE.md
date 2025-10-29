# Resume Editor Page

## Overview
The Resume Editor (`/editor`) is a modern, full-featured resume editing interface with real-time preview and template switching capabilities.

## Features

### Three-Column Layout
- **Left Panel**: Editing controls with tabbed interface
- **Center Panel**: Live preview of the resume
- **Right Panel**: Template switcher

### Tabbed Interface
The editor includes four main tabs for organizing resume content:

1. **Personal Information** 👤
   - Full Name
   - Email
   - Phone
   - Location
   - Professional Summary

2. **Work Experience** 💼
   - Add/Remove multiple positions
   - Company name
   - Position title
   - Start/End dates
   - Job description

3. **Education** 🎓
   - Add/Remove multiple education entries
   - School name
   - Degree
   - Field of study
   - Start/End dates

4. **Skills** ⚡
   - Add/Remove skills
   - Skill name
   - Proficiency level (Beginner, Intermediate, Advanced, Expert)

### Real-time Preview
- Changes are reflected instantly in the center preview panel
- No save button needed - updates happen automatically

### Template Switching
- Switch between different resume templates on the fly
- Available templates:
  - Modern
  - Classic
  - Minimal

### PDF Export
- One-click PDF export via browser print functionality
- Optimized print styles for clean PDF output

### Mobile Responsive
- Toggle between edit and preview modes on mobile devices
- Adaptive layout for tablets and phones
- Touch-friendly interface

## Technical Implementation

### State Management
- Uses React Context API via `ResumeContext`
- Real-time updates with `updateResumeData` function
- Dynamic array management for experience, education, and skills

### Styling
- Modern gradient background
- Glassmorphism effects
- Smooth animations and transitions
- CSS Grid for responsive layout
- Print-specific styles for PDF export

### Responsive Breakpoints
- Desktop: Full three-column layout (1200px+)
- Tablet: Compressed three-column layout (968px - 1200px)
- Mobile: Single column with toggle (< 968px)

## Usage

Navigate to `/editor` to access the resume editor. The page loads with sample data that can be immediately edited.

### Adding Items
Click the "+ Add" button in Experience, Education, or Skills tabs to add new entries.

### Removing Items
Click the trash icon (🗑️) on any item card to remove it.

### Exporting
Click "📥 Export PDF" in the header to download your resume as a PDF.

### Mobile Navigation
On mobile devices, use the "👁️ Preview" / "✏️ Edit" toggle button to switch between editing and preview modes.
