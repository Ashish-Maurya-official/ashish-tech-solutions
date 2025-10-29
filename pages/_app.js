// Global styles
import '../styles/globals.css';

// Page-specific styles
import '../styles/pages/landing.css';
import '../styles/pages/select.css';
import '../styles/pages/404.css';

// Template base styles (shared across all templates)
import '../components/templates/base.css';

// Template-specific styles
import '../components/templates/ModernTemplate/ModernTemplate.css';
import '../components/templates/ClassicTemplate/ClassicTemplate.css';
import '../components/templates/CreativeTemplate/CreativeTemplate.css';
import '../components/templates/MinimalTemplate/MinimalTemplate.css';
import '../components/templates/ExecutiveTemplate/ExecutiveTemplate.css';
import '../components/templates/TechTemplate/TechTemplate.css';
import '../components/templates/ProfessionalTemplate/ProfessionalTemplate.css';

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
        <meta name="theme-color" content="#1e3c72" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <Component {...pageProps} />
    </ResumeProvider>
  );
}
