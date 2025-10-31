// Global styles
import '../styles/globals.css';

// Page-specific styles
import '../styles/pages/landing.css';
import '../styles/pages/select.css';
import '../styles/pages/404.css';

// Template base styles (shared across all templates)
import '../components/templates/base.css';

// Template-specific styles
import '../components/templates/ClassicTemplate/ClassicTemplate.css';

// Component styles
import '../components/InlineEditableResume/InlineEditableResume.css';

// Editor styles
import '../styles/editor.css';

import { ResumeProvider } from '../context/ResumeContext';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <ResumeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </ResumeProvider>
  );
}
