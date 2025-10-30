export default function ClassicTemplate({ data }) {
    const contactItems = [
        data.email && { icon: '✉', text: data.email },
        data.phone && { icon: '☎', text: data.phone },
        data.location && { icon: '📍', text: data.location },
        data.linkedin && { icon: '🔗', text: data.linkedin },
        data.github && { icon: '💻', text: data.github }
    ].filter(Boolean);

    return (
        <div className="resume-template classic-template">
            <div className="resume-header classic-header">
                <h1>{data.name || 'Your Name'}</h1>
                {data.title && <h2>{data.title}</h2>}
                {contactItems.length > 0 && (
                    <div className="contact-info">
                        {contactItems.map((item, idx) => (
                            <span key={idx} className="contact-item">
                                <span className="icon">{item.icon}</span> {item.text}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="resume-body">
                {data.summary && (
                    <section className="resume-section">
                        <h3 className="section-title">SUMMARY</h3>
                        <div className="section-divider"></div>
                        <p className="summary-text">{data.summary}</p>
                    </section>
                )}

                {data.education && data.education.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">EDUCATION</h3>
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

                {data.projects && data.projects.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">KEY PROJECTS</h3>
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

                {data.skills && data.skills.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">TECHNICAL SKILLS</h3>
                        <div className="section-divider"></div>
                        <div className="skills-list classic-skills">
                            {data.skills.map((skill, index) => (
                                <div key={index}>{skill}</div>
                            ))}
                        </div>
                    </section>
                )}

                {data.languages && data.languages.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">LANGUAGES</h3>
                        <div className="section-divider"></div>
                        <div className="languages-list">
                            {data.languages.join(' • ')}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
