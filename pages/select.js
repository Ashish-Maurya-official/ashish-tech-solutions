import { useRouter } from 'next/router';
import { useResume } from '../context/ResumeContext';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { templates } from '../components/templates';

const resumeDesigns = Object.values(templates);
const categories = ['All', ...new Set(resumeDesigns.map(d => d.category))];

export default function Select() {
  const router = useRouter();
  const { setSelectedDesign, sampleData } = useResume();
  const [hoveredDesign, setHoveredDesign] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewModalDesign, setPreviewModalDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const previewRefs = useRef({});

  const handleSelect = (designId) => {
    setSelectedDesign(designId);
    router.push('/editor');
  };

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (previewModalDesign) {
      document.body.style.overflow = 'hidden';
      
      // Add ESC key handler
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          setPreviewModalDesign(null);
        }
      };
      window.addEventListener('keydown', handleEsc);
      
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [previewModalDesign]);

  const filteredDesigns = selectedCategory === 'All' 
    ? resumeDesigns 
    : resumeDesigns.filter(d => d.category === selectedCategory);

  useEffect(() => {
    // Set loading to false after component mounts
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Choose Your Resume Template - BetterCV</title>
        <meta name="description" content="Select from 12 professional resume templates designed by experts." />
      </Head>
      <main className="select-page">
        <div className="select-container">
          <div className="select-header">
            <button 
              className="back-btn"
              onClick={() => router.back()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            
            <div className="header-content">
              <h1>Choose Your Perfect Template</h1>
              <p>Select from our collection of professionally designed resume templates</p>
            </div>

            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="designs-grid">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className={`design-card ${hoveredDesign === design.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredDesign(design.id)}
                onMouseLeave={() => setHoveredDesign(null)}
              >
                <div className="card-inner">
                  <div className="design-preview">
                    <div className="resume-preview-container">
                      {design.component && <design.component data={sampleData} />}
                    </div>

                    {hoveredDesign === design.id && (
                      <div className="preview-overlay">
                        <div className="overlay-content">
                          <button 
                            className="preview-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewModalDesign(design);
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                            Preview
                          </button>
                          <button 
                            className="select-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelect(design.id);
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Use Template
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="design-info">
                    <div className="info-header">
                      <h3>{design.name}</h3>
                      <span className="category-badge" style={{ backgroundColor: design.color + '20', color: design.color }}>
                        {design.category}
                      </span>
                    </div>
                    <p className="design-description">{design.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preview Modal */}
          {previewModalDesign && (
            <div 
              className="preview-modal" 
              onClick={() => setPreviewModalDesign(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <div>
                    <h2 id="modal-title">{previewModalDesign.name}</h2>
                    <span className="category-badge" style={{ 
                      backgroundColor: previewModalDesign.color + '20', 
                      color: previewModalDesign.color 
                    }}>
                      {previewModalDesign.category}
                    </span>
                  </div>
                  <button 
                    className="close-btn" 
                    onClick={() => setPreviewModalDesign(null)}
                    aria-label="Close preview"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="modal-resume-preview">
                    {previewModalDesign.component && <previewModalDesign.component data={sampleData} />}
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="modal-cancel-btn" onClick={() => setPreviewModalDesign(null)}>
                    Cancel
                  </button>
                  <button 
                    className="modal-select-btn" 
                    onClick={() => {
                      handleSelect(previewModalDesign.id);
                      setPreviewModalDesign(null);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
