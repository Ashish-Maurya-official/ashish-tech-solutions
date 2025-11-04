# JSON-Based Resume Management System

## Overview
Transformed the resume builder into a multi-resume management system where:
- Each resume is stored as a separate JSON file
- One universal editor works with any resume via ID parameter
- Dashboard manages all resumes (create, edit, duplicate, delete)
- Similar to Canva, Figma, or other document editors

## Architecture

### File Structure
```
data/
  resumes/
    resume_1234567890.json
    resume_1234567891.json
    resume_default.json
```

### JSON Resume Format
```json
{
  "id": "resume_1234567890",
  "name": "Software Engineer Resume",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "selectedDesign": "classic",
  "data": {
    "name": "John Doe",
    "title": "Software Engineer",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "location": "San Francisco, CA",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "summary": "Professional summary...",
    "experience": [...],
    "education": [...],
    "skills": [...],
    "projects": [...],
    "languages": [...],
    "links": [...],
    "customSections": [...],
    "styling": {...},
    "sectionVisibility": {...},
    "headings": {...}
  }
}
```

## New Pages

### 1. Dashboard (`/dashboard`)
**Purpose**: Manage all resumes

**Features**:
- View all resumes in a grid
- Create new resume with name and template selection
- Duplicate existing resume
- Delete resume
- Click to edit (redirects to `/editor?id=resume_id`)

**UI Components**:
- Resume cards with preview
- Create button with modal
- Action buttons (duplicate, delete)
- Empty state for no resumes

### 2. Editor (`/editor?id=resume_id`)
**Purpose**: Universal editor for any resume

**Features**:
- Loads resume data from API based on ID parameter
- Auto-saves changes to JSON file
- Works with any resume ID
- Back button returns to dashboard

**Data Flow**:
1. Get ID from URL query parameter
2. Fetch resume data from `/api/resumes/[id]`
3. Load data into editor
4. Auto-save changes via PUT request
5. Update `updatedAt` timestamp

## API Endpoints

### GET `/api/resumes`
**Purpose**: Get all resumes

**Response**:
```json
[
  {
    "id": "resume_123",
    "name": "My Resume",
    "createdAt": "...",
    "updatedAt": "...",
    "selectedDesign": "classic",
    "data": {...}
  }
]
```

### POST `/api/resumes`
**Purpose**: Create new resume

**Request Body**:
```json
{
  "name": "New Resume",
  "template": "classic"
}
```

**Response**:
```json
{
  "id": "resume_1234567890",
  "name": "New Resume",
  "createdAt": "...",
  "updatedAt": "...",
  "selectedDesign": "classic",
  "data": {...}
}
```

### GET `/api/resumes/[id]`
**Purpose**: Get single resume

**Response**:
```json
{
  "id": "resume_123",
  "name": "My Resume",
  "data": {...}
}
```

### PUT `/api/resumes/[id]`
**Purpose**: Update resume

**Request Body**: Full resume object

**Response**: Updated resume object

### DELETE `/api/resumes/[id]`
**Purpose**: Delete resume

**Response**:
```json
{
  "message": "Resume deleted"
}
```

## User Flow

### Creating a Resume
1. User visits `/dashboard`
2. Clicks "New Resume" button
3. Modal appears with name input and template selector
4. User enters name and selects template
5. System creates JSON file with unique ID
6. Redirects to `/editor?id=new_resume_id`
7. User edits resume
8. Changes auto-save to JSON file

### Editing a Resume
1. User visits `/dashboard`
2. Clicks on resume card
3. Redirects to `/editor?id=resume_id`
4. Editor loads data from JSON file
5. User makes changes
6. Changes auto-save
7. User clicks back to return to dashboard

### Duplicating a Resume
1. User clicks duplicate button on resume card
2. System creates new JSON file with copied data
3. New resume appears in dashboard with "(Copy)" suffix

### Deleting a Resume
1. User clicks delete button
2. Confirmation dialog appears
3. User confirms
4. JSON file is deleted
5. Resume removed from dashboard

## Benefits

### 1. Multiple Resumes
- Users can create unlimited resumes
- Each resume is independent
- Easy to manage different versions

### 2. Data Persistence
- All data stored in JSON files
- Easy to backup and restore
- Portable format

### 3. Scalability
- Easy to add cloud storage later
- Can implement user accounts
- Simple to add sharing features

### 4. Professional Workflow
- Similar to popular design tools
- Intuitive for users
- Industry-standard approach

## Migration from Old System

### Before
- Single resume in ResumeContext
- Data in memory only
- No persistence between sessions

### After
- Multiple resumes in JSON files
- Each resume has unique ID
- Data persists across sessions
- Dashboard to manage all resumes

## Future Enhancements

### Possible Features
1. **Cloud Storage**: Store resumes in database
2. **User Accounts**: Login and sync across devices
3. **Sharing**: Share resume link with others
4. **Templates**: More template options
5. **Export Options**: PDF, DOCX, HTML
6. **Version History**: Track changes over time
7. **Collaboration**: Multiple users editing
8. **AI Suggestions**: Content recommendations

## Technical Implementation

### Auto-Save
```javascript
useEffect(() => {
  const saveTimer = setTimeout(() => {
    saveResume();
  }, 1000); // Debounce 1 second
  
  return () => clearTimeout(saveTimer);
}, [resumeData]);
```

### Loading State
```javascript
const [loading, setLoading] = useState(true);
const [resumeData, setResumeData] = useState(null);

useEffect(() => {
  loadResume(id);
}, [id]);
```

### Error Handling
```javascript
try {
  const response = await fetch(`/api/resumes/${id}`);
  if (!response.ok) {
    throw new Error('Resume not found');
  }
  const data = await response.json();
  setResumeData(data);
} catch (error) {
  router.push('/dashboard');
}
```

## File Organization

```
pages/
  dashboard.js          # Resume management
  editor.js             # Universal editor
  api/
    resumes/
      index.js          # GET all, POST new
      [id].js           # GET, PUT, DELETE single

data/
  resumes/              # JSON storage
    *.json              # Individual resume files

components/
  (existing components remain the same)
```

## Summary

This system provides a professional, scalable approach to resume management that:
- Stores each resume as a separate JSON file
- Uses one universal editor for all resumes
- Provides a dashboard for managing multiple resumes
- Follows industry-standard patterns
- Easy to extend with new features
