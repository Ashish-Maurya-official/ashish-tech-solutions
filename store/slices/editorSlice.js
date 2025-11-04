import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  // Project data
  project: {
    id: nanoid(),
    title: 'Untitled Design',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pages: [
      {
        id: nanoid(),
        name: 'Page 1',
        width: 210, // mm (A4)
        height: 297, // mm (A4)
        backgroundColor: '#ffffff',
        elements: []
      }
    ],
    settings: {
      defaultPageSize: 'a4',
      gridEnabled: false,
      gridSize: 10,
      snapToGrid: false,
      snapToElements: true,
      rulersVisible: false
    }
  },

  // Current state
  currentPageId: null,
  selectedElementIds: [],
  hoveredElementId: null,
  clipboard: [],

  // UI state
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  activeLeftTab: 'elements',
  zoomLevel: 0.5,

  // History
  history: [],
  historyIndex: -1
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // Project actions
    setProjectTitle: (state, action) => {
      state.project.title = action.payload;
      state.project.updatedAt = new Date().toISOString();
    },

    setCurrentPage: (state, action) => {
      state.currentPageId = action.payload;
    },

    // Element actions
    addElement: (state, action) => {
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      const newElement = {
        id: nanoid(),
        position: { x: 100, y: 100 },
        size: { width: 200, height: 100 },
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        zIndex: currentPage.elements.length,
        ...action.payload
      };

      currentPage.elements.push(newElement);
      state.selectedElementIds = [newElement.id];
      state.project.updatedAt = new Date().toISOString();

      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({
        action: 'add_element',
        data: { element: newElement },
        timestamp: Date.now()
      });
      state.historyIndex = state.history.length - 1;

      // Limit history to 50 items
      if (state.history.length > 50) {
        state.history.shift();
        state.historyIndex--;
      }
    },

    updateElement: (state, action) => {
      const { elementId, updates } = action.payload;
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      const element = currentPage.elements.find(el => el.id === elementId);
      if (!element) return;

      // Store before state for history
      const before = { ...element };

      // Apply updates
      Object.assign(element, updates);
      state.project.updatedAt = new Date().toISOString();

      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({
        action: 'update_element',
        data: { elementId, before, after: { ...element } },
        timestamp: Date.now()
      });
      state.historyIndex = state.history.length - 1;

      if (state.history.length > 50) {
        state.history.shift();
        state.historyIndex--;
      }
    },

    updateMultipleElements: (state, action) => {
      const updates = action.payload; // Array of { elementId, updates }
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      // Apply all updates
      updates.forEach(({ elementId, updates: elementUpdates }) => {
        const element = currentPage.elements.find(el => el.id === elementId);
        if (element) {
          Object.assign(element, elementUpdates);
        }
      });

      state.project.updatedAt = new Date().toISOString();

      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({
        action: 'update_multiple_elements',
        data: { updates },
        timestamp: Date.now()
      });
      state.historyIndex = state.history.length - 1;

      if (state.history.length > 50) {
        state.history.shift();
        state.historyIndex--;
      }
    },

    deleteElement: (state, action) => {
      const elementId = action.payload;
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      const element = currentPage.elements.find(el => el.id === elementId);
      if (!element) return;

      // Add to history before deleting
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({
        action: 'delete_element',
        data: { element: { ...element } },
        timestamp: Date.now()
      });
      state.historyIndex = state.history.length - 1;

      if (state.history.length > 50) {
        state.history.shift();
        state.historyIndex--;
      }

      // Delete element
      currentPage.elements = currentPage.elements.filter(el => el.id !== elementId);
      state.selectedElementIds = state.selectedElementIds.filter(id => id !== elementId);
      state.project.updatedAt = new Date().toISOString();
    },

    // Selection actions
    selectElement: (state, action) => {
      const { elementId, multi } = action.payload;

      if (multi) {
        const isSelected = state.selectedElementIds.includes(elementId);
        if (isSelected) {
          state.selectedElementIds = state.selectedElementIds.filter(id => id !== elementId);
        } else {
          state.selectedElementIds.push(elementId);
        }
      } else {
        state.selectedElementIds = [elementId];
      }
    },

    clearSelection: (state) => {
      state.selectedElementIds = [];
    },

    selectAll: (state) => {
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      state.selectedElementIds = currentPage.elements
        .filter(el => !el.locked)
        .map(el => el.id);
    },

    setHoveredElement: (state, action) => {
      state.hoveredElementId = action.payload;
    },

    // Clipboard actions
    copy: (state) => {
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      state.clipboard = currentPage.elements
        .filter(el => state.selectedElementIds.includes(el.id))
        .map(el => ({ ...el }));
    },

    paste: (state) => {
      if (state.clipboard.length === 0) return;

      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      const newElements = state.clipboard.map(el => ({
        ...el,
        id: nanoid(),
        position: {
          x: el.position.x + 20,
          y: el.position.y + 20
        }
      }));

      currentPage.elements.push(...newElements);
      state.selectedElementIds = newElements.map(el => el.id);
      state.project.updatedAt = new Date().toISOString();
    },

    duplicate: (state) => {
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      const selectedElements = currentPage.elements.filter(el =>
        state.selectedElementIds.includes(el.id)
      );

      const newElements = selectedElements.map(el => ({
        ...el,
        id: nanoid(),
        position: {
          x: el.position.x + 20,
          y: el.position.y + 20
        }
      }));

      currentPage.elements.push(...newElements);
      state.selectedElementIds = newElements.map(el => el.id);
      state.project.updatedAt = new Date().toISOString();
    },

    // Layer order actions
    bringForward: (state, action) => {
      const elementId = action.payload;
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      const index = currentPage.elements.findIndex(el => el.id === elementId);
      if (index < currentPage.elements.length - 1) {
        // Create new array to ensure React detects the change
        const newElements = [...currentPage.elements];
        const element = newElements[index];
        newElements.splice(index, 1);
        newElements.splice(index + 1, 0, element);
        currentPage.elements = newElements;
        state.project.updatedAt = new Date().toISOString();
      }
    },

    sendBackward: (state, action) => {
      const elementId = action.payload;
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      const index = currentPage.elements.findIndex(el => el.id === elementId);
      if (index > 0) {
        // Create new array to ensure React detects the change
        const newElements = [...currentPage.elements];
        const element = newElements[index];
        newElements.splice(index, 1);
        newElements.splice(index - 1, 0, element);
        currentPage.elements = newElements;
        state.project.updatedAt = new Date().toISOString();
      }
    },

    lockElement: (state, action) => {
      const { elementId, locked } = action.payload;
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      const element = currentPage.elements.find(el => el.id === elementId);
      if (element) {
        element.locked = locked;
        state.project.updatedAt = new Date().toISOString();
      }
    },

    // History actions
    undo: (state) => {
      if (state.historyIndex < 0) return;

      const historyItem = state.history[state.historyIndex];
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      switch (historyItem.action) {
        case 'add_element':
          // Remove the added element
          currentPage.elements = currentPage.elements.filter(
            el => el.id !== historyItem.data.element.id
          );
          state.selectedElementIds = state.selectedElementIds.filter(
            id => id !== historyItem.data.element.id
          );
          break;

        case 'delete_element':
          // Re-add the deleted element
          currentPage.elements.push(historyItem.data.element);
          break;

        case 'update_element':
          // Restore previous state
          const element = currentPage.elements.find(
            el => el.id === historyItem.data.elementId
          );
          if (element) {
            Object.assign(element, historyItem.data.before);
          }
          break;
      }

      state.historyIndex--;
    },

    redo: (state) => {
      if (state.historyIndex >= state.history.length - 1) return;

      const historyItem = state.history[state.historyIndex + 1];
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      switch (historyItem.action) {
        case 'add_element':
          // Re-add the element
          currentPage.elements.push(historyItem.data.element);
          state.selectedElementIds = [historyItem.data.element.id];
          break;

        case 'delete_element':
          // Remove the element again
          currentPage.elements = currentPage.elements.filter(
            el => el.id !== historyItem.data.element.id
          );
          state.selectedElementIds = state.selectedElementIds.filter(
            id => id !== historyItem.data.element.id
          );
          break;

        case 'update_element':
          // Apply the update again
          const element = currentPage.elements.find(
            el => el.id === historyItem.data.elementId
          );
          if (element) {
            Object.assign(element, historyItem.data.after);
          }
          break;
      }

      state.historyIndex++;
    },

    // UI actions
    toggleLeftSidebar: (state) => {
      state.leftSidebarOpen = !state.leftSidebarOpen;
    },

    toggleRightSidebar: (state) => {
      state.rightSidebarOpen = !state.rightSidebarOpen;
    },

    setActiveLeftTab: (state, action) => {
      state.activeLeftTab = action.payload;
    },

    setZoomLevel: (state, action) => {
      state.zoomLevel = Math.max(0.1, Math.min(3, action.payload));
    },

    zoomIn: (state) => {
      state.zoomLevel = Math.min(1.5, state.zoomLevel + 0.05);
    },

    zoomOut: (state) => {
      state.zoomLevel = Math.max(0.05, state.zoomLevel - 0.05);
    },

    resetZoom: (state) => {
      state.zoomLevel = 0.5;
    },

    // Grid and snap actions
    toggleGrid: (state) => {
      state.project.settings.gridEnabled = !state.project.settings.gridEnabled;
    },

    toggleSnapToGrid: (state) => {
      state.project.settings.snapToGrid = !state.project.settings.snapToGrid;
    },

    toggleSnapToElements: (state) => {
      state.project.settings.snapToElements = !state.project.settings.snapToElements;
    },

    setGridSize: (state, action) => {
      state.project.settings.gridSize = Math.max(5, Math.min(100, action.payload));
    },

    // Page actions
    addPage: (state) => {
      const newPage = {
        id: nanoid(),
        name: `Page ${state.project.pages.length + 1}`,
        width: 210,
        height: 297,
        backgroundColor: '#ffffff',
        elements: []
      };

      state.project.pages.push(newPage);
      state.currentPageId = newPage.id;
      state.project.updatedAt = new Date().toISOString();
    },

    duplicatePage: (state, action) => {
      const pageId = action.payload;
      const pageIndex = state.project.pages.findIndex(p => p.id === pageId);
      
      if (pageIndex === -1) return;

      const originalPage = state.project.pages[pageIndex];
      const newPage = {
        ...originalPage,
        id: nanoid(),
        name: `${originalPage.name} Copy`,
        elements: originalPage.elements.map(el => ({
          ...el,
          id: nanoid()
        }))
      };

      state.project.pages.splice(pageIndex + 1, 0, newPage);
      state.currentPageId = newPage.id;
      state.project.updatedAt = new Date().toISOString();
    },

    deletePage: (state, action) => {
      if (state.project.pages.length === 1) return;

      const pageId = action.payload;
      state.project.pages = state.project.pages.filter(p => p.id !== pageId);

      if (state.currentPageId === pageId) {
        state.currentPageId = state.project.pages[0].id;
      }

      state.project.updatedAt = new Date().toISOString();
    },

    updatePageStyle: (state, action) => {
      const { property, value } = action.payload;
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage) return;

      currentPage[property] = value;
      state.project.updatedAt = new Date().toISOString();
    },

    // Load project
    loadProject: (state, action) => {
      return {
        ...initialState,
        ...action.payload,
        currentPageId: action.payload.project.pages[0]?.id,
        selectedElementIds: [],
        history: [],
        historyIndex: -1
      };
    },

    // Grouping actions
    groupElements: (state) => {
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage || state.selectedElementIds.length < 2) return;

      // Create a group
      const groupId = nanoid();
      const selectedElements = currentPage.elements.filter(el =>
        state.selectedElementIds.includes(el.id)
      );

      // Calculate group bounds
      const bounds = {
        left: Math.min(...selectedElements.map(el => el.position.x)),
        top: Math.min(...selectedElements.map(el => el.position.y)),
        right: Math.max(...selectedElements.map(el => el.position.x + el.size.width)),
        bottom: Math.max(...selectedElements.map(el => el.position.y + el.size.height))
      };

      // Mark elements as grouped and store relative positions
      selectedElements.forEach(element => {
        element.groupId = groupId;
        element.groupOffset = {
          x: element.position.x - bounds.left,
          y: element.position.y - bounds.top
        };
      });

      state.project.updatedAt = new Date().toISOString();
    },

    ungroupElements: (state) => {
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage || state.selectedElementIds.length === 0) return;

      // Get the group IDs of selected elements
      const groupIds = new Set();
      currentPage.elements.forEach(el => {
        if (state.selectedElementIds.includes(el.id) && el.groupId) {
          groupIds.add(el.groupId);
        }
      });

      // Remove groupId from all elements in these groups
      currentPage.elements.forEach(element => {
        if (groupIds.has(element.groupId)) {
          delete element.groupId;
          delete element.groupOffset;
        }
      });

      state.project.updatedAt = new Date().toISOString();
    },

    // Alignment actions
    alignElements: (state, action) => {
      const { alignment } = action.payload;
      const currentPageId = state.currentPageId || state.project.pages[0]?.id;
      const currentPage = state.project.pages.find(p => p.id === currentPageId);

      if (!currentPage || state.selectedElementIds.length < 2) return;

      const selectedElements = currentPage.elements.filter(el =>
        state.selectedElementIds.includes(el.id)
      );

      // Calculate bounds
      const bounds = {
        left: Math.min(...selectedElements.map(el => el.position.x)),
        right: Math.max(...selectedElements.map(el => el.position.x + el.size.width)),
        top: Math.min(...selectedElements.map(el => el.position.y)),
        bottom: Math.max(...selectedElements.map(el => el.position.y + el.size.height))
      };

      selectedElements.forEach(element => {
        switch (alignment) {
          case 'alignLeft':
            element.position.x = bounds.left;
            break;
          case 'alignCenterH':
            const centerX = (bounds.left + bounds.right) / 2;
            element.position.x = centerX - element.size.width / 2;
            break;
          case 'alignRight':
            element.position.x = bounds.right - element.size.width;
            break;
          case 'alignTop':
            element.position.y = bounds.top;
            break;
          case 'alignCenterV':
            const centerY = (bounds.top + bounds.bottom) / 2;
            element.position.y = centerY - element.size.height / 2;
            break;
          case 'alignBottom':
            element.position.y = bounds.bottom - element.size.height;
            break;
          case 'distributeH':
            // Sort by x position
            const sortedH = [...selectedElements].sort((a, b) => a.position.x - b.position.x);
            const totalWidth = sortedH.reduce((sum, el) => sum + el.size.width, 0);
            const spacing = (bounds.right - bounds.left - totalWidth) / (sortedH.length - 1);
            let currentX = bounds.left;
            sortedH.forEach(el => {
              el.position.x = currentX;
              currentX += el.size.width + spacing;
            });
            break;
          case 'distributeV':
            // Sort by y position
            const sortedV = [...selectedElements].sort((a, b) => a.position.y - b.position.y);
            const totalHeight = sortedV.reduce((sum, el) => sum + el.size.height, 0);
            const spacingV = (bounds.bottom - bounds.top - totalHeight) / (sortedV.length - 1);
            let currentY = bounds.top;
            sortedV.forEach(el => {
              el.position.y = currentY;
              currentY += el.size.height + spacingV;
            });
            break;
        }
      });

      state.project.updatedAt = new Date().toISOString();
    }
  }
});

export const {
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
} = editorSlice.actions;

export default editorSlice.reducer;
