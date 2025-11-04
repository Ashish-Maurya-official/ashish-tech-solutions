import { useState } from 'react';

export default function DynamicTemplate({ 
  data, 
  onComponentClick, 
  selectedComponent, 
  enableDragDrop, 
  onReorderSections,
  isEditing = true 
}) {
  const [draggedSection, setDraggedSection] = useState(null);
  const [dragOverSection, setDragOverSection] = useState(null);

  // Get section order
  const sectionOrder = data.sectionOrder || [
    'summary', 'experience', 'education', 'projects', 
    'skills', 'languages', 'links'
  ];

  // Check if section is visible and has content
  const isSectionVisible = (sectionName) => {
    if (data.sectionVisibility?.[sectionName] === false) return false;
    
    if (sectionName === 'summary') return !!data.summary;
    if (sectionName === 'customSections') return data.customSections?.length > 0;
    
    return data[sectionName]?.length > 0;
  };

  // Drag handlers
  const handleDragStart = (sectionName) => (e) => {
    if (!isEditing || !enableDragDrop) return;
    setDraggedSection(sectionName);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
    setDragOverSection(null);
  };

  const handleDragOver = (sectionName) => (e) => {
    if (!isEditing || !enableDragDrop || !draggedSection) return;
    e.preventDefault();
    if (draggedSection !== sectionName) {
      setDragOverSection(sectionName);
    }
  };

  const handleDrop = (sectionName) => (e) => {
    if (!isEditing || !enableDragDrop || !draggedSection) return;
    e.preventDefault();
    
    if (draggedSection !== sectionName && onReorderSections) {
      const newOrder = [...sectionOrder];
      const draggedIndex = newOrder.indexOf(draggedSection);
      const targetIndex = newOrder.indexOf(sectionName);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedSection);
        onReorderSections(newOrder);
      }
    }
    
    setDraggedSection(null);
    setDragOverSection(null);
  };

  // Render section content
  const renderSectionContent = (sectionName) => {
    const styling = data.styling || {};
    
    const sectionStyle = {
      marginBottom: `${styling.sectionSpacing || 24}px`,
      padding: '16px',
      backgroundColor: styling.sectionBackground || 'transparent',
      borderRadius: '8px',
      position: styling.containerPosition || 'relative',
      ...(styling.containerPosition === 'absolute' || styling.containerPosition === 'fixed' ? {
        top: `${styling.containerTop || 0}px`,
        left: `${styling.containerLeft || 0}px`,
        zIndex: styling.containerZIndex || 1
      } : {})
    };

    const titleStyle = {
      fontSize: `${styling.sectionTitleSize || 16}px`,
      color: styling.sectionTitleColor || '#1f2937',
      fontWeight: styling.sectionTitleWeight || 600,
      textTransform: styling.sectionTitleTransform || 'uppercase',
      marginBottom: '12px'
    };

    switch (sectionName) {
      case 'summary':
        return data.summary ? (
          <div style={sectionStyle}>
            <h3 style={titleStyle}>{data.headings?.summary || 'SUMMARY'}</h3>
            <p style={{ lineHeight: 1.6 }}>{data.summary}</p>
          </div>
        ) : null;

      case 'experience':
        return data.experience?.length > 0 ? (
          <div style={sectionStyle}>
            <h3 style={titleStyle}>{data.headings?.experience || 'EXPERIENCE'}</h3>
            {data.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong>{exp.role}</strong>
                  <span>{exp.years}</span>
                </div>
                <div style={{ color: '#6b7280', marginBottom: '4px' }}>{exp.company}</div>
                {exp.description && <p style={{ marginTop: '8px' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        ) : null;

      case 'education':
        return data.education?.length > 0 ? (
          <div style={sectionStyle}>
            <h3 style={titleStyle}>{data.headings?.education || 'EDUCATION'}</h3>
            {data.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{edu.degree}</strong>
                  <span>{edu.years}</span>
                </div>
                <div style={{ color: '#6b7280' }}>{edu.school}</div>
              </div>
            ))}
          </div>
        ) : null;

      case 'projects':
        return data.projects?.length > 0 ? (
          <div style={sectionStyle}>
            <h3 style={titleStyle}>{data.headings?.projects || 'PROJECTS'}</h3>
            {data.projects.map((project, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <strong>{project.name}</strong>
                {project.bullets && (
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    {project.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case 'skills':
        return data.skills?.length > 0 ? (
          <div style={sectionStyle}>
            <h3 style={titleStyle}>{data.headings?.skills || 'SKILLS'}</h3>
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
        ) : null;

      case 'languages':
        return data.languages?.length > 0 ? (
          <div style={sectionStyle}>
            <h3 style={titleStyle}>{data.headings?.languages || 'LANGUAGES'}</h3>
            <p>{data.languages.join(' • ')}</p>
          </div>
        ) : null;

      case 'links':
        return data.links?.length > 0 ? (
          <div style={sectionStyle}>
            <h3 style={titleStyle}>{data.headings?.links || 'LINKS'}</h3>
            {data.links.map((link, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <strong>{link.label}:</strong>{' '}
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1' }}>
                  {link.url}
                </a>
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  const styling = data.styling || {};

  return (
    <div style={{
      fontFamily: styling.fontFamily || 'Segoe UI',
      fontSize: `${styling.fontSize || 14}px`,
      lineHeight: styling.lineHeight || 1.5,
      color: styling.primaryColor || '#1f2937',
      padding: `${styling.pagePadding || 40}px`,
      backgroundColor: styling.pageBackground || '#ffffff',
      minHeight: '100%',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: `${styling.headingSize || 32}px`, 
          margin: '0 0 8px 0',
          color: styling.primaryColor || '#1f2937'
        }}>
          {data.name || 'Your Name'}
        </h1>
        {data.title && (
          <h2 style={{ 
            fontSize: `${styling.titleSize || 18}px`,
            margin: '0 0 16px 0',
            fontWeight: 400,
            color: styling.titleColor || '#6b7280'
          }}>
            {data.title}
          </h2>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '14px' }}>
          {data.email && <span>✉️ {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
        </div>
      </div>

      {/* Dynamic Sections */}
      {sectionOrder.filter(isSectionVisible).map((sectionName) => (
        <div
          key={sectionName}
          draggable={isEditing && enableDragDrop}
          onDragStart={handleDragStart(sectionName)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver(sectionName)}
          onDrop={handleDrop(sectionName)}
          style={{
            cursor: isEditing && enableDragDrop ? 'move' : 'default',
            opacity: draggedSection === sectionName ? 0.5 : 1,
            borderTop: dragOverSection === sectionName ? '3px solid #6366f1' : 'none',
            paddingTop: dragOverSection === sectionName ? '8px' : '0',
            transition: 'all 0.2s ease',
            outline: isEditing && enableDragDrop ? '2px dashed transparent' : 'none',
            outlineOffset: '4px'
          }}
          onMouseEnter={(e) => {
            if (isEditing && enableDragDrop) {
              e.currentTarget.style.outline = '2px dashed #6366f1';
            }
          }}
          onMouseLeave={(e) => {
            if (isEditing && enableDragDrop) {
              e.currentTarget.style.outline = '2px dashed transparent';
            }
          }}
        >
          {renderSectionContent(sectionName)}
        </div>
      ))}
    </div>
  );
}
