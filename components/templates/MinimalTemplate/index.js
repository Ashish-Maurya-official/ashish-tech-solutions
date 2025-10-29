export default function MinimalTemplate({ data }) {
  return (
    <div className="resume-template minimal-template">
      <div className="resume-header minimal-header">
        <h1>{data.name || 'Your Name'}</h1>
        <h2>{data.title || 'Your Title'}</h2>
        <div className="contact-info minimal-contact">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>

      <div className="resume-body">
        {data.summary && (
          <section className="resume-section">
            <p className="summary-text minimal-summary">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title minimal-title">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item minimal-item">
                <div className="exp-header minimal-exp-header">
                  <div>
                    <strong className="exp-role">{exp.role || 'Job Title'}</strong>
                    <span className="exp-company"> at {exp.company || 'Company Name'}</span>
                  </div>
                  <span className="exp-years">{exp.years || 'Years'}</span>
                </div>
                {exp.description && <p className="exp-description">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title minimal-title">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item minimal-item">
                <div className="edu-header minimal-edu-header">
                  <div>
                    <strong className="edu-degree">{edu.degree || 'Degree'}</strong>
                    <span className="edu-school"> - {edu.school || 'School Name'}</span>
                  </div>
                  <span className="edu-years">{edu.years || 'Years'}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title minimal-title">Skills</h3>
            <div className="skills-list minimal-skills">
              {data.skills.filter(skill => skill).join(', ')}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
