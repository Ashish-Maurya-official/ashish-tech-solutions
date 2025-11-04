import { useDispatch, useSelector } from 'react-redux';
import { toggleRightSidebar, selectRightSidebarOpen, selectSelectedElements, selectCurrentPage } from '../../store/store';
import ElementPropertiesPanel from './Panels/ElementPropertiesPanel';
import PagePropertiesPanel from './Panels/PagePropertiesPanel';
import MultiSelectPanel from './Panels/MultiSelectPanel';

export default function RightSidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectRightSidebarOpen);
  const selectedElements = useSelector(selectSelectedElements);
  const currentPage = useSelector(selectCurrentPage);

  const selectedElement = selectedElements.length === 1 ? selectedElements[0] : null;

  const getElementTypeName = (element) => {
    if (!element) return '';
    const typeNames = {
      'text': 'Text',
      'heading': `Heading ${element.level?.toUpperCase() || 'H1'}`,
      'rectangle': 'Rectangle',
      'circle': 'Circle',
      'triangle': 'Triangle',
      'star': 'Star',
      'line': 'Line',
      'arrow-right': 'Arrow →',
      'arrow-left': 'Arrow ←',
      'arrow-up': 'Arrow ↑',
      'arrow-down': 'Arrow ↓',
      'image': 'Image',
      'icon': 'Icon'
    };
    return typeNames[element.type] || element.type;
  };

  return (
    <div className={`right-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h3>
          {selectedElements.length > 1 
            ? `${selectedElements.length} Elements Selected`
            : selectedElement 
              ? getElementTypeName(selectedElement) 
              : 'Page'
          }
        </h3>
        <button
          className="sidebar-close-btn"
          onClick={() => dispatch(toggleRightSidebar())}
        >
          ✕
        </button>
      </div>

      <div className="sidebar-content">
        {selectedElements.length > 1 ? (
          <MultiSelectPanel elements={selectedElements} />
        ) : selectedElement ? (
          <ElementPropertiesPanel element={selectedElement} />
        ) : (
          <PagePropertiesPanel page={currentPage} />
        )}
      </div>

      <style jsx>{`
        .right-sidebar {
          position: fixed;
          right: 0;
          top: 60px;
          bottom: 40px;
          width: 300px;
          background: #ffffff;
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease-in-out;
          z-index: 99;
        }

        .right-sidebar.closed {
          transform: translateX(300px);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: #fafafa;
        }

        .sidebar-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .sidebar-close-btn {
          width: 28px;
          height: 28px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .sidebar-close-btn:hover {
          background: #e5e7eb;
          color: #111827;
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}


