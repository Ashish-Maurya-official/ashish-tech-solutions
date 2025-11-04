import { useState, useRef } from 'react';

export default function DocumentEditor({ 
  sections, 
  onReorder, 
  onUpdatePosition,
  children,
  isEditing = true 
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const containerRef = useRef(null);

  const handleDragStart = (index) => (e) => {
    if (!isEditing) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (index) => (e) => {
    if (!isEditing) return;
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === index) return;
    
    setDragOverIndex(index);
  };

  const handleDrop = (index) => (e) => {
    if (!isEditing) return;
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === index) return;
    
    // Call reorder function
    if (onReorder) {
      onReorder(draggedIndex, index);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Render sections in order
  const renderSections = () => {
    return sections.map((section, index) => {
      const isDragging = draggedIndex === index;
      const isOver = dragOverIndex === index;
      
      return (
        <div
          key={section.id || index}
          draggable={isEditing}
          onDragStart={handleDragStart(index)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver(index)}
          onDrop={handleDrop(index)}
          className={`document-section ${isDragging ? 'dragging' : ''} ${isOver ? 'drag-over' : ''}`}
          style={{
            position: section.position || 'relative',
            top: section.top || 'auto',
            left: section.left || 'auto',
            right: section.right || 'auto',
            bottom: section.bottom || 'auto',
            zIndex: section.zIndex || 'auto'
          }}
        >
          {section.content}
        </div>
      );
    });
  };

  return (
    <div ref={containerRef} className="document-editor-container">
      {renderSections()}
      
      <style jsx>{`
        .document-editor-container {
          position: relative;
          width: 100%;
          min-height: 100%;
        }

        .document-section {
          transition: all 0.2s ease;
          cursor: ${isEditing ? 'move' : 'default'};
        }

        .document-section.dragging {
          opacity: 0.5;
          transform: scale(0.98);
        }

        .document-section.drag-over {
          border-top: 3px solid #6366f1;
          padding-top: 8px;
        }

        .document-section:hover {
          ${isEditing ? 'outline: 2px dashed #6366f1; outline-offset: 4px;' : ''}
        }
      `}</style>
    </div>
  );
}
