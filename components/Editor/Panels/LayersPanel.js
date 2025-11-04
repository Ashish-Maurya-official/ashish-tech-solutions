import { useDispatch, useSelector } from 'react-redux';
import { 
  selectCurrentPageElements, 
  selectSelectedElements,
  selectElement,
  clearSelection,
  bringForward,
  sendBackward,
  lockElement,
  deleteElement
} from '../../../store/store';

export default function LayersPanel() {
  const dispatch = useDispatch();
  // Use separate selectors to ensure we get fresh data on any state change
  const elements = useSelector(selectCurrentPageElements);
  const selectedElementIds = useSelector(state => state.editor.selectedElementIds);
  const selectedIds = selectedElementIds;

  const getElementIcon = (type) => {
    const icons = {
      'text': '📝',
      'heading': '📰',
      'rectangle': '▭',
      'circle': '⭕',
      'triangle': '△',
      'star': '⭐',
      'line': '─',
      'arrow-right': '→',
      'arrow-left': '←',
      'arrow-up': '↑',
      'arrow-down': '↓',
      'image': '🖼️',
      'icon': '✨'
    };
    return icons[type] || '📦';
  };

  const getElementName = (element) => {
    if (element.content) {
      const preview = element.content.substring(0, 20);
      return preview.length < element.content.length ? `${preview}...` : preview;
    }
    const typeNames = {
      'text': 'Text',
      'heading': 'Heading',
      'rectangle': 'Rectangle',
      'circle': 'Circle',
      'triangle': 'Triangle',
      'star': 'Star',
      'line': 'Line',
      'arrow-right': 'Arrow Right',
      'arrow-left': 'Arrow Left',
      'arrow-up': 'Arrow Up',
      'arrow-down': 'Arrow Down',
      'image': 'Image',
      'icon': 'Icon'
    };
    return typeNames[element.type] || element.type;
  };

  const handleLayerClick = (elementId, event) => {
    const isMultiSelect = event.shiftKey;
    dispatch(selectElement({ elementId, multi: isMultiSelect }));
  };

  const handleToggleLock = (elementId, currentLocked) => {
    dispatch(lockElement({ elementId, locked: !currentLocked }));
  };

  const handleDelete = (elementId) => {
    dispatch(deleteElement(elementId));
  };

  // Reverse to show top layer first
  const layersReversed = [...elements].reverse();

  return (
    <div className="layers-panel">
      <div className="layers-header">
        <h3>Layers</h3>
        <span className="layers-count">{elements.length}</span>
      </div>

      {elements.length === 0 ? (
        <div className="layers-empty">
          <div className="empty-icon">📋</div>
          <div className="empty-text">No layers yet</div>
          <div className="empty-hint">Add elements to see them here</div>
        </div>
      ) : (
        <div className="layers-list">
          {layersReversed.map((element, index) => {
            const isSelected = selectedIds.includes(element.id);
            const isLocked = element.locked || false;
            const actualIndex = elements.length - 1 - index;

            return (
              <div
                key={element.id}
                className={`layer-item ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`}
                onClick={(e) => handleLayerClick(element.id, e)}
              >
                <div className="layer-icon">
                  {getElementIcon(element.type)}
                </div>
                
                <div className="layer-info">
                  <div className="layer-name">{getElementName(element)}</div>
                  <div className="layer-type">{element.type}</div>
                </div>

                <div className="layer-actions">
                  <button
                    className="layer-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleLock(element.id, isLocked);
                    }}
                    title={isLocked ? 'Unlock' : 'Lock'}
                  >
                    {isLocked ? '🔒' : '🔓'}
                  </button>

                  <button
                    className="layer-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (actualIndex < elements.length - 1) {
                        dispatch(bringForward(element.id));
                      }
                    }}
                    disabled={actualIndex === elements.length - 1}
                    title="Bring Forward"
                  >
                    ⬆️
                  </button>

                  <button
                    className="layer-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (actualIndex > 0) {
                        dispatch(sendBackward(element.id));
                      }
                    }}
                    disabled={actualIndex === 0}
                    title="Send Backward"
                  >
                    ⬇️
                  </button>

                  <button
                    className="layer-action-btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(element.id);
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .layers-panel {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: white;
        }

        .layers-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: #fafafa;
        }

        .layers-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .layers-count {
          background: #1A73E8;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .layers-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
          color: #9ca3af;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .empty-text {
          font-size: 16px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .empty-hint {
          font-size: 14px;
        }

        .layers-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }

        .layer-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          margin-bottom: 4px;
          border: 2px solid transparent;
        }

        .layer-item:hover {
          background: #f3f4f6;
        }

        .layer-item.selected {
          background: #eff6ff;
          border-color: #1A73E8;
        }

        .layer-item.locked {
          opacity: 0.6;
        }

        .layer-icon {
          font-size: 20px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 6px;
        }

        .layer-info {
          flex: 1;
          min-width: 0;
        }

        .layer-name {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .layer-type {
          font-size: 12px;
          color: #6b7280;
          text-transform: capitalize;
        }

        .layer-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.15s;
        }

        .layer-item:hover .layer-actions {
          opacity: 1;
        }

        .layer-action-btn {
          width: 28px;
          height: 28px;
          border: none;
          background: transparent;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .layer-action-btn:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .layer-action-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .layer-action-btn.danger:hover {
          background: #fef2f2;
        }
      `}</style>
    </div>
  );
}
