import { useState } from 'react';
import FreeDraggable from '../FreeDraggable';

export default function CanvasTemplate({ 
  data, 
  onComponentClick, 
  selectedComponent, 
  enableDragDrop, 
  onReorderSections,
  onUpdateElementPosition,
  isEditing = true 
}) {
  const [selectedElement, setSelectedElement] = useState(null);

  // Get element positions from data
  const elementPositions = data.elementPositions || {};

  // Handle position change
  const handlePositionChange = (elementId, position) => {
    if (onUpdateElementPosition) {
      onUpdateElementPosition(elementId, position);
    }
  };

  const styling = data.styling || {};

  // Render draggable element
  const DraggableElement = ({ id, children, defaultX = 0, defaultY = 0 }) => {
    const position = elementPositions[id] || { x: defaultX, y: defaultY };
    
    return (
      <FreeDraggable
        id={id}
        initialPosition={position}
        onPositionChange={handlePositionChange}
        isEnabled={isEditing && enableDragDrop}
        onSelect={setSelectedElement}
        isSelected={selectedElement === id}
      >
        {children}
      </FreeDraggable>
    );
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '1000px',
      fontFamily: styling.fontFamily || 'Segoe UI',
      fontSize: `${styling.fontSize || 14}px`,
      lineHeight: styling.lineHeight || 1.5,
      color: styling.primaryColor || '#1f2937',
      padding: `${styling.pagePadding || 40}px`,
      backgroundColor: styling.pageBackground || '#ffffff'
    }}>
      {/* Header Elements */}
      <DraggableElement id="name" defaultX={200} defaultY={50}>
        <h1 style={{ 
          fontSize: `${styling.headingSize || 32}px`, 
          margin: 0,
          color: styling.primaryColor || '#1f2937',
          padding: '8px 16px',
          background: 'white',
          borderRadius: '4px'
        }}>
          {data.name || 'Your Name'}
        </h1>
      </DraggableElement>

      {data.title && (
        <DraggableElement id="title" defaultX={200} defaultY={100}>
          <h2 style={{ 
            fontSize: `${styling.titleSize || 18}px`,
            margin: 0,
            fontWeight: 400,
            color: styling.titleColor || '#6b7280',
            padding: '8px 16px',
            background: 'white',
            borderRadius: '4px'
          }}>
            {data.title}
          </h2>
        </DraggableElement>
      )}

      {/* Contact Info */}
      {data.email && (
        <DraggableElement id="email" defaultX={50} defaultY={200}>
          <div style={{ 
            padding: '8px 16px', 
            background: 'white', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            ✉️ {data.email}
          </div>
        </DraggableElement>
      )}

      {data.phone && (
        <DraggableElement id="phone" defaultX={250} defaultY={200}>
          <div style={{ 
            padding: '8px 16px', 
            background: 'white', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            📞 {data.phone}
          </div>
        </DraggableElement>
      )}

      {data.location && (
        <DraggableElement id="location" defaultX={450} defaultY={200}>
          <div style={{ 
            padding: '8px 16px', 
            background: 'white', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            📍 {data.location}
          </div>
        </DraggableElement>
      )}

      {/* Summary Section */}
      {data.summary && (
        <DraggableElement id="summary" defaultX={50} defaultY={280}>
          <div style={{
            padding: '16px',
            background: 'white',
            borderRadius: '8px',
            maxWidth: '600px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: `${styling.sectionTitleSize || 16}px`,
              color: styling.sectionTitleColor || '#1f2937',
              fontWeight: styling.sectionTitleWeight || 600,
              textTransform: styling.sectionTitleTransform || 'uppercase',
              marginTop: 0,
              marginBottom: '12px'
            }}>
              {data.headings?.summary || 'SUMMARY'}
            </h3>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{data.summary}</p>
          </div>
        </DraggableElement>
      )}

      {/* Experience Items */}
      {data.experience?.map((exp, index) => (
        <DraggableElement 
          key={`exp-${index}`} 
          id={`experience-${index}`} 
          defaultX={50} 
          defaultY={450 + (index * 150)}
        >
          <div style={{
            padding: '16px',
            background: 'white',
            borderRadius: '8px',
            maxWidth: '600px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {index === 0 && (
              <h3 style={{
                fontSize: `${styling.sectionTitleSize || 16}px`,
                color: styling.sectionTitleColor || '#1f2937',
                fontWeight: styling.sectionTitleWeight || 600,
                textTransform: styling.sectionTitleTransform || 'uppercase',
                marginTop: 0,
                marginBottom: '12px'
              }}>
                {data.headings?.experience || 'EXPERIENCE'}
              </h3>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <strong>{exp.role}</strong>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>{exp.years}</span>
            </div>
            <div style={{ color: '#6b7280', marginBottom: '8px' }}>{exp.company}</div>
            {exp.description && <p style={{ margin: 0 }}>{exp.description}</p>}
          </div>
        </DraggableElement>
      ))}

      {/* Education Items */}
      {data.education?.map((edu, index) => (
        <DraggableElement 
          key={`edu-${index}`} 
          id={`education-${index}`} 
          defaultX={50} 
          defaultY={450 + ((data.experience?.length || 0) * 150) + (index * 120)}
        >
          <div style={{
            padding: '16px',
            background: 'white',
            borderRadius: '8px',
            maxWidth: '600px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {index === 0 && (
              <h3 style={{
                fontSize: `${styling.sectionTitleSize || 16}px`,
                color: styling.sectionTitleColor || '#1f2937',
                fontWeight: styling.sectionTitleWeight || 600,
                textTransform: styling.sectionTitleTransform || 'uppercase',
                marginTop: 0,
                marginBottom: '12px'
              }}>
                {data.headings?.education || 'EDUCATION'}
              </h3>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <strong>{edu.degree}</strong>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>{edu.years}</span>
            </div>
            <div style={{ color: '#6b7280' }}>{edu.school}</div>
          </div>
        </DraggableElement>
      ))}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <DraggableElement id="skills" defaultX={50} defaultY={800}>
          <div style={{
            padding: '16px',
            background: 'white',
            borderRadius: '8px',
            maxWidth: '600px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: `${styling.sectionTitleSize || 16}px`,
              color: styling.sectionTitleColor || '#1f2937',
              fontWeight: styling.sectionTitleWeight || 600,
              textTransform: styling.sectionTitleTransform || 'uppercase',
              marginTop: 0,
              marginBottom: '12px'
            }}>
              {data.headings?.skills || 'SKILLS'}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.skills.map((skill, index) => (
                <span key={index} style={{ 
                  padding: '4px 12px', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </DraggableElement>
      )}

      {/* Canvas Mode Indicator */}
      {isEditing && enableDragDrop && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          zIndex: 9999
        }}>
          🎨 Canvas Mode: Drag elements anywhere
        </div>
      )}
    </div>
  );
}
