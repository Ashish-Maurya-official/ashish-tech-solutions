import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Logo from '../components/Logo';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>AT Solutions - Create Professional Resumes That Get You Hired</title>
        <meta name="description" content="Build a beautiful, professional resume in minutes with our easy-to-use builder. Choose from expert-designed templates and get hired faster." />
      </Head>
      <div className="at-solutions-layout">
        {/* Navigation Header */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <Link href="/" className="brand-logo">
              <Logo size="medium" showText={true} />
            </Link>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link href="#templates" className="nav-link">Templates</Link>
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#pricing" className="nav-link">Pricing</Link>
            <Link href="#help" className="nav-link">Help</Link>
          </div>

          <div className="nav-actions">
            <Link href="/select" className="btn-outline">
              Sign In
            </Link>
            <Link href="/select" className="btn-primary">
              Create Resume
            </Link>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨ Trusted by 2M+ job seekers</span>
            </div>
            
            <h1 className="hero-title">
              Create a professional resume that gets you hired
            </h1>
            
            <p className="hero-description">
              Build a beautiful, professional resume in minutes with our easy-to-use builder. 
              Choose from expert-designed templates and get hired faster.
            </p>

            <div className="hero-cta">
              <Link href="/select" className="btn-primary large">
                Create My Resume - Free
              </Link>
              <div className="hero-stats">
                <span>✓ Free to use</span>
                <span>✓ No signup required</span>
                <span>✓ ATS-friendly</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="resume-showcase">
              <div className="resume-card featured">
                <div className="resume-header">
                  <div className="resume-avatar"></div>
                  <div className="resume-info">
                    <div className="name-placeholder"></div>
                    <div className="title-placeholder"></div>
                  </div>
                </div>
                <div className="resume-body">
                  <div className="section-block">
                    <div className="section-title"></div>
                    <div className="section-content">
                      <div className="content-line"></div>
                      <div className="content-line short"></div>
                    </div>
                  </div>
                  <div className="section-block">
                    <div className="section-title"></div>
                    <div className="section-content">
                      <div className="content-line"></div>
                      <div className="content-line"></div>
                      <div className="content-line short"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="resume-card secondary">
                <div className="resume-header alt">
                  <div className="resume-avatar small"></div>
                  <div className="resume-info">
                    <div className="name-placeholder small"></div>
                    <div className="title-placeholder small"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-header">
            <h2>Everything you need to create a winning resume</h2>
            <p>Professional templates, expert guidance, and powerful tools to help you land your dream job.</p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Professional Templates</h3>
              <p>Choose from 20+ expertly designed templates that are loved by recruiters and hiring managers.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Real-time Editor</h3>
              <p>See your changes instantly as you type. Our intuitive editor makes resume building fast and easy.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>ATS-Friendly</h3>
              <p>All our templates are optimized to pass Applicant Tracking Systems used by most companies.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Easy Export</h3>
              <p>Download your resume as a high-quality PDF ready for job applications and printing.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22S2 16 2 10A10 10 0 0 1 22 10C22 16 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Privacy First</h3>
              <p>Your data stays private. We don't store your personal information or share it with third parties.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Expert Tips</h3>
              <p>Get professional advice and tips to make your resume stand out from the competition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="templates-section" id="templates">
        <div className="section-container">
          <div className="section-header">
            <h2>Choose from professional templates</h2>
            <p>All templates are designed by experts and optimized for modern hiring practices.</p>
          </div>

          <div className="templates-showcase">
            <div className="template-card">
              <div className="template-preview modern">
                <div className="template-header">
                  <div className="template-avatar"></div>
                  <div className="template-info">
                    <div className="template-name"></div>
                    <div className="template-title"></div>
                  </div>
                </div>
                <div className="template-sections">
                  <div className="template-section">
                    <div className="section-header-line"></div>
                    <div className="section-content-lines">
                      <div className="content-line"></div>
                      <div className="content-line short"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="template-info-card">
                <h4>Modern Professional</h4>
                <p>Clean and contemporary</p>
              </div>
            </div>

            <div className="template-card">
              <div className="template-preview creative">
                <div className="template-header creative">
                  <div className="template-avatar"></div>
                  <div className="template-info">
                    <div className="template-name"></div>
                    <div className="template-title"></div>
                  </div>
                </div>
                <div className="template-sections">
                  <div className="template-section">
                    <div className="section-header-line"></div>
                    <div className="section-content-lines">
                      <div className="content-line"></div>
                      <div className="content-line short"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="template-info-card">
                <h4>Creative Design</h4>
                <p>Stand out and unique</p>
              </div>
            </div>

            <div className="template-card">
              <div className="template-preview minimal">
                <div className="template-header minimal">
                  <div className="template-avatar"></div>
                  <div className="template-info">
                    <div className="template-name"></div>
                    <div className="template-title"></div>
                  </div>
                </div>
                <div className="template-sections">
                  <div className="template-section">
                    <div className="section-header-line"></div>
                    <div className="section-content-lines">
                      <div className="content-line"></div>
                      <div className="content-line short"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="template-info-card">
                <h4>Minimal Classic</h4>
                <p>Simple and effective</p>
              </div>
            </div>
          </div>

          <div className="templates-cta">
            <Link href="/select" className="btn-primary">
              View All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to create your professional resume?</h2>
            <p>Join millions of job seekers who have successfully landed their dream jobs with our resume builder.</p>
            <Link href="/select" className="btn-primary large">
              Create My Resume - It's Free
            </Link>
            <div className="cta-features">
              <span>✓ No credit card required</span>
              <span>✓ Ready in 5 minutes</span>
              <span>✓ Professional results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <Logo size="large" showText={true} />
            <p>Create professional resumes that get you hired.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <Link href="/select">Resume Builder</Link>
              <Link href="#templates">Templates</Link>
              <Link href="#features">Features</Link>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <Link href="#help">Help Center</Link>
              <Link href="#contact">Contact Us</Link>
              <Link href="#faq">FAQ</Link>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <Link href="#about">About Us</Link>
              <Link href="#privacy">Privacy Policy</Link>
              <Link href="#terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-container">
            <p>&copy; 2024 AT Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
