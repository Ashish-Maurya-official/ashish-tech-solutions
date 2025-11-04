import { useState, useEffect } from 'react';

export default function ResizeHandles({ 
  elementId,
  position,
  size,
  onResize,
  onRotate,
  rotation = 0,
  aspectRatioLocked = false
}) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, handle) => {
    e.stopPropagation();
    e.preventDefault();
    
    setIsResizing(true);
    setResizeHandle(handle);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width: size.width, height: size.height });
    setStartPosition({ x: position.x, y: position.y });
  };

  const handleMouseMove = (e) => {
    if (!isResizing || !resizeHandle) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    let newWidth = startSize.width;
    let newHeight = startSize.height;
    let newX = startPosition.x;
    let newY = startPosition.y;

    switch (resizeHandle) {
      case 'nw': // Top-left
        newWidth = startSize.width - deltaX;
        newHeight = startSize.height - deltaY;
        newX = startPosition.x + deltaX;
        newY = startPosition.y + deltaY;
        break;
      case 'ne': // Top-right
        newWidth = startSize.width + deltaX;
        newHeight = startSize.height - deltaY;
        newY = startPosition.y + deltaY;
        break;
      case 'sw': // Bottom-left
        newWidth = startSize.width - deltaX;
        newHeight = startSize.height + deltaY;
        newX = startPosition.x + deltaX;
        break;
      case 'se': // Bottom-right
        newWidth = startSize.width + deltaX;
        newHeight = startSize.height + deltaY;
        break;
      case 'n': // Top
        newHeight = startSize.height - deltaY;
        newY = startPosition.y + deltaY;
        break;
      case 's': // Bottom
        newHeight = startSize.height + deltaY;
        break;
      case 'w': // Left
        newWidth = startSize.width - deltaX;
        newX = startPosition.x + deltaX;
        break;
      case 'e': // Right
        newWidth = startSize.width + deltaX;
        break;
    }

    // Maintain aspect ratio if locked or shift key is pressed
    if (aspectRatioLocked || e.shiftKey) {
      const aspectRatio = startSize.width / startSize.height;
      if (resizeHandle.includes('n') || resizeHandle.includes('s')) {
        newWidth = newHeight * aspectRatio;
      } else {
        newHeight = newWidth / aspectRatio;
      }
    }

    // Minimum size
    newWidth = Math.max(20, newWidth);
    newHeight = Math.max(20, newHeight);

    onResize(elementId, {
      width: newWidth,
      height: newHeight,
      x: newX,
      y: newY
    });
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeHandle(null);
  };

  // Add global mouse listeners
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, resizeHandle, startPos, startSize, startPosition, elementId, onResize, aspectRatioLocked]);

  const handleStyle = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    backgroundColor: '#1A73E8',
    border: '2px solid white',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1001
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x - 5,
        top: position.y - 5,
        width: size.width + 10,
        height: size.height + 10,
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      {/* Corner Handles */}
      <div
        style={{ ...handleStyle, top: -5, left: -5, cursor: 'nw-resize', pointerEvents: 'auto' }}
        onMouseDown={(e) => handleMouseDown(e, 'nw')}
      />
      <div
        style={{ ...handleStyle, top: -5, right: -5, cursor: 'ne-resize', pointerEvents: 'auto' }}
        onMouseDown={(e) => handleMouseDown(e, 'ne')}
      />
      <div
        style={{ ...handleStyle, bottom: -5, left: -5, cursor: 'sw-resize', pointerEvents: 'auto' }}
        onMouseDown={(e) => handleMouseDown(e, 'sw')}
      />
      <div
        style={{ ...handleStyle, bottom: -5, right: -5, cursor: 'se-resize', pointerEvents: 'auto' }}
        onMouseDown={(e) => handleMouseDown(e, 'se')}
      />

      {/* Edge Handles */}
      <div
        style={{ ...handleStyle, top: -5, left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize', pointerEvents: 'auto' }}
        onMouseDown={(e) => handleMouseDown(e, 'n')}
      />
      <div
        style={{ ...handleStyle, bottom: -5, left: '50%', transform: 'translateX(-50%)', cursor: 's-resize', pointerEvents: 'auto' }}
        onMouseDown={(e) => handleMouseDown(e, 's')}
      />
      <div
        style={{ ...handleStyle, left: -5, top: '50%', transform: 'translateY(-50%)', cursor: 'w-resize', pointerEvents: 'auto' }}
        onMouseDown={(e) => handleMouseDown(e, 'w')}
      />
      <div
        style={{ ...handleStyle, right: -5, top: '50%', transform: 'translateY(-50%)', cursor: 'e-resize', pointerEvents: 'auto' }}
        onMouseDown={(e) => handleMouseDown(e, 'e')}
      />

      {/* Rotation Handle */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
          cursor: 'grab'
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#1A73E8',
            border: '2px solid white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: 'white'
          }}
          title="Rotate"
        >
          ↻
        </div>
      </div>

      {/* Bounding Box */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: '2px solid #1A73E8',
          borderRadius: '2px',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
