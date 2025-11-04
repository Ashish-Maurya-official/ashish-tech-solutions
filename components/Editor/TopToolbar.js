import { useState } from 'react';

export default function TopToolbar({ 
  projectTitle,
  onTitleChange,
  onNew,
  onSave,
  onLoad,
  onExport,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomReset
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);

  return (
    <div className="top-toolbar">
      {/* Left Section */}
      <div className="toolbar-left">
        <div className="toolbar-logo">
          <span className="logo-icon">🎨</span>
          <span className="logo-text">DesignPro</span>
        </div>

        {/* File Menu */}
        <div className="toolbar-dropdown">
          <button 
            className="toolbar-btn"
            onClick={() => setShowFileMenu(!showFileMenu)}
          >
            File
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8L2 4h8z"/>
            </svg>
          </button>
          {showFileMenu && (
            <div className="dropdown-menu">
              <button onClick={(e) => {
                e.stopPropagation();
                onNew?.();
                setTimeout(() => setShowFileMenu(false), 0);
              }}>
                <span>📄</span> New Design
              </button>
              <button onClick={(e) => {
                e.stopPropagation();
                onSave?.();
                setTimeout(() => setShowFileMenu(false), 0);
              }}>
                <span>💾</span> Save
              </button>
              <button onClick={(e) => {
                e.stopPropagation();
                onLoad?.();
                setTimeout(() => setShowFileMenu(false), 0);
              }}>
                <span>📂</span> Load
              </button>
              <div className="dropdown-divider"></div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onExport?.();
                  setTimeout(() => setShowFileMenu(false), 0);
                }}
              >
                <span>📥</span> Export
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center Section */}
      <div className="toolbar-center">
        {/* Undo/Redo */}
        <div className="toolbar-group">
          <button 
            className="toolbar-icon-btn"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M8 5L3 10L8 15M3 10H17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="toolbar-icon-btn"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M12 5L17 10L12 15M17 10H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="toolbar-group">
          <button 
            className="toolbar-icon-btn"
            onClick={onZoomOut}
            title="Zoom Out"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <circle cx="9" cy="9" r="6" strokeWidth="2"/>
              <path d="M6 9h6M14 14l4 4" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button 
            className="toolbar-zoom-display"
            onClick={onZoomReset}
            title="Reset Zoom"
          >
            {Math.round(zoomLevel * 200)}%
          </button>
          <button 
            className="toolbar-icon-btn"
            onClick={onZoomIn}
            title="Zoom In"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <circle cx="9" cy="9" r="6" strokeWidth="2"/>
              <path d="M6 9h6M9 6v6M14 14l4 4" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Project Title */}
        <div className="toolbar-title">
          {isEditingTitle ? (
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              autoFocus
              className="title-input"
            />
          ) : (
            <div 
              className="title-display"
              onClick={() => setIsEditingTitle(true)}
            >
              {projectTitle || 'Untitled Design'}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="toolbar-right">
        <button className="toolbar-btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M13 9v4H3V9M11 5L8 2L5 5M8 2v9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Share
        </button>
        <div className="toolbar-avatar">
          <div className="avatar-circle">U</div>
        </div>
      </div>

      <style jsx>{`
        .top-toolbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          z-index: 1000;
        }

        .toolbar-left,
        .toolbar-center,
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .toolbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 18px;
          color: #111827;
          margin-right: 12px;
        }

        .logo-icon {
          font-size: 24px;
        }

        .toolbar-btn,
        .toolbar-icon-btn {
          padding: 8px 12px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s;
        }

        .toolbar-btn:hover,
        .toolbar-icon-btn:hover {
          background: #f3f4f6;
        }

        .toolbar-icon-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .toolbar-icon-btn:disabled:hover {
          background: transparent;
        }

        .toolbar-group {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0 8px;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
        }

        .toolbar-zoom-display {
          padding: 6px 12px;
          border: none;
          background: #f3f4f6;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          min-width: 60px;
          text-align: center;
        }

        .toolbar-zoom-display:hover {
          background: #e5e7eb;
        }

        .toolbar-title {
          padding: 0 16px;
        }

        .title-display {
          padding: 8px 16px;
          border-radius: 6px;
          cursor: text;
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          transition: background 0.15s;
        }

        .title-display:hover {
          background: #f3f4f6;
        }

        .title-input {
          padding: 8px 16px;
          border: 2px solid #1A73E8;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          outline: none;
          min-width: 200px;
        }

        .toolbar-btn-primary {
          padding: 10px 20px;
          border: none;
          background: #1A73E8;
          color: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s;
        }

        .toolbar-btn-primary:hover {
          background: #1557b0;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
        }

        .toolbar-avatar {
          margin-left: 8px;
        }

        .avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.15s;
        }

        .avatar-circle:hover {
          transform: scale(1.05);
        }

        .toolbar-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          min-width: 200px;
          padding: 8px;
          z-index: 1001;
        }

        .dropdown-menu button {
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: transparent;
          text-align: left;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.15s;
        }

        .dropdown-menu button:hover {
          background: #f3f4f6;
        }

        .dropdown-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 8px 0;
        }
      `}</style>
    </div>
  );
}
