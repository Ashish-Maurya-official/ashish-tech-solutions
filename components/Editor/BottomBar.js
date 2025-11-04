import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPage, duplicatePage, setCurrentPage, deletePage, resetZoom, selectProject, selectZoomLevel } from '../../store/store';

export default function BottomBar() {
  const dispatch = useDispatch();
  const project = useSelector(selectProject);
  const zoomLevel = useSelector(selectZoomLevel);
  const currentPageId = useSelector(state => state.editor.currentPageId) || project.pages[0]?.id;
  const [contextMenu, setContextMenu] = useState(null);

  const handlePageContextMenu = (e, page, index) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      page,
      index
    });
  };

  const handleDuplicatePage = (pageId) => {
    dispatch(duplicatePage(pageId));
    setContextMenu(null);
  };

  const handleDeletePage = (pageId) => {
    if (project.pages.length === 1) {
      alert('Cannot delete the last page');
      return;
    }
    if (confirm('Delete this page?')) {
      dispatch(deletePage(pageId));
    }
    setContextMenu(null);
  };

  return (
    <>
      <div className="bottom-bar">
        {/* Pages */}
        <div className="pages-section">
          {project.pages.map((page, index) => (
            <button
              key={page.id}
              className={`page-thumb ${currentPageId === page.id ? 'active' : ''}`}
              onClick={() => dispatch(setCurrentPage(page.id))}
              onContextMenu={(e) => handlePageContextMenu(e, page, index)}
            >
              <div className="page-preview">
                <span>{index + 1}</span>
              </div>
              <span className="page-name">{page.name}</span>
            </button>
          ))}
        
        <button
          className="add-page-btn"
          onClick={() => dispatch(addPage())}
          title="Add new page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M8 3v10M3 8h10" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="zoom-section">
        <span className="zoom-label">{Math.round(zoomLevel * 100)}%</span>
        <button
          className="fit-screen-btn"
          onClick={() => dispatch(resetZoom())}
          title="Fit to screen"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <rect x="2" y="2" width="12" height="12" strokeWidth="1.5" rx="1"/>
            <path d="M6 6L10 10M10 6L6 10" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <style jsx>{`
        .bottom-bar {
          position: fixed;
          bottom: 0;
          left: 72px;
          right: 0;
          height: 40px;
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          z-index: 100;
        }

        .pages-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .page-thumb {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .page-thumb:hover {
          background: #f3f4f6;
        }

        .page-thumb.active {
          background: #eef2ff;
        }

        .page-preview {
          width: 32px;
          height: 40px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
        }

        .page-thumb.active .page-preview {
          border-color: #1A73E8;
          color: #1A73E8;
        }

        .page-name {
          font-size: 11px;
          color: #6b7280;
        }

        .add-page-btn {
          width: 32px;
          height: 32px;
          border: 2px dashed #d1d5db;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          transition: all 0.15s;
        }

        .add-page-btn:hover {
          border-color: #1A73E8;
          color: #1A73E8;
          background: #eef2ff;
        }

        .zoom-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .zoom-label {
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          min-width: 45px;
          text-align: right;
        }

        .fit-screen-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: all 0.15s;
        }

        .fit-screen-btn:hover {
          border-color: #1A73E8;
          color: #1A73E8;
          background: #eef2ff;
        }

        .page-context-menu {
          position: fixed;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          padding: 4px;
          min-width: 160px;
          z-index: 10000;
        }

        .context-menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
          color: #374151;
          transition: background 0.15s;
        }

        .context-menu-item:hover {
          background: #f3f4f6;
        }

        .context-menu-item.danger {
          color: #dc2626;
        }

        .context-menu-item.danger:hover {
          background: #fef2f2;
        }
      `}</style>
    </div>

    {/* Page Context Menu */}
    {contextMenu && (
      <>
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999
          }}
          onClick={() => setContextMenu(null)}
        />
        <div 
          className="page-context-menu"
          style={{
            left: contextMenu.x,
            top: contextMenu.y - 100
          }}
        >
          <button
            className="context-menu-item"
            onClick={() => handleDuplicatePage(contextMenu.page.id)}
          >
            <span>📋</span>
            <span>Duplicate Page</span>
          </button>
          <button
            className="context-menu-item danger"
            onClick={() => handleDeletePage(contextMenu.page.id)}
            disabled={project.pages.length === 1}
          >
            <span>🗑️</span>
            <span>Delete Page</span>
          </button>
        </div>
      </>
    )}
    </>
  );
}
