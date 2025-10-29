import styles from './ResumePreview.module.css';

export default function ResumePreview({ data, template = 'modern' }) {
  const templateClass = styles[template] || styles.modern;

  return (
    <div className={`${styles.resumePreview} ${templateClass}`}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.name}>{data.name || 'Your Name'}</h1>
        <div className={styles.contactInfo}>
          {data.email && <span className={styles.contact}>✉️ {data.email}</span>}
          {data.phone && <span className={styles.contact}>📞 {data.phone}</span>}
          {data.location && <span className={styles.contact}>📍 {data.location}</span>}
        </div>
      </header>

      {/* Summary Section */}
      {data.summary && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <p className={styles.summary}>{data.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className={styles.experienceItem}>
              <div className={styles.itemHeader}>
                <div>
                  <h3 className={styles.position}>{exp.position || 'Position Title'}</h3>
                  <p className={styles.company}>{exp.company || 'Company Name'}</p>
                </div>
                <div className={styles.dates}>
                  {exp.startDate && <span>{exp.startDate}</span>}
                  {exp.startDate && exp.endDate && <span> - </span>}
                  {exp.endDate && <span>{exp.endDate}</span>}
                </div>
              </div>
              {exp.description && (
                <p className={styles.description}>{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className={styles.educationItem}>
              <div className={styles.itemHeader}>
                <div>
                  <h3 className={styles.degree}>
                    {edu.degree || 'Degree'}{edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className={styles.school}>{edu.school || 'School Name'}</p>
                </div>
                <div className={styles.dates}>
                  {edu.startDate && <span>{edu.startDate}</span>}
                  {edu.startDate && edu.endDate && <span> - </span>}
                  {edu.endDate && <span>{edu.endDate}</span>}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsGrid}>
            {data.skills.map((skill) => (
              <div key={skill.id} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name || 'Skill'}</span>
                <span className={styles.skillLevel}>{skill.level || 'intermediate'}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
