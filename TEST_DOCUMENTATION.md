# Test Suite Documentation

## Overview
Comprehensive test suite for the AT Solutions Resume Builder application covering all major components, pages, utilities, and workflows.

## Test Structure

```
__tests__/
├── pages/                      # Page component tests
│   └── dashboard.test.js       # Dashboard page tests
├── components/                 # Component tests
│   ├── StylePanel.test.js      # Style panel component
│   ├── DraggableResume.test.js # Draggable resume component
│   ├── Editor/                 # Editor components
│   │   ├── ElementsPanel.test.js
│   │   ├── LeftSidebar.test.js
│   │   ├── RightSidebar.test.js
│   │   └── BlankCanvas.test.js
│   └── templates/
│       └── ClassicTemplate.test.js
├── hooks/                      # Custom hooks tests
│   └── useLongPress.test.js
├── store/                      # Redux store tests
│   └── slices/
│       └── editorSlice.test.js
├── utils/                      # Utility function tests
│   └── projectStorage.test.js
├── api/                        # API route tests
│   └── resumes.test.js
├── integration/                # Integration tests
│   └── editor-workflow.test.js
└── e2e/                        # End-to-end tests
    └── resume-creation.test.js
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (for development)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run tests in CI environment
```bash
npm run test:ci
```

## Test Categories

### 1. Unit Tests
Tests individual components and functions in isolation.

**Components Tested:**
- StylePanel - Style customization interface
- DraggableResume - Drag and drop resume sections
- ElementsPanel - Element selection panel
- LeftSidebar - Navigation sidebar
- RightSidebar - Properties panel
- BlankCanvas - Canvas editor
- ClassicTemplate - Resume template rendering

**Utilities Tested:**
- projectStorage - Local storage operations
- useLongPress - Long press gesture hook

**Store Tested:**
- editorSlice - Redux state management

### 2. Integration Tests
Tests interactions between multiple components.

**Workflows Tested:**
- Element creation and manipulation
- Style application and updates
- Multi-component interactions

### 3. API Tests
Tests API endpoints and data handling.

**Endpoints Tested:**
- GET /api/resumes - List all resumes
- POST /api/resumes - Create new resume
- PUT /api/resumes/:id - Update resume
- DELETE /api/resumes/:id - Delete resume

### 4. End-to-End Tests
Tests complete user workflows from start to finish.

**Scenarios Tested:**
- Complete resume creation flow
- Resume editing and saving
- Resume duplication
- Resume deletion
- PDF export

## Test Coverage Goals

| Category | Target Coverage |
|----------|----------------|
| Components | 80%+ |
| Pages | 75%+ |
| Utils | 90%+ |
| Store | 85%+ |
| Overall | 80%+ |

## Key Test Scenarios

### Dashboard Tests
- ✅ Loading state display
- ✅ Empty state when no resumes
- ✅ Resume grid display
- ✅ Create new resume modal
- ✅ Resume creation
- ✅ Resume duplication
- ✅ Resume deletion

### Editor Tests
- ✅ Element addition
- ✅ Element selection
- ✅ Element updates
- ✅ Element deletion
- ✅ Drag and drop
- ✅ Style customization
- ✅ Zoom controls
- ✅ Canvas interactions

### Template Tests
- ✅ Personal information rendering
- ✅ Experience section display
- ✅ Education section display
- ✅ Skills section display
- ✅ Custom styling application
- ✅ Missing field handling

### Storage Tests
- ✅ Save project to localStorage
- ✅ Load project from localStorage
- ✅ List all projects
- ✅ Delete project
- ✅ Handle non-existent projects

### Hook Tests
- ✅ Long press detection
- ✅ Early release cancellation
- ✅ Touch event support
- ✅ Mouse leave cancellation

## Mocking Strategy

### Router Mocking
```javascript
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
  })),
}))
```

### Fetch Mocking
```javascript
global.fetch = jest.fn()
```

### Window APIs
- matchMedia
- IntersectionObserver
- localStorage

## Writing New Tests

### Component Test Template
```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import YourComponent from '@/components/YourComponent'

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interaction', () => {
    const handleClick = jest.fn()
    render(<YourComponent onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Hook Test Template
```javascript
import { renderHook, act } from '@testing-library/react'
import useYourHook from '@/hooks/useYourHook'

describe('useYourHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useYourHook())
    expect(result.current).toBeDefined()
  })
})
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what the component does, not how it does it
   - Test from the user's perspective

2. **Use Descriptive Test Names**
   - Clearly describe what is being tested
   - Use "it should..." or "it..." format

3. **Arrange-Act-Assert Pattern**
   ```javascript
   it('updates value on change', () => {
     // Arrange
     const { getByRole } = render(<Component />)
     
     // Act
     fireEvent.change(getByRole('textbox'), { target: { value: 'new' } })
     
     // Assert
     expect(getByRole('textbox')).toHaveValue('new')
   })
   ```

4. **Clean Up After Tests**
   - Use beforeEach/afterEach for setup/teardown
   - Clear mocks between tests

5. **Test Edge Cases**
   - Empty states
   - Error conditions
   - Boundary values
   - Missing data

## Continuous Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Pre-deployment checks

### CI Configuration
```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm run test:ci
  
- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Debugging Tests

### Run specific test file
```bash
npm test dashboard.test.js
```

### Run tests matching pattern
```bash
npm test -- --testNamePattern="creates a new resume"
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal"
}
```

## Future Enhancements

- [ ] Add visual regression tests
- [ ] Implement performance tests
- [ ] Add accessibility tests (a11y)
- [ ] Expand E2E test coverage
- [ ] Add mutation testing
- [ ] Implement snapshot testing for components
- [ ] Add load testing for API endpoints

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Troubleshooting

### Common Issues

**Issue: Tests timeout**
```javascript
// Increase timeout for specific test
it('slow operation', async () => {
  // test code
}, 10000) // 10 second timeout
```

**Issue: Module not found**
- Check jest.config.js moduleNameMapper
- Verify import paths use correct aliases

**Issue: Async tests fail**
- Use waitFor for async operations
- Ensure proper cleanup with act()

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain coverage above 80%
4. Update this documentation
