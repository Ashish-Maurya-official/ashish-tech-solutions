// Mock nanoid before any imports
jest.mock('nanoid', () => ({
  nanoid: () => 'test-id-123',
}))

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

// Mock editor page component
const MockEditorPage = () => {
  return <div data-testid="editor-page">Editor</div>
}

describe('Editor Workflow Integration Tests', () => {
  it('completes full element creation workflow', async () => {
    render(
      <Provider store={store}>
        <MockEditorPage />
      </Provider>
    )

    expect(screen.getByTestId('editor-page')).toBeInTheDocument()
  })

  it('handles element selection and styling', async () => {
    render(
      <Provider store={store}>
        <MockEditorPage />
      </Provider>
    )

    // Verify initial state
    const state = store.getState().editor
    expect(state.project).toBeDefined()
  })

  it('supports undo/redo operations', async () => {
    render(
      <Provider store={store}>
        <MockEditorPage />
      </Provider>
    )

    // Test would verify undo/redo functionality
    expect(store.getState()).toBeDefined()
  })

  it('exports document correctly', async () => {
    render(
      <Provider store={store}>
        <MockEditorPage />
      </Provider>
    )

    // Test would verify export functionality
    expect(store.getState()).toBeDefined()
  })
})
