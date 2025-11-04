import { useDispatch } from 'react-redux';
import { addElement } from '../../store/store';

export default function ElementsPanel() {
  const dispatch = useDispatch();
  const elements = [
    {
      category: 'Text',
      items: [
        { type: 'heading', icon: 'H1', label: 'Heading', level: 'h1' },
        { type: 'heading', icon: 'H2', label: 'Subheading', level: 'h2' },
        { type: 'heading', icon: 'H3', label: 'Small Heading', level: 'h3' },
        { type: 'text', icon: 'T', label: 'Text' },
      ]
    },
    {
      category: 'Shapes',
      items: [
        { type: 'rectangle', icon: '▭', label: 'Rectangle' },
        { type: 'circle', icon: '●', label: 'Circle' },
        { type: 'triangle', icon: '▲', label: 'Triangle' },
        { type: 'star', icon: '★', label: 'Star' },
      ]
    },
    {
      category: 'Lines & Arrows',
      items: [
        { type: 'line', icon: '─', label: 'Line' },
        { type: 'arrow-right', icon: '→', label: 'Arrow Right' },
        { type: 'arrow-left', icon: '←', label: 'Arrow Left' },
        { type: 'arrow-up', icon: '↑', label: 'Arrow Up' },
        { type: 'arrow-down', icon: '↓', label: 'Arrow Down' },
      ]
    },
    {
      category: 'Media',
      items: [
        { type: 'image', icon: '🖼️', label: 'Image' },
        { type: 'icon', icon: '⭐', label: 'Icon' },
      ]
    }
  ];

  return (
    <div className="elements-panel">
      <div className="panel-header">
        <h3>Add Elements</h3>
        <p>Click to add to canvas</p>
      </div>

      {elements.map((category, idx) => (
        <div key={idx} className="element-category">
          <h4>{category.category}</h4>
          <div className="element-grid">
            {category.items.map((item, itemIdx) => (
              <button
                key={itemIdx}
                className="element-btn"
                onClick={() => {
                  const defaults = {
                    text: { type: 'text', content: 'New Text', styling: { fontSize: '14px', color: '#000000' } },
                    heading: { type: 'heading', content: 'New Heading', level: item.level || 'h1', styling: { fontSize: '32px', fontWeight: 'bold', color: '#000000' } },
                    rectangle: { type: 'rectangle', size: { width: 200, height: 100 }, styling: { fill: '#6366f1', borderRadius: '0px' } },
                    circle: { type: 'circle', size: { width: 100, height: 100 }, styling: { fill: '#8b5cf6' } },
                    triangle: { type: 'triangle', size: { width: 100, height: 100 }, styling: { fill: '#f59e0b' } },
                    star: { type: 'star', size: { width: 60 }, styling: { fill: '#fbbf24' } },
                    line: { type: 'line', size: { width: 200, height: 2 }, styling: { fill: '#000000' } },
                    'arrow-right': { type: 'arrow-right', size: { width: 48 }, styling: { fill: '#000000' } },
                    'arrow-left': { type: 'arrow-left', size: { width: 48 }, styling: { fill: '#000000' } },
                    'arrow-up': { type: 'arrow-up', size: { width: 48 }, styling: { fill: '#000000' } },
                    'arrow-down': { type: 'arrow-down', size: { width: 48 }, styling: { fill: '#000000' } },
                    image: { type: 'image', src: 'https://via.placeholder.com/200', size: { width: 200, height: 'auto' } },
                    icon: { type: 'icon', content: '⭐', size: { width: 48 } }
                  };
                  
                  const elementData = defaults[item.type] || { type: item.type };
                  dispatch(addElement(elementData));
                }}
                title={item.label}
              >
                <span className="element-icon">{item.icon}</span>
                <span className="element-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .elements-panel {
          padding: 20px;
        }

        .panel-header h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .panel-header p {
          margin: 0 0 20px 0;
          font-size: 13px;
          color: #6b7280;
        }

        .element-category {
          margin-bottom: 24px;
        }

        .element-category h4 {
          margin: 0 0 12px 0;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .element-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .element-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 16px 12px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .element-btn:hover {
          border-color: #6366f1;
          background: #f9fafb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }

        .element-icon {
          font-size: 24px;
          font-weight: 700;
          color: #6366f1;
        }

        .element-label {
          font-size: 12px;
          font-weight: 500;
          color: #374151;
        }
      `}</style>
    </div>
  );
}
