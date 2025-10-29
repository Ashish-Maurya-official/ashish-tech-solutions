export default function ProfessionalTemplate({ data }) {
  return (
    <div className="resume-template professional-template">
      {/* Header with name and contact */}
      <div className="resume-header professional-header">
        <h1>{data.name || 'Your Name'}</h1>
        <div className="contact-info professional-contact">
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          <span>🔗 LinkedIn</span>
          <span>💻 GitHub</span>
        </div>
      </div>

      <div className="resume-body">
        {/* Summary Section */}
        {data.summary && (
          <section className="resume-section">
            <h3 className="section-title professional-title">Summary</h3>
            <div className="section-divider"></div>
            <p className="summary-text professional-summary">{data.summary}</p>
          </section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title professional-title">Education</h3>
            <div className="section-divider"></div>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item professional-edu-item">
                <div className="edu-header professional-edu-header">
                  <div className="edu-left">
                    <strong className="edu-degree">{edu.degree || 'Degree'}</strong>
                    <div className="edu-school">{edu.school || 'School Name'}</div>
                  </div>
                  <span className="edu-years">{edu.years || 'Years'}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Key Projects / Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title professional-title">Key Projects</h3>
            <div className="section-divider"></div>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item professional-project-item">
                <div className="project-header">
                  <strong className="project-name">{exp.role || 'Project Name'}</strong>
                  <span className="project-link">🔗 GitHub</span>
                </div>
                {exp.description && (
                  <div className="project-description">
                    {typeof exp.description === 'string' ? (
                      exp.description.split('\n').map((line, i) => (
                        line.trim() && <div key={i} className="project-bullet">• {line.trim()}</div>
                      ))
                    ) : (
                      <div className="project-bullet">• {exp.description}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Technical Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title professional-title">Technical Skills</h3>
            <div className="section-divider"></div>
            <div className="skills-grid professional-skills">
              <div className="skill-category">
                <strong>Languages:</strong> {data.skills.slice(0, 4).filter(s => s).join(', ')}
              </div>
              <div className="skill-category">
                <strong>Frameworks:</strong> {data.skills.slice(4, 8).filter(s => s).join(', ')}
              </div>
              <div className="skill-category">
                <strong>Tools:</strong> {data.skills.slice(8).filter(s => s).join(', ')}
              </div>
            </div>
          </section>
        )}

        {/* Languages Section */}
        <section className="resume-section">
          <h3 className="section-title professional-title">Languages</h3>
          <div className="section-divider"></div>
          <p className="languages-text">English (Professional), Hindi (Native)</p>
        </section>
      </div>
    </div>
  );
}
