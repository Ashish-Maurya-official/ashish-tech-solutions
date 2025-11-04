import { useDispatch } from 'react-redux';
import { addElement } from '../../../store/store';

export default function TemplatesPanel() {
  const dispatch = useDispatch();

  const templates = [
    {
      id: 'blank',
      name: 'Blank Canvas',
      category: 'Basic',
      icon: '📄',
      description: 'Start from scratch'
    },
    {
      id: 'resume',
      name: 'Professional Resume',
      category: 'Resume',
      icon: '📝',
      description: 'Clean resume layout'
    },
    {
      id: 'flyer',
      name: 'Event Flyer',
      category: 'Marketing',
      icon: '📋',
      description: 'Eye-catching flyer'
    },
    {
      id: 'poster',
      name: 'Poster',
      category: 'Marketing',
      icon: '🎨',
      description: 'Large format poster'
    },
    {
      id: 'invitation',
      name: 'Invitation',
      category: 'Social',
      icon: '🎫',
      description: 'Party invitation'
    },
    {
      id: 'business-card',
      name: 'Business Card',
      category: 'Business',
      icon: '💼',
      description: 'Professional card'
    },
    {
      id: 'social-post',
      name: 'Social Media Post',
      category: 'Social',
      icon: '📱',
      description: 'Instagram/Facebook'
    },
    {
      id: 'presentation',
      name: 'Presentation Slide',
      category: 'Business',
      icon: '📊',
      description: 'Slide template'
    }
  ];

  const handleTemplateClick = (template) => {
    if (template.id === 'blank') {
      // Just clear the canvas (handled by new page)
      alert('Blank canvas is already active!');
    } else {
      alert(`Template "${template.name}" coming soon! For now, use the blank canvas and add elements.`);
    }
  };

  return (
    <div className="templates-panel">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search templates..."
          className="search-input"
        />
      </div>

      <div className="templates-grid">
        {templates.map(template => (
          <button
            key={template.id}
            className="template-card"
            onClick={() => handleTemplateClick(template)}
          >
            <div className="template-preview">
              <span className="template-icon">{template.icon}</span>
            </div>
            <div className="template-info">
              <h5 className="template-name">{template.name}</h5>
              <span className="template-category">{template.category}</span>
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        .templates-panel {
          padding: 0;
        }

        .search-section {
          margin-bottom: 20px;
        }

        .search-input {
          width: 100%;
          padding: 10px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.15s;
        }

        .search-input:focus {
          outline: none;
          border-color: #1A73E8;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .templates-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .template-card {
          display: flex;
          flex-direction: column;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          overflow: hidden;
          padding: 0;
        }

        .template-card:hover {
          border-color: #1A73E8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 115, 232, 0.15);
        }

        .template-preview {
          width: 100%;
          aspect-ratio: 3/4;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid #e5e7eb;
        }

        .template-icon {
          font-size: 48px;
        }

        .template-info {
          padding: 12px;
          text-align: left;
        }

        .template-name {
          margin: 0 0 4px 0;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
        }

        .template-category {
          font-size: 11px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
