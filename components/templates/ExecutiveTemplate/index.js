export default function ExecutiveTemplate({ data }) {
  return (
    <div className="resume-template executive-template">
      <div className="resume-header executive-header">
        <h1>{data.name || 'Your Name'}</h1>
        <h2>{data.title || 'Your Title'}</h2>
        <div className="contact-info executive-contact">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>

      <div className="resume-body">
        {data.summary && (
          <section className="resume-section">
            <h3 className="section-title executive-title">Executive Summary</h3>
            <p className="summary-text">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title executive-title">Professional Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item executive-item">
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

        <div className="two-column-section">
          {data.education && data.education.length > 0 && (
            <section className="resume-section column-left">
              <h3 className="section-title executive-title">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <strong className="edu-degree">{edu.degree || 'Degree'}</strong>
                  <div className="edu-school">{edu.school || 'School Name'}</div>
                  <div className="edu-years">{edu.years || 'Years'}</div>
                </div>
              ))}
            </section>
          )}

          {data.skills && data.skills.length > 0 && (
            <section className="resume-section column-right">
              <h3 className="section-title executive-title">Core Competencies</h3>
              <div className="skills-list executive-skills">
                {data.skills.map((skill, index) => (
                  skill && <div key={index} className="skill-item">• {skill}</div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
