import { COLOR_PRESETS, FONT_PAIRS } from './ShapesLibrary';

export default function StylePresets({ onApplyPreset }) {
  const presets = [
    {
      name: 'Professional Blue',
      styling: {
        primaryColor: '#1e40af',
        accentColor: '#3b82f6',
        fontFamily: 'Arial',
        headingSize: 32,
        sectionTitleSize: 16,
        borderStyle: 'none',
        shadow: 'sm',
        backgroundPattern: 'none'
      }
    },
    {
      name: 'Modern Minimal',
      styling: {
        primaryColor: '#000000',
        accentColor: '#6366f1',
        fontFamily: 'Helvetica',
        headingSize: 36,
        sectionTitleSize: 14,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadow: 'none',
        backgroundPattern: 'none'
      }
    },
    {
      name: 'Creative Bold',
      styling: {
        primaryColor: '#dc2626',
        accentColor: '#f97316',
        fontFamily: 'Verdana',
        headingSize: 34,
        sectionTitleSize: 18,
        borderStyle: 'none',
        shadow: 'md',
        backgroundPattern: 'dots',
        patternOpacity: 5
      }
    },
    {
      name: 'Corporate Gray',
      styling: {
        primaryColor: '#374151',
        accentColor: '#6b7280',
        fontFamily: 'Segoe UI',
        headingSize: 30,
        sectionTitleSize: 16,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#d1d5db',
        shadow: 'sm',
        backgroundPattern: 'none'
      }
    },
    {
      name: 'Elegant Purple',
      styling: {
        primaryColor: '#6366f1',
        accentColor: '#8b5cf6',
        fontFamily: 'Georgia',
        headingSize: 32,
        sectionTitleSize: 16,
        borderStyle: 'none',
        shadow: 'lg',
        backgroundPattern: 'lines',
        patternOpacity: 3
      }
    },
    {
      name: 'Tech Green',
      styling: {
        primaryColor: '#059669',
        accentColor: '#10b981',
        fontFamily: 'Courier New',
        headingSize: 28,
        sectionTitleSize: 14,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#10b981',
        shadow: 'none',
        backgroundPattern: 'grid',
        patternOpacity: 8
      }
    }
  ];

  return (
    <div className="style-presets">
      <h4 className="presets-title">Quick Style Presets</h4>
      <p className="presets-description">Apply professional styling with one click</p>
      
      <div className="presets-grid">
        {presets.map((preset, index) => (
          <button
            key={index}
            className="preset-card"
            onClick={() => onApplyPreset(preset.styling)}
          >
            <div 
              className="preset-preview"
              style={{
                backgroundColor: preset.styling.pageBackground || '#ffffff',
                borderLeft: `4px solid ${preset.styling.accentColor}`
              }}
            >
              <div 
                className="preset-header"
                style={{ 
                  color: preset.styling.primaryColor,
                  fontFamily: preset.styling.fontFamily
                }}
              >
                Aa
              </div>
              <div className="preset-lines">
                <div style={{ backgroundColor: preset.styling.primaryColor, opacity: 0.8 }}></div>
                <div style={{ backgroundColor: preset.styling.primaryColor, opacity: 0.5 }}></div>
                <div style={{ backgroundColor: preset.styling.accentColor, opacity: 0.6 }}></div>
              </div>
            </div>
            <span className="preset-name">{preset.name}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .style-presets {
          margin-top: 24px;
        }

        .presets-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .presets-description {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 16px 0;
        }

        .presets-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .preset-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .preset-card:hover {
          border-color: #6366f1;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }

        .preset-preview {
          width: 100%;
          height: 80px;
          border-radius: 4px;
          padding: 12px;
          margin-bottom: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .preset-header {
          font-size: 24px;
          font-weight: 700;
        }

        .preset-lines {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .preset-lines div {
          height: 3px;
          border-radius: 2px;
        }

        .preset-lines div:nth-child(1) {
          width: 100%;
        }

        .preset-lines div:nth-child(2) {
          width: 80%;
        }

        .preset-lines div:nth-child(3) {
          width: 60%;
        }

        .preset-name {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }
      `}</style>
    </div>
  );
}
