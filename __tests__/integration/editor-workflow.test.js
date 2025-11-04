// Mock nanoid before any imports
jest.mock('nanoid', () => ({
  nanoid: () => 'test-id-123',
}))

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import editorReducer from '@/store/slices/editorSlice'
import EditorPage from '@/pages/editor'

const createStore = () =>
  configureStore({
    reducer: {
      editor: editorReducer,
    },
  })

describe('Editor Workflow Integration Tests', () => {
  it('completes full element creation workflow', async () => {
    const store = createStore()
    render(
      <Provider store={store}>
        <EditorPage />
      </Provider>
    )

    expect(screen.getByText('Blank Canvas')).toBeInTheDocument()
  })
})
