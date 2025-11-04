# 🔧 Troubleshooting Guide - Canva Editor

## Issues & Solutions

### Issue: Elements not appearing on canvas

**Symptoms:**
- Click "Add Heading" or shapes but nothing appears
- Canvas stays blank

**Solutions:**

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check the debug logs showing element count

2. **Verify Redux State**
   - Install Redux DevTools extension
   - Check if elements are being added to state
   - Verify currentPageId is set

3. **Check Element Position**
   - Elements might be positioned off-screen
   - Default position is (100, 100)
   - Try scrolling the canvas

4. **Refresh the Page**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear localStorage: `localStorage.clear()` in console

### Issue: Multi-page not working

**Symptoms:**
- Click "+" button but no new page
- Can't switch between pages

**Solutions:**

1. **Check Bottom Bar**
   - Bottom bar should be visible at bottom
   - Page thumbnails should show

2. **Verify Redux Action**
   - Open Redux DevTools
   - Click "+" button
   - Check if `addPage` action is dispatched

3. **Check Console**
   - Look for errors when clicking "+"
   - Verify page is added to state

### Issue: Drag not working

**Symptoms:**
- Can't drag elements
- Elements don't move

**Solutions:**

1. **Check Element Selection**
   - Click element first to select it
   - Should see blue outline

2. **Verify FreeDraggable**
   - Check if FreeDraggable component is working
   - Try clicking and holding before dragging

3. **Check isEditing Prop**
   - BlankCanvas should have `isEditing={true}`

### Issue: Undo/Redo not working

**Symptoms:**
- Ctrl+Z doesn't undo
- Buttons disabled

**Solutions:**

1. **Check History**
   - Open Redux DevTools
   - Check `editor.history` array
   - Verify `historyIndex` is updating

2. **Perform Actions First**
   - Undo only works after actions
   - Try adding/moving elements first

3. **Check Keyboard Shortcuts**
   - Make sure focus is on page (not input field)
   - Try clicking canvas first

## Debug Mode

### Enable Debug Logging

The editor now has debug logging enabled. Check console for:

```
Editor State: {
  currentPageId: "...",
  currentPage: "Page 1",
  elementsCount: 0,
  elements: []
}
```

### Check Redux State

1. Install Redux DevTools
2. Open DevTools
3. Click Redux tab
4. Inspect state tree:
   ```
   editor
   ├── project
   │   ├── pages[]
   │   │   └── elements[]
   │   └── settings
   ├── currentPageId
   ├── selectedElementIds[]
   └── history[]
   ```

### Test Actions

Open console and test actions directly:

```javascript
// Add element
window.store.dispatch({
  type: 'editor/addElement',
  payload: {
    type: 'text',
    content: 'Test',
    styling: { fontSize: '20px', color: '#000' }
  }
});

// Check state
console.log(window.store.getState().editor);
```

## Common Fixes

### Fix 1: Reset State

```javascript
// In browser console
localStorage.clear();
location.reload();
```

### Fix 2: Manually Set Current Page

```javascript
// In browser console
const state = window.store.getState();
const firstPageId = state.editor.project.pages[0].id;
window.store.dispatch({
  type: 'editor/setCurrentPage',
  payload: firstPageId
});
```

### Fix 3: Add Test Element

```javascript
// In browser console
window.store.dispatch({
  type: 'editor/addElement',
  payload: {
    type: 'rectangle',
    size: { width: 200, height: 100 },
    styling: { fill: '#ff0000' }
  }
});
```

## Verification Checklist

Before reporting issues, verify:

- [ ] Browser console shows no errors
- [ ] Redux DevTools shows state updating
- [ ] Current page ID is set
- [ ] Elements array exists in current page
- [ ] Canvas is visible (not hidden)
- [ ] Zoom level is reasonable (0.5 - 2.0)
- [ ] Sidebars are not covering canvas
- [ ] Page has loaded completely

## Known Limitations

1. **Template Content**: Templates show placeholders, actual content coming soon
2. **Photo Search**: Unsplash API not integrated yet, using sample photos
3. **File Upload**: Upload functionality not implemented yet
4. **Export**: Export shows alert, actual export coming soon

## Getting Help

If issues persist:

1. Check browser console for errors
2. Check Redux DevTools for state
3. Try the debug commands above
4. Clear cache and reload
5. Check if using `/editor-new` URL (not `/editor`)

## Quick Test

Run this in console to verify everything works:

```javascript
// Test sequence
const store = window.store;

// 1. Check state
console.log('State:', store.getState().editor);

// 2. Add element
store.dispatch({
  type: 'editor/addElement',
  payload: {
    type: 'text',
    content: 'TEST',
    styling: { fontSize: '32px', color: '#ff0000' }
  }
});

// 3. Check if added
const state = store.getState().editor;
const currentPage = state.project.pages.find(
  p => p.id === (state.currentPageId || state.project.pages[0].id)
);
console.log('Elements:', currentPage.elements);
```

If this works, the editor is functioning correctly!
