import { useState, useRef } from 'react';

export default function ClassicTemplate({ data, onComponentClick, selectedComponent, enableDragDrop, onReorderSections }) {
    const [draggedSection, setDraggedSection] = useState(null);
    const [dragOverSection, setDragOverSection] = useState(null);
    const [isDraggable, setIsDraggable] = useState(false);
    const longPressTimer = useRef(null);

    const contactItems = [
        data.email && { icon: '✉', text: data.email },
        data.phone && { icon: '☎', text: data.phone },
        data.location && { icon: '📍', text: data.location },
        data.linkedin && { icon: '🔗', text: 'LinkedIn', url: data.linkedin },
        data.github && { icon: '💻', text: 'GitHub', url: data.github }
    ].filter(Boolean);

    // Handle component click for styling
    const handleClick = (componentType, e) => {
        if (onComponentClick) {
            e.stopPropagation();
            onComponentClick(componentType, e);
        }
    };

    // Long press handlers
    const handleLongPressStart = (sectionName) => (e) => {
        if (enableDragDrop) return; // Skip if drag mode is already on
        
        const target = e.currentTarget;
        longPressTimer.current = setTimeout(() => {
            setIsDraggable(true);
            setDraggedSection(sectionName);
            // Visual feedback via class instead of direct style
            if (target) {
                target.classList.add('long-press-active');
            }
        }, 500); // 500ms long press
    };

    const handleLongPressEnd = (e) => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
        // Remove visual feedback
        const target = e?.currentTarget;
        if (target) {
            target.classList.remove('long-press-active');
        }
    };

    // Drag and drop handlers
    const handleDragStart = (sectionName) => (e) => {
        if (!enableDragDrop && !isDraggable) return;
        setDraggedSection(sectionName);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', sectionName);
    };

    const handleDragEnd = (e) => {
        setDraggedSection(null);
        setDragOverSection(null);
        setIsDraggable(false);
        // Remove visual feedback
        const target = e?.currentTarget;
        if (target) {
            target.classList.remove('long-press-active');
        }
    };

    const handleDragOver = (sectionName) => (e) => {
        if (!enableDragDrop && !isDraggable) return;
        if (!draggedSection) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (draggedSection !== sectionName) {
            setDragOverSection(sectionName);
        }
    };

    const handleDrop = (sectionName) => (e) => {
        if (!enableDragDrop && !isDraggable) return;
        if (!draggedSection) return;
        e.preventDefault();
        
        if (draggedSection !== sectionName && onReorderSections) {
            const currentOrder = data.sectionOrder || [
                'summary', 'experience', 'education', 'projects', 
                'skills', 'languages', 'links', 'customSections'
            ];
            
            const newOrder = [...currentOrder];
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
        setIsDraggable(false);
    };

    // Get section drag props
    const getSectionDragProps = (sectionName) => ({
        draggable: enableDragDrop || isDraggable,
        onMouseDown: handleLongPressStart(sectionName),
        onMouseUp: handleLongPressEnd,
        onMouseLeave: handleLongPressEnd,
        onTouchStart: handleLongPressStart(sectionName),
        onTouchEnd: handleLongPressEnd,
        onDragStart: handleDragStart(sectionName),
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver(sectionName),
        onDrop: handleDrop(sectionName),
        className: `resume-section styleable-element ${draggedSection === sectionName ? 'dragging' : ''} ${dragOverSection === sectionName ? 'drag-over' : ''}`,
        style: {
            cursor: enableDragDrop || isDraggable ? 'move' : 'pointer',
            position: data.sectionPositions?.[sectionName]?.position || 'relative',
            top: data.sectionPositions?.[sectionName]?.top || 'auto',
            left: data.sectionPositions?.[sectionName]?.left || 'auto',
            right: data.sectionPositions?.[sectionName]?.right || 'auto',
            bottom: data.sectionPositions?.[sectionName]?.bottom || 'auto',
            zIndex: data.sectionPositions?.[sectionName]?.zIndex || 'auto'
        }
    });

    // Get section order
    const sectionOrder = data.sectionOrder || [
        'summary', 'experience', 'education', 'projects', 
        'skills', 'languages', 'links', 'customSections'
    ];

    // Render section by name
    const renderSection = (sectionName) => {
        // Map section names to their render functions
        const sectionRenderers = {
            'summary': renderSummarySection,
            'experience': renderExperienceSection,
            'education': renderEducationSection,
            'projects': renderProjectsSection,
            'skills': renderSkillsSection,
            'languages': renderLanguagesSection,
            'links': renderLinksSection,
            'customSections': renderCustomSections
        };

        const renderer = sectionRenderers[sectionName];
        return renderer ? renderer() : null;
    };

    // Helper function to check if section is visible
    const isSectionVisible = (sectionName) => {
        return data.sectionVisibility?.[sectionName] !== false;
    };

    // Helper function to safely get section heading
    const getSectionHeading = (sectionName, defaultHeading) => {
        const heading = data.headings?.[sectionName] || defaultHeading;
        
        // If heading is a React element (from inline editing), extract the value from props
        if (heading && typeof heading === 'object' && heading.props && heading.props.value) {
            return String(heading.props.value).toUpperCase();
        }
        
        // Otherwise convert to string
        return String(heading).toUpperCase();
    };

    // Get styling values
    const styling = data.styling || {};
    const primaryColor = styling.primaryColor || '#1f2937';
    const accentColor = styling.accentColor || '#6366f1';
    const sectionTitleColor = styling.sectionTitleColor || '#1f2937';
    const dividerColor = styling.dividerColor || '#1f2937';
    const fontFamily = styling.fontFamily || 'Segoe UI';
    const fontSize = styling.fontSize || 14;
    const headingSize = styling.headingSize || 32;
    const titleSize = styling.titleSize || 18;
    const titleColor = styling.titleColor || '#1f2937';
    const sectionTitleSize = styling.sectionTitleSize || 16;
    const sectionTitleTransform = styling.sectionTitleTransform || 'uppercase';
    const sectionTitleWeight = styling.sectionTitleWeight || 600;
    const lineHeight = styling.lineHeight || 1.5;
    const sectionSpacing = styling.sectionSpacing || 24;
    const pagePadding = styling.pagePadding || 40;
    const showDividers = styling.showDividers !== false;
    const dividerStyle = styling.dividerStyle || 'solid';
    const dividerThickness = styling.dividerThickness || 2;
    
    // Advanced styling
    const borderStyle = styling.borderStyle || 'none';
    const borderWidth = styling.borderWidth || 1;
    const borderColor = styling.borderColor || '#e5e7eb';
    const borderRadius = styling.borderRadius || 0;
    const shadow = styling.shadow || 'none';
    const pageBackground = styling.pageBackground || '#ffffff';
    const backgroundPattern = styling.backgroundPattern || 'none';
    const patternOpacity = styling.patternOpacity || 10;
    const showContactIcons = styling.showContactIcons !== false;
    const iconSize = styling.iconSize || 16;
    const profilePhoto = styling.profilePhoto;
    const photoShape = styling.photoShape || 'circle';
    const photoSize = styling.photoSize || 100;
    const textAlign = styling.textAlign || 'left';
    const contactSize = styling.contactSize || 14;
    const contactColor = styling.contactColor || '#1f2937';
    const summarySize = styling.summarySize || 14;
    const textColor = styling.textColor || '#1f2937';
    const itemTextSize = styling.itemTextSize || 14;
    const itemTitleWeight = styling.itemTitleWeight || 600;
    const skillsSize = styling.skillsSize || 14;
    const sectionBackground = styling.sectionBackground || 'transparent';

    // Shadow values
    const shadowValues = {
        none: 'none',
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.15)'
    };

    // Template-wide styles
    const templateStyles = {
        fontFamily: fontFamily,
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
        color: primaryColor,
        padding: `${pagePadding}px`,
        backgroundColor: pageBackground,
        border: borderStyle !== 'none' ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
        borderRadius: `${borderRadius}px`,
        boxShadow: shadowValues[shadow] || 'none',
        textAlign: textAlign,
        position: 'relative',
        overflow: 'hidden'
    };

    // Background pattern styles
    const getPatternStyle = () => {
        if (backgroundPattern === 'none') return {};
        
        const patterns = {
            dots: {
                backgroundImage: `radial-gradient(circle, ${primaryColor} 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            },
            grid: {
                backgroundImage: `
                    linear-gradient(${primaryColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
            },
            lines: {
                backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    ${primaryColor} 10px,
                    ${primaryColor} 11px
                )`
            },
            diagonal: {
                backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 10px,
                    ${primaryColor} 10px,
                    ${primaryColor} 11px
                )`
            }
        };

        return {
            ...patterns[backgroundPattern],
            opacity: patternOpacity / 100,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 0
        };
    };

    // Photo shape styles
    const getPhotoShapeStyle = () => {
        const shapes = {
            circle: { borderRadius: '50%' },
            square: { borderRadius: '0' },
            rounded: { borderRadius: '12px' }
        };
        return shapes[photoShape] || shapes.circle;
    };

    return (
        <div className="resume-template classic-template" style={templateStyles}>
            {/* Background Pattern Layer */}
            {backgroundPattern !== 'none' && (
                <div style={getPatternStyle()}></div>
            )}
            
            {/* Content Layer */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header - Always at top */}
                <div className="resume-header classic-header" style={{ 
                    display: 'flex', 
                    alignItems: profilePhoto ? 'center' : 'flex-start',
                    gap: profilePhoto ? '24px' : '0',
                    marginBottom: '24px'
                }}>
                    {/* Profile Photo */}
                    {profilePhoto && (
                        <div 
                            className="profile-photo"
                            style={{
                                width: `${photoSize}px`,
                                height: `${photoSize}px`,
                                flexShrink: 0,
                                ...getPhotoShapeStyle()
                            }}
                        >
                            <img 
                                src={profilePhoto} 
                                alt="Profile" 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    ...getPhotoShapeStyle()
                                }}
                            />
                        </div>
                    )}

                    {/* Header Content */}
                    <div style={{ flex: 1 }}>
                        <h1 
                            onClick={(e) => handleClick({ type: 'name' }, e)}
                            className={`styleable-element ${selectedComponent?.type === 'name' ? 'selected' : ''}`}
                            title="Click to style name"
                            style={{ 
                                fontSize: `${headingSize}px`, 
                                color: primaryColor,
                                margin: '0 0 8px 0'
                            }}
                        >
                            {data.name || 'Your Name'}
                        </h1>
                        {data.title && (
                            <h2 
                                onClick={(e) => handleClick({ type: 'title' }, e)}
                                className={`styleable-element ${selectedComponent?.type === 'title' ? 'selected' : ''}`}
                                title="Click to style title"
                                style={{ 
                                    color: titleColor,
                                    fontSize: `${titleSize}px`,
                                    margin: '0 0 12px 0'
                                }}
                            >
                                {data.title}
                            </h2>
                        )}
                        {contactItems.length > 0 && (
                            <div 
                                className={`contact-info styleable-element ${selectedComponent?.type === 'contactInfo' ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'contactInfo' }, e)}
                                title="Click to style contact info"
                                style={{
                                    fontSize: `${contactSize}px`,
                                    color: contactColor,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '12px'
                                }}
                            >
                                {contactItems.map((item, idx) => (
                                    <span key={idx} className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {showContactIcons && (
                                            <span className="icon" style={{ fontSize: `${iconSize}px` }}>{item.icon}</span>
                                        )}
                                        {item.url ? (
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {item.text}
                                            </a>
                                        ) : (
                                            <span>{item.text}</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            <div className="resume-body">
                {isSectionVisible('summary') && data.summary && (
                    <section 
                        {...getSectionDragProps('summary')}
                        className={`${getSectionDragProps('summary').className} ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'summary' ? 'selected' : ''}`}
                        onClick={(e) => {
                            if (!enableDragDrop && !isDraggable) {
                                handleClick({ type: 'sectionContainer', section: 'summary' }, e);
                            }
                        }}
                        title={enableDragDrop || isDraggable ? "Drag to reorder section" : "Long press or click to style"}
                        style={{ 
                            ...getSectionDragProps('summary').style,
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: sectionBackground
                        }}
                    >
                        <h3 
                            className={`section-title styleable-element ${selectedComponent?.type === 'sectionTitle' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'sectionTitle' }, e)}
                            title="Click to style section title"
                            style={{ 
                                color: sectionTitleColor, 
                                fontSize: `${sectionTitleSize}px`,
                                fontWeight: sectionTitleWeight,
                                textTransform: sectionTitleTransform
                            }}
                        >
                            {getSectionHeading('summary', 'SUMMARY')}
                        </h3>
                        {showDividers && (
                            <div 
                                className={`section-divider styleable-element ${selectedComponent?.type === 'divider' ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'divider' }, e)}
                                title="Click to style divider"
                                style={{ 
                                    borderBottom: `${styling?.dividerThickness || 2}px ${dividerStyle} ${dividerColor}`,
                                    marginBottom: '12px'
                                }}
                            ></div>
                        )}
                        <p 
                            className={`summary-text styleable-element ${selectedComponent?.type === 'summaryText' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'summaryText' }, e)}
                            title="Click to style summary text"
                            style={{
                                fontSize: `${styling?.summarySize || 14}px`,
                                color: styling?.textColor || primaryColor,
                                lineHeight: lineHeight
                            }}
                        >
                            {data.summary}
                        </p>
                    </section>
                )}

                {isSectionVisible('experience') && data.experience && data.experience.length > 0 && (
                    <section 
                        {...getSectionDragProps('experience')}
                        className={`${getSectionDragProps('experience').className} ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'experience' ? 'selected' : ''}`}
                        onClick={(e) => {
                            if (!enableDragDrop && !isDraggable) {
                                handleClick({ type: 'sectionContainer', section: 'experience' }, e);
                            }
                        }}
                        title={enableDragDrop || isDraggable ? "Drag to reorder section" : "Long press or click to style"}
                        style={{ 
                            ...getSectionDragProps('experience').style,
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: sectionBackground
                        }}
                    >
                        <h3 
                            className={`section-title styleable-element ${selectedComponent?.type === 'sectionTitle' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'sectionTitle' }, e)}
                            title="Click to style section title"
                            style={{ 
                                color: sectionTitleColor, 
                                fontSize: `${sectionTitleSize}px`,
                                fontWeight: sectionTitleWeight,
                                textTransform: sectionTitleTransform
                            }}
                        >
                            {getSectionHeading('experience', 'EXPERIENCE')}
                        </h3>
                        {showDividers && (
                            <div 
                                className={`section-divider styleable-element ${selectedComponent?.type === 'divider' ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'divider' }, e)}
                                title="Click to style divider"
                                style={{ 
                                    borderBottom: `${styling?.dividerThickness || 2}px ${dividerStyle} ${dividerColor}`,
                                    marginBottom: '12px'
                                }}
                            ></div>
                        )}
                        {data.experience.map((exp, index) => (
                            <div 
                                key={index} 
                                className={`experience-item styleable-element ${selectedComponent?.type === 'experienceItem' && selectedComponent?.index === index ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'experienceItem', index, deletable: true, section: 'experience' }, e)}
                                title="Click to style or delete"
                                style={{
                                    fontSize: `${styling?.itemTextSize || 14}px`,
                                    color: styling?.textColor || primaryColor
                                }}
                            >
                                <div className="exp-header">
                                    <strong 
                                        className="exp-role"
                                        style={{ fontWeight: styling?.itemTitleWeight || 600 }}
                                    >
                                        {exp.role || 'Job Title'}
                                    </strong>
                                    <span className="exp-years">{exp.years || 'Years'}</span>
                                </div>
                                <div className="exp-company">{exp.company || 'Company Name'}</div>
                                {exp.description && (
                                    <div className="exp-description">{exp.description}</div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {isSectionVisible('education') && data.education && data.education.length > 0 && (
                    <section 
                        {...getSectionDragProps('education')}
                        className={`${getSectionDragProps('education').className} ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'education' ? 'selected' : ''}`}
                        onClick={(e) => {
                            if (!enableDragDrop && !isDraggable) {
                                handleClick({ type: 'sectionContainer', section: 'education' }, e);
                            }
                        }}
                        title={enableDragDrop || isDraggable ? "Drag to reorder section" : "Long press or click to style"}
                        style={{ 
                            ...getSectionDragProps('education').style,
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: sectionBackground
                        }}
                    >
                        <h3 
                            className={`section-title styleable-element ${selectedComponent?.type === 'sectionTitle' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'sectionTitle' }, e)}
                            title="Click to style section title"
                            style={{ 
                                color: sectionTitleColor, 
                                fontSize: `${sectionTitleSize}px`,
                                fontWeight: sectionTitleWeight,
                                textTransform: sectionTitleTransform
                            }}
                        >
                            {getSectionHeading('education', 'EDUCATION')}
                        </h3>
                        {showDividers && (
                            <div 
                                className={`section-divider styleable-element ${selectedComponent?.type === 'divider' ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'divider' }, e)}
                                title="Click to style divider"
                                style={{ 
                                    borderBottom: `${styling?.dividerThickness || 2}px ${dividerStyle} ${dividerColor}`,
                                    marginBottom: '12px'
                                }}
                            ></div>
                        )}
                        {data.education.map((edu, index) => (
                            <div 
                                key={index} 
                                className={`education-item styleable-element ${selectedComponent?.type === 'educationItem' && selectedComponent?.index === index ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'educationItem', index, deletable: true, section: 'education' }, e)}
                                title="Click to style or delete"
                                style={{
                                    fontSize: `${styling?.itemTextSize || 14}px`,
                                    color: styling?.textColor || primaryColor
                                }}
                            >
                                <div className="edu-header">
                                    <strong 
                                        className="edu-degree"
                                        style={{ fontWeight: styling?.itemTitleWeight || 600 }}
                                    >
                                        {edu.degree || 'Degree'}
                                    </strong>
                                    <span className="edu-years">{edu.years || 'Years'}</span>
                                </div>
                                <div className="edu-school">{edu.school || 'School Name'}</div>
                            </div>
                        ))}
                    </section>
                )}

                {isSectionVisible('projects') && data.projects && data.projects.length > 0 && (
                    <section 
                        {...getSectionDragProps('projects')}
                        className={`${getSectionDragProps('projects').className} ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'projects' ? 'selected' : ''}`}
                        onClick={(e) => {
                            if (!enableDragDrop && !isDraggable) {
                                handleClick({ type: 'sectionContainer', section: 'projects' }, e);
                            }
                        }}
                        title={enableDragDrop || isDraggable ? "Drag to reorder section" : "Long press or click to style"}
                        style={{ 
                            ...getSectionDragProps('projects').style,
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: sectionBackground
                        }}
                    >
                        <h3 
                            className={`section-title styleable-element ${selectedComponent?.type === 'sectionTitle' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'sectionTitle' }, e)}
                            title="Click to style section title"
                            style={{ 
                                color: sectionTitleColor, 
                                fontSize: `${sectionTitleSize}px`,
                                fontWeight: sectionTitleWeight,
                                textTransform: sectionTitleTransform
                            }}
                        >
                            {getSectionHeading('projects', 'KEY PROJECTS')}
                        </h3>
                        {showDividers && (
                            <div 
                                className={`section-divider styleable-element ${selectedComponent?.type === 'divider' ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'divider' }, e)}
                                title="Click to style divider"
                                style={{ 
                                    borderBottom: `${styling?.dividerThickness || 2}px ${dividerStyle} ${dividerColor}`,
                                    marginBottom: '12px'
                                }}
                            ></div>
                        )}
                        {data.projects.map((project, index) => (
                            <div 
                                key={index} 
                                className={`project-item styleable-element ${selectedComponent?.type === 'projectItem' && selectedComponent?.index === index ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'projectItem', index, deletable: true, section: 'projects' }, e)}
                                title="Click to style or delete"
                                style={{
                                    fontSize: `${styling?.itemTextSize || 14}px`,
                                    color: styling?.textColor || primaryColor
                                }}
                            >
                                <div className="project-header">
                                    <strong 
                                        className="project-name"
                                        style={{ fontWeight: styling?.itemTitleWeight || 600 }}
                                    >
                                        {project.name || 'Project Name'}
                                    </strong>
                                    {project.link && <span className="project-link">{project.link}</span>}
                                </div>
                                {project.bullets && (
                                    <ul className="project-bullets">
                                        {project.bullets.map((bullet, i) => (
                                            <li key={i}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {isSectionVisible('skills') && data.skills && data.skills.length > 0 && (
                    <section 
                        {...getSectionDragProps('skills')}
                        className={`${getSectionDragProps('skills').className} ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'skills' ? 'selected' : ''}`}
                        onClick={(e) => {
                            if (!enableDragDrop && !isDraggable) {
                                handleClick({ type: 'sectionContainer', section: 'skills' }, e);
                            }
                        }}
                        title={enableDragDrop || isDraggable ? "Drag to reorder section" : "Long press or click to style"}
                        style={{ 
                            ...getSectionDragProps('skills').style,
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: sectionBackground
                        }}
                    >
                        <h3 
                            className={`section-title styleable-element ${selectedComponent?.type === 'sectionTitle' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'sectionTitle' }, e)}
                            title="Click to style section title"
                            style={{ 
                                color: sectionTitleColor, 
                                fontSize: `${sectionTitleSize}px`,
                                fontWeight: sectionTitleWeight,
                                textTransform: sectionTitleTransform
                            }}
                        >
                            {getSectionHeading('skills', 'TECHNICAL SKILLS')}
                        </h3>
                        {showDividers && (
                            <div 
                                className={`section-divider styleable-element ${selectedComponent?.type === 'divider' ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'divider' }, e)}
                                title="Click to style divider"
                                style={{ 
                                    borderBottom: `${styling?.dividerThickness || 2}px ${dividerStyle} ${dividerColor}`,
                                    marginBottom: '12px'
                                }}
                            ></div>
                        )}
                        <div 
                            className={`skills-list classic-skills styleable-element ${selectedComponent?.type === 'skillsList' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'skillsList' }, e)}
                            title="Click to style skills list"
                            style={{
                                fontSize: `${styling?.skillsSize || 14}px`,
                                color: styling?.textColor || primaryColor
                            }}
                        >
                            {data.skills.map((skill, index) => (
                                <div key={index}>{skill}</div>
                            ))}
                        </div>
                    </section>
                )}

                {isSectionVisible('languages') && data.languages && data.languages.length > 0 && (
                    <section 
                        {...getSectionDragProps('languages')}
                        className={`${getSectionDragProps('languages').className} ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'languages' ? 'selected' : ''}`}
                        onClick={(e) => {
                            if (!enableDragDrop && !isDraggable) {
                                handleClick({ type: 'sectionContainer', section: 'languages' }, e);
                            }
                        }}
                        title={enableDragDrop || isDraggable ? "Drag to reorder section" : "Long press or click to style"}
                        style={{ 
                            ...getSectionDragProps('languages').style,
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: sectionBackground
                        }}
                    >
                        <h3 
                            className={`section-title styleable-element ${selectedComponent?.type === 'sectionTitle' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'sectionTitle' }, e)}
                            title="Click to style section title"
                            style={{ 
                                color: sectionTitleColor, 
                                fontSize: `${sectionTitleSize}px`,
                                fontWeight: sectionTitleWeight,
                                textTransform: sectionTitleTransform
                            }}
                        >
                            {getSectionHeading('languages', 'LANGUAGES')}
                        </h3>
                        {showDividers && (
                            <div 
                                className={`section-divider styleable-element ${selectedComponent?.type === 'divider' ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'divider' }, e)}
                                title="Click to style divider"
                                style={{ 
                                    borderBottom: `${styling?.dividerThickness || 2}px ${dividerStyle} ${dividerColor}`,
                                    marginBottom: '12px'
                                }}
                            ></div>
                        )}
                        <div 
                            className={`languages-list styleable-element ${selectedComponent?.type === 'skillsList' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'skillsList' }, e)}
                            title="Click to style text"
                            style={{
                                fontSize: `${styling?.skillsSize || 14}px`,
                                color: styling?.textColor || primaryColor
                            }}
                        >
                            {data.languages.join(' • ')}
                        </div>
                    </section>
                )}

                {isSectionVisible('links') && data.links && data.links.length > 0 && (
                    <section 
                        {...getSectionDragProps('links')}
                        className={`${getSectionDragProps('links').className} ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'links' ? 'selected' : ''}`}
                        onClick={(e) => {
                            if (!enableDragDrop && !isDraggable) {
                                handleClick({ type: 'sectionContainer', section: 'links' }, e);
                            }
                        }}
                        title={enableDragDrop || isDraggable ? "Drag to reorder section" : "Long press or click to style"}
                        style={{ 
                            ...getSectionDragProps('links').style,
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: sectionBackground
                        }}
                    >
                        <h3 
                            className={`section-title styleable-element ${selectedComponent?.type === 'sectionTitle' ? 'selected' : ''}`}
                            onClick={(e) => handleClick({ type: 'sectionTitle' }, e)}
                            title="Click to style section title"
                            style={{ 
                                color: sectionTitleColor, 
                                fontSize: `${sectionTitleSize}px`,
                                fontWeight: sectionTitleWeight,
                                textTransform: sectionTitleTransform
                            }}
                        >
                            {getSectionHeading('links', 'LINKS')}
                        </h3>
                        {showDividers && (
                            <div 
                                className={`section-divider styleable-element ${selectedComponent?.type === 'divider' ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'divider' }, e)}
                                title="Click to style divider"
                                style={{ 
                                    borderBottom: `${styling?.dividerThickness || 2}px ${dividerStyle} ${dividerColor}`,
                                    marginBottom: '12px'
                                }}
                            ></div>
                        )}
                        <div className="links-list">
                            {data.links.map((link, index) => (
                                <div 
                                    key={index} 
                                    className={`link-item styleable-element ${selectedComponent?.type === 'experienceItem' && selectedComponent?.index === index ? 'selected' : ''}`}
                                    onClick={(e) => handleClick({ type: 'experienceItem', index, deletable: true, section: 'links' }, e)}
                                    title="Click to style or delete"
                                    style={{
                                        fontSize: `${styling?.itemTextSize || 14}px`,
                                        color: styling?.textColor || primaryColor
                                    }}
                                >
                                    <strong style={{ fontWeight: styling?.itemTitleWeight || 600 }}>
                                        {link.label || 'Link'}:
                                    </strong>{' '}
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-url">
                                        {link.url}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.customSections && data.customSections.length > 0 && (
                    <>
                        {data.customSections.map((section, index) => (
                            <section 
                                key={section.id}
                                {...getSectionDragProps(`customSection_${section.id}`)}
                                className={`${getSectionDragProps(`customSection_${section.id}`).className} ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.sectionId === section.id ? 'selected' : ''}`}
                                onClick={(e) => {
                                    if (!enableDragDrop && !isDraggable) {
                                        handleClick({ type: 'sectionContainer', sectionId: section.id, deletable: true, section: 'customSections' }, e);
                                    }
                                }}
                                title={enableDragDrop || isDraggable ? "Drag to reorder section" : "Long press or click to style"}
                                style={{ 
                                    ...getSectionDragProps(`customSection_${section.id}`).style,
                                    marginBottom: `${sectionSpacing}px`,
                                    backgroundColor: sectionBackground
                                }}
                            >
                                <h3 
                                    className={`section-title styleable-element ${selectedComponent?.type === 'sectionTitle' ? 'selected' : ''}`}
                                    onClick={(e) => handleClick({ type: 'sectionTitle' }, e)}
                                    title="Click to style section title"
                                    style={{ 
                                        color: sectionTitleColor, 
                                        fontSize: `${sectionTitleSize}px`,
                                        fontWeight: sectionTitleWeight,
                                        textTransform: sectionTitleTransform
                                    }}
                                >
                                    {String(section.title || 'SECTION').toUpperCase()}
                                </h3>
                                {showDividers && (
                                    <div 
                                        className={`section-divider styleable-element ${selectedComponent?.type === 'divider' ? 'selected' : ''}`}
                                        onClick={(e) => handleClick({ type: 'divider' }, e)}
                                        title="Click to style divider"
                                        style={{ 
                                            borderBottom: `${styling?.dividerThickness || 2}px ${dividerStyle} ${dividerColor}`,
                                            marginBottom: '12px'
                                        }}
                                    ></div>
                                )}
                                
                                {section.content && (
                                    <div 
                                        className={`custom-section-content styleable-element ${selectedComponent?.type === 'summaryText' ? 'selected' : ''}`}
                                        onClick={(e) => handleClick({ type: 'summaryText' }, e)}
                                        title="Click to style text"
                                        style={{
                                            fontSize: `${styling?.summarySize || 14}px`,
                                            color: styling?.textColor || primaryColor,
                                            lineHeight: lineHeight
                                        }}
                                    >
                                        {section.content}
                                    </div>
                                )}
                                
                                {section.subheadings && section.subheadings.length > 0 && (
                                    <div className="custom-subheadings">
                                        {section.subheadings.map((subheading, subIndex) => (
                                            <div 
                                                key={subheading.id} 
                                                className={`custom-subheading-item styleable-element ${selectedComponent?.type === 'experienceItem' && selectedComponent?.subheadingId === subheading.id ? 'selected' : ''}`}
                                                onClick={(e) => handleClick({ type: 'experienceItem', subheadingId: subheading.id, sectionId: section.id, deletable: true, section: 'customSubheading' }, e)}
                                                title="Click to style or delete"
                                                style={{
                                                    fontSize: `${styling?.itemTextSize || 14}px`,
                                                    color: styling?.textColor || primaryColor
                                                }}
                                            >
                                                <div className="subheading-title-row">
                                                    <strong 
                                                        className="subheading-title"
                                                        style={{ fontWeight: styling?.itemTitleWeight || 600 }}
                                                    >
                                                        {subheading.title}
                                                    </strong>
                                                </div>
                                                {subheading.content && (
                                                    <div className="subheading-content">{subheading.content}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        ))}
                    </>
                )}
            </div>
            </div>
        </div>
    );
}
