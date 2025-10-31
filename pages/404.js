import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - AT Solutions</title>
      </Head>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '6rem',
            fontWeight: '800',
            marginBottom: '1rem',
            lineHeight: 1
          }}>404</h1>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>Page Not Found</h2>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>
            Oops! The page you're looking for doesn't exist. 
            Let's get you back to building your professional resume.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/" 
              style={{
                background: 'white',
                color: '#6366f1',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
            >
              Go Home
            </Link>
            <Link 
              href="/select" 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
            >
              Choose Template
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
