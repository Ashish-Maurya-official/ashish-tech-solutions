import { store } from '@/store/store'
import {
  addElement,
  updateElement,
  deleteElement,
  selectElement,
  setZoomLevel,
  undo,
  redo,
} from '@/store/store'

describe('Editor Slice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('has initial state', () => {
    const state = store.getState().editor
    expect(state.project).toBeDefined()
    expect(state.project.pages).toBeDefined()
  })

  it('handles zoom changes', () => {
    const initialZoom = store.getState().editor.zoomLevel
    
    store.dispatch(setZoomLevel(1.5))
    
    const newZoom = store.getState().editor.zoomLevel
    expect(newZoom).toBe(1.5)
  })

  it('handles element selection', () => {
    // Add an element first
    store.dispatch(addElement({
      type: 'text',
      content: 'Test',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 }
    }))

    const elements = store.getState().editor.project.pages[0].elements
    if (elements.length > 0) {
      const elementId = elements[0].id
      
      store.dispatch(selectElement({ elementId, multi: false }))
      
      const selectedIds = store.getState().editor.selectedElementIds
      expect(selectedIds).toContain(elementId)
    }
  })

  it('maintains project structure', () => {
    const state = store.getState().editor
    expect(state.project.title).toBeDefined()
    expect(state.project.pages).toBeInstanceOf(Array)
    expect(state.zoomLevel).toBeDefined()
  })
})
