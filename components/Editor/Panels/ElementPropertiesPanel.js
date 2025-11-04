import { useDispatch } from 'react-redux';
import { updateElement, deleteElement } from '../../../store/store';

export default function ElementPropertiesPanel({ element }) {
  const dispatch = useDispatch();

  if (!element) return null;

  const handleUpdate = (updates) => {
    dispatch(updateElement({ elementId: element.id, updates }));
  };

  const handleDelete = () => {
    dispatch(deleteElement(element.id));
  };

  return (
    <div className="element-properties">
      {/* Text & Heading Properties */}
      {(element.type === 'text' || element.type === 'heading') && (
        <>
          <div className="property-section">
            <label className="property-label">Content</label>
            <textarea
              value={element.content || ''}
              onChange={(e) => handleUpdate({ content: e.target.value })}
              className="property-textarea"
              rows="3"
              placeholder="Enter text..."
            />
          </div>

          {element.type === 'heading' && (
            <div className="property-section">
              <label className="property-label">Heading Level</label>
              <div className="heading-level-buttons">
                {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(level => (
                  <button
                    key={level}
                    className={`level-btn ${element.level === level ? 'active' : ''}`}
                    onClick={() => handleUpdate({ level })}
                  >
                    {level.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="property-section">
            <label className="property-label">Font Size</label>
            <div className="slider-group">
              <input
                type="range"
                min="12"
                max="72"
                value={parseInt(element.styling?.fontSize) || 16}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, fontSize: `${e.target.value}px` }
                })}
                className="property-slider"
              />
              <input
                type="number"
                min="12"
                max="72"
                value={parseInt(element.styling?.fontSize) || 16}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, fontSize: `${e.target.value}px` }
                })}
                className="property-number"
              />
            </div>
          </div>

          <div className="property-section">
            <label className="property-label">Color</label>
            <div className="color-picker-group">
              <input
                type="color"
                value={element.styling?.color || '#000000'}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, color: e.target.value }
                })}
                className="property-color"
              />
              <input
                type="text"
                value={element.styling?.color || '#000000'}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, color: e.target.value }
                })}
                className="property-text"
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="property-section">
            <label className="property-label">Font Weight</label>
            <select
              value={element.styling?.fontWeight || 'normal'}
              onChange={(e) => handleUpdate({
                styling: { ...element.styling, fontWeight: e.target.value }
              })}
              className="property-select"
            >
              <option value="300">Light</option>
              <option value="normal">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
              <option value="bold">Bold</option>
              <option value="900">Black</option>
            </select>
          </div>

          <div className="property-section">
            <label className="property-label">Font Family</label>
            <select
              value={element.styling?.fontFamily || 'Inter'}
              onChange={(e) => handleUpdate({
                styling: { ...element.styling, fontFamily: e.target.value }
              })}
              className="property-select"
            >
              <option value="Inter">Inter</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
        </>
      )}

      {/* Rectangle Properties */}
      {element.type === 'rectangle' && (
        <>
          <div className="property-section">
            <label className="property-label">Size</label>
            <div className="size-inputs">
              <div className="size-input-group">
                <label className="size-label">W</label>
                <input
                  type="number"
                  value={element.size?.width || 200}
                  onChange={(e) => handleUpdate({
                    size: { ...element.size, width: parseInt(e.target.value) }
                  })}
                  className="property-number"
                />
              </div>
              <div className="size-input-group">
                <label className="size-label">H</label>
                <input
                  type="number"
                  value={element.size?.height || 100}
                  onChange={(e) => handleUpdate({
                    size: { ...element.size, height: parseInt(e.target.value) }
                  })}
                  className="property-number"
                />
              </div>
            </div>
          </div>

          <div className="property-section">
            <label className="property-label">Fill Color</label>
            <div className="color-picker-group">
              <input
                type="color"
                value={element.styling?.fill || '#6366f1'}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, fill: e.target.value }
                })}
                className="property-color"
              />
              <input
                type="text"
                value={element.styling?.fill || '#6366f1'}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, fill: e.target.value }
                })}
                className="property-text"
              />
            </div>
          </div>

          <div className="property-section">
            <label className="property-label">Corner Radius</label>
            <div className="slider-group">
              <input
                type="range"
                min="0"
                max="50"
                value={parseInt(element.styling?.borderRadius) || 0}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, borderRadius: `${e.target.value}px` }
                })}
                className="property-slider"
              />
              <input
                type="number"
                min="0"
                max="50"
                value={parseInt(element.styling?.borderRadius) || 0}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, borderRadius: `${e.target.value}px` }
                })}
                className="property-number"
              />
            </div>
          </div>
        </>
      )}

      {/* Circle Properties */}
      {element.type === 'circle' && (
        <>
          <div className="property-section">
            <label className="property-label">Size</label>
            <div className="slider-group">
              <input
                type="range"
                min="50"
                max="300"
                value={element.size?.width || 100}
                onChange={(e) => handleUpdate({
                  size: { width: parseInt(e.target.value), height: parseInt(e.target.value) }
                })}
                className="property-slider"
              />
              <input
                type="number"
                value={element.size?.width || 100}
                onChange={(e) => handleUpdate({
                  size: { width: parseInt(e.target.value), height: parseInt(e.target.value) }
                })}
                className="property-number"
              />
            </div>
          </div>

          <div className="property-section">
            <label className="property-label">Fill Color</label>
            <div className="color-picker-group">
              <input
                type="color"
                value={element.styling?.fill || '#8b5cf6'}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, fill: e.target.value }
                })}
                className="property-color"
              />
              <input
                type="text"
                value={element.styling?.fill || '#8b5cf6'}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, fill: e.target.value }
                })}
                className="property-text"
              />
            </div>
          </div>
        </>
      )}

      {/* Image Properties */}
      {element.type === 'image' && (
        <>
          <div className="property-section">
            <label className="property-label">Image URL</label>
            <input
              type="text"
              value={element.src || ''}
              onChange={(e) => handleUpdate({ src: e.target.value })}
              className="property-input"
              placeholder="https://..."
            />
          </div>

          <div className="property-section">
            <label className="property-label">Width</label>
            <div className="slider-group">
              <input
                type="range"
                min="50"
                max="600"
                value={element.size?.width || 200}
                onChange={(e) => handleUpdate({
                  size: { ...element.size, width: parseInt(e.target.value) }
                })}
                className="property-slider"
              />
              <input
                type="number"
                value={element.size?.width || 200}
                onChange={(e) => handleUpdate({
                  size: { ...element.size, width: parseInt(e.target.value) }
                })}
                className="property-number"
              />
            </div>
          </div>

          <div className="property-section">
            <label className="property-label">Border Radius</label>
            <div className="slider-group">
              <input
                type="range"
                min="0"
                max="50"
                value={parseInt(element.styling?.borderRadius) || 0}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, borderRadius: `${e.target.value}px` }
                })}
                className="property-slider"
              />
              <input
                type="number"
                value={parseInt(element.styling?.borderRadius) || 0}
                onChange={(e) => handleUpdate({
                  styling: { ...element.styling, borderRadius: `${e.target.value}px` }
                })}
                className="property-number"
              />
            </div>
          </div>
        </>
      )}

      {/* Position (All Elements) */}
      <div className="property-section">
        <label className="property-label">Position</label>
        <div className="size-inputs">
          <div className="size-input-group">
            <label className="size-label">X</label>
            <input
              type="number"
              value={Math.round(element.position?.x || 0)}
              onChange={(e) => handleUpdate({
                position: { ...element.position, x: parseInt(e.target.value) || 0 }
              })}
              className="property-number"
            />
          </div>
          <div className="size-input-group">
            <label className="size-label">Y</label>
            <input
              type="number"
              value={Math.round(element.position?.y || 0)}
              onChange={(e) => handleUpdate({
                position: { ...element.position, y: parseInt(e.target.value) || 0 }
              })}
              className="property-number"
            />
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button className="delete-btn" onClick={handleDelete}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
          <path d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M7 7v5M9 7v5" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Delete Element
      </button>

      <style jsx>{`
        .element-properties {
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

        .property-textarea,
        .property-input {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.15s;
        }

        .property-textarea {
          resize: vertical;
          min-height: 60px;
        }

        .property-textarea:focus,
        .property-input:focus {
          outline: none;
          border-color: #1A73E8;
        }

        .heading-level-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .level-btn {
          padding: 8px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s;
        }

        .level-btn:hover {
          border-color: #d1d5db;
          background: #f9fafb;
        }

        .level-btn.active {
          border-color: #1A73E8;
          background: #eef2ff;
          color: #1A73E8;
        }

        .slider-group {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .property-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb;
          outline: none;
          -webkit-appearance: none;
        }

        .property-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1A73E8;
          cursor: pointer;
        }

        .property-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1A73E8;
          cursor: pointer;
          border: none;
        }

        .property-number {
          width: 70px;
          padding: 8px 10px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          text-align: center;
        }

        .property-number:focus {
          outline: none;
          border-color: #1A73E8;
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

        .property-select {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }

        .property-select:focus {
          outline: none;
          border-color: #1A73E8;
        }

        .size-inputs {
          display: flex;
          gap: 12px;
        }

        .size-input-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .size-label {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
        }

        .delete-btn {
          width: 100%;
          padding: 12px;
          border: 2px solid #ef4444;
          background: white;
          color: #ef4444;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.15s;
          margin-top: 24px;
        }

        .delete-btn:hover {
          background: #fef2f2;
        }
      `}</style>
    </div>
  );
}
