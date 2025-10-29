import { useRouter } from 'next/router';
import { useResume } from '../context/ResumeContext';
import { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Head from 'next/head';
import ResumePreview from '../components/ResumePreview';
import InlineEditableResume from '../components/InlineEditableResume';
import { templates } from '../components/templates';

const resumeDesigns = Object.values(templates);

function EditableField({ value, onChange, placeholder, multiline = false, className = '' }) {
  return multiline ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`editable-field ${className}`}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`editable-field ${className}`}
    />
  );
}

function MiniPreview({ templateId, data }) {
  return (
    <div className="mini-preview-container">
      <ResumePreview
        templateId={templateId}
        data={data}
        scale={0.22}
        fitLayout={true}
      />
    </div>
  );
}

export default function Editor() {
  const router = useRouter();
  const { 
    resumeData, 
    selectedDesign, 
    setSelectedDesign, 
    updateField, 
    addSection, 
    removeSection,
    updateHeading,
    addCustomSection,
    removeCustomSection,
    updateCustomSection
  } = useResume();
  const [activeSection, setActiveSection] = useState('personal');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const resumeRef = useRef();
  const printRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowSidebar(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDesignChange = (designId) => {
    setSelectedDesign(designId);
  };

  const handleExportPDF = async () => {
    if (!printRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1200
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const fileName = `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Resume Editor - BetterCV</title>
        <meta name="description" content="Edit your professional resume with our intuitive editor." />
      </Head>
      <main className="modern-editor-page">
        {/* Top Navigation Bar */}
        <nav className="editor-navbar">
          <div className="navbar-left">
            <button className="nav-back-btn" onClick={() => router.back()}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back</span>
            </button>
            {!isMobile && (
              <div className="editor-title">
                <h1>Resume Editor</h1>
                <span className="subtitle">Click on resume to edit directly</span>
              </div>
            )}
          </div>

          <div className="navbar-center">
            {!isMobile && (
              <div className="zoom-controls">
                <button
                  className="zoom-btn"
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                  title="Zoom Out"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
                <button
                  className="zoom-btn"
                  onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.1))}
                  title="Zoom In"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  className="zoom-btn"
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="navbar-right">
            {isMobile && (
              <button
                className="sidebar-toggle-btn"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 7H17M3 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Edit</span>
              </button>
            )}
            <button
              className="templates-toggle-btn"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>Templates</span>
            </button>
            <button
              className="export-btn-modern"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <div className="spinner"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3V13M10 13L6 9M10 13L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Export</span>
                </>
              )}
            </button>
          </div>
        </nav>

        <div className="modern-editor-layout">
          {/* Left Sidebar - Editing Controls */}
          <aside className={`modern-sidebar ${showSidebar ? 'visible' : 'hidden'}`}>
            <div className="sidebar-nav">
              <div className="nav-tabs">
                {[
                  { id: 'personal', icon: '👤', label: 'Personal' },
                  { id: 'experience', icon: '💼', label: 'Experience' },
                  { id: 'education', icon: '🎓', label: 'Education' },
                  { id: 'skills', icon: '⚡', label: 'Skills' },
                  { id: 'custom', icon: '✨', label: 'Custom' }
                ].map((section) => (
                  <button
                    key={section.id}
                    className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="tab-icon">{section.icon}</span>
                    <span className="tab-label">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-content">
              {activeSection === 'personal' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <h3>Personal Information</h3>
                    <p className="section-description">Tell us about yourself</p>
                  </div>
                  <EditableField
                    value={resumeData.name}
                    onChange={(value) => updateField('name', value)}
                    placeholder="Full Name"
                  />
                  <EditableField
                    value={resumeData.title}
                    onChange={(value) => updateField('title', value)}
                    placeholder="Job Title"
                  />
                  <EditableField
                    value={resumeData.email}
                    onChange={(value) => updateField('email', value)}
                    placeholder="Email"
                  />
                  <EditableField
                    value={resumeData.phone}
                    onChange={(value) => updateField('phone', value)}
                    placeholder="Phone"
                  />
                  <EditableField
                    value={resumeData.location || ''}
                    onChange={(value) => updateField('location', value)}
                    placeholder="Location (optional)"
                  />
                  <EditableField
                    value={resumeData.summary}
                    onChange={(value) => updateField('summary', value)}
                    placeholder="Professional Summary"
                    multiline
                  />
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Work Experience</h3>
                      <p className="section-description">Add your professional experience</p>
                    </div>
                    <button
                      className="add-btn-modern"
                      onClick={() => addSection('experience', {
                        role: '',
                        company: '',
                        years: '',
                        description: ''
                      })}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="modern-form-group">
                      <div className="group-header-modern">
                        <span className="group-number">{index + 1}</span>
                        <span className="group-title">Experience {index + 1}</span>
                        {resumeData.experience.length > 1 && (
                          <button
                            className="remove-btn-modern"
                            onClick={() => removeSection('experience', index)}
                            title="Remove"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      <EditableField
                        value={exp.role}
                        onChange={(value) => updateField(`experience.${index}.role`, value)}
                        placeholder="Job Title"
                      />
                      <EditableField
                        value={exp.company}
                        onChange={(value) => updateField(`experience.${index}.company`, value)}
                        placeholder="Company"
                      />
                      <EditableField
                        value={exp.years}
                        onChange={(value) => updateField(`experience.${index}.years`, value)}
                        placeholder="Years (e.g., 2020 - Present)"
                      />
                      <EditableField
                        value={exp.description}
                        onChange={(value) => updateField(`experience.${index}.description`, value)}
                        placeholder="Job Description"
                        multiline
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'education' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Education</h3>
                      <p className="section-description">Add your educational background</p>
                    </div>
                    <button
                      className="add-btn-modern"
                      onClick={() => addSection('education', {
                        school: '',
                        degree: '',
                        years: ''
                      })}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="modern-form-group">
                      <div className="group-header-modern">
                        <span className="group-number">{index + 1}</span>
                        <span className="group-title">Education {index + 1}</span>
                        {resumeData.education.length > 1 && (
                          <button
                            className="remove-btn-modern"
                            onClick={() => removeSection('education', index)}
                            title="Remove"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      <EditableField
                        value={edu.degree}
                        onChange={(value) => updateField(`education.${index}.degree`, value)}
                        placeholder="Degree"
                      />
                      <EditableField
                        value={edu.school}
                        onChange={(value) => updateField(`education.${index}.school`, value)}
                        placeholder="School/University"
                      />
                      <EditableField
                        value={edu.years}
                        onChange={(value) => updateField(`education.${index}.years`, value)}
                        placeholder="Years"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Skills</h3>
                      <p className="section-description">Add your key skills and expertise</p>
                    </div>
                    <button
                      className="add-btn-modern"
                      onClick={() => addSection('skills', '')}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                  <div className="skills-grid">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="skill-chip">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => updateField(`skills.${index}`, e.target.value)}
                          placeholder="Skill name"
                          className="skill-input-modern"
                        />
                        {resumeData.skills.length > 1 && (
                          <button
                            className="skill-remove-btn"
                            onClick={() => removeSection('skills', index)}
                            title="Remove"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'custom' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Custom Sections & Headings</h3>
                      <p className="section-description">Customize section headings and add custom sections</p>
                    </div>
                  </div>

                  {/* Editable Section Headings */}
                  <div className="headings-editor">
                    <h4 className="subsection-title">Section Headings</h4>
                    <p className="subsection-description">Click on any heading in the preview to edit it</p>
                    <div className="headings-grid">
                      <div className="heading-item">
                        <label>Summary Section</label>
                        <input
                          type="text"
                          value={resumeData.headings?.summary || 'Summary'}
                          onChange={(e) => updateHeading('summary', e.target.value)}
                          className="editable-field"
                        />
                      </div>
                      <div className="heading-item">
                        <label>Experience Section</label>
                        <input
                          type="text"
                          value={resumeData.headings?.experience || 'Work Experience'}
                          onChange={(e) => updateHeading('experience', e.target.value)}
                          className="editable-field"
                        />
                      </div>
                      <div className="heading-item">
                        <label>Education Section</label>
                        <input
                          type="text"
                          value={resumeData.headings?.education || 'Education'}
                          onChange={(e) => updateHeading('education', e.target.value)}
                          className="editable-field"
                        />
                      </div>
                      <div className="heading-item">
                        <label>Skills Section</label>
                        <input
                          type="text"
                          value={resumeData.headings?.skills || 'Skills'}
                          onChange={(e) => updateHeading('skills', e.target.value)}
                          className="editable-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Sections */}
                  <div className="custom-sections-editor">
                    <div className="section-header-modern">
                      <div>
                        <h4 className="subsection-title">Custom Sections</h4>
                        <p className="subsection-description">Add additional sections to your resume</p>
                      </div>
                      <button
                        className="add-btn-modern"
                        onClick={addCustomSection}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>Add Section</span>
                      </button>
                    </div>

                    {resumeData.customSections && resumeData.customSections.length > 0 ? (
                      <div className="custom-sections-list">
                        {resumeData.customSections.map((section) => (
                          <div key={section.id} className="custom-section-item">
                            <div className="custom-section-header">
                              <input
                                type="text"
                                value={section.title}
                                onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
                                placeholder="Section Title"
                                className="editable-field"
                              />
                              <button
                                className="remove-btn-modern"
                                onClick={() => removeCustomSection(section.id)}
                                title="Remove Section"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                              </button>
                            </div>
                            <textarea
                              value={section.content}
                              onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
                              placeholder="Section content..."
                              className="editable-field"
                              rows="4"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <p>No custom sections yet. Click "Add Section" to create one.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Center - Live Preview with Inline Editing */}
          <main className="modern-preview-area">
            <div className="preview-toolbar">
              <div className="template-info">
                <span className="current-template-name">{templates[selectedDesign]?.name}</span>
                <span className="template-category">{templates[selectedDesign]?.category}</span>
              </div>
              <div className="toolbar-hint">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 7V11M8 5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Click any text to edit</span>
              </div>
            </div>

            <div className="preview-canvas">
              <div 
                ref={resumeRef} 
                className="preview-container-modern"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center top'
                }}
              >
                <InlineEditableResume
                  templateId={selectedDesign}
                  data={resumeData}
                  updateField={updateField}
                  updateHeading={updateHeading}
                  addSection={addSection}
                  removeSection={removeSection}
                />
              </div>
            </div>
          </main>

          {/* Templates Drawer - Slide from Right */}
          <aside className={`templates-drawer ${showTemplates ? 'open' : ''}`}>
            <div className="drawer-header">
              <h3>Choose Template</h3>
              <button className="drawer-close" onClick={() => setShowTemplates(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="templates-grid">
              {resumeDesigns.map((design) => (
                <div
                  key={design.id}
                  className={`template-card ${selectedDesign === design.id ? 'selected' : ''}`}
                  onClick={() => {
                    handleDesignChange(design.id);
                    setShowTemplates(false);
                  }}
                >
                  <div className="template-preview-card">
                    <MiniPreview templateId={design.id} data={resumeData} />
                    {selectedDesign === design.id && (
                      <div className="selected-badge">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="template-card-info">
                    <h4>{design.name}</h4>
                    <span className="category-badge" style={{ backgroundColor: design.color + '20', color: design.color }}>
                      {design.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Overlay for drawer */}
          {showTemplates && (
            <div className="drawer-overlay" onClick={() => setShowTemplates(false)}></div>
          )}
        </div>

        {/* Hidden print version */}
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <div ref={printRef}>
            <ResumePreview
              templateId={selectedDesign}
              data={resumeData}
              scale={1}
              forPrint={true}
            />
          </div>
        </div>
      </main>
    </>
  );
}
