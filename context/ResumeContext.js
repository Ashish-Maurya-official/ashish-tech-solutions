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
    languages: 'Languages',
    links: 'Links'
  },
  // Section visibility (which sections to show)
  sectionVisibility: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    languages: true,
    links: true
  },
  // Style customization
  styling: {
    primaryColor: '#1f2937',
    accentColor: '#6366f1',
    fontFamily: 'Segoe UI',
    fontSize: 'medium',
    lineHeight: 'normal',
    sectionSpacing: 'normal'
  },
  // Ensure arrays exist for optional sections
  experience: resumeData.experience || [],
  projects: resumeData.projects || [],
  education: resumeData.education || [],
  skills: resumeData.skills || [],
  languages: resumeData.languages || [],
  links: resumeData.links || [],
  customSections: []
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(sampleData);
  const [selectedDesign, setSelectedDesign] = useState('classic');
  const [selectedComponent, setSelectedComponent] = useState(null); // Track which component is selected for styling

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

  const toggleSectionVisibility = (section) => {
    setResumeData(prev => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [section]: !prev.sectionVisibility[section]
      }
    }));
  };

  const updateStyling = (property, value) => {
    setResumeData(prev => ({
      ...prev,
      styling: {
        ...prev.styling,
        [property]: value
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
          content: 'Add your content here...',
          subheadings: []  // Array to store subheadings
        }
      ]
    }));
  };

  const addSubheading = (sectionId) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              subheadings: [
                ...(section.subheadings || []),
                {
                  id: Date.now(),
                  title: 'Subheading',
                  content: 'Add details here...'
                }
              ]
            }
          : section
      )
    }));
  };

  const removeSubheading = (sectionId, subheadingId) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              subheadings: (section.subheadings || []).filter(sub => sub.id !== subheadingId)
            }
          : section
      )
    }));
  };

  const updateSubheading = (sectionId, subheadingId, field, value) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              subheadings: (section.subheadings || []).map(sub =>
                sub.id === subheadingId ? { ...sub, [field]: value } : sub
              )
            }
          : section
      )
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
      selectedComponent,
      setSelectedComponent,
      updateField,
      addSection,
      removeSection,
      updateHeading,
      toggleSectionVisibility,
      updateStyling,
      addCustomSection,
      removeCustomSection,
      updateCustomSection,
      addSubheading,
      removeSubheading,
      updateSubheading,
      sampleData
    }}>
      {children}
    </ResumeContext.Provider>
  );
}
