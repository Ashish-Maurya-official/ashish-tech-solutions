import { useState } from 'react';

const ICON_CATEGORIES = {
  contact: [
    { name: 'Email', icon: '✉️', value: 'email' },
    { name: 'Phone', icon: '📞', value: 'phone' },
    { name: 'Location', icon: '📍', value: 'location' },
    { name: 'Website', icon: '🌐', value: 'website' },
    { name: 'LinkedIn', icon: '💼', value: 'linkedin' },
    { name: 'GitHub', icon: '💻', value: 'github' },
  ],
  social: [
    { name: 'Twitter', icon: '🐦', value: 'twitter' },
    { name: 'Instagram', icon: '📷', value: 'instagram' },
    { name: 'Facebook', icon: '👥', value: 'facebook' },
    { name: 'YouTube', icon: '📺', value: 'youtube' },
  ],
  work: [
    { name: 'Briefcase', icon: '💼', value: 'briefcase' },
    { name: 'Building', icon: '🏢', value: 'building' },
    { name: 'Chart', icon: '📊', value: 'chart' },
    { name: 'Trophy', icon: '🏆', value: 'trophy' },
    { name: 'Star', icon: '⭐', value: 'star' },
    { name: 'Rocket', icon: '🚀', value: 'rocket' },
  ],
  education: [
    { name: 'Graduation', icon: '🎓', value: 'graduation' },
    { name: 'Book', icon: '📚', value: 'book' },
    { name: 'Certificate', icon: '📜', value: 'certificate' },
    { name: 'Pencil', icon: '✏️', value: 'pencil' },
  ],
  misc: [
    { name: 'Check', icon: '✓', value: 'check' },
    { name: 'Arrow', icon: '→', value: 'arrow' },
    { name: 'Dot', icon: '•', value: 'dot' },
    { name: 'Diamond', icon: '◆', value: 'diamond' },
  ]
};

export default function IconPicker({ value, onChange, onClose }) {
  const [activeCategory, setActiveCategory] = useState('contact');

  return (
    <div className="icon-picker-panel">
      <div className="icon-picker-header">
        <h4>Choose Icon</h4>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      <div className="icon-categories">
        {Object.keys(ICON_CATEGORIES).map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="icon-grid">
        {ICON_CATEGORIES[activeCategory].map((icon) => (
          <button
            key={icon.value}
            className={`icon-option ${value === icon.icon ? 'selected' : ''}`}
            onClick={() => {
              onChange(icon.icon);
              onClose();
            }}
            title={icon.name}
          >
            <span className="icon-display">{icon.icon}</span>
            <span className="icon-name">{icon.name}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .icon-picker-panel {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          width: 320px;
          max-height: 500px;
          overflow: hidden;
        }

        .icon-picker-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .icon-picker-header h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .close-btn {
          width: 28px;
          height: 28px;
          border: none;
          background: #f3f4f6;
          border-radius: 6px;
          cursor: pointer;
          font-size: 20px;
          color: #6b7280;
        }

        .close-btn:hover {
          background: #e5e7eb;
        }

        .icon-categories {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          overflow-x: auto;
        }

        .category-btn {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          text-transform: capitalize;
        }

        .category-btn:hover {
          background: #f9fafb;
        }

        .category-btn.active {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 12px;
          max-height: 350px;
          overflow-y: auto;
        }

        .icon-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-option:hover {
          border-color: #6366f1;
          background: #f9fafb;
        }

        .icon-option.selected {
          border-color: #6366f1;
          background: #eef2ff;
        }

        .icon-display {
          font-size: 24px;
        }

        .icon-name {
          font-size: 11px;
          color: #6b7280;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
