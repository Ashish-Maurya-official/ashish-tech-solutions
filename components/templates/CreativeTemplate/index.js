export default function CreativeTemplate({ data }) {
  // Get the first letter for profile circle
  const getInitial = (name) => {
    if (!name) return 'A';
    // If name is a string, use it directly
    if (typeof name === 'string') {
      return name.charAt(0).toUpperCase();
    }
    // If name is a React component (inline editing), return default
    return 'A';
  };

  return (
    <div className="resume-template creative-template">
      <div className="creative-sidebar">
        <div className="sidebar-header">
          <div className="profile-circle">
            <span className="profile-initial">
              {getInitial(data.name)}
            </span>
          </div>
          <h1>{data.name || 'Your Name'}</h1>
          <h2>{data.title || 'Your Title'}</h2>
        </div>

        <div className="sidebar-section">
          <h3>Contact</h3>
          <div className="contact-list">
            {data.email && (
              <div className="contact-item">
                <span className="icon">✉</span>
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="contact-item">
                <span className="icon">📞</span>
                <span>{data.phone}</span>
              </div>
            )}
            {data.location && (
              <div className="contact-item">
                <span className="icon">📍</span>
                <span>{data.location}</span>
              </div>
            )}
          </div>
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="sidebar-section">
            <h3>Skills</h3>
            <div className="skills-list sidebar-skills">
              {data.skills.map((skill, index) => (
                skill && <div key={index} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="creative-main">
        {data.summary && (
          <section className="resume-section">
            <h3 className="section-title">About Me</h3>
            <p className="summary-text">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="timeline-dot"></div>
                <div className="exp-content">
                  <div className="exp-header">
                    <strong className="exp-role">{exp.role || 'Job Title'}</strong>
                    <span className="exp-years">{exp.years || 'Years'}</span>
                  </div>
                  <div className="exp-company">{exp.company || 'Company Name'}</div>
                  {exp.description && <p className="exp-description">{exp.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="resume-section">
            <h3 className="section-title">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="timeline-dot"></div>
                <div className="edu-content">
                  <div className="edu-header">
                    <strong className="edu-degree">{edu.degree || 'Degree'}</strong>
                    <span className="edu-years">{edu.years || 'Years'}</span>
                  </div>
                  <div className="edu-school">{edu.school || 'School Name'}</div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
