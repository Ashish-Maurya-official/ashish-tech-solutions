export default function ClassicTemplate({ data, onComponentClick, selectedComponent }) {
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
    const sectionTitleSize = styling.sectionTitleSize || 16;
    const sectionTitleTransform = styling.sectionTitleTransform || 'uppercase';
    const sectionTitleWeight = styling.sectionTitleWeight || 600;
    const lineHeight = styling.lineHeight || 1.5;
    const sectionSpacing = styling.sectionSpacing || 24;
    const showDividers = styling.showDividers !== false;
    const dividerStyle = styling.dividerStyle || 'solid';

    // Template-wide styles
    const templateStyles = {
        fontFamily: fontFamily,
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
        color: primaryColor
    };

    return (
        <div className="resume-template classic-template" style={templateStyles}>
            <div className="resume-header classic-header">
                <h1 
                    onClick={(e) => handleClick({ type: 'name' }, e)}
                    className={`styleable-element ${selectedComponent?.type === 'name' ? 'selected' : ''}`}
                    title="Click to style name"
                    style={{ fontSize: `${headingSize}px`, color: primaryColor }}
                >
                    {data.name || 'Your Name'}
                </h1>
                {data.title && (
                    <h2 
                        onClick={(e) => handleClick({ type: 'title' }, e)}
                        className={`styleable-element ${selectedComponent?.type === 'title' ? 'selected' : ''}`}
                        title="Click to style title"
                        style={{ 
                            color: styling?.titleColor || primaryColor,
                            fontSize: `${styling?.titleSize || 18}px`
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
                            fontSize: `${styling?.contactSize || 14}px`,
                            color: styling?.contactColor || primaryColor
                        }}
                    >
                        {contactItems.map((item, idx) => (
                            <span key={idx} className="contact-item">
                                <span className="icon">{item.icon}</span>{' '}
                                {item.url ? (
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="contact-link">
                                        {item.text}
                                    </a>
                                ) : (
                                    item.text
                                )}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="resume-body">
                {isSectionVisible('summary') && data.summary && (
                    <section 
                        className={`resume-section styleable-element ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'summary' ? 'selected' : ''}`}
                        onClick={(e) => handleClick({ type: 'sectionContainer', section: 'summary' }, e)}
                        title="Click to style section container"
                        style={{ 
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: styling?.sectionBackground || 'transparent'
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
                        className={`resume-section styleable-element ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'experience' ? 'selected' : ''}`}
                        onClick={(e) => handleClick({ type: 'sectionContainer', section: 'experience' }, e)}
                        title="Click to style section container"
                        style={{ 
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: styling?.sectionBackground || 'transparent'
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
                        className={`resume-section styleable-element ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'education' ? 'selected' : ''}`}
                        onClick={(e) => handleClick({ type: 'sectionContainer', section: 'education' }, e)}
                        title="Click to style section container"
                        style={{ 
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: styling?.sectionBackground || 'transparent'
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
                        className={`resume-section styleable-element ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'projects' ? 'selected' : ''}`}
                        onClick={(e) => handleClick({ type: 'sectionContainer', section: 'projects' }, e)}
                        title="Click to style section container"
                        style={{ 
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: styling?.sectionBackground || 'transparent'
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
                        className={`resume-section styleable-element ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'skills' ? 'selected' : ''}`}
                        onClick={(e) => handleClick({ type: 'sectionContainer', section: 'skills' }, e)}
                        title="Click to style section container"
                        style={{ 
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: styling?.sectionBackground || 'transparent'
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
                        className={`resume-section styleable-element ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'languages' ? 'selected' : ''}`}
                        onClick={(e) => handleClick({ type: 'sectionContainer', section: 'languages' }, e)}
                        title="Click to style section container"
                        style={{ 
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: styling?.sectionBackground || 'transparent'
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
                        className={`resume-section styleable-element ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.section === 'links' ? 'selected' : ''}`}
                        onClick={(e) => handleClick({ type: 'sectionContainer', section: 'links' }, e)}
                        title="Click to style section container"
                        style={{ 
                            marginBottom: `${sectionSpacing}px`,
                            backgroundColor: styling?.sectionBackground || 'transparent'
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
                        {data.customSections.map((section) => (
                            <section 
                                key={section.id} 
                                className={`resume-section styleable-element ${selectedComponent?.type === 'sectionContainer' && selectedComponent?.sectionId === section.id ? 'selected' : ''}`}
                                onClick={(e) => handleClick({ type: 'sectionContainer', sectionId: section.id, deletable: true, section: 'customSections' }, e)}
                                title="Click to style or delete section"
                                style={{ 
                                    marginBottom: `${sectionSpacing}px`,
                                    backgroundColor: styling?.sectionBackground || 'transparent'
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
    );
}
