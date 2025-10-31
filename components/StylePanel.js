import { useState, useEffect, useRef } from 'react';

export default function StylePanel({ selectedComponent, position, onClose, styling, updateStyling, onDelete }) {
  const panelRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!selectedComponent) return null;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(selectedComponent);
      onClose();
    }
  };

  // Get component-specific styling options
  const getStyleOptions = () => {
    switch (selectedComponent.type) {
      case 'name':
        return {
          title: 'Name Style',
          options: [
            { 
              label: 'Size', 
              type: 'range', 
              value: styling?.headingSize || 32,
              min: 24,
              max: 48,
              property: 'headingSize'
            },
            { 
              label: 'Color', 
              type: 'color', 
              value: styling?.primaryColor || '#1f2937',
              property: 'primaryColor'
            },
            { 
              label: 'Font', 
              type: 'select', 
              value: styling?.fontFamily || 'Segoe UI',
              property: 'fontFamily',
              options: ['Segoe UI', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Courier New']
            }
          ]
        };
      
      case 'title':
        return {
          title: 'Title Style',
          options: [
            { 
              label: 'Size', 
              type: 'range', 
              value: styling?.titleSize || 18,
              min: 14,
              max: 24,
              property: 'titleSize'
            },
            { 
              label: 'Color', 
              type: 'color', 
              value: styling?.titleColor || '#1f2937',
              property: 'titleColor'
            },
            { 
              label: 'Font', 
              type: 'select', 
              value: styling?.fontFamily || 'Segoe UI',
              property: 'fontFamily',
              options: ['Segoe UI', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia']
            }
          ]
        };
      
      case 'sectionTitle':
        return {
          title: 'Section Title Style',
          options: [
            { 
              label: 'Size', 
              type: 'range', 
              value: styling?.sectionTitleSize || 16,
              min: 12,
              max: 24,
              property: 'sectionTitleSize'
            },
            { 
              label: 'Color', 
              type: 'color', 
              value: styling?.sectionTitleColor || '#1f2937',
              property: 'sectionTitleColor'
            },
            { 
              label: 'Weight', 
              type: 'range', 
              value: styling?.sectionTitleWeight || 600,
              min: 400,
              max: 900,
              step: 100,
              property: 'sectionTitleWeight'
            },
            { 
              label: 'Style', 
              type: 'select', 
              value: styling?.sectionTitleTransform || 'uppercase',
              property: 'sectionTitleTransform',
              options: ['uppercase', 'lowercase', 'capitalize', 'none']
            }
          ]
        };
      
      case 'divider':
        return {
          title: 'Divider Style',
          options: [
            { 
              label: 'Color', 
              type: 'color', 
              value: styling?.dividerColor || '#1f2937',
              property: 'dividerColor'
            },
            { 
              label: 'Style', 
              type: 'select', 
              value: styling?.dividerStyle || 'solid',
              property: 'dividerStyle',
              options: ['solid', 'dashed', 'dotted', 'double']
            },
            { 
              label: 'Thickness', 
              type: 'range', 
              value: styling?.dividerThickness || 2,
              min: 1,
              max: 5,
              property: 'dividerThickness'
            }
          ]
        };
      
      case 'summaryText':
        return {
          title: 'Summary Text Style',
          options: [
            { 
              label: 'Size', 
              type: 'range', 
              value: styling?.summarySize || 14,
              min: 12,
              max: 18,
              property: 'summarySize'
            },
            { 
              label: 'Color', 
              type: 'color', 
              value: styling?.textColor || '#1f2937',
              property: 'textColor'
            },
            { 
              label: 'Line Height', 
              type: 'range', 
              value: styling?.lineHeight || 1.5,
              min: 1.2,
              max: 2,
              step: 0.1,
              property: 'lineHeight'
            }
          ]
        };
      
      case 'contactInfo':
        return {
          title: 'Contact Info Style',
          options: [
            { 
              label: 'Size', 
              type: 'range', 
              value: styling?.contactSize || 14,
              min: 11,
              max: 16,
              property: 'contactSize'
            },
            { 
              label: 'Color', 
              type: 'color', 
              value: styling?.contactColor || '#1f2937',
              property: 'contactColor'
            }
          ]
        };
      
      case 'experienceItem':
      case 'educationItem':
      case 'projectItem':
        return {
          title: `${selectedComponent.type.replace('Item', '')} Item Style`,
          options: [
            { 
              label: 'Text Size', 
              type: 'range', 
              value: styling?.itemTextSize || 14,
              min: 11,
              max: 16,
              property: 'itemTextSize'
            },
            { 
              label: 'Text Color', 
              type: 'color', 
              value: styling?.textColor || '#1f2937',
              property: 'textColor'
            },
            { 
              label: 'Title Weight', 
              type: 'range', 
              value: styling?.itemTitleWeight || 600,
              min: 400,
              max: 900,
              step: 100,
              property: 'itemTitleWeight'
            }
          ]
        };
      
      case 'skillsList':
        return {
          title: 'Skills List Style',
          options: [
            { 
              label: 'Size', 
              type: 'range', 
              value: styling?.skillsSize || 14,
              min: 11,
              max: 16,
              property: 'skillsSize'
            },
            { 
              label: 'Color', 
              type: 'color', 
              value: styling?.textColor || '#1f2937',
              property: 'textColor'
            }
          ]
        };
      
      case 'sectionContainer':
        return {
          title: 'Section Container Style',
          options: [
            { 
              label: 'Spacing', 
              type: 'range', 
              value: styling?.sectionSpacing || 24,
              min: 12,
              max: 48,
              property: 'sectionSpacing'
            },
            { 
              label: 'Background', 
              type: 'color', 
              value: styling?.sectionBackground || '#ffffff',
              property: 'sectionBackground'
            }
          ]
        };
      
      default:
        return { title: 'Style', options: [] };
    }
  };

  const styleOptions = getStyleOptions();

  return (
    <div 
      ref={panelRef}
      className="style-panel-floating"
      style={{
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 1000
      }}
    >
      <div className="style-panel-header">
        <h4>{styleOptions.title}</h4>
        <button onClick={onClose} className="style-panel-close">×</button>
      </div>
      
      <div className="style-panel-content">
        {styleOptions.options.map((option, index) => (
          <div key={index} className="style-option">
            <label>{option.label}</label>
            
            {option.type === 'color' && (
              <div className="color-control">
                <input
                  type="color"
                  value={option.value}
                  onChange={(e) => updateStyling(option.property, e.target.value)}
                  className="color-picker-small"
                />
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => updateStyling(option.property, e.target.value)}
                  className="color-text-small"
                />
              </div>
            )}
            
            {option.type === 'range' && (
              <div className="range-control">
                <input
                  type="range"
                  min={option.min}
                  max={option.max}
                  step={option.step || 1}
                  value={option.value}
                  onChange={(e) => updateStyling(option.property, parseFloat(e.target.value))}
                  className="range-slider-small"
                />
                <span className="range-value">{option.value}</span>
              </div>
            )}
            
            {option.type === 'select' && (
              <select
                value={option.value}
                onChange={(e) => updateStyling(option.property, e.target.value)}
                className="select-small"
              >
                {option.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        
        {/* Delete Button */}
        {selectedComponent.deletable && (
          <div className="style-panel-footer">
            <button onClick={handleDelete} className="delete-element-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M7 7v5M9 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Delete Element</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
