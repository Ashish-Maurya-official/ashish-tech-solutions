export default function ModernTemplate({ data }) {
  return (
    <div className="resume-template modern-template">
      <div className="resume-header modern-header">
        <h1>{data.name || 'Your Name'}</h1>
        <h2>{data.title || 'Your Title'}</h2>
        <div className="contact-info">
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
        </div>
      </div>

      <div className="resume-body">
        {data.summary && (
          <section className="resume-section">
            <h3 className="section-title">Professional Summary</h3>
            <p className="summary-text">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title">Work Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="exp-header">
                  <div className="exp-left">
                    <strong className="exp-role">{exp.role || 'Job Title'}</strong>
                    <span className="exp-company">{exp.company || 'Company Name'}</span>
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
            <h3 className="section-title">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="edu-header">
                  <strong className="edu-degree">{edu.degree || 'Degree'}</strong>
                  <span className="edu-years">{edu.years || 'Years'}</span>
                </div>
                <span className="edu-school">{edu.school || 'School Name'}</span>
              </div>
            ))}
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title">Skills</h3>
            <div className="skills-list">
              {data.skills.map((skill, index) => (
                skill && <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
