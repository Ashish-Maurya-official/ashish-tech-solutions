import { createContext, useContext, useState } from 'react';
import resumeData from '../data/resumeData.json';

const ResumeContext = createContext();

export function useResume() {
  return useContext(ResumeContext);
}

// Sample data for all resume previews
const sampleData = {
  ...resumeData,
  // Section headings (editable)
  headings: {
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    skills: 'Technical Skills',
    projects: 'Key Projects',
    languages: 'Languages'
  },
  // Ensure arrays exist for optional sections
  experience: resumeData.experience || [],
  projects: resumeData.projects || [],
  education: resumeData.education || [],
  skills: resumeData.skills || [],
  languages: resumeData.languages || [],
  customSections: []
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(sampleData);
  const [selectedDesign, setSelectedDesign] = useState('classic');

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
