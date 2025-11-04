import { useDispatch } from 'react-redux';
import { deleteElement, clearSelection } from '../../../store/store';

export default function MultiSelectPanel({ elements }) {
  const dispatch = useDispatch();

  if (!elements || elements.length === 0) return null;

  const handleDeleteAll = () => {
    elements.forEach(element => {
      dispatch(deleteElement(element.id));
    });
  };

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };

  // Get element type counts
  const typeCounts = elements.reduce((acc, element) => {
    acc[element.type] = (acc[element.type] || 0) + 1;
    return acc;
  }, {});

  const typeLabels = {
    'text': 'Text',
    'heading': 'Heading',
    'rectangle': 'Rectangle',
    'circle': 'Circle',
    'triangle': 'Triangle',
    'star': 'Star',
    'line': 'Line',
    'arrow-right': 'Arrow',
    'arrow-left': 'Arrow',
    'arrow-up': 'Arrow',
    'arrow-down': 'Arrow',
    'image': 'Image',
    'icon': 'Icon'
  };

  return (
    <div className="multi-select-panel">
      <div className="selection-info">
        <h4>Selection Summary</h4>
        <div className="element-counts">
          {Object.entries(typeCounts).map(([type, count]) => (
            <div key={type} className="count-item">
              <span className="count-number">{count}</span>
              <span className="count-label">{typeLabels[type] || type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="multi-actions">
        <button className="action-btn clear-btn" onClick={handleClearSelection}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M12 4L4 12M4 4L12 12" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Clear Selection
        </button>
        
        <button className="action-btn delete-btn" onClick={handleDeleteAll}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M7 7v5M9 7v5" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Delete All ({elements.length})
        </button>
      </div>

      <div className="multi-tips">
        <h5>Multi-Select Tips</h5>
        <ul>
          <li>Hold <kbd>Shift</kbd> + click to add/remove elements</li>
          <li>Press <kbd>Ctrl+A</kbd> to select all elements</li>
          <li>Press <kbd>Escape</kbd> to clear selection</li>
          <li>Drag any selected element to move all together</li>
        </ul>
      </div>

      <style jsx>{`
        .multi-select-panel {
          padding: 0;
        }

        .selection-info {
          margin-bottom: 24px;
        }

        .selection-info h4 {
          margin: 0 0 12px 0;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .element-counts {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .count-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: #f3f4f6;
          border-radius: 6px;
          font-size: 12px;
        }

        .count-number {
          font-weight: 600;
          color: #1A73E8;
          background: white;
          padding: 2px 6px;
          border-radius: 4px;
          min-width: 20px;
          text-align: center;
        }

        .count-label {
          color: #6b7280;
        }

        .multi-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border: 2px solid;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          background: white;
        }

        .clear-btn {
          border-color: #6b7280;
          color: #6b7280;
        }

        .clear-btn:hover {
          background: #f9fafb;
          border-color: #374151;
          color: #374151;
        }

        .delete-btn {
          border-color: #ef4444;
          color: #ef4444;
        }

        .delete-btn:hover {
          background: #fef2f2;
        }

        .multi-tips {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .multi-tips h5 {
          margin: 0 0 12px 0;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        .multi-tips ul {
          margin: 0;
          padding-left: 16px;
          font-size: 12px;
          color: #6b7280;
          line-height: 1.5;
        }

        .multi-tips li {
          margin-bottom: 4px;
        }

        kbd {
          background: #e5e7eb;
          padding: 2px 4px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 600;
          color: #374151;
        }
      `}</style>
    </div>
  );
}
