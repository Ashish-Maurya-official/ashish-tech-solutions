import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Logo from '../components/Logo';

export default function Dashboard() {
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newResumeName, setNewResumeName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error('Failed to load resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newResumeName || 'Untitled Resume',
          template: selectedTemplate
        })
      });
      
      const newResume = await response.json();
      router.push(`/editor?id=${newResume.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  const deleteResume = async (id, e) => {
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      loadResumes();
    } catch (error) {
      console.error('Failed to delete resume:', error);
    }
  };

  const duplicateResume = async (resume, e) => {
    e.stopPropagation();
    
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${resume.name} (Copy)`,
          template: resume.selectedDesign
        })
      });
      
      const newResume = await response.json();
      
      // Copy data from original resume
      await fetch(`/api/resumes/${newResume.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newResume,
          data: resume.data
        })
      });
      
      loadResumes();
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
    }
  };

  return (
    <>
      <Head>
        <title>My Resumes - AT Solutions</title>
      </Head>
      
      <div className="dashboard-page">
        <nav className="dashboard-navbar">
          <div className="navbar-content">
            <Logo />
            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>New Resume</span>
            </button>
          </div>
        </nav>

        <main className="dashboard-content">
          <div className="dashboard-header">
            <h1>My Resumes</h1>
            <p>Create and manage your professional resumes</p>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner-large"></div>
              <p>Loading resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="empty-state-large">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="30" y="20" width="60" height="80" rx="4" stroke="#d1d5db" strokeWidth="2"/>
                <line x1="40" y1="35" x2="80" y2="35" stroke="#d1d5db" strokeWidth="2"/>
                <line x1="40" y1="45" x2="70" y2="45" stroke="#d1d5db" strokeWidth="2"/>
                <line x1="40" y1="60" x2="80" y2="60" stroke="#d1d5db" strokeWidth="2"/>
                <line x1="40" y1="70" x2="75" y2="70" stroke="#d1d5db" strokeWidth="2"/>
              </svg>
              <h2>No resumes yet</h2>
              <p>Create your first resume to get started</p>
              <button className="btn-primary-large" onClick={() => setShowCreateModal(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Create Resume</span>
              </button>
            </div>
          ) : (
            <div className="resumes-grid">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="resume-card"
                  onClick={() => router.push(`/editor?id=${resume.id}`)}
                >
                  <div className="resume-preview">
                    <div className="preview-placeholder">
                      <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
                        <rect width="60" height="80" rx="4" fill="#f3f4f6"/>
                        <rect x="8" y="8" width="44" height="6" rx="2" fill="#6366f1"/>
                        <rect x="8" y="18" width="30" height="4" rx="2" fill="#d1d5db"/>
                        <rect x="8" y="28" width="44" height="2" rx="1" fill="#e5e7eb"/>
                        <rect x="8" y="34" width="44" height="2" rx="1" fill="#e5e7eb"/>
                        <rect x="8" y="40" width="44" height="2" rx="1" fill="#e5e7eb"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="resume-info">
                    <h3>{resume.name}</h3>
                    <p className="resume-meta">
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="resume-actions">
                    <button
                      className="action-btn"
                      onClick={(e) => duplicateResume(resume, e)}
                      title="Duplicate"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={(e) => deleteResume(resume.id, e)}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M7 7v5M9 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Create Resume Modal */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create New Resume</h2>
                <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Resume Name</label>
                  <input
                    type="text"
                    value={newResumeName}
                    onChange={(e) => setNewResumeName(e.target.value)}
                    placeholder="e.g., Software Engineer Resume"
                    className="form-input"
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label>Template</label>
                  <div className="template-selector">
                    {['classic', 'modern', 'minimal'].map((template) => (
                      <div
                        key={template}
                        className={`template-option ${selectedTemplate === template ? 'selected' : ''}`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="template-preview-small">
                          <div className="template-icon">{template[0].toUpperCase()}</div>
                        </div>
                        <span>{template.charAt(0).toUpperCase() + template.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={createResume}>
                  Create Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          background: #f9fafb;
        }

        .dashboard-navbar {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 24px;
        }

        .navbar-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        .dashboard-header {
          margin-bottom: 40px;
        }

        .dashboard-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .dashboard-header p {
          font-size: 16px;
          color: #6b7280;
          margin: 0;
        }

        .resumes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .resume-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;
        }

        .resume-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
          border-color: #6366f1;
        }

        .resume-preview {
          height: 200px;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #e5e7eb;
        }

        .resume-info {
          padding: 16px;
        }

        .resume-info h3 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
        }

        .resume-meta {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .resume-actions {
          padding: 12px 16px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          color: #6b7280;
        }

        .action-btn:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .action-btn.delete:hover {
          background: #fee2e2;
          border-color: #fecaca;
          color: #dc2626;
        }

        .empty-state-large {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-state-large h2 {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin: 24px 0 8px 0;
        }

        .empty-state-large p {
          font-size: 16px;
          color: #6b7280;
          margin: 0 0 32px 0;
        }

        .loading-state {
          text-align: center;
          padding: 80px 20px;
        }

        .spinner-large {
          width: 48px;
          height: 48px;
          border: 4px solid #e5e7eb;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .btn-primary, .btn-primary-large {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary-large {
          padding: 14px 28px;
          font-size: 16px;
        }

        .btn-primary:hover, .btn-primary-large:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .modal-close {
          width: 36px;
          height: 36px;
          border: none;
          background: #f3f4f6;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #e5e7eb;
        }

        .modal-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .template-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .template-option {
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .template-option:hover {
          border-color: #6366f1;
          background: #f9fafb;
        }

        .template-option.selected {
          border-color: #6366f1;
          background: #eef2ff;
        }

        .template-preview-small {
          width: 60px;
          height: 80px;
          background: #f3f4f6;
          border-radius: 4px;
          margin: 0 auto 8px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .template-icon {
          font-size: 32px;
          font-weight: 700;
          color: #6366f1;
        }

        .template-option span {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .btn-secondary {
          padding: 10px 20px;
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: #f3f4f6;
        }

        @media (max-width: 768px) {
          .resumes-grid {
            grid-template-columns: 1fr;
          }

          .template-selector {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
