import { useDispatch, useSelector } from 'react-redux';
import { setActiveLeftTab, toggleLeftSidebar, selectActiveLeftTab, selectLeftSidebarOpen } from '../../store/store';
import ElementsPanel from './ElementsPanel';
import TemplatesPanel from './Panels/TemplatesPanel';
import TextPanel from './Panels/TextPanel';
import PhotosPanel from './Panels/PhotosPanel';
import BackgroundPanel from './Panels/BackgroundPanel';
import UploadsPanel from './Panels/UploadsPanel';
import LayersPanel from './Panels/LayersPanel';

export default function LeftSidebar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveLeftTab);
  const isOpen = useSelector(selectLeftSidebarOpen);

  const tabs = [
    { id: 'templates', icon: '📋', label: 'Templates' },
    { id: 'elements', icon: '⬜', label: 'Elements' },
    { id: 'text', icon: 'T', label: 'Text' },
    { id: 'photos', icon: '🖼️', label: 'Photos' },
    { id: 'background', icon: '🎨', label: 'Background' },
    { id: 'uploads', icon: '📁', label: 'Uploads' },
    { id: 'layers', icon: '📚', label: 'Layers' }
  ];

  return (
    <>
      {/* Tab Navigation */}
      <div className="left-sidebar-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              dispatch(setActiveLeftTab(tab.id));
              if (!isOpen) dispatch(toggleLeftSidebar());
            }}
            title={tab.label}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Panel */}
      <div className={`left-sidebar-content ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h3>{tabs.find(t => t.id === activeTab)?.label}</h3>
          <button
            className="sidebar-close-btn"
            onClick={() => dispatch(toggleLeftSidebar())}
          >
            ✕
          </button>
        </div>

        <div className="sidebar-panel-content">
          {activeTab === 'templates' && <TemplatesPanel />}
          {activeTab === 'elements' && <ElementsPanel />}
          {activeTab === 'text' && <TextPanel />}
          {activeTab === 'photos' && <PhotosPanel />}
          {activeTab === 'background' && <BackgroundPanel />}
          {activeTab === 'uploads' && <UploadsPanel />}
          {activeTab === 'layers' && <LayersPanel />}
        </div>
      </div>

      <style jsx>{`
        .left-sidebar-tabs {
          position: fixed;
          left: 0;
          top: 60px;
          bottom: 40px;
          width: 72px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          padding: 12px 0;
          gap: 4px;
          z-index: 100;
        }

        .sidebar-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.15s;
          border-left: 3px solid transparent;
        }

        .sidebar-tab:hover {
          background: #f3f4f6;
        }

        .sidebar-tab.active {
          background: #eef2ff;
          border-left-color: #1A73E8;
        }

        .tab-icon {
          font-size: 24px;
        }

        .tab-label {
          font-size: 11px;
          font-weight: 500;
          color: #6b7280;
          text-align: center;
        }

        .sidebar-tab.active .tab-label {
          color: #1A73E8;
        }

        .left-sidebar-content {
          position: fixed;
          left: 72px;
          top: 60px;
          bottom: 40px;
          width: 260px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease-in-out;
          z-index: 99;
        }

        .left-sidebar-content.closed {
          transform: translateX(-260px);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
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
          background: #f3f4f6;
          color: #111827;
        }

        .sidebar-panel-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
      `}</style>
    </>
  );
}


