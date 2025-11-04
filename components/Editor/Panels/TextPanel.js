import { useDispatch } from 'react-redux';
import { addElement } from '../../../store/store';

export default function TextPanel() {
  const dispatch = useDispatch();

  const textPresets = [
    {
      id: 'heading',
      label: 'Add Heading',
      icon: 'H1',
      element: {
        type: 'heading',
        level: 'h1',
        content: 'Add a heading',
        styling: {
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#111827',
          fontFamily: 'Inter'
        }
      }
    },
    {
      id: 'subheading',
      label: 'Add Subheading',
      icon: 'H2',
      element: {
        type: 'heading',
        level: 'h2',
        content: 'Add a subheading',
        styling: {
          fontSize: '32px',
          fontWeight: '600',
          color: '#374151',
          fontFamily: 'Inter'
        }
      }
    },
    {
      id: 'body',
      label: 'Add Body Text',
      icon: 'T',
      element: {
        type: 'text',
        content: 'Add a little bit of body text',
        styling: {
          fontSize: '16px',
          fontWeight: 'normal',
          color: '#6b7280',
          fontFamily: 'Inter',
          lineHeight: '1.5'
        }
      }
    }
  ];

  const styleExamples = [
    {
      name: 'Bold Title',
      element: {
        type: 'heading',
        level: 'h1',
        content: 'Bold Title',
        styling: {
          fontSize: '56px',
          fontWeight: '900',
          color: '#000000',
          fontFamily: 'Inter'
        }
      }
    },
    {
      name: 'Elegant Serif',
      element: {
        type: 'heading',
        level: 'h2',
        content: 'Elegant Serif',
        styling: {
          fontSize: '40px',
          fontWeight: '400',
          color: '#1f2937',
          fontFamily: 'Georgia'
        }
      }
    },
    {
      name: 'Modern Sans',
      element: {
        type: 'text',
        content: 'Modern Sans Serif',
        styling: {
          fontSize: '24px',
          fontWeight: '500',
          color: '#4b5563',
          fontFamily: 'Helvetica',
          letterSpacing: '-0.5px'
        }
      }
    },
    {
      name: 'Colorful Accent',
      element: {
        type: 'heading',
        level: 'h2',
        content: 'Colorful Accent',
        styling: {
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1A73E8',
          fontFamily: 'Inter'
        }
      }
    },
    {
      name: 'Subtle Gray',
      element: {
        type: 'text',
        content: 'Subtle gray text for descriptions',
        styling: {
          fontSize: '14px',
          fontWeight: 'normal',
          color: '#9ca3af',
          fontFamily: 'Inter',
          lineHeight: '1.6'
        }
      }
    },
    {
      name: 'Quote Style',
      element: {
        type: 'text',
        content: '"A beautiful quote or testimonial"',
        styling: {
          fontSize: '20px',
          fontWeight: '300',
          color: '#374151',
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          lineHeight: '1.8'
        }
      }
    }
  ];

  return (
    <div className="text-panel">
      {/* Quick Add Buttons */}
      <div className="quick-add-section">
        <h4 className="section-title">Quick Add</h4>
        <div className="quick-add-buttons">
          {textPresets.map(preset => (
            <button
              key={preset.id}
              className="quick-add-btn"
              onClick={() => dispatch(addElement(preset.element))}
            >
              <span className="btn-icon">{preset.icon}</span>
              <span className="btn-label">{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Style Examples */}
      <div className="styles-section">
        <h4 className="section-title">Text Styles</h4>
        <p className="section-description">Click to add pre-styled text</p>
        <div className="styles-grid">
          {styleExamples.map((style, index) => (
            <button
              key={index}
              className="style-example"
              onClick={() => dispatch(addElement(style.element))}
            >
              <div 
                className="style-preview"
                style={{
                  fontSize: parseInt(style.element.styling.fontSize) > 40 ? '24px' : '16px',
                  fontWeight: style.element.styling.fontWeight,
                  color: style.element.styling.color,
                  fontFamily: style.element.styling.fontFamily,
                  fontStyle: style.element.styling.fontStyle
                }}
              >
                Aa
              </div>
              <span className="style-name">{style.name}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .text-panel {
          padding: 0;
        }

        .quick-add-section,
        .styles-section {
          margin-bottom: 32px;
        }

        .section-title {
          margin: 0 0 8px 0;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .section-description {
          margin: 0 0 16px 0;
          font-size: 12px;
          color: #6b7280;
        }

        .quick-add-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quick-add-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
        }

        .quick-add-btn:hover {
          border-color: #1A73E8;
          background: #f9fafb;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(26, 115, 232, 0.15);
        }

        .btn-icon {
          width: 32px;
          height: 32px;
          background: #eef2ff;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          color: #1A73E8;
        }

        .btn-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .styles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .style-example {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 12px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .style-example:hover {
          border-color: #1A73E8;
          background: #f9fafb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 115, 232, 0.15);
        }

        .style-preview {
          width: 100%;
          text-align: center;
          padding: 8px;
        }

        .style-name {
          font-size: 11px;
          font-weight: 500;
          color: #6b7280;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
