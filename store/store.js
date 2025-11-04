import { configureStore } from '@reduxjs/toolkit';
import editorReducer, {
  setProjectTitle,
  setCurrentPage,
  addElement,
  updateElement,
  updateMultipleElements,
  deleteElement,
  selectElement,
  clearSelection,
  selectAll,
  groupElements,
  ungroupElements,
  alignElements,
  setHoveredElement,
  copy,
  paste,
  duplicate,
  bringForward,
  sendBackward,
  lockElement,
  undo,
  redo,
  toggleLeftSidebar,
  toggleRightSidebar,
  setActiveLeftTab,
  setZoomLevel,
  zoomIn,
  zoomOut,
  resetZoom,
  toggleGrid,
  toggleSnapToGrid,
  toggleSnapToElements,
  setGridSize,
  addPage,
  duplicatePage,
  deletePage,
  updatePageStyle,
  loadProject
} from './slices/editorSlice';

// Re-export actions
export {
  setProjectTitle,
  setCurrentPage,
  addElement,
  updateElement,
  updateMultipleElements,
  deleteElement,
  selectElement,
  clearSelection,
  selectAll,
  groupElements,
  ungroupElements,
  alignElements,
  setHoveredElement,
  copy,
  paste,
  duplicate,
  bringForward,
  sendBackward,
  lockElement,
  undo,
  redo,
  toggleLeftSidebar,
  toggleRightSidebar,
  setActiveLeftTab,
  setZoomLevel,
  zoomIn,
  zoomOut,
  resetZoom,
  toggleGrid,
  toggleSnapToGrid,
  toggleSnapToElements,
  setGridSize,
  addPage,
  duplicatePage,
  deletePage,
  updatePageStyle,
  loadProject
};

export const store = configureStore({
  reducer: {
    editor: editorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['editor/loadProject'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'payload.createdAt', 'payload.updatedAt'],
        // Ignore these paths in the state
        ignoredPaths: ['editor.project.createdAt', 'editor.project.updatedAt']
      }
    })
});

// Selectors
export const selectProject = (state) => state.editor.project;
export const selectCurrentPage = (state) => {
  const pageId = state.editor.currentPageId || state.editor.project.pages[0]?.id;
  return state.editor.project.pages.find(p => p.id === pageId) || state.editor.project.pages[0];
};
export const selectCurrentPageElements = (state) => {
  const page = selectCurrentPage(state);
  return page?.elements || [];
};
export const selectSelectedElements = (state) => {
  const elements = selectCurrentPageElements(state);
  return elements.filter(el => state.editor.selectedElementIds.includes(el.id));
};
export const selectCanUndo = (state) => state.editor.historyIndex >= 0;
export const selectCanRedo = (state) => state.editor.historyIndex < state.editor.history.length - 1;
export const selectZoomLevel = (state) => state.editor.zoomLevel;
export const selectLeftSidebarOpen = (state) => state.editor.leftSidebarOpen;
export const selectRightSidebarOpen = (state) => state.editor.rightSidebarOpen;
export const selectActiveLeftTab = (state) => state.editor.activeLeftTab;
export const selectGridSettings = (state) => state.editor.project.settings;

export default store;
