import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TopToolbar from '../components/Editor/TopToolbar';
import LeftSidebar from '../components/Editor/LeftSidebar';
import RightSidebar from '../components/Editor/RightSidebar';
import BottomBar from '../components/Editor/BottomBar';
import BlankCanvas from '../components/Editor/BlankCanvas';
import ExportModal from '../components/Editor/ExportModal';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { exportToPNG, exportToJPG, exportToPDF } from '../utils/exportCanvas';
import { saveProject, loadProject, autoSaveProject, formatSaveTime } from '../utils/projectStorage';
import {
  setProjectTitle,
  setCurrentPage,
  undo,
  redo,
  zoomIn,
  zoomOut,
  resetZoom,
  selectProject,
  selectCanUndo,
  selectCanRedo,
  selectZoomLevel,
  selectCurrentPage,
  selectCurrentPageElements,
  selectSelectedElements,
  selectElement,
  selectAll,
  selectGridSettings,
  updateElement as updateElementAction,
  updateMultipleElements,
  deleteElement as deleteElementAction,
  duplicate,
  copy,
  paste,
  bringForward,
  sendBackward,
  lockElement,
  groupElements,
  ungroupElements,
  alignElements,
  clearSelection
} from '../store/store';

export default function EditorNew() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Expose store to window for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../store/store').then(module => {
        window.store = module.store;
        console.log('Store exposed to window.store for debugging');
      });
    }
  }, []);
  
  // Redux selectors
  const project = useSelector(selectProject);
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);
  const zoomLevel = useSelector(selectZoomLevel);
  const currentPage = useSelector(selectCurrentPage);
  const elements = useSelector(selectCurrentPageElements);
  const selectedElements = useSelector(selectSelectedElements);
  const selectedElementIds = useSelector(state => state.editor.selectedElementIds);
  const currentPageId = useSelector(state => state.editor.currentPageId);
  const gridSettings = useSelector(selectGridSettings);

  // Debug logging
  useEffect(() => {
    console.log('Editor State:', {
      currentPageId,
      currentPage: currentPage?.name,
      elementsCount: elements?.length,
      elements: elements
    });
  }, [currentPageId, currentPage, elements]);

  // Initialize current page on mount
  useEffect(() => {
    if (!currentPageId && project.pages.length > 0) {
      console.log('Initializing current page:', project.pages[0].id);
      dispatch(setCurrentPage(project.pages[0].id));
    }
  }, [currentPageId, dispatch, project.pages]);

  // Handlers
  const handleSave = () => {
    const result = saveProject(project);
    if (result.success) {
      alert('✅ Project saved successfully!');
    } else {
      alert(`❌ Save failed: ${result.error}`);
    }
  };

  const handleLoad = () => {
    if (confirm('Load saved project? Any unsaved changes will be lost.')) {
      const result = loadProject();
      if (result.success) {
        dispatch(loadProject(result.project));
        alert(`✅ Project loaded! Last saved: ${formatSaveTime(result.timestamp)}`);
      } else {
        alert(`❌ Load failed: ${result.error}`);
      }
    }
  };

  // Keyboard shortcuts using custom hook
  useKeyboardShortcuts({
    onUndo: () => dispatch(undo()),
    onRedo: () => dispatch(redo()),
    onDelete: () => {
      if (selectedElementIds.length > 0) {
        selectedElementIds.forEach(id => dispatch(deleteElementAction(id)));
      }
    },
    onDuplicate: () => {
      if (selectedElementIds.length > 0) {
        selectedElementIds.forEach(id => dispatch(duplicate()));
      }
    },
    onSave: handleSave,
    onCopy: () => {
      if (selectedElementIds.length > 0) {
        dispatch(copy());
      }
    },
    onPaste: () => {
      dispatch(paste());
    },
    onSelectAll: () => dispatch(selectAll()),
    onNudge: (direction) => {
      if (selectedElementIds.length > 0) {
        const updates = selectedElementIds.map(id => {
          const element = elements.find(el => el.id === id);
          if (element) {
            return {
              elementId: id,
              updates: {
                position: {
                  x: element.position.x + direction.x,
                  y: element.position.y + direction.y
                }
              }
            };
          }
          return null;
        }).filter(Boolean);
        
        if (updates.length > 0) {
          dispatch(updateMultipleElements(updates));
        }
      }
    },
    onBringForward: () => {
      if (selectedElementIds.length > 0) {
        selectedElementIds.forEach(id => dispatch(bringForward(id)));
      }
    },
    onSendBackward: () => {
      if (selectedElementIds.length > 0) {
        selectedElementIds.forEach(id => dispatch(sendBackward(id)));
      }
    },
    onGroup: () => {
      if (selectedElementIds.length >= 2) {
        dispatch(groupElements());
      }
    },
    onUngroup: () => {
      if (selectedElementIds.length > 0) {
        dispatch(ungroupElements());
      }
    },
    enabled: true
  });

  // Additional keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape - Clear selection
      if (e.key === 'Escape') {
        dispatch(clearSelection());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSave = setInterval(() => {
      const result = autoSaveProject(project);
      if (result.success) {
        console.log('✅ Auto-saved at', new Date().toLocaleTimeString());
      }
    }, 30000); // 30 seconds

    return () => clearInterval(autoSave);
  }, [project]);

  // Additional handlers
  const handleNew = () => {
    if (confirm('Create a new design? Unsaved changes will be lost.')) {
      router.reload();
    }
  };

  const handleElementSelect = (elementId, isMultiSelect = false) => {
    if (elementId) {
      dispatch(selectElement({ elementId, multi: isMultiSelect }));
    } else {
      dispatch(clearSelection());
    }
  };

  const handleElementUpdate = (elementId, updates) => {
    dispatch(updateElementAction({ elementId, updates }));
  };

  const handleBatchUpdate = (updates) => {
    dispatch(updateMultipleElements(updates));
  };

  const handleElementDuplicate = (elementId) => {
    dispatch(duplicate());
  };

  const handleElementBringForward = (elementId) => {
    dispatch(bringForward(elementId));
  };

  const handleElementSendBackward = (elementId) => {
    dispatch(sendBackward(elementId));
  };

  const handleElementLock = (elementId, locked) => {
    dispatch(lockElement({ elementId, locked }));
  };

  const handleElementDelete = (elementId) => {
    dispatch(deleteElementAction(elementId));
  };

  const handleAlign = (alignment) => {
    dispatch(alignElements({ alignment }));
  };

  const handleExport = async (options) => {
    setIsExporting(true);
    setShowExportModal(false);

    try {
      console.log('Starting export with options:', options);
      
      // Get the canvas element
      const canvasElement = document.querySelector('.canvas-wrapper');
      console.log('Canvas element found:', canvasElement);
      
      if (!canvasElement) {
        throw new Error('Canvas not found - make sure you have elements on the canvas');
      }

      const filename = `${project.title || 'design'}.${options.format}`;
      console.log('Export filename:', filename);

      let result;
      switch (options.format) {
        case 'png':
          result = await exportToPNG(canvasElement, filename, {
            transparent: options.transparent,
            scale: options.scale
          });
          break;
        case 'jpg':
          result = await exportToJPG(canvasElement, filename, {
            quality: options.quality,
            scale: options.scale
          });
          break;
        case 'pdf':
          result = await exportToPDF(canvasElement, filename, {
            pageWidth: currentPage?.width || 210,
            pageHeight: currentPage?.height || 297
          });
          break;
        default:
          throw new Error('Unsupported format');
      }

      if (result.success) {
        alert('Export successful!');
      } else {
        alert(`Export failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{project.title} - DesignPro Editor</title>
        <meta name="description" content="Professional Canva-style design editor" />
      </Head>

      <div className="canva-editor">
        {/* Top Toolbar */}
        <TopToolbar
          projectTitle={project.title}
          onTitleChange={(title) => dispatch(setProjectTitle(title))}
          onNew={handleNew}
          onSave={handleSave}
          onLoad={handleLoad}
          onExport={() => setShowExportModal(true)}
          onUndo={() => dispatch(undo())}
          onRedo={() => dispatch(redo())}
          canUndo={canUndo}
          canRedo={canRedo}
          zoomLevel={zoomLevel}
          onZoomIn={() => dispatch(zoomIn())}
          onZoomOut={() => dispatch(zoomOut())}
          onZoomReset={() => dispatch(resetZoom())}
        />

        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Canvas Area */}
        <main className="canvas-area">
          <div className="canvas-container">
            <div 
              className="canvas-wrapper"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center top'
              }}
            >
              <BlankCanvas
                elements={elements}
                pageStyle={{
                  width: `${currentPage?.width}mm`,
                  minHeight: `${currentPage?.height}mm`,
                  backgroundColor: currentPage?.backgroundColor || '#ffffff',
                  backgroundImage: currentPage?.backgroundImage || undefined
                }}
                onElementSelect={handleElementSelect}
                onElementUpdate={handleElementUpdate}
                onBatchUpdate={handleBatchUpdate}
                onElementDelete={handleElementDelete}
                onElementDuplicate={handleElementDuplicate}
                onElementBringForward={handleElementBringForward}
                onAlign={handleAlign}
                onElementSendBackward={handleElementSendBackward}
                onElementLock={handleElementLock}
                selectedElementId={selectedElementIds[0]}
                selectedElementIds={selectedElementIds}
                gridSettings={gridSettings}
                isEditing={true}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />

        {/* Bottom Bar */}
        <BottomBar />

        {/* Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
          projectTitle={project.title}
        />

        {/* Export Loading Overlay */}
        {isExporting && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001
          }}>
            <div style={{
              background: 'white',
              padding: '24px 32px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
              <div style={{ fontSize: '16px', fontWeight: 500 }}>Exporting...</div>
            </div>
          </div>
        )}

        <style jsx>{`
          .canva-editor {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #F9FAFB;
            overflow: hidden;
          }

          .canvas-area {
            position: fixed;
            left: 332px; /* 72px tabs + 260px content */
            right: 300px; /* right sidebar */
            top: 60px; /* toolbar */
            bottom: 40px; /* bottom bar */
            overflow: auto;
            background: #F9FAFB;
            transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
          }

          .canvas-container {
            min-height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 40px 20px;
          }

          .canvas-wrapper {
            transition: transform 0.2s ease-in-out;
          }

          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .canvas-area {
              left: 72px;
              right: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
}
