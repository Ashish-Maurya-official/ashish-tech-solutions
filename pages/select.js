import { useRouter } from 'next/router';
import { useResume } from '../context/ResumeContext';
import { useState } from 'react';
import Head from 'next/head';
import { templates } from '../components/templates';

const resumeDesigns = Object.values(templates);

export default function Select() {
  const router = useRouter();
  const { setSelectedDesign } = useResume();
  const [hoveredDesign, setHoveredDesign] = useState(null);

  const handleSelect = (designId) => {
    setSelectedDesign(designId);
    router.push('/editor');
  };

  return (
    <>
      <Head>
        <title>Choose Your Resume Template - BetterCV</title>
        <meta name="description" content="Select from 12 professional resume templates designed by experts." />
      </Head>
      <main className="select-page">
        <div className="select-header">
          <button 
          className="back-btn"
          onClick={() => router.back()}
          style={{ 
            position: 'absolute', 
            top: '2rem', 
            left: '2rem',
            zIndex: 10
          }}
        >
          ← Back
        </button>
        <h1>Choose Your Resume Design</h1>
        <p>Select a template that matches your style and industry</p>
      </div>

      <div className="designs-grid">
        {resumeDesigns.map((design) => (
          <div
            key={design.id}
            className={`design-card ${hoveredDesign === design.id ? 'elevated' : ''}`}
            onMouseEnter={() => setHoveredDesign(design.id)}
            onMouseLeave={() => setHoveredDesign(null)}
            onClick={() => handleSelect(design.id)}
          >
            <div className="design-preview" style={{ borderColor: design.color }}>
              <div className="preview-mockup" style={{ backgroundColor: design.color + '10' }}>
                <div className="mockup-header" style={{ backgroundColor: design.color }}>
                  <div className="mockup-avatar"></div>
                  <div className="mockup-name">
                    <div className="name-line"></div>
                    <div className="title-line"></div>
                  </div>
                </div>
                <div className="mockup-content">
                  <div className="content-section">
                    <div className="section-title" style={{ backgroundColor: design.color }}></div>
                    <div className="section-lines">
                      <div className="content-line"></div>
                      <div className="content-line short"></div>
                    </div>
                  </div>
                  <div className="content-section">
                    <div className="section-title" style={{ backgroundColor: design.color }}></div>
                    <div className="section-lines">
                      <div className="content-line"></div>
                      <div className="content-line"></div>
                      <div className="content-line short"></div>
                    </div>
                  </div>
                </div>
              </div>

              {hoveredDesign === design.id && (
                <div className="preview-overlay">
                  <button className="use-template-btn">Use This Template</button>
                </div>
              )}
            </div>

            <div className="design-info">
              <h3>{design.name}</h3>
              <span className="design-category">{design.category}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
    </>
  );
}
