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
  customSections: [],
  // Canvas elements for document editor
  elements: [],
  pageStyle: {
    backgroundColor: '#ffffff',
    padding: '40px',
    width: '210mm',
    minHeight: '297mm'
  }
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(sampleData);
  const [selectedDesign, setSelectedDesign] = useState('canvas');
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

  // Reorder sections
  const reorderSections = (newOrder) => {
    setResumeData(prev => ({
      ...prev,
      sectionOrder: newOrder
    }));
  };

  // Reorder items within a section (experience, education, etc.)
  const reorderSectionItems = (section, fromIndex, toIndex) => {
    setResumeData(prev => {
      const items = [...prev[section]];
      const [removed] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, removed);
      return {
        ...prev,
        [section]: items
      };
    });
  };

  // Update element position (for free-form canvas)
  const updateElementPosition = (elementId, position) => {
    setResumeData(prev => ({
      ...prev,
      elementPositions: {
        ...prev.elementPositions,
        [elementId]: position
      }
    }));
  };

  // Add element to canvas
  const addElement = (elementData) => {
    const newElement = {
      id: `el_${Date.now()}`,
      ...elementData
    };
    
    setResumeData(prev => ({
      ...prev,
      elements: [...(prev.elements || []), newElement]
    }));
  };

  // Update element
  const updateElement = (elementId, updates) => {
    setResumeData(prev => ({
      ...prev,
      elements: (prev.elements || []).map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  };

  // Delete element
  const deleteElement = (elementId) => {
    setResumeData(prev => ({
      ...prev,
      elements: (prev.elements || []).filter(el => el.id !== elementId)
    }));
  };

  // Update page style
  const updatePageStyle = (property, value) => {
    setResumeData(prev => ({
      ...prev,
      pageStyle: {
        ...prev.pageStyle,
        [property]: value
      }
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
      reorderSections,
      reorderSectionItems,
      updateElementPosition,
      addElement,
      updateElement,
      deleteElement,
      updatePageStyle,
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
