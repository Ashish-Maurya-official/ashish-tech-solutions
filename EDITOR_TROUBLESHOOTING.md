# Editor Page Troubleshooting

## Fixed Issues

### 1. Missing ResumePreview Component
**Status:** ✅ Fixed
- Created `components/ResumePreview/ResumePreview.js`
- Created `components/ResumePreview/ResumePreview.module.css`

### 2. Data Structure Mismatch
**Status:** ✅ Fixed
- Updated sample data in `context/ResumeContext.js` to match editor expectations
- Changed experience structure: `role` → `position`, `years` → `startDate/endDate`
- Changed education structure: added `field` and split `years` → `startDate/endDate`
- Changed skills from array of strings to array of objects with `id`, `name`, and `level`

### 3. Missing updateResumeData Function
**Status:** ✅ Fixed
- Added `updateResumeData` function to ResumeContext
- Function properly updates resume data fields

## How to Test

1. Navigate to `http://localhost:3000/editor`
2. You should see:
   - Left panel with tabs (Personal Info, Experience, Education, Skills)
   - Center panel with live resume preview
   - Right panel with template options
   - Header with "Export PDF" button

3. Test functionality:
   - Click different tabs to switch sections
   - Edit personal information fields
   - Add/remove experience entries
   - Add/remove education entries
   - Add/remove skills
   - Switch templates in the right panel
   - Click "Export PDF" to test print functionality

## Common Issues & Solutions

### Issue: "Cannot read property 'experience' of undefined"
**Solution:** Make sure the ResumeProvider is wrapping the app in `_app.js` (already done)

### Issue: Styles not loading
**Solution:** Ensure CSS modules are properly imported and Next.js dev server is running

### Issue: Changes not reflecting in preview
**Solution:** Check that `updateResumeData` is being called correctly in the editor

### Issue: Mobile toggle not working
**Solution:** Check that the `mobileView` state is properly toggling between 'edit' and 'preview'

## Browser Console Checks

If you see errors in the browser console, check for:
1. Import errors - all components should be properly imported
2. Context errors - ResumeProvider should wrap the entire app
3. CSS module errors - all CSS files should exist and be properly named

## Development Server

Make sure the development server is running:
```bash
npm run dev
```

Then navigate to: `http://localhost:3000/editor`
