import { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export function useResume() {
  return useContext(ResumeContext);
}

// Sample data for all resume previews
const sampleData = {
  name: 'Alex Johnson',
  title: 'Full Stack Developer',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  summary: 'Experienced full-stack developer with 5+ years building scalable web applications using React, Node.js, and cloud technologies.',
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      years: '2021 - Present',
      description: 'Led development of microservices architecture serving 1M+ users. Built React dashboards and Node.js APIs.'
    },
    {
      role: 'Software Developer',
      company: 'StartupXYZ',
      years: '2019 - 2021',
      description: 'Developed e-commerce platform features. Implemented payment systems and inventory management.'
    }
  ],
  education: [
    {
      school: 'University of California, Berkeley',
      degree: 'BS Computer Science',
      years: '2015 - 2019'
    }
  ],
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker', 'GraphQL'],
  // Section headings (editable)
  headings: {
    summary: 'Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills'
  },
  // Custom sections
  customSections: []
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(sampleData);
  const [selectedDesign, setSelectedDesign] = useState('modern');

  const updateField = (path, value) => {
    setResumeData(prev => {
      const clone = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let ref = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return clone;
    });
  };

  const addSection = (section, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], defaultItem]
    }));
  };

  const removeSection = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateHeading = (section, newHeading) => {
    setResumeData(prev => ({
      ...prev,
      headings: {
        ...prev.headings,
        [section]: newHeading
      }
    }));
  };

  const addCustomSection = () => {
    setResumeData(prev => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        {
          id: Date.now(),
          title: 'New Section',
          content: 'Add your content here...'
        }
      ]
    }));
  };

  const removeCustomSection = (id) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.id !== id)
    }));
  };

  const updateCustomSection = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      selectedDesign,
      setSelectedDesign,
      updateField,
      addSection,
      removeSection,
      updateHeading,
      addCustomSection,
      removeCustomSection,
      updateCustomSection,
      sampleData
    }}>
      {children}
    </ResumeContext.Provider>
  );
}
