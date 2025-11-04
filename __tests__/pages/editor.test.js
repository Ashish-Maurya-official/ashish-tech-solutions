// Mock nanoid before any imports
jest.mock('nanoid', () => ({
  nanoid: () => 'test-id-123',
}))

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import EditorNew from '@/pages/editor'
import { store } from '@/store/store'

// Mock Next.js router
const mockPush = jest.fn()
const mockReload = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    reload: mockReload,
    query: {},
  }),
}))

// Mock export utilities
jest.mock('@/utils/exportCanvas', () => ({
  exportToPNG: jest.fn(() => Promise.resolve({ success: true })),
  exportToJPG: jest.fn(() => Promise.resolve({ success: true })),
  exportToPDF: jest.fn(() => Promise.resolve({ success: true })),
}))

// Mock project storage
jest.mock('@/utils/projectStorage', () => ({
  saveProject: jest.fn(() => ({ success: true })),
  loadProject: jest.fn(() => ({ success: true, project: {}, timestamp: Date.now() })),
  autoSaveProject: jest.fn(() => ({ success: true })),
  formatSaveTime: jest.fn(() => '2:30 PM'),
}))

// Mock keyboard shortcuts hook
jest.mock('@/hooks/useKeyboardShortcuts', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('Editor Page (New Canva-style)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders editor without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <EditorNew />
      </Provider>
    )

    // Check that editor renders
    expect(container).toBeInTheDocument()
  })

  it('initializes with default project state', () => {
    const { container } = render(
      <Provider store={store}>
        <EditorNew />
      </Provider>
    )

    const state = store.getState().editor
    expect(state.project).toBeDefined()
    expect(state.project.pages).toBeDefined()
    expect(container).toBeInTheDocument()
  })
})
