export default function TechTemplate({ data }) {
  return (
    <div className="resume-template tech-template">
      <div className="resume-header tech-header">
        <div className="header-content">
          <h1>{data.name || 'Your Name'}</h1>
          <h2>{data.title || 'Your Title'}</h2>
        </div>
        <div className="contact-info tech-contact">
          {data.email && <div className="contact-item"><span className="label">Email:</span> {data.email}</div>}
          {data.phone && <div className="contact-item"><span className="label">Phone:</span> {data.phone}</div>}
          {data.location && <div className="contact-item"><span className="label">Location:</span> {data.location}</div>}
        </div>
      </div>

      <div className="resume-body">
        {data.summary && (
          <section className="resume-section">
            <h3 className="section-title tech-title">
              <span className="title-icon">&gt;</span> Profile
            </h3>
            <p className="summary-text">{data.summary}</p>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title tech-title">
              <span className="title-icon">&gt;</span> Technical Skills
            </h3>
            <div className="skills-list tech-skills">
              {data.skills.map((skill, index) => (
                skill && <span key={index} className="skill-tag tech-skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title tech-title">
              <span className="title-icon">&gt;</span> Work Experience
            </h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item tech-item">
                <div className="exp-header">
                  <div className="exp-left">
                    <strong className="exp-role">{exp.role || 'Job Title'}</strong>
                    <span className="exp-company">@ {exp.company || 'Company Name'}</span>
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
            <h3 className="section-title tech-title">
              <span className="title-icon">&gt;</span> Education
            </h3>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item tech-item">
                <div className="edu-header">
                  <strong className="edu-degree">{edu.degree || 'Degree'}</strong>
                  <span className="edu-years">{edu.years || 'Years'}</span>
                </div>
                <div className="edu-school">{edu.school || 'School Name'}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
