import { useState } from 'react';
import DraggableSection from './DraggableSection';

export default function DraggableResume({ 
  data, 
  onComponentClick, 
  selectedComponent,
  onReorderSections,
  TemplateComponent 
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Get section order or use default
  const sectionOrder = data.sectionOrder || [
    'summary',
    'experience',
    'education',
    'projects',
    'skills',
    'languages',
    'links',
    'customSections'
  ];

  // Check if section has content and is visible
  const isSectionVisible = (sectionName) => {
    if (data.sectionVisibility?.[sectionName] === false) return false;
    
    if (sectionName === 'summary') return !!data.summary;
    if (sectionName === 'customSections') return data.customSections && data.customSections.length > 0;
    
    return data[sectionName] && data[sectionName].length > 0;
  };

  // Get visible sections
  const visibleSections = sectionOrder.filter(isSectionVisible);

  const handleDragStart = (index) => (e) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (index) => (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (index) => (e) => {
    e.preventDefault();
    
    if (draggedIndex !== null && draggedIndex !== index) {
      const newOrder = [...sectionOrder];
      const draggedSection = visibleSections[draggedIndex];
      const targetSection = visibleSections[index];
      
      const draggedOrderIndex = newOrder.indexOf(draggedSection);
      const targetOrderIndex = newOrder.indexOf(targetSection);
      
      // Remove dragged item
      newOrder.splice(draggedOrderIndex, 1);
      // Insert at new position
      newOrder.splice(targetOrderIndex, 0, draggedSection);
      
      onReorderSections(newOrder);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Render section content based on type
  const renderSectionContent = (sectionName) => {
    // This will be filled by the template component
    return null;
  };

  return (
    <div className="draggable-resume-wrapper">
      <TemplateComponent
        data={data}
        onComponentClick={onComponentClick}
        selectedComponent={selectedComponent}
        sectionOrder={visibleSections}
        dragHandlers={{
          onDragStart: handleDragStart,
          onDragEnd: handleDragEnd,
          onDragOver: handleDragOver,
          onDrop: handleDrop,
          draggedIndex,
          dragOverIndex
        }}
      />

      <style jsx>{`
        .draggable-resume-wrapper {
          position: relative;
        }

        :global(.drag-mode) {
          cursor: grabbing !important;
        }

        :global(.drag-mode *) {
          cursor: grabbing !important;
        }
      `}</style>
    </div>
  );
}
