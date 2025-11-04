# Test Suite Quick Reference

## Quick Start

```bash
# Install dependencies (if not already done)
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Files Overview

### Pages (2 test files)
- `pages/dashboard.test.js` - Dashboard functionality
- `pages/editor.test.js` - New Canva-style editor

### Components (7 test files)
- `components/StylePanel.test.js` - Style customization
- `components/DraggableResume.test.js` - Drag & drop
- `components/Editor/ElementsPanel.test.js` - Element selection
- `components/Editor/LeftSidebar.test.js` - Navigation
- `components/Editor/RightSidebar.test.js` - Properties
- `components/Editor/BlankCanvas.test.js` - Canvas editor
- `components/templates/ClassicTemplate.test.js` - Template rendering

### Hooks (1 test file)
- `hooks/useLongPress.test.js` - Long press gesture

### Store (1 test file)
- `store/slices/editorSlice.test.js` - State management

### Utils (1 test file)
- `utils/projectStorage.test.js` - Local storage

### API (1 test file)
- `api/resumes.test.js` - API endpoints

### Integration (1 test file)
- `integration/editor-workflow.test.js` - Multi-component workflows

### E2E (1 test file)
- `e2e/resume-creation.test.js` - Complete user flows

## Total: 15 Test Files

## Running Specific Tests

```bash
# Run single test file
npm test dashboard.test.js

# Run tests in a directory
npm test __tests__/components

# Run tests matching pattern
npm test -- --testNamePattern="creates"

# Run with verbose output
npm test -- --verbose
```

## Coverage Report

After running `npm run test:coverage`, open:
```
coverage/lcov-report/index.html
```

## Test Status

✅ Unit Tests: Complete
✅ Component Tests: Complete
✅ Integration Tests: Basic structure
⚠️ E2E Tests: Placeholder (requires E2E framework)
✅ API Tests: Complete

## Next Steps

1. Run tests to verify setup
2. Review coverage report
3. Add E2E framework (Playwright/Cypress) for full E2E tests
4. Expand integration tests as needed
