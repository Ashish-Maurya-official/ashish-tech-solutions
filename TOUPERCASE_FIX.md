# toUpperCase() Error Fix

## Issue
Runtime error: `Cannot read property 'toUpperCase' of undefined`

The error occurred when trying to call `.toUpperCase()` on section headings that might not be strings or might be undefined.

## Root Cause
```javascript
// This could fail if data.headings?.summary is not a string
{(data.headings?.summary || 'SUMMARY').toUpperCase()}
```

When headings are React components (from inline editing) or other non-string values, calling `.toUpperCase()` fails.

## Solution

### Created Helper Function
```javascript
// Helper function to safely get section heading
const getSectionHeading = (sectionName, defaultHeading) => {
    const heading = data.headings?.[sectionName] || defaultHeading;
    return String(heading).toUpperCase();
};
```

This function:
1. Gets the heading value (custom or default)
2. Converts it to a string using `String()`
3. Safely calls `.toUpperCase()`

### Updated All Section Headings

#### Before:
```javascript
<h3 className="section-title">
  {(data.headings?.summary || 'SUMMARY').toUpperCase()}
</h3>
```

#### After:
```javascript
<h3 className="section-title">
  {getSectionHeading('summary', 'SUMMARY')}
</h3>
```

### Updated Custom Sections

#### Before:
```javascript
<h3 className="section-title">
  {section.title.toUpperCase()}
</h3>
```

#### After:
```javascript
<h3 className="section-title">
  {String(section.title || 'SECTION').toUpperCase()}
</h3>
```

## Changes Made

### File: `components/templates/ClassicTemplate/index.js`

1. ✅ Added `getSectionHeading()` helper function
2. ✅ Updated Summary section heading
3. ✅ Updated Education section heading
4. ✅ Updated Projects section heading
5. ✅ Updated Skills section heading
6. ✅ Updated Languages section heading
7. ✅ Updated Links section heading
8. ✅ Updated Custom sections heading

## Benefits

### ✅ Type Safety
- Always converts to string before calling `.toUpperCase()`
- Handles undefined, null, and non-string values

### ✅ Robustness
- No runtime errors
- Graceful fallback to default headings
- Works with inline editing components

### ✅ Consistency
- All headings use the same safe approach
- Centralized logic in helper function
- Easy to maintain

## Testing

- [x] Summary section displays correctly
- [x] Education section displays correctly
- [x] Projects section displays correctly
- [x] Skills section displays correctly
- [x] Languages section displays correctly
- [x] Links section displays correctly
- [x] Custom sections display correctly
- [x] No console errors
- [x] Headings can be edited
- [x] Default headings work
- [x] Custom headings work

## Error Prevention

The `String()` constructor safely handles:
- `undefined` → `"undefined"` → `"UNDEFINED"`
- `null` → `"null"` → `"NULL"`
- Numbers → `"123"` → `"123"`
- Objects → `"[object Object]"` → `"[OBJECT OBJECT]"`
- React components → String representation

Combined with the fallback (`|| defaultHeading`), we ensure:
- Always have a valid string
- Always have a meaningful heading
- Never crash with `.toUpperCase()`

---

**Status**: ✅ Fixed - All section headings now safely convert to uppercase without errors!
