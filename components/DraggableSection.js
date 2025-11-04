import { useState } from 'react';

export default function DraggableSection({ 
  id, 
  index, 
  children, 
  onDragStart, 
  onDragEnd, 
  onDragOver, 
  onDrop,
  isDragging,
  isOver 
}) {
  const [showHandle, setShowHandle] = useState(false);

  return (
    <div
      className={`draggable-section ${isDragging ? 'dragging' : ''} ${isOver ? 'drag-over' : ''}`}
      onMouseEnter={() => setShowHandle(true)}
      onMouseLeave={() => setShowHandle(false)}
      onDragOver={onDragOver}
      onDrop={onDrop}
      data-index={index}
    >
      {/* Drag Handle */}
      <div
        className={`drag-handle ${showHandle ? 'visible' : ''}`}
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        title="Drag to reorder"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="7" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="13" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="7" cy="10" r="1.5" fill="currentColor"/>
          <circle cx="13" cy="10" r="1.5" fill="currentColor"/>
          <circle cx="7" cy="15" r="1.5" fill="currentColor"/>
          <circle cx="13" cy="15" r="1.5" fill="currentColor"/>
        </svg>
      </div>

      {/* Drop Indicator - Top */}
      <div className="drop-indicator drop-indicator-top"></div>

      {/* Content */}
      <div className="section-content">
        {children}
      </div>

      {/* Drop Indicator - Bottom */}
      <div className="drop-indicator drop-indicator-bottom"></div>

      <style jsx>{`
        .draggable-section {
          position: relative;
          transition: all 0.2s ease;
        }

        .draggable-section.dragging {
          opacity: 0.5;
          transform: scale(0.98);
        }

        .draggable-section.drag-over {
          background-color: rgba(99, 102, 241, 0.05);
        }

        .drag-handle {
          position: absolute;
          left: -40px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          opacity: 0;
          transition: all 0.2s;
          color: #6b7280;
          z-index: 10;
        }

        .drag-handle:active {
          cursor: grabbing;
        }

        .drag-handle.visible {
          opacity: 1;
        }

        .drag-handle:hover {
          background: #f9fafb;
          border-color: #6366f1;
          color: #6366f1;
          transform: translateY(-50%) scale(1.05);
        }

        .drop-indicator {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: #6366f1;
          opacity: 0;
          transition: opacity 0.2s;
          z-index: 5;
        }

        .drop-indicator-top {
          top: -2px;
        }

        .drop-indicator-bottom {
          bottom: -2px;
        }

        .draggable-section.drag-over .drop-indicator {
          opacity: 1;
        }

        .section-content {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .drag-handle {
            left: -8px;
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
}
