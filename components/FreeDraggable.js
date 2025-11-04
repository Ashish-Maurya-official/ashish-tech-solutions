import { useState, useRef, useEffect } from 'react';

export default function FreeDraggable({ 
  id,
  children, 
  initialPosition = { x: 0, y: 0 },
  onPositionChange,
  onDragStart,
  onDragMove,
  onDragEnd,
  isEnabled = true,
  onSelect,
  isSelected = false
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const startPositionRef = useRef(initialPosition);
  const elementRef = useRef(null);

  // Update position when initialPosition changes
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  const handleMouseDown = (e) => {
    if (!isEnabled) return;
    
    // Prevent text selection
    e.preventDefault();
    
    // Store the current position in ref for delta calculation
    startPositionRef.current = { x: position.x, y: position.y };
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    // Notify parent that drag started
    if (onDragStart) {
      onDragStart(id);
    }
    
    // Notify parent that this element is selected, pass the event for multi-select
    if (onSelect) {
      onSelect(id, e);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isEnabled) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setPosition({ x: newX, y: newY });
    
    // Notify parent of drag movement with offset
    if (onDragMove) {
      const offset = {
        x: newX - startPositionRef.current.x,
        y: newY - startPositionRef.current.y
      };
      onDragMove(id, offset);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (onPositionChange) {
        // Calculate the delta (change in position)
        const delta = {
          x: position.x - startPositionRef.current.x,
          y: position.y - startPositionRef.current.y
        };
        onPositionChange(id, position, delta);
      }
      
      // Notify parent that drag ended
      if (onDragEnd) {
        onDragEnd(id);
      }
    }
    setIsDragging(false);
  };

  // Add global mouse move and up listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, position]);

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isEnabled ? (isDragging ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none',
        transition: isDragging ? 'none' : 'box-shadow 0.2s',
        boxShadow: isSelected ? '0 0 0 2px #6366f1' : isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        zIndex: isDragging ? 1000 : isSelected ? 100 : 1
      }}
      className={`free-draggable ${isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
    >
      {children}
      
      {/* Drag indicator */}
      {isEnabled && !isDragging && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#6366f1',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 600,
          opacity: 0,
          transition: 'opacity 0.2s',
          pointerEvents: 'none'
        }}
        className="drag-hint"
        >
          DRAG
        </div>
      )}

      <style jsx>{`
        .free-draggable:hover .drag-hint {
          opacity: 1;
        }
        
        .free-draggable.dragging {
          opacity: 0.8;
        }
        
        .free-draggable.selected {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
