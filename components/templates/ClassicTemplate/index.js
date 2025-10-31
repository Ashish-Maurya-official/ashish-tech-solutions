export default function ClassicTemplate({ data }) {
    const contactItems = [
        data.email && { icon: '✉', text: data.email },
        data.phone && { icon: '☎', text: data.phone },
        data.location && { icon: '📍', text: data.location },
        data.linkedin && { icon: '🔗', text: 'LinkedIn', url: data.linkedin },
        data.github && { icon: '💻', text: 'GitHub', url: data.github }
    ].filter(Boolean);

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
    const fontFamily = styling.fontFamily || 'Segoe UI';
    const fontSize = styling.fontSize === 'small' ? '12px' : styling.fontSize === 'large' ? '16px' : '14px';
    const lineHeight = styling.lineHeight === 'compact' ? '1.3' : styling.lineHeight === 'relaxed' ? '1.7' : '1.5';
    const sectionSpacing = styling.sectionSpacing === 'compact' ? '16px' : styling.sectionSpacing === 'spacious' ? '32px' : '24px';

    // Custom styles object
    const customStyles = {
        '--primary-color': primaryColor,
        '--accent-color': accentColor,
        '--font-family': fontFamily,
        '--font-size': fontSize,
        '--line-height': lineHeight,
        '--section-spacing': sectionSpacing
    };

    return (
        <div className="resume-template classic-template" style={customStyles}>
            <div className="resume-header classic-header">
                <h1>{data.name || 'Your Name'}</h1>
                {data.title && <h2>{data.title}</h2>}
                {contactItems.length > 0 && (
                    <div className="contact-info">
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
                    <section className="resume-section">
                        <h3 className="section-title">{getSectionHeading('summary', 'SUMMARY')}</h3>
                        <div className="section-divider"></div>
                        <p className="summary-text">{data.summary}</p>
                    </section>
                )}

                {isSectionVisible('experience') && data.experience && data.experience.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">{getSectionHeading('experience', 'EXPERIENCE')}</h3>
                        <div className="section-divider"></div>
                        {data.experience.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <div className="exp-header">
                                    <strong className="exp-role">{exp.role || 'Job Title'}</strong>
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
                    <section className="resume-section">
                        <h3 className="section-title">{getSectionHeading('education', 'EDUCATION')}</h3>
                        <div className="section-divider"></div>
                        {data.education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <div className="edu-header">
                                    <strong className="edu-degree">{edu.degree || 'Degree'}</strong>
                                    <span className="edu-years">{edu.years || 'Years'}</span>
                                </div>
                                <div className="edu-school">{edu.school || 'School Name'}</div>
                            </div>
                        ))}
                    </section>
                )}

                {isSectionVisible('projects') && data.projects && data.projects.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">{getSectionHeading('projects', 'KEY PROJECTS')}</h3>
                        <div className="section-divider"></div>
                        {data.projects.map((project, index) => (
                            <div key={index} className="project-item">
                                <div className="project-header">
                                    <strong className="project-name">{project.name || 'Project Name'}</strong>
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
                    <section className="resume-section">
                        <h3 className="section-title">{getSectionHeading('skills', 'TECHNICAL SKILLS')}</h3>
                        <div className="section-divider"></div>
                        <div className="skills-list classic-skills">
                            {data.skills.map((skill, index) => (
                                <div key={index}>{skill}</div>
                            ))}
                        </div>
                    </section>
                )}

                {isSectionVisible('languages') && data.languages && data.languages.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">{getSectionHeading('languages', 'LANGUAGES')}</h3>
                        <div className="section-divider"></div>
                        <div className="languages-list">
                            {data.languages.join(' • ')}
                        </div>
                    </section>
                )}

                {isSectionVisible('links') && data.links && data.links.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">{getSectionHeading('links', 'LINKS')}</h3>
                        <div className="section-divider"></div>
                        <div className="links-list">
                            {data.links.map((link, index) => (
                                <div key={index} className="link-item">
                                    <strong>{link.label || 'Link'}:</strong>{' '}
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
                            <section key={section.id} className="resume-section">
                                <h3 className="section-title">{String(section.title || 'SECTION').toUpperCase()}</h3>
                                <div className="section-divider"></div>
                                
                                {section.content && (
                                    <div className="custom-section-content">
                                        {section.content}
                                    </div>
                                )}
                                
                                {section.subheadings && section.subheadings.length > 0 && (
                                    <div className="custom-subheadings">
                                        {section.subheadings.map((subheading) => (
                                            <div key={subheading.id} className="custom-subheading-item">
                                                <div className="subheading-title-row">
                                                    <strong className="subheading-title">{subheading.title}</strong>
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
