export default function ClassicTemplate({ data }) {
    return (
        <div className="resume-template classic-template">
            <div className="resume-header classic-header">
                <h1>{data.name || 'Your Name'}</h1>
                <h2>{data.title || 'Your Title'}</h2>
                <div className="contact-info">
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>|</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.location && <span>|</span>}
                    {data.location && <span>{data.location}</span>}
                </div>
            </div>

            <div className="resume-body">
                {data.summary && (
                    <section className="resume-section">
                        <h3 className="section-title">SUMMARY</h3>
                        <div className="section-divider"></div>
                        <p className="summary-text">{data.summary}</p>
                    </section>
                )}

                {data.experience && data.experience.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">EXPERIENCE</h3>
                        <div className="section-divider"></div>
                        {data.experience.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <div className="exp-header">
                                    <strong className="exp-role">{exp.role || 'Job Title'}</strong>
                                    <span className="exp-years">{exp.years || 'Years'}</span>
                                </div>
                                <div className="exp-company">{exp.company || 'Company Name'}</div>
                                {exp.description && <p className="exp-description">{exp.description}</p>}
                            </div>
                        ))}
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

                {data.skills && data.skills.length > 0 && (
                    <section className="resume-section">
                        <h3 className="section-title">SKILLS</h3>
                        <div className="section-divider"></div>
                        <div className="skills-list classic-skills">
                            {data.skills.filter(skill => skill).join(' • ')}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
