import { useDispatch, useSelector } from 'react-redux';
import { updatePageStyle, toggleGrid, toggleSnapToGrid, toggleSnapToElements, setGridSize, selectGridSettings } from '../../../store/store';

export default function PagePropertiesPanel({ page }) {
  const dispatch = useDispatch();
  const gridSettings = useSelector(selectGridSettings);

  if (!page) return null;

  const handleUpdate = (property, value) => {
    dispatch(updatePageStyle({ property, value }));
  };

  return (
    <div className="page-properties">
      <div className="property-section">
        <label className="property-label">Page Name</label>
        <input
          type="text"
          value={page.name || 'Page 1'}
          onChange={(e) => handleUpdate('name', e.target.value)}
          className="property-input"
        />
      </div>

      <div className="property-section">
        <label className="property-label">Background Color</label>
        <div className="color-picker-group">
          <input
            type="color"
            value={page.backgroundColor || '#ffffff'}
            onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
            className="property-color"
          />
          <input
            type="text"
            value={page.backgroundColor || '#ffffff'}
            onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
            className="property-text"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div className="property-section">
        <label className="property-label">Page Size</label>
        <select
          value={`${page.width}x${page.height}`}
          onChange={(e) => {
            const [width, height] = e.target.value.split('x').map(Number);
            handleUpdate('width', width);
            handleUpdate('height', height);
          }}
          className="property-select"
        >
          <option value="210x297">A4 (210 × 297 mm)</option>
          <option value="216x279">Letter (8.5 × 11 in)</option>
          <option value="297x420">A3 (297 × 420 mm)</option>
          <option value="1080x1080">Instagram Post (1080 × 1080 px)</option>
          <option value="1920x1080">HD (1920 × 1080 px)</option>
        </select>
      </div>

      <div className="property-section">
        <label className="property-label">Width (mm)</label>
        <input
          type="number"
          value={page.width || 210}
          onChange={(e) => handleUpdate('width', parseInt(e.target.value))}
          className="property-input"
        />
      </div>

      <div className="property-section">
        <label className="property-label">Height (mm)</label>
        <input
          type="number"
          value={page.height || 297}
          onChange={(e) => handleUpdate('height', parseInt(e.target.value))}
          className="property-input"
        />
      </div>

      <div className="property-divider" />

      <div className="property-section">
        <label className="property-label">Grid & Snap</label>
        
        <div className="toggle-group">
          <label className="toggle-item">
            <input
              type="checkbox"
              checked={gridSettings.gridEnabled || false}
              onChange={() => dispatch(toggleGrid())}
            />
            <span>Show Grid</span>
          </label>

          <label className="toggle-item">
            <input
              type="checkbox"
              checked={gridSettings.snapToGrid || false}
              onChange={() => dispatch(toggleSnapToGrid())}
            />
            <span>Snap to Grid</span>
          </label>

          <label className="toggle-item">
            <input
              type="checkbox"
              checked={gridSettings.snapToElements || false}
              onChange={() => dispatch(toggleSnapToElements())}
            />
            <span>Snap to Elements</span>
          </label>
        </div>

        {gridSettings.gridEnabled && (
          <div style={{ marginTop: '12px' }}>
            <label className="property-sublabel">Grid Size (px)</label>
            <input
              type="number"
              value={gridSettings.gridSize || 20}
              onChange={(e) => dispatch(setGridSize(parseInt(e.target.value)))}
              className="property-input"
              min="5"
              max="100"
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .page-properties {
          padding: 0;
        }

        .property-section {
          margin-bottom: 20px;
        }

        .property-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .property-input,
        .property-select {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.15s;
        }

        .property-input:focus,
        .property-select:focus {
          outline: none;
          border-color: #1A73E8;
        }

        .property-select {
          background: white;
          cursor: pointer;
        }

        .color-picker-group {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .property-color {
          width: 50px;
          height: 50px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
        }

        .property-text {
          flex: 1;
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          font-family: 'Courier New', monospace;
        }

        .property-text:focus {
          outline: none;
          border-color: #1A73E8;
        }

        .property-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 24px 0;
        }

        .property-sublabel {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 6px;
        }

        .toggle-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .toggle-item {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
        }

        .toggle-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .toggle-item span {
          user-select: none;
        }
      `}</style>
    </div>
  );
}
