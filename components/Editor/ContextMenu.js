import { useEffect } from 'react';

export default function ContextMenu({ 
  position, 
  onClose, 
  actions = [],
  selectedCount = 0 
}) {
  useEffect(() => {
    const handleClickOutside = () => onClose();
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!position) return null;

  return (
    <div
      className="context-menu"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 10000
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="context-menu-content">
        {selectedCount > 1 && (
          <div className="context-menu-header">
            {selectedCount} elements selected
          </div>
        )}
        
        {actions.map((action, index) => (
          action.divider ? (
            <div key={index} className="context-menu-divider" />
          ) : (
            <button
              key={index}
              className={`context-menu-item ${action.danger ? 'danger' : ''} ${action.disabled ? 'disabled' : ''}`}
              onClick={() => {
                if (!action.disabled) {
                  action.onClick();
                  onClose();
                }
              }}
              disabled={action.disabled}
            >
              <span className="context-menu-icon">{action.icon}</span>
              <span className="context-menu-label">{action.label}</span>
              {action.shortcut && (
                <span className="context-menu-shortcut">{action.shortcut}</span>
              )}
            </button>
          )
        ))}
      </div>

      <style jsx>{`
        .context-menu {
          animation: contextMenuFadeIn 0.15s ease-out;
        }

        @keyframes contextMenuFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .context-menu-content {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e7eb;
          min-width: 200px;
          padding: 6px;
        }

        .context-menu-header {
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 6px;
        }

        .context-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 12px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
          transition: all 0.15s;
          text-align: left;
        }

        .context-menu-item:hover:not(.disabled) {
          background: #f3f4f6;
        }

        .context-menu-item.danger {
          color: #ef4444;
        }

        .context-menu-item.danger:hover:not(.disabled) {
          background: #fef2f2;
        }

        .context-menu-item.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .context-menu-icon {
          font-size: 16px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .context-menu-label {
          flex: 1;
        }

        .context-menu-shortcut {
          font-size: 12px;
          color: #9ca3af;
          font-family: monospace;
        }

        .context-menu-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 6px 0;
        }
      `}</style>
    </div>
  );
}
