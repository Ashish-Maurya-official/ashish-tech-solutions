import { useDispatch, useSelector } from 'react-redux';
import { updatePageStyle, selectCurrentPage } from '../../../store/store';

export default function BackgroundPanel() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);

  const solidColors = [
    '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db',
    '#000000', '#1f2937', '#374151', '#6b7280',
    '#ef4444', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4',
    '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
    '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
  ];

  const gradients = [
    {
      name: 'Sunset',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      name: 'Ocean',
      value: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)'
    },
    {
      name: 'Peach',
      value: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)'
    },
    {
      name: 'Fire',
      value: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 50%, #2BFF88 100%)'
    },
    {
      name: 'Purple',
      value: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)'
    },
    {
      name: 'Mint',
      value: 'linear-gradient(135deg, #D299C2 0%, #FEF9D7 100%)'
    }
  ];

  const patterns = [
    { name: 'None', value: 'none' },
    { name: 'Dots', value: 'dots' },
    { name: 'Grid', value: 'grid' },
    { name: 'Lines', value: 'lines' },
    { name: 'Diagonal', value: 'diagonal' }
  ];

  const handleColorChange = (color) => {
    dispatch(updatePageStyle({ property: 'backgroundColor', value: color }));
  };

  const handleGradientChange = (gradient) => {
    dispatch(updatePageStyle({ property: 'backgroundImage', value: gradient }));
    dispatch(updatePageStyle({ property: 'backgroundColor', value: 'transparent' }));
  };

  return (
    <div className="background-panel">
      {/* Solid Colors */}
      <div className="section">
        <h4 className="section-title">Solid Colors</h4>
        <div className="colors-grid">
          {solidColors.map(color => (
            <button
              key={color}
              className={`color-swatch ${currentPage?.backgroundColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
              title={color}
            >
              {currentPage?.backgroundColor === color && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path 
                    d="M13 4L6 11L3 8" 
                    stroke={color === '#ffffff' || color.startsWith('#f') ? '#000' : '#fff'} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color */}
      <div className="section">
        <h4 className="section-title">Custom Color</h4>
        <div className="custom-color-picker">
          <input
            type="color"
            value={currentPage?.backgroundColor || '#ffffff'}
            onChange={(e) => handleColorChange(e.target.value)}
            className="color-input"
          />
          <input
            type="text"
            value={currentPage?.backgroundColor || '#ffffff'}
            onChange={(e) => handleColorChange(e.target.value)}
            className="color-text-input"
            placeholder="#ffffff"
          />
        </div>
      </div>

      {/* Gradients */}
      <div className="section">
        <h4 className="section-title">Gradients</h4>
        <div className="gradients-grid">
          {gradients.map(gradient => (
            <button
              key={gradient.name}
              className="gradient-swatch"
              style={{ background: gradient.value }}
              onClick={() => handleGradientChange(gradient.value)}
              title={gradient.name}
            >
              <span className="gradient-name">{gradient.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Patterns (Coming Soon) */}
      <div className="section">
        <h4 className="section-title">Patterns</h4>
        <p className="coming-soon">Pattern backgrounds coming soon!</p>
      </div>

      <style jsx>{`
        .background-panel {
          padding: 0;
        }

        .section {
          margin-bottom: 32px;
        }

        .section-title {
          margin: 0 0 12px 0;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .colors-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
        }

        .color-swatch {
          width: 100%;
          aspect-ratio: 1;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .color-swatch:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .color-swatch.active {
          border-color: #1A73E8;
          border-width: 3px;
        }

        .custom-color-picker {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .color-input {
          width: 60px;
          height: 60px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
        }

        .color-text-input {
          flex: 1;
          padding: 10px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Courier New', monospace;
        }

        .color-text-input:focus {
          outline: none;
          border-color: #1A73E8;
        }

        .gradients-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .gradient-swatch {
          width: 100%;
          aspect-ratio: 3/2;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: flex-end;
          padding: 8px;
        }

        .gradient-swatch:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-color: #1A73E8;
        }

        .gradient-name {
          font-size: 11px;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .coming-soon {
          font-size: 13px;
          color: #9ca3af;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
