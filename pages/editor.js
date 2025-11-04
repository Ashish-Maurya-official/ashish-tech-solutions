import { useRouter } from 'next/router';
import { useResume } from '../context/ResumeContext';
import { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Head from 'next/head';
import ResumePreview from '../components/ResumePreview';
import InlineEditableResume from '../components/InlineEditableResume';
import StylePresets from '../components/StylePresets';
import { COLOR_PRESETS, SHAPES } from '../components/ShapesLibrary';
import ElementsPanel from '../components/Editor/ElementsPanel';
import BlankCanvas from '../components/Editor/BlankCanvas';

import { templates } from '../components/templates';

const resumeDesigns = Object.values(templates);

function EditableField({ value, onChange, placeholder, multiline = false, className = '' }) {
  return multiline ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`editable-field ${className}`}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`editable-field ${className}`}
    />
  );
}

function MiniPreview({ templateId, data }) {
  return (
    <div className="mini-preview-container">
      <ResumePreview
        templateId={templateId}
        data={data}
        scale={0.35}
        fitLayout={true}
      />
    </div>
  );
}

export default function Editor() {
  const router = useRouter();
  const { 
    resumeData, 
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
    reorderSections,
    reorderSectionItems,
    updateElementPosition,
    addElement,
    updateElement,
    deleteElement,
    updatePageStyle
  } = useResume();
  
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeSection, setActiveSection] = useState('elements');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragMode, setDragMode] = useState(false);
  const resumeRef = useRef();
  const printRef = useRef();

  // Handle component click for styling - Switch to style tab
  const handleComponentClick = (componentInfo, event) => {
    event.stopPropagation();
    setSelectedComponent(componentInfo);
    setActiveSection('style'); // Switch to style tab
    if (isMobile) {
      setShowSidebar(true); // Show sidebar on mobile
    }
  };

  // Handle delete element
  const handleDeleteElement = (componentInfo) => {
    if (!componentInfo) return;

    // Handle different types of deletions
    if (componentInfo.section === 'experience' && componentInfo.index !== undefined) {
      removeSection('experience', componentInfo.index);
    } else if (componentInfo.section === 'education' && componentInfo.index !== undefined) {
      removeSection('education', componentInfo.index);
    } else if (componentInfo.section === 'projects' && componentInfo.index !== undefined) {
      removeSection('projects', componentInfo.index);
    } else if (componentInfo.section === 'links' && componentInfo.index !== undefined) {
      removeSection('links', componentInfo.index);
    } else if (componentInfo.section === 'customSections' && componentInfo.sectionId) {
      removeCustomSection(componentInfo.sectionId);
    } else if (componentInfo.section === 'customSubheading' && componentInfo.sectionId && componentInfo.subheadingId) {
      removeSubheading(componentInfo.sectionId, componentInfo.subheadingId);
    }
    
    // Clear selection after delete
    setSelectedComponent(null);
  };

  // Apply style preset
  const handleApplyPreset = (presetStyling) => {
    Object.keys(presetStyling).forEach(key => {
      updateStyling(key, presetStyling[key]);
    });
  };

  // Get display name for component
  const getComponentDisplayName = (component) => {
    if (!component || !component.type) return 'Component';
    
    const typeNames = {
      'name': 'Name',
      'title': 'Job Title',
      'contactInfo': 'Contact Info',
      'sectionTitle': 'Section Title',
      'divider': 'Divider',
      'summaryText': 'Summary Text',
      'experienceItem': 'Experience Item',
      'educationItem': 'Education Item',
      'projectItem': 'Project Item',
      'skillsList': 'Skills List',
      'sectionContainer': 'Section Container'
    };
    
    return typeNames[component.type] || component.type;
  };

  // Render component-specific style options
  const renderComponentStyleOptions = (component) => {
    if (!component || !component.type) return null;

    const styling = resumeData.styling || {};

    switch (component.type) {
      case 'name':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">Name Styling</h4>
              <div className="style-option">
                <label>Size</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="24"
                    max="48"
                    value={styling.headingSize || 32}
                    onChange={(e) => updateStyling('headingSize', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.headingSize || 32}px</span>
                </div>
              </div>
              <div className="style-option">
                <label>Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.primaryColor || '#1f2937'}
                    onChange={(e) => updateStyling('primaryColor', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.primaryColor || '#1f2937'}
                    onChange={(e) => updateStyling('primaryColor', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
              <div className="style-option">
                <label>Font Family</label>
                <select
                  value={styling.fontFamily || 'Segoe UI'}
                  onChange={(e) => updateStyling('fontFamily', e.target.value)}
                  className="style-select"
                >
                  <option value="Segoe UI">Segoe UI</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Courier New">Courier New</option>
                </select>
              </div>
            </div>
          </>
        );

      case 'title':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">Job Title Styling</h4>
              <div className="style-option">
                <label>Size</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="14"
                    max="24"
                    value={styling.titleSize || 18}
                    onChange={(e) => updateStyling('titleSize', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.titleSize || 18}px</span>
                </div>
              </div>
              <div className="style-option">
                <label>Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.titleColor || '#1f2937'}
                    onChange={(e) => updateStyling('titleColor', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.titleColor || '#1f2937'}
                    onChange={(e) => updateStyling('titleColor', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'sectionTitle':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">Section Title Styling</h4>
              <div className="style-option">
                <label>Size</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={styling.sectionTitleSize || 16}
                    onChange={(e) => updateStyling('sectionTitleSize', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.sectionTitleSize || 16}px</span>
                </div>
              </div>
              <div className="style-option">
                <label>Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.sectionTitleColor || '#1f2937'}
                    onChange={(e) => updateStyling('sectionTitleColor', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.sectionTitleColor || '#1f2937'}
                    onChange={(e) => updateStyling('sectionTitleColor', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
              <div className="style-option">
                <label>Weight</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="400"
                    max="900"
                    step="100"
                    value={styling.sectionTitleWeight || 600}
                    onChange={(e) => updateStyling('sectionTitleWeight', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.sectionTitleWeight || 600}</span>
                </div>
              </div>
              <div className="style-option">
                <label>Text Transform</label>
                <select
                  value={styling.sectionTitleTransform || 'uppercase'}
                  onChange={(e) => updateStyling('sectionTitleTransform', e.target.value)}
                  className="style-select"
                >
                  <option value="uppercase">UPPERCASE</option>
                  <option value="lowercase">lowercase</option>
                  <option value="capitalize">Capitalize</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </>
        );

      case 'divider':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">Divider Styling</h4>
              
              <div className="style-option">
                <label>Divider Shape</label>
                <div className="divider-shapes-grid">
                  {SHAPES.dividers.slice(0, 5).map((shape) => (
                    <button
                      key={shape.id}
                      className={`divider-shape-btn ${styling.dividerShape === shape.id ? 'active' : ''}`}
                      onClick={() => updateStyling('dividerShape', shape.id)}
                    >
                      <div className="divider-shape-preview">
                        {shape.id === 'line' && <div style={{ width: '100%', height: '2px', backgroundColor: styling.dividerColor || '#1f2937' }}></div>}
                        {shape.id === 'double-line' && (
                          <div style={{ width: '100%' }}>
                            <div style={{ width: '100%', height: '2px', backgroundColor: styling.dividerColor || '#1f2937', marginBottom: '3px' }}></div>
                            <div style={{ width: '100%', height: '1px', backgroundColor: styling.dividerColor || '#1f2937' }}></div>
                          </div>
                        )}
                        {shape.id === 'dotted' && <div style={{ width: '100%', height: '2px', borderTop: `2px dotted ${styling.dividerColor || '#1f2937'}` }}></div>}
                        {shape.id === 'wave' && <div style={{ fontSize: '16px', color: styling.dividerColor || '#1f2937' }}>〰</div>}
                        {shape.id === 'zigzag' && <div style={{ fontSize: '14px', color: styling.dividerColor || '#1f2937' }}>⚡</div>}
                      </div>
                      <span className="divider-shape-name">{shape.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="style-option">
                <label>Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.dividerColor || '#1f2937'}
                    onChange={(e) => updateStyling('dividerColor', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.dividerColor || '#1f2937'}
                    onChange={(e) => updateStyling('dividerColor', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
              <div className="style-option">
                <label>Style</label>
                <select
                  value={styling.dividerStyle || 'solid'}
                  onChange={(e) => updateStyling('dividerStyle', e.target.value)}
                  className="style-select"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double">Double</option>
                </select>
              </div>
              <div className="style-option">
                <label>Thickness</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={styling.dividerThickness || 2}
                    onChange={(e) => updateStyling('dividerThickness', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.dividerThickness || 2}px</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'summaryText':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">Text Styling</h4>
              <div className="style-option">
                <label>Size</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="12"
                    max="18"
                    value={styling.summarySize || 14}
                    onChange={(e) => updateStyling('summarySize', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.summarySize || 14}px</span>
                </div>
              </div>
              <div className="style-option">
                <label>Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.textColor || '#1f2937'}
                    onChange={(e) => updateStyling('textColor', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.textColor || '#1f2937'}
                    onChange={(e) => updateStyling('textColor', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
              <div className="style-option">
                <label>Line Height</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="1.2"
                    max="2"
                    step="0.1"
                    value={styling.lineHeight || 1.5}
                    onChange={(e) => updateStyling('lineHeight', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.lineHeight || 1.5}</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'contactInfo':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">Contact Info Styling</h4>
              <div className="style-option">
                <label>Size</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="11"
                    max="16"
                    value={styling.contactSize || 14}
                    onChange={(e) => updateStyling('contactSize', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.contactSize || 14}px</span>
                </div>
              </div>
              <div className="style-option">
                <label>Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.contactColor || '#1f2937'}
                    onChange={(e) => updateStyling('contactColor', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.contactColor || '#1f2937'}
                    onChange={(e) => updateStyling('contactColor', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'experienceItem':
      case 'educationItem':
      case 'projectItem':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">Item Styling</h4>
              <div className="style-option">
                <label>Text Size</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="11"
                    max="16"
                    value={styling.itemTextSize || 14}
                    onChange={(e) => updateStyling('itemTextSize', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.itemTextSize || 14}px</span>
                </div>
              </div>
              <div className="style-option">
                <label>Text Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.textColor || '#1f2937'}
                    onChange={(e) => updateStyling('textColor', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.textColor || '#1f2937'}
                    onChange={(e) => updateStyling('textColor', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
              <div className="style-option">
                <label>Title Weight</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="400"
                    max="900"
                    step="100"
                    value={styling.itemTitleWeight || 600}
                    onChange={(e) => updateStyling('itemTitleWeight', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.itemTitleWeight || 600}</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'skillsList':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">List Styling</h4>
              <div className="style-option">
                <label>Size</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="11"
                    max="16"
                    value={styling.skillsSize || 14}
                    onChange={(e) => updateStyling('skillsSize', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.skillsSize || 14}px</span>
                </div>
              </div>
              <div className="style-option">
                <label>Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.textColor || '#1f2937'}
                    onChange={(e) => updateStyling('textColor', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.textColor || '#1f2937'}
                    onChange={(e) => updateStyling('textColor', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'sectionContainer':
        return (
          <>
            <div className="style-group">
              <h4 className="style-group-title">Container Styling</h4>
              
              <div className="style-option">
                <label>Position Type</label>
                <select
                  value={styling.containerPosition || 'relative'}
                  onChange={(e) => updateStyling('containerPosition', e.target.value)}
                  className="style-select"
                >
                  <option value="relative">Relative (Normal Flow)</option>
                  <option value="absolute">Absolute (Free Position)</option>
                  <option value="fixed">Fixed (Stays on Screen)</option>
                  <option value="sticky">Sticky (Scroll Effect)</option>
                </select>
              </div>

              {styling.containerPosition === 'absolute' || styling.containerPosition === 'fixed' ? (
                <>
                  <div className="style-option">
                    <label>Top Position</label>
                    <div className="range-control-inline">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={styling.containerTop || 0}
                        onChange={(e) => updateStyling('containerTop', parseFloat(e.target.value))}
                        className="style-range"
                      />
                      <span className="range-value">{styling.containerTop || 0}px</span>
                    </div>
                  </div>

                  <div className="style-option">
                    <label>Left Position</label>
                    <div className="range-control-inline">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={styling.containerLeft || 0}
                        onChange={(e) => updateStyling('containerLeft', parseFloat(e.target.value))}
                        className="style-range"
                      />
                      <span className="range-value">{styling.containerLeft || 0}px</span>
                    </div>
                  </div>

                  <div className="style-option">
                    <label>Z-Index (Layer)</label>
                    <div className="range-control-inline">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={styling.containerZIndex || 1}
                        onChange={(e) => updateStyling('containerZIndex', parseFloat(e.target.value))}
                        className="style-range"
                      />
                      <span className="range-value">{styling.containerZIndex || 1}</span>
                    </div>
                  </div>
                </>
              ) : null}
              
              <div className="style-option">
                <label>Spacing</label>
                <div className="range-control-inline">
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={styling.sectionSpacing || 24}
                    onChange={(e) => updateStyling('sectionSpacing', parseFloat(e.target.value))}
                    className="style-range"
                  />
                  <span className="range-value">{styling.sectionSpacing || 24}px</span>
                </div>
              </div>
              <div className="style-option">
                <label>Background</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={styling.sectionBackground || '#ffffff'}
                    onChange={(e) => updateStyling('sectionBackground', e.target.value)}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={styling.sectionBackground || '#ffffff'}
                    onChange={(e) => updateStyling('sectionBackground', e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="empty-state">
            <p>No styling options available for this component.</p>
          </div>
        );
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowSidebar(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDesignChange = (designId) => {
    setSelectedDesign(designId);
  };

  const handleExportPDF = async () => {
    if (!printRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1200
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const fileName = `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Document Editor - AT Solutions</title>
        <meta name="description" content="Create beautiful documents with our intuitive drag-and-drop editor." />
      </Head>
      <main className="modern-editor-page">
        {/* Top Navigation Bar */}
        <nav className="editor-navbar">
          <div className="navbar-left">
            <button className="nav-back-btn" onClick={() => router.back()}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back</span>
            </button>
            {!isMobile && (
              <div className="editor-title">
                <h1>Document Editor</h1>
                <span className="subtitle">Add elements and drag to position</span>
              </div>
            )}
          </div>

          <div className="navbar-center">
            {!isMobile && (
              <div className="zoom-controls">
                <button
                  className="zoom-btn"
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                  title="Zoom Out"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
                <button
                  className="zoom-btn"
                  onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.1))}
                  title="Zoom In"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  className="zoom-btn"
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="toolbar-divider"></div>
                <button
                  className={`drag-mode-btn ${dragMode ? 'active' : ''}`}
                  onClick={() => setDragMode(!dragMode)}
                  title={dragMode ? "Disable Drag Mode" : "Enable Drag Mode"}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="5" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="11" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="5" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="11" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="11" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                  <span>{dragMode ? 'Drag Mode' : 'Reorder'}</span>
                </button>
              </div>
            )}
          </div>

          <div className="navbar-right">
            {isMobile && (
              <button
                className="sidebar-toggle-btn"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 7H17M3 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Edit</span>
              </button>
            )}
            <button
              className="templates-toggle-btn"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>Templates</span>
            </button>
            <button
              className="export-btn-modern"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <div className="spinner"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3V13M10 13L6 9M10 13L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Export</span>
                </>
              )}
            </button>
          </div>
        </nav>

        <div className="modern-editor-layout">
          {/* Left Sidebar - Editing Controls */}
          <aside className={`modern-sidebar ${showSidebar ? 'visible' : 'hidden'}`}>
            <div className="sidebar-nav">
              <div className="nav-tabs">
                {[
                  { id: 'elements', icon: '➕', label: 'Elements' },
                  { id: 'style', icon: '🎨', label: 'Style' }
                ].map((section) => (
                  <button
                    key={section.id}
                    className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="tab-icon">{section.icon}</span>
                    <span className="tab-label">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-content">
              {activeSection === 'elements' && (
                <ElementsPanel onAddElement={(elementType) => {
                  // Create element with default properties
                  const defaults = {
                    text: { content: 'New Text', styling: { fontSize: '14px', color: '#000000' } },
                    heading: { content: 'New Heading', level: elementType.level || 'h1', styling: { fontSize: '32px', fontWeight: 'bold', color: '#000000' } },
                    rectangle: { size: { width: 200, height: 100 }, styling: { fill: '#6366f1', borderRadius: '0px' } },
                    circle: { size: { width: 100, height: 100 }, styling: { fill: '#8b5cf6' } },
                    triangle: { size: { width: 100, height: 100 }, styling: { fill: '#f59e0b' } },
                    star: { size: { width: 60 }, styling: { fill: '#fbbf24' } },
                    line: { size: { width: 200, height: 2 }, styling: { fill: '#000000' } },
                    'arrow-right': { size: { width: 48 }, styling: { fill: '#000000' } },
                    'arrow-left': { size: { width: 48 }, styling: { fill: '#000000' } },
                    'arrow-up': { size: { width: 48 }, styling: { fill: '#000000' } },
                    'arrow-down': { size: { width: 48 }, styling: { fill: '#000000' } },
                    image: { src: 'https://via.placeholder.com/200', size: { width: 200, height: 'auto' } },
                    icon: { content: '⭐', size: { width: 48 } }
                  };
                  
                  const elementData = {
                    type: elementType.type,
                    position: { x: 50, y: 50 },
                    ...defaults[elementType.type],
                    ...(elementType.level && { level: elementType.level })
                  };
                  
                  addElement(elementData);
                }} />
              )}

              {activeSection === 'style' && (
                <div className="canva-style-panel">
                  {/* Header */}
                  <div className="canva-panel-header">
                    {selectedElement ? (
                      <>
                        <div className="panel-title-section">
                          <button
                            className="back-to-page-btn"
                            onClick={() => setSelectedElement(null)}
                            title="Back to page"
                          >
                            ←
                          </button>
                          <div>
                            <h3>Element</h3>
                            <p className="element-type-label">
                              {(() => {
                                const element = (resumeData.elements || []).find(el => el.id === selectedElement);
                                if (!element) return 'Unknown';
                                const typeLabels = {
                                  'text': 'Text',
                                  'heading': `Heading ${element.level?.toUpperCase() || 'H1'}`,
                                  'rectangle': 'Rectangle',
                                  'circle': 'Circle',
                                  'triangle': 'Triangle',
                                  'star': 'Star',
                                  'line': 'Line',
                                  'arrow-right': 'Arrow →',
                                  'arrow-left': 'Arrow ←',
                                  'arrow-up': 'Arrow ↑',
                                  'arrow-down': 'Arrow ↓',
                                  'image': 'Image',
                                  'icon': 'Icon'
                                };
                                return typeLabels[element.type] || element.type;
                              })()}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="panel-title-section">
                        <div>
                          <h3>Page</h3>
                          <p className="element-type-label">Background & Layout</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="canva-panel-content">
                  {selectedElement ? (
                    <>
                      {(() => {
                        const element = (resumeData.elements || []).find(el => el.id === selectedElement);
                        if (!element) return <p className="error-message">Element not found</p>;

                        return (
                          <>
                            {/* Text/Heading Elements */}
                            {(element.type === 'text' || element.type === 'heading') && (
                              <>
                                <div className="canva-section">
                                  <label className="canva-label">Content</label>
                                  <textarea
                                    value={element.content || ''}
                                    onChange={(e) => updateElement(selectedElement, { content: e.target.value })}
                                    className="canva-textarea"
                                    rows="3"
                                    placeholder="Enter text..."
                                  />
                                </div>

                                {element.type === 'heading' && (
                                  <div className="canva-section">
                                    <label className="canva-label">Heading Level</label>
                                    <div className="heading-level-grid">
                                      {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(level => (
                                        <button
                                          key={level}
                                          className={`heading-level-btn ${element.level === level ? 'active' : ''}`}
                                          onClick={() => updateElement(selectedElement, { level })}
                                        >
                                          {level.toUpperCase()}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="canva-section">
                                  <label className="canva-label">Font Size</label>
                                  <div className="canva-slider-group">
                                    <input
                                      type="range"
                                      min="12"
                                      max="72"
                                      value={parseInt(element.styling?.fontSize) || 14}
                                      onChange={(e) => updateElement(selectedElement, { 
                                        styling: { ...element.styling, fontSize: `${e.target.value}px` }
                                      })}
                                      className="canva-slider"
                                    />
                                    <input
                                      type="number"
                                      min="12"
                                      max="72"
                                      value={parseInt(element.styling?.fontSize) || 14}
                                      onChange={(e) => updateElement(selectedElement, { 
                                        styling: { ...element.styling, fontSize: `${e.target.value}px` }
                                      })}
                                      className="canva-number-input"
                                    />
                                  </div>
                                </div>

                                <div className="canva-section">
                                  <label className="canva-label">Color</label>
                                  <div className="canva-color-picker">
                                    <input
                                      type="color"
                                      value={element.styling?.color || '#000000'}
                                      onChange={(e) => updateElement(selectedElement, { 
                                        styling: { ...element.styling, color: e.target.value }
                                      })}
                                      className="canva-color-input"
                                    />
                                    <input
                                      type="text"
                                      value={element.styling?.color || '#000000'}
                                      onChange={(e) => updateElement(selectedElement, { 
                                        styling: { ...element.styling, color: e.target.value }
                                      })}
                                      className="canva-color-text"
                                      placeholder="#000000"
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Rectangle */}
                            {element.type === 'rectangle' && (
                                <>
                                  <div className="style-option">
                                    <label>Content</label>
                                    <input
                                      type="text"
                                      value={element.content || ''}
                                      onChange={(e) => updateElement(selectedElement, { content: e.target.value })}
                                      className="style-select"
                                    />
                                  </div>
                                  <div className="style-option">
                                    <label>Font Size</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="12"
                                        max="72"
                                        value={parseInt(element.styling?.fontSize) || 14}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fontSize: `${e.target.value}px` }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{parseInt(element.styling?.fontSize) || 14}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Color</label>
                                    <div className="color-picker-row">
                                      <input
                                        type="color"
                                        value={element.styling?.color || '#000000'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, color: e.target.value }
                                        })}
                                        className="color-input"
                                      />
                                      <input
                                        type="text"
                                        value={element.styling?.color || '#000000'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, color: e.target.value }
                                        })}
                                        className="color-text-input"
                                      />
                                    </div>
                                  </div>
                                  {element.type === 'heading' && (
                                    <div className="style-option">
                                      <label>Heading Level</label>
                                      <select
                                        value={element.level || 'h1'}
                                        onChange={(e) => updateElement(selectedElement, { level: e.target.value })}
                                        className="style-select"
                                      >
                                        <option value="h1">H1 (Largest)</option>
                                        <option value="h2">H2</option>
                                        <option value="h3">H3</option>
                                        <option value="h4">H4</option>
                                        <option value="h5">H5</option>
                                        <option value="h6">H6 (Smallest)</option>
                                      </select>
                                    </div>
                                  )}
                                </>
                              )}

                            {element.type === 'rectangle' && (
                              <>
                                <div className="canva-section">
                                  <label className="canva-label">Size</label>
                                  <div className="size-inputs-row">
                                    <div className="size-input-group">
                                      <label className="size-sublabel">W</label>
                                      <input
                                        type="number"
                                        min="50"
                                        max="600"
                                        value={element.size?.width || 200}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, width: parseInt(e.target.value) }
                                        })}
                                        className="canva-number-input"
                                      />
                                    </div>
                                    <div className="size-input-group">
                                      <label className="size-sublabel">H</label>
                                      <input
                                        type="number"
                                        min="50"
                                        max="400"
                                        value={element.size?.height || 100}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, height: parseInt(e.target.value) }
                                        })}
                                        className="canva-number-input"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="canva-section">
                                  <label className="canva-label">Fill</label>
                                  <div className="canva-color-picker">
                                    <input
                                      type="color"
                                      value={element.styling?.fill || '#6366f1'}
                                      onChange={(e) => updateElement(selectedElement, { 
                                        styling: { ...element.styling, fill: e.target.value }
                                      })}
                                      className="canva-color-input"
                                    />
                                    <input
                                      type="text"
                                      value={element.styling?.fill || '#6366f1'}
                                      onChange={(e) => updateElement(selectedElement, { 
                                        styling: { ...element.styling, fill: e.target.value }
                                      })}
                                      className="canva-color-text"
                                    />
                                  </div>
                                </div>

                                <div className="canva-section">
                                  <label className="canva-label">Corner Radius</label>
                                  <div className="canva-slider-group">
                                    <input
                                      type="range"
                                      min="0"
                                      max="50"
                                      value={parseInt(element.styling?.borderRadius) || 0}
                                      onChange={(e) => updateElement(selectedElement, { 
                                        styling: { ...element.styling, borderRadius: `${e.target.value}px` }
                                      })}
                                      className="canva-slider"
                                    />
                                    <input
                                      type="number"
                                      min="0"
                                      max="50"
                                      value={parseInt(element.styling?.borderRadius) || 0}
                                      onChange={(e) => updateElement(selectedElement, { 
                                        styling: { ...element.styling, borderRadius: `${e.target.value}px` }
                                      })}
                                      className="canva-number-input"
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                              {element.type === 'circle' && (
                                <>
                                  <div className="style-option">
                                    <label>Size</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="50"
                                        max="300"
                                        value={element.size?.width || 100}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { width: parseInt(e.target.value), height: parseInt(e.target.value) }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{element.size?.width || 100}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Fill Color</label>
                                    <div className="color-picker-row">
                                      <input
                                        type="color"
                                        value={element.styling?.fill || '#8b5cf6'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-input"
                                      />
                                      <input
                                        type="text"
                                        value={element.styling?.fill || '#8b5cf6'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-text-input"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              {element.type === 'triangle' && (
                                <>
                                  <div className="style-option">
                                    <label>Width</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="50"
                                        max="300"
                                        value={element.size?.width || 100}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, width: parseInt(e.target.value) }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{element.size?.width || 100}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Height</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="50"
                                        max="300"
                                        value={element.size?.height || 100}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, height: parseInt(e.target.value) }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{element.size?.height || 100}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Fill Color</label>
                                    <div className="color-picker-row">
                                      <input
                                        type="color"
                                        value={element.styling?.fill || '#f59e0b'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-input"
                                      />
                                      <input
                                        type="text"
                                        value={element.styling?.fill || '#f59e0b'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-text-input"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              {(element.type === 'star' || element.type === 'icon') && (
                                <>
                                  {element.type === 'icon' && (
                                    <div className="style-option">
                                      <label>Icon</label>
                                      <input
                                        type="text"
                                        value={element.content || '⭐'}
                                        onChange={(e) => updateElement(selectedElement, { content: e.target.value })}
                                        className="style-select"
                                        placeholder="Enter emoji or symbol"
                                      />
                                    </div>
                                  )}
                                  <div className="style-option">
                                    <label>Size</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="24"
                                        max="120"
                                        value={element.size?.width || 48}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, width: parseInt(e.target.value) }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{element.size?.width || 48}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Color</label>
                                    <div className="color-picker-row">
                                      <input
                                        type="color"
                                        value={element.styling?.fill || '#fbbf24'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-input"
                                      />
                                      <input
                                        type="text"
                                        value={element.styling?.fill || '#fbbf24'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-text-input"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              {element.type === 'line' && (
                                <>
                                  <div className="style-option">
                                    <label>Width</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="50"
                                        max="600"
                                        value={element.size?.width || 200}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, width: parseInt(e.target.value) }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{element.size?.width || 200}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Thickness</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={element.size?.height || 2}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, height: parseInt(e.target.value) }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{element.size?.height || 2}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Color</label>
                                    <div className="color-picker-row">
                                      <input
                                        type="color"
                                        value={element.styling?.fill || '#000000'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-input"
                                      />
                                      <input
                                        type="text"
                                        value={element.styling?.fill || '#000000'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-text-input"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              {(element.type === 'arrow-right' || element.type === 'arrow-left' || 
                                element.type === 'arrow-up' || element.type === 'arrow-down') && (
                                <>
                                  <div className="style-option">
                                    <label>Size</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="24"
                                        max="120"
                                        value={element.size?.width || 48}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, width: parseInt(e.target.value) }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{element.size?.width || 48}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Color</label>
                                    <div className="color-picker-row">
                                      <input
                                        type="color"
                                        value={element.styling?.fill || '#000000'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-input"
                                      />
                                      <input
                                        type="text"
                                        value={element.styling?.fill || '#000000'}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, fill: e.target.value }
                                        })}
                                        className="color-text-input"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              {element.type === 'image' && (
                                <>
                                  <div className="style-option">
                                    <label>Image URL</label>
                                    <input
                                      type="text"
                                      value={element.src || ''}
                                      onChange={(e) => updateElement(selectedElement, { src: e.target.value })}
                                      className="style-select"
                                      placeholder="https://example.com/image.jpg"
                                    />
                                  </div>
                                  <div className="style-option">
                                    <label>Width</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="50"
                                        max="600"
                                        value={element.size?.width || 200}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          size: { ...element.size, width: parseInt(e.target.value) }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{element.size?.width || 200}px</span>
                                    </div>
                                  </div>
                                  <div className="style-option">
                                    <label>Border Radius</label>
                                    <div className="range-control-inline">
                                      <input
                                        type="range"
                                        min="0"
                                        max="50"
                                        value={parseInt(element.styling?.borderRadius) || 0}
                                        onChange={(e) => updateElement(selectedElement, { 
                                          styling: { ...element.styling, borderRadius: `${e.target.value}px` }
                                        })}
                                        className="style-range"
                                      />
                                      <span className="range-value">{parseInt(element.styling?.borderRadius) || 0}px</span>
                                    </div>
                                  </div>
                                </>
                              )}

                            {/* Position Controls */}
                            <div className="canva-divider"></div>
                            <div className="canva-section">
                              <label className="canva-label">Position</label>
                              <div className="position-grid">
                                <div className="size-input-group">
                                  <label className="size-sublabel">X</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="800"
                                    value={element.position?.x || 0}
                                    onChange={(e) => updateElement(selectedElement, { 
                                      position: { ...element.position, x: parseInt(e.target.value) || 0 }
                                    })}
                                    className="canva-number-input"
                                  />
                                </div>
                                <div className="size-input-group">
                                  <label className="size-sublabel">Y</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="1000"
                                    value={element.position?.y || 0}
                                    onChange={(e) => updateElement(selectedElement, { 
                                      position: { ...element.position, y: parseInt(e.target.value) || 0 }
                                    })}
                                    className="canva-number-input"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })()}

                      {/* Delete Button */}
                      <button
                        className="canva-delete-btn"
                        onClick={() => {
                          deleteElement(selectedElement);
                          setSelectedElement(null);
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M7 7v5M9 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span>Delete</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Page Style */}
                      <div className="canva-section">
                        <label className="canva-label">Background</label>
                        <div className="canva-color-picker">
                          <input
                            type="color"
                            value={resumeData.pageStyle?.backgroundColor || '#ffffff'}
                            onChange={(e) => updatePageStyle('backgroundColor', e.target.value)}
                            className="canva-color-input"
                          />
                          <input
                            type="text"
                            value={resumeData.pageStyle?.backgroundColor || '#ffffff'}
                            onChange={(e) => updatePageStyle('backgroundColor', e.target.value)}
                            className="canva-color-text"
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>

                      <div className="canva-section">
                        <label className="canva-label">Padding</label>
                        <div className="canva-slider-group">
                          <input
                            type="range"
                            min="0"
                            max="80"
                            value={parseInt(resumeData.pageStyle?.padding) || 40}
                            onChange={(e) => updatePageStyle('padding', `${e.target.value}px`)}
                            className="canva-slider"
                          />
                          <input
                            type="number"
                            min="0"
                            max="80"
                            value={parseInt(resumeData.pageStyle?.padding) || 40}
                            onChange={(e) => updatePageStyle('padding', `${e.target.value}px`)}
                            className="canva-number-input"
                          />
                        </div>
                      </div>

                      <div className="canva-section">
                        <label className="canva-label">Page Size</label>
                        <select
                          value={resumeData.pageStyle?.width || '210mm'}
                          onChange={(e) => {
                            updatePageStyle('width', e.target.value);
                            // Auto-adjust height based on width
                            if (e.target.value === '210mm') updatePageStyle('minHeight', '297mm');
                            if (e.target.value === '8.5in') updatePageStyle('minHeight', '11in');
                          }}
                          className="canva-select"
                        >
                          <option value="210mm">A4 (210 × 297 mm)</option>
                          <option value="8.5in">Letter (8.5 × 11 in)</option>
                          <option value="100%">Full Width</option>
                        </select>
                      </div>
                    </>
                  )}
                  </div>
                </div>
              )}

              {/* Remove all old section tabs - keep only for reference but hide */}
              {false && activeSection === 'personal' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <h3>Personal Information</h3>
                    <p className="section-description">Tell us about yourself</p>
                  </div>
                  <EditableField
                    value={resumeData.name}
                    onChange={(value) => updateField('name', value)}
                    placeholder="Full Name"
                  />
                  <EditableField
                    value={resumeData.title}
                    onChange={(value) => updateField('title', value)}
                    placeholder="Job Title"
                  />
                  <EditableField
                    value={resumeData.email}
                    onChange={(value) => updateField('email', value)}
                    placeholder="Email"
                  />
                  <EditableField
                    value={resumeData.phone}
                    onChange={(value) => updateField('phone', value)}
                    placeholder="Phone"
                  />
                  <EditableField
                    value={resumeData.location || ''}
                    onChange={(value) => updateField('location', value)}
                    placeholder="Location (optional)"
                  />
                  <EditableField
                    value={resumeData.summary}
                    onChange={(value) => updateField('summary', value)}
                    placeholder="Professional Summary"
                    multiline
                  />
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Work Experience</h3>
                      <p className="section-description">Add your professional experience</p>
                    </div>
                    <button
                      className="add-btn-modern"
                      onClick={() => addSection('experience', {
                        role: '',
                        company: '',
                        years: '',
                        description: ''
                      })}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="modern-form-group">
                      <div className="group-header-modern">
                        <span className="group-number">{index + 1}</span>
                        <span className="group-title">Experience {index + 1}</span>
                        {resumeData.experience.length > 1 && (
                          <button
                            className="remove-btn-modern"
                            onClick={() => removeSection('experience', index)}
                            title="Remove"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      <EditableField
                        value={exp.role}
                        onChange={(value) => updateField(`experience.${index}.role`, value)}
                        placeholder="Job Title"
                      />
                      <EditableField
                        value={exp.company}
                        onChange={(value) => updateField(`experience.${index}.company`, value)}
                        placeholder="Company"
                      />
                      <EditableField
                        value={exp.years}
                        onChange={(value) => updateField(`experience.${index}.years`, value)}
                        placeholder="Years (e.g., 2020 - Present)"
                      />
                      <EditableField
                        value={exp.description}
                        onChange={(value) => updateField(`experience.${index}.description`, value)}
                        placeholder="Job Description"
                        multiline
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'education' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Education</h3>
                      <p className="section-description">Add your educational background</p>
                    </div>
                    <button
                      className="add-btn-modern"
                      onClick={() => addSection('education', {
                        school: '',
                        degree: '',
                        years: ''
                      })}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="modern-form-group">
                      <div className="group-header-modern">
                        <span className="group-number">{index + 1}</span>
                        <span className="group-title">Education {index + 1}</span>
                        {resumeData.education.length > 1 && (
                          <button
                            className="remove-btn-modern"
                            onClick={() => removeSection('education', index)}
                            title="Remove"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      <EditableField
                        value={edu.degree}
                        onChange={(value) => updateField(`education.${index}.degree`, value)}
                        placeholder="Degree"
                      />
                      <EditableField
                        value={edu.school}
                        onChange={(value) => updateField(`education.${index}.school`, value)}
                        placeholder="School/University"
                      />
                      <EditableField
                        value={edu.years}
                        onChange={(value) => updateField(`education.${index}.years`, value)}
                        placeholder="Years"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Skills</h3>
                      <p className="section-description">Add your key skills and expertise</p>
                    </div>
                    <button
                      className="add-btn-modern"
                      onClick={() => addSection('skills', '')}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                  <div className="skills-grid">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="skill-chip">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => updateField(`skills.${index}`, e.target.value)}
                          placeholder="Skill name"
                          className="skill-input-modern"
                        />
                        {resumeData.skills.length > 1 && (
                          <button
                            className="skill-remove-btn"
                            onClick={() => removeSection('skills', index)}
                            title="Remove"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'links' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Links</h3>
                      <p className="section-description">Add portfolio, blog, or other professional links</p>
                    </div>
                    <button
                      className="add-btn-modern"
                      onClick={() => addSection('links', {
                        label: '',
                        url: ''
                      })}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                  {(resumeData.links || []).map((link, index) => (
                    <div key={index} className="modern-form-group">
                      <div className="group-header-modern">
                        <span className="group-number">{index + 1}</span>
                        <span className="group-title">Link {index + 1}</span>
                        {(resumeData.links || []).length > 1 && (
                          <button
                            className="remove-btn-modern"
                            onClick={() => removeSection('links', index)}
                            title="Remove"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      <EditableField
                        value={link.label}
                        onChange={(value) => updateField(`links.${index}.label`, value)}
                        placeholder="Link Label (e.g., Portfolio, Blog)"
                      />
                      <EditableField
                        value={link.url}
                        onChange={(value) => updateField(`links.${index}.url`, value)}
                        placeholder="URL (e.g., https://yourwebsite.com)"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'style' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>{selectedElement ? 'Element Style' : 'Page Style'}</h3>
                      <p className="section-description">
                        {selectedElement 
                          ? `Editing: ${selectedElement}`
                          : 'Page background and layout settings'}
                      </p>
                    </div>
                    {selectedComponent && (
                      <button
                        className="clear-selection-btn"
                        onClick={() => setSelectedComponent(null)}
                        title="Clear Selection"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    )}
                  </div>

                  {selectedComponent && (
                    <>
                      <div className="selected-component-info">
                        <div className="component-badge">
                          <span className="badge-icon">🎯</span>
                          <span className="badge-text">Selected: {getComponentDisplayName(selectedComponent)}</span>
                        </div>
                      </div>

                      {/* Component-Specific Styling Options */}
                      <div className="component-style-options">
                        {renderComponentStyleOptions(selectedComponent)}
                      </div>

                      {/* Delete Button for Deletable Elements */}
                      {selectedComponent.deletable && (
                        <div className="delete-section">
                          <button
                            className="delete-element-btn-sidebar"
                            onClick={() => handleDeleteElement(selectedComponent)}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M7 7v5M9 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <span>Delete Element</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Context-Aware Styling */}
                  {!selectedElement ? (
                    <>
                      {/* Page Style - Default */}
                      <div className="style-group">
                        <h4 className="style-group-title">📄 Page Settings</h4>
                        
                        <div className="style-option">
                          <label>Background Color</label>
                          <div className="color-picker-row">
                            <input
                              type="color"
                              value={resumeData.pageStyle?.backgroundColor || '#ffffff'}
                              onChange={(e) => updatePageStyle('backgroundColor', e.target.value)}
                              className="color-input"
                            />
                            <input
                              type="text"
                              value={resumeData.pageStyle?.backgroundColor || '#ffffff'}
                              onChange={(e) => updatePageStyle('backgroundColor', e.target.value)}
                              className="color-text-input"
                            />
                          </div>
                        </div>

                        <div className="style-option">
                          <label>Page Padding</label>
                          <div className="range-control-inline">
                            <input
                              type="range"
                              min="0"
                              max="80"
                              value={resumeData.pageStyle?.padding || 40}
                              onChange={(e) => updatePageStyle('padding', `${e.target.value}px`)}
                              className="style-range"
                            />
                            <span className="range-value">{parseInt(resumeData.pageStyle?.padding) || 40}px</span>
                          </div>
                        </div>

                        <div className="style-option">
                          <label>Page Size</label>
                          <select
                            value={resumeData.pageStyle?.size || 'a4'}
                            onChange={(e) => updatePageStyle('size', e.target.value)}
                            className="style-select"
                          >
                            <option value="a4">A4 (210 × 297 mm)</option>
                            <option value="letter">Letter (8.5 × 11 in)</option>
                            <option value="custom">Custom</option>
                          </select>
                        </div>
                      </div>

                      {/* Style Presets */}
                      <StylePresets onApplyPreset={handleApplyPreset} />
                    </>
                  ) : (
                    <>
                      {/* Element-Specific Styling */}
                      <div className="style-group">
                        <h4 className="style-group-title">✏️ Element Properties</h4>
                        
                        <div className="style-option">
                          <label>Element ID</label>
                          <input
                            type="text"
                            value={selectedElement}
                            disabled
                            className="style-select"
                            style={{ opacity: 0.6 }}
                          />
                        </div>

                        <button
                          className="delete-element-btn-sidebar"
                          onClick={() => {
                            deleteElement(selectedElement);
                            setSelectedElement(null);
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M7 7v5M9 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          <span>Delete Element</span>
                        </button>
                      </div>
                    </>
                  )}

                  {/* Colors */}
                  <div className="style-group">
                    <h4 className="style-group-title">Colors</h4>
                    
                    {/* Color Presets */}
                    <div className="style-option">
                      <label>Color Presets</label>
                      <div className="color-presets-grid">
                        {COLOR_PRESETS.map((preset, index) => (
                          <button
                            key={index}
                            className="color-preset-btn"
                            onClick={() => {
                              updateStyling('primaryColor', preset.primary);
                              updateStyling('accentColor', preset.accent);
                            }}
                            title={preset.name}
                            style={{
                              background: `linear-gradient(135deg, ${preset.primary} 0%, ${preset.accent} 100%)`
                            }}
                          >
                            {resumeData.styling?.primaryColor === preset.primary && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="style-option">
                      <label>Primary Color (Text & Borders)</label>
                      <div className="color-picker-row">
                        <input
                          type="color"
                          value={resumeData.styling?.primaryColor || '#1f2937'}
                          onChange={(e) => updateStyling('primaryColor', e.target.value)}
                          className="color-input"
                        />
                        <input
                          type="text"
                          value={resumeData.styling?.primaryColor || '#1f2937'}
                          onChange={(e) => updateStyling('primaryColor', e.target.value)}
                          className="color-text-input"
                          placeholder="#1f2937"
                        />
                      </div>
                    </div>

                    <div className="style-option">
                      <label>Accent Color (Highlights)</label>
                      <div className="color-picker-row">
                        <input
                          type="color"
                          value={resumeData.styling?.accentColor || '#6366f1'}
                          onChange={(e) => updateStyling('accentColor', e.target.value)}
                          className="color-input"
                        />
                        <input
                          type="text"
                          value={resumeData.styling?.accentColor || '#6366f1'}
                          onChange={(e) => updateStyling('accentColor', e.target.value)}
                          className="color-text-input"
                          placeholder="#6366f1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="style-group">
                    <h4 className="style-group-title">Typography</h4>
                    
                    <div className="style-option">
                      <label>Font Family</label>
                      <select
                        value={resumeData.styling?.fontFamily || 'Segoe UI'}
                        onChange={(e) => updateStyling('fontFamily', e.target.value)}
                        className="style-select"
                      >
                        <option value="Segoe UI">Segoe UI (Default)</option>
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Tahoma">Tahoma</option>
                      </select>
                    </div>

                    <div className="style-option">
                      <label>Font Size</label>
                      <select
                        value={resumeData.styling?.fontSize || 'medium'}
                        onChange={(e) => updateStyling('fontSize', e.target.value)}
                        className="style-select"
                      >
                        <option value="small">Small (12px)</option>
                        <option value="medium">Medium (14px)</option>
                        <option value="large">Large (16px)</option>
                      </select>
                    </div>

                    <div className="style-option">
                      <label>Line Height</label>
                      <select
                        value={resumeData.styling?.lineHeight || 'normal'}
                        onChange={(e) => updateStyling('lineHeight', e.target.value)}
                        className="style-select"
                      >
                        <option value="compact">Compact (1.3)</option>
                        <option value="normal">Normal (1.5)</option>
                        <option value="relaxed">Relaxed (1.7)</option>
                      </select>
                    </div>
                  </div>

                  {/* Spacing */}
                  <div className="style-group">
                    <h4 className="style-group-title">Spacing</h4>
                    
                    <div className="style-option">
                      <label>Section Spacing</label>
                      <select
                        value={resumeData.styling?.sectionSpacing || 'normal'}
                        onChange={(e) => updateStyling('sectionSpacing', e.target.value)}
                        className="style-select"
                      >
                        <option value="compact">Compact</option>
                        <option value="normal">Normal</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>

                    <div className="style-option">
                      <label>Page Padding</label>
                      <div className="range-control-inline">
                        <input
                          type="range"
                          min="20"
                          max="80"
                          value={resumeData.styling?.pagePadding || 40}
                          onChange={(e) => updateStyling('pagePadding', parseFloat(e.target.value))}
                          className="style-range"
                        />
                        <span className="range-value">{resumeData.styling?.pagePadding || 40}px</span>
                      </div>
                    </div>
                  </div>

                  {/* Borders & Shadows */}
                  <div className="style-group">
                    <h4 className="style-group-title">Borders & Effects</h4>
                    
                    <div className="style-option">
                      <label>Border Style</label>
                      <select
                        value={resumeData.styling?.borderStyle || 'none'}
                        onChange={(e) => updateStyling('borderStyle', e.target.value)}
                        className="style-select"
                      >
                        <option value="none">None</option>
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                        <option value="double">Double</option>
                      </select>
                    </div>

                    {resumeData.styling?.borderStyle && resumeData.styling?.borderStyle !== 'none' && (
                      <>
                        <div className="style-option">
                          <label>Border Width</label>
                          <div className="range-control-inline">
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={resumeData.styling?.borderWidth || 1}
                              onChange={(e) => updateStyling('borderWidth', parseFloat(e.target.value))}
                              className="style-range"
                            />
                            <span className="range-value">{resumeData.styling?.borderWidth || 1}px</span>
                          </div>
                        </div>

                        <div className="style-option">
                          <label>Border Color</label>
                          <div className="color-picker-row">
                            <input
                              type="color"
                              value={resumeData.styling?.borderColor || '#e5e7eb'}
                              onChange={(e) => updateStyling('borderColor', e.target.value)}
                              className="color-input"
                            />
                            <input
                              type="text"
                              value={resumeData.styling?.borderColor || '#e5e7eb'}
                              onChange={(e) => updateStyling('borderColor', e.target.value)}
                              className="color-text-input"
                            />
                          </div>
                        </div>

                        <div className="style-option">
                          <label>Border Radius</label>
                          <div className="range-control-inline">
                            <input
                              type="range"
                              min="0"
                              max="20"
                              value={resumeData.styling?.borderRadius || 0}
                              onChange={(e) => updateStyling('borderRadius', parseFloat(e.target.value))}
                              className="style-range"
                            />
                            <span className="range-value">{resumeData.styling?.borderRadius || 0}px</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="style-option">
                      <label>Shadow</label>
                      <select
                        value={resumeData.styling?.shadow || 'none'}
                        onChange={(e) => updateStyling('shadow', e.target.value)}
                        className="style-select"
                      >
                        <option value="none">None</option>
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                        <option value="xl">Extra Large</option>
                      </select>
                    </div>
                  </div>

                  {/* Background */}
                  <div className="style-group">
                    <h4 className="style-group-title">Background</h4>
                    
                    <div className="style-option">
                      <label>Page Background</label>
                      <div className="color-picker-row">
                        <input
                          type="color"
                          value={resumeData.styling?.pageBackground || '#ffffff'}
                          onChange={(e) => updateStyling('pageBackground', e.target.value)}
                          className="color-input"
                        />
                        <input
                          type="text"
                          value={resumeData.styling?.pageBackground || '#ffffff'}
                          onChange={(e) => updateStyling('pageBackground', e.target.value)}
                          className="color-text-input"
                        />
                      </div>
                    </div>

                    <div className="style-option">
                      <label>Background Pattern</label>
                      <select
                        value={resumeData.styling?.backgroundPattern || 'none'}
                        onChange={(e) => updateStyling('backgroundPattern', e.target.value)}
                        className="style-select"
                      >
                        <option value="none">None</option>
                        <option value="dots">Dots</option>
                        <option value="grid">Grid</option>
                        <option value="lines">Lines</option>
                        <option value="diagonal">Diagonal</option>
                      </select>
                    </div>

                    {resumeData.styling?.backgroundPattern && resumeData.styling?.backgroundPattern !== 'none' && (
                      <div className="style-option">
                        <label>Pattern Opacity</label>
                        <div className="range-control-inline">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={resumeData.styling?.patternOpacity || 10}
                            onChange={(e) => updateStyling('patternOpacity', parseFloat(e.target.value))}
                            className="style-range"
                          />
                          <span className="range-value">{resumeData.styling?.patternOpacity || 10}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Icons & Images */}
                  <div className="style-group">
                    <h4 className="style-group-title">Icons & Images</h4>
                    
                    <div className="style-option">
                      <label>Show Contact Icons</label>
                      <label className="toggle-switch-inline">
                        <input
                          type="checkbox"
                          checked={resumeData.styling?.showContactIcons !== false}
                          onChange={(e) => updateStyling('showContactIcons', e.target.checked)}
                        />
                        <span className="toggle-slider-inline"></span>
                      </label>
                    </div>

                    <div className="style-option">
                      <label>Icon Style</label>
                      <select
                        value={resumeData.styling?.iconStyle || 'emoji'}
                        onChange={(e) => updateStyling('iconStyle', e.target.value)}
                        className="style-select"
                      >
                        <option value="emoji">Emoji</option>
                        <option value="symbols">Symbols</option>
                        <option value="minimal">Minimal</option>
                      </select>
                    </div>

                    <div className="style-option">
                      <label>Icon Size</label>
                      <div className="range-control-inline">
                        <input
                          type="range"
                          min="12"
                          max="24"
                          value={resumeData.styling?.iconSize || 16}
                          onChange={(e) => updateStyling('iconSize', parseFloat(e.target.value))}
                          className="style-range"
                        />
                        <span className="range-value">{resumeData.styling?.iconSize || 16}px</span>
                      </div>
                    </div>

                    <div className="style-option">
                      <label>Profile Photo</label>
                      <div className="photo-upload-section">
                        {resumeData.styling?.profilePhoto ? (
                          <div className="photo-preview">
                            <img src={resumeData.styling.profilePhoto} alt="Profile" />
                            <button
                              className="remove-photo-btn"
                              onClick={() => updateStyling('profilePhoto', null)}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button className="upload-photo-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span>Upload Photo</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {resumeData.styling?.profilePhoto && (
                      <>
                        <div className="style-option">
                          <label>Photo Shape</label>
                          <select
                            value={resumeData.styling?.photoShape || 'circle'}
                            onChange={(e) => updateStyling('photoShape', e.target.value)}
                            className="style-select"
                          >
                            <option value="circle">Circle</option>
                            <option value="square">Square</option>
                            <option value="rounded">Rounded Square</option>
                          </select>
                        </div>

                        <div className="style-option">
                          <label>Photo Size</label>
                          <div className="range-control-inline">
                            <input
                              type="range"
                              min="60"
                              max="150"
                              value={resumeData.styling?.photoSize || 100}
                              onChange={(e) => updateStyling('photoSize', parseFloat(e.target.value))}
                              className="style-range"
                            />
                            <span className="range-value">{resumeData.styling?.photoSize || 100}px</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Layout */}
                  <div className="style-group">
                    <h4 className="style-group-title">Layout</h4>
                    
                    <div className="style-option">
                      <label>Text Alignment</label>
                      <div className="alignment-buttons">
                        {['left', 'center', 'right', 'justify'].map((align) => (
                          <button
                            key={align}
                            className={`align-btn ${resumeData.styling?.textAlign === align ? 'active' : ''}`}
                            onClick={() => updateStyling('textAlign', align)}
                            title={align}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              {align === 'left' && (
                                <>
                                  <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5"/>
                                  <line x1="2" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                                  <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                                </>
                              )}
                              {align === 'center' && (
                                <>
                                  <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5"/>
                                  <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                                  <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                                </>
                              )}
                              {align === 'right' && (
                                <>
                                  <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5"/>
                                  <line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                                  <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                                </>
                              )}
                              {align === 'justify' && (
                                <>
                                  <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5"/>
                                  <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                                  <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                                </>
                              )}
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="style-option">
                      <label>Column Layout</label>
                      <select
                        value={resumeData.styling?.columnLayout || 'single'}
                        onChange={(e) => updateStyling('columnLayout', e.target.value)}
                        className="style-select"
                      >
                        <option value="single">Single Column</option>
                        <option value="two-column">Two Columns</option>
                        <option value="sidebar">Sidebar Layout</option>
                      </select>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    className="reset-style-btn"
                    onClick={() => {
                      updateStyling('primaryColor', '#1f2937');
                      updateStyling('accentColor', '#6366f1');
                      updateStyling('fontFamily', 'Segoe UI');
                      updateStyling('fontSize', 'medium');
                      updateStyling('lineHeight', 'normal');
                      updateStyling('sectionSpacing', 'normal');
                    }}
                  >
                    Reset to Default
                  </button>
                </div>
              )}

              {activeSection === 'manage' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Manage Sections</h3>
                      <p className="section-description">Show/hide sections and edit their headings</p>
                    </div>
                  </div>

                  <div className="manage-sections-list">
                    {[
                      { id: 'summary', label: 'Summary', icon: '📝' },
                      { id: 'experience', label: 'Experience', icon: '💼' },
                      { id: 'education', label: 'Education', icon: '🎓' },
                      { id: 'projects', label: 'Projects', icon: '🚀' },
                      { id: 'skills', label: 'Skills', icon: '⚡' },
                      { id: 'languages', label: 'Languages', icon: '🌐' },
                      { id: 'links', label: 'Links', icon: '🔗' }
                    ].map((section) => (
                      <div key={section.id} className="manage-section-item">
                        <div className="manage-section-header">
                          <div className="section-info">
                            <span className="section-icon">{section.icon}</span>
                            <span className="section-name">{section.label}</span>
                          </div>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={resumeData.sectionVisibility?.[section.id] !== false}
                              onChange={() => toggleSectionVisibility(section.id)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        {resumeData.sectionVisibility?.[section.id] !== false && (
                          <div className="section-heading-editor">
                            <label>Section Heading:</label>
                            <input
                              type="text"
                              value={resumeData.headings?.[section.id] || section.label}
                              onChange={(e) => updateHeading(section.id, e.target.value)}
                              placeholder={`${section.label} heading`}
                              className="editable-field"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'custom' && (
                <div className="modern-form-section">
                  <div className="section-header-modern">
                    <div>
                      <h3>Add Custom Sections</h3>
                      <p className="section-description">Add certifications, awards, publications, or any custom section</p>
                    </div>
                    <button
                      className="add-btn-modern"
                      onClick={addCustomSection}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add Section</span>
                    </button>
                  </div>

                  {resumeData.customSections && resumeData.customSections.length > 0 ? (
                    <div className="custom-sections-list">
                      {resumeData.customSections.map((section) => (
                        <div key={section.id} className="custom-section-item">
                          <div className="custom-section-header">
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
                              placeholder="Section Title (e.g., Certifications, Awards)"
                              className="editable-field"
                            />
                            <button
                              className="remove-btn-modern"
                              onClick={() => removeCustomSection(section.id)}
                              title="Remove Section"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                            </button>
                          </div>
                          
                          <textarea
                            value={section.content}
                            onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
                            placeholder="Main content (optional)..."
                            className="editable-field"
                            rows="3"
                          />

                          {/* Subheadings */}
                          <div className="subheadings-container">
                            <div className="subheading-header">
                              <span className="subheading-label">Subheadings (optional)</span>
                              <button
                                className="add-subheading-btn"
                                onClick={() => addSubheading(section.id)}
                                title="Add Subheading"
                              >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                                <span>Add Item</span>
                              </button>
                            </div>

                            {section.subheadings && section.subheadings.length > 0 && (
                              <div className="subheadings-list">
                                {section.subheadings.map((subheading) => (
                                  <div key={subheading.id} className="subheading-item">
                                    <div className="subheading-item-header">
                                      <input
                                        type="text"
                                        value={subheading.title}
                                        onChange={(e) => updateSubheading(section.id, subheading.id, 'title', e.target.value)}
                                        placeholder="Item title"
                                        className="editable-field subheading-title-input"
                                      />
                                      <button
                                        className="remove-subheading-btn"
                                        onClick={() => removeSubheading(section.id, subheading.id)}
                                        title="Remove Item"
                                      >
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                      </button>
                                    </div>
                                    <textarea
                                      value={subheading.content}
                                      onChange={(e) => updateSubheading(section.id, subheading.id, 'content', e.target.value)}
                                      placeholder="Item details..."
                                      className="editable-field"
                                      rows="2"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No custom sections yet. Click "Add Section" to create one.</p>
                      <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '8px' }}>
                        Examples: Certifications, Awards, Publications, Volunteer Work
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Center - Live Preview with Inline Editing */}
          <main className="modern-preview-area">
            {/* Drag Mode Indicator */}
          {dragMode && (
            <div className="drag-mode-indicator">
              <span className="drag-mode-indicator-icon">🔄</span>
              <span>Drag Mode Active - Drag sections to reorder them</span>
            </div>
          )}

          <div className="preview-toolbar">
              <div className="template-info">
                <span className="current-template-name">{templates[selectedDesign]?.name}</span>
                <span className="template-category">{templates[selectedDesign]?.category}</span>
              </div>
              <div className="toolbar-hint">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 7V11M8 5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>{dragMode ? 'Drag sections to reorder' : 'Click any text to edit'}</span>
              </div>
            </div>

            <div className="preview-canvas">
              <div 
                ref={resumeRef} 
                className="preview-container-modern"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center top'
                }}
              >
                {selectedDesign === 'canvas' ? (
                  <BlankCanvas
                    elements={resumeData.elements || []}
                    pageStyle={resumeData.pageStyle || {}}
                    onElementSelect={setSelectedElement}
                    onElementUpdate={updateElement}
                    onElementDelete={deleteElement}
                    selectedElementId={selectedElement}
                    isEditing={true}
                    enableDragDrop={dragMode}
                  />
                ) : (
                  <InlineEditableResume
                    data={resumeData}
                    templateId={selectedDesign}
                    onComponentClick={handleComponentClick}
                    selectedComponent={selectedComponent}
                    onDeleteElement={handleDeleteElement}
                    dragMode={dragMode}
                    onReorderSections={reorderSections}
                    onReorderSectionItems={reorderSectionItems}
                  />
                )}
              </div>
            </div>
          </main>

          {/* Templates Drawer - Slide from Right */}
          <aside className={`templates-drawer ${showTemplates ? 'open' : ''}`}>
            <div className="drawer-header">
              <h3>Choose Template</h3>
              <button className="drawer-close" onClick={() => setShowTemplates(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="templates-grid">
              {/* Blank Canvas Template - Always First */}
              <div
                className={`template-card ${selectedDesign === 'canvas' ? 'selected' : ''}`}
                onClick={() => {
                  handleDesignChange('canvas');
                  setShowTemplates(false);
                }}
              >
                <div className="template-preview-card blank-canvas-preview">
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    border: '2px dashed #d1d5db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px'
                  }}>
                    📄
                  </div>
                  {selectedDesign === 'canvas' && (
                    <div className="selected-badge">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="template-card-info">
                  <h4>Blank Canvas</h4>
                  <span className="category-badge" style={{ backgroundColor: '#6366f120', color: '#6366f1' }}>
                    Start Fresh
                  </span>
                </div>
              </div>

              {/* Other Templates */}
              {resumeDesigns.filter(d => d.id !== 'canvas').map((design) => (
                <div
                  key={design.id}
                  className={`template-card ${selectedDesign === design.id ? 'selected' : ''}`}
                  onClick={() => {
                    handleDesignChange(design.id);
                    setShowTemplates(false);
                  }}
                >
                  <div className="template-preview-card">
                    <MiniPreview templateId={design.id} data={resumeData} />
                    {selectedDesign === design.id && (
                      <div className="selected-badge">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="template-card-info">
                    <h4>{design.name}</h4>
                    <span className="category-badge" style={{ backgroundColor: design.color + '20', color: design.color }}>
                      {design.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Overlay for drawer */}
          {showTemplates && (
            <div className="drawer-overlay" onClick={() => setShowTemplates(false)}></div>
          )}
        </div>



        {/* Hidden print version */}
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <div ref={printRef}>
            <ResumePreview
              templateId={selectedDesign}
              data={resumeData}
              scale={1}
              forPrint={true}
            />
          </div>
        </div>
      </main>
    </>
  );
}
