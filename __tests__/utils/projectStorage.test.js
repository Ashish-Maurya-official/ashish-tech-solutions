describe('Project Storage Utilities', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    
    // Setup localStorage mock
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    }
    
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
  })

  it('saves a project to localStorage', () => {
    const { saveProject } = require('@/utils/projectStorage')
    
    const project = {
      id: 'test-123',
      title: 'Test Project',
      pages: [],
    }

    const result = saveProject(project)
    
    expect(global.localStorage.setItem).toHaveBeenCalled()
    expect(result.success).toBe(true)
  })

  it('loads a project from localStorage', () => {
    const project = {
      id: 'test-123',
      title: 'Test Project',
      pages: [],
    }

    global.localStorage.getItem.mockImplementation((key) => {
      if (key === 'canva-editor-project') {
        return JSON.stringify(project)
      }
      if (key === 'canva-editor-project-timestamp') {
        return Date.now().toString()
      }
      return null
    })

    const { loadProject } = require('@/utils/projectStorage')
    const result = loadProject()
    
    expect(result.success).toBe(true)
    expect(result.project).toBeDefined()
  })

  it('handles load failure gracefully', () => {
    global.localStorage.getItem.mockReturnValue(null)

    const { loadProject } = require('@/utils/projectStorage')
    const result = loadProject()
    
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('auto-saves project', () => {
    const { autoSaveProject } = require('@/utils/projectStorage')
    
    const project = {
      id: 'test-123',
      title: 'Test Project',
      pages: [],
    }

    const result = autoSaveProject(project)
    
    expect(global.localStorage.setItem).toHaveBeenCalled()
    expect(result.success).toBe(true)
  })

  it('formats save time correctly', () => {
    const { formatSaveTime } = require('@/utils/projectStorage')
    
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    const oneHourAgo = now - 3600000
    
    expect(formatSaveTime(now)).toBe('Just now')
    expect(formatSaveTime(oneMinuteAgo)).toContain('minute')
    expect(formatSaveTime(oneHourAgo)).toContain('hour')
    expect(formatSaveTime(null)).toBe('Never')
  })
})
