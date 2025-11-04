import { useState, useRef } from 'react';

export default function TransformHandles({ element, onResize, onRotate, zoom = 1 }) {
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const startMousePosRef = useRef({ x: 0, y: 0 });
  const startElementPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0 });

  const handleSize = 8 / zoom; // Scale handle size with zoom
  const rotateHandleDistance = 30 / zoom;

  const handleMouseDown = (e, handle) => {
    e.preventDefault()
    e.stopPropagation()
    startMousePosRef.current = { x: e.clientX, y: e.clientY }
    startElementPosRef.current = { x: element.position.x, y: element.position.y }
    startSizeRef.current = { width: element.size.width, height: element.size.height }

    const handleMouseMove = (moveEvent) => {
      if (handle === 'rotate') {
        handleRotateMove(moveEvent);
      } else {
        handleResizeMove(moveEvent, handle);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeMove = (e, handle) => {
    const { x: startMouseX, y: startMouseY } = startMousePosRef.current
    const { x: startElementX, y: startElementY } = startElementPosRef.current
    const { width: startWidth, height: startHeight } = startSizeRef.current

    const deltaX = (e.clientX - startMouseX) / zoom
    const deltaY = (e.clientY - startMouseY) / zoom
    const aspectRatio = startWidth / startHeight
    const maintainAspect = e.shiftKey;

    let newWidth = startWidth
    let newHeight = startHeight
    let newX = startElementX
    let newY = startElementY

    switch (handle) {
      case 'nw':
        // Top-left: move position and adjust size
        newWidth = startWidth - deltaX
        newHeight = maintainAspect ? newWidth / aspectRatio : startHeight - deltaY
        newX = startElementX + deltaX
        newY = maintainAspect ? startElementY + (startHeight - newHeight) : startElementY + deltaY
        break;
      case 'n':
        // Top: move Y position and adjust height
        newHeight = startHeight - deltaY
        newY = startElementY + deltaY
        break;
      case 'ne':
        // Top-right: adjust width and height, move Y
        newWidth = startWidth + deltaX
        newHeight = maintainAspect ? newWidth / aspectRatio : startHeight - deltaY
        newY = maintainAspect ? startElementY + (startHeight - newHeight) : startElementY + deltaY
        break;
      case 'e':
        // Right: only adjust width
        newWidth = startWidth + deltaX
        break;
      case 'se':
        // Bottom-right: adjust both dimensions
        newWidth = startWidth + deltaX
        newHeight = maintainAspect ? newWidth / aspectRatio : startHeight + deltaY
        break;
      case 's':
        // Bottom: only adjust height
        newHeight = startHeight + deltaY
        break;
      case 'sw':
        // Bottom-left: adjust both, move X
        newWidth = startWidth - deltaX
        newHeight = maintainAspect ? newWidth / aspectRatio : startHeight + deltaY
        newX = startElementX + deltaX
        break;
      case 'w':
        // Left: adjust width and move X
        newWidth = startWidth - deltaX
        newX = startElementX + deltaX
        break;
    }

    // Minimum size constraints
    newWidth = Math.max(20, newWidth);
    newHeight = Math.max(20, newHeight);

    onResize({
      position: { x: newX, y: newY },
      size: { width: newWidth, height: newHeight }
    });
  };

  const handleRotateMove = (e) => {
    const centerX = element.position.x + element.size.width / 2;
    const centerY = element.position.y + element.size.height / 2;
    
    const angle = Math.atan2(
      e.clientY / zoom - centerY,
      e.clientX / zoom - centerX
    ) * (180 / Math.PI);

    onRotate(angle + 90);
  };

  const handles = [
    { id: 'nw', cursor: 'nwse-resize', x: 0, y: 0 },
    { id: 'n', cursor: 'ns-resize', x: element.size.width / 2, y: 0 },
    { id: 'ne', cursor: 'nesw-resize', x: element.size.width, y: 0 },
    { id: 'e', cursor: 'ew-resize', x: element.size.width, y: element.size.height / 2 },
    { id: 'se', cursor: 'nwse-resize', x: element.size.width, y: element.size.height },
    { id: 's', cursor: 'ns-resize', x: element.size.width / 2, y: element.size.height },
    { id: 'sw', cursor: 'nesw-resize', x: 0, y: element.size.height },
    { id: 'w', cursor: 'ew-resize', x: 0, y: element.size.height / 2 }
  ];

  return (
    <>
      {/* Selection border - no rotation applied */}
      <div
        style={{
          position: 'absolute',
          left: element.position.x,
          top: element.position.y,
          width: element.size.width,
          height: element.size.height,
          border: `${2 / zoom}px solid #1A73E8`,
          pointerEvents: 'none'
        }}
      />

      {/* Resize handles - positioned at corners/edges */}
      {handles.map(handle => (
        <div
          key={handle.id}
          onMouseDown={(e) => handleMouseDown(e, handle.id)}
          style={{
            position: 'absolute',
            left: element.position.x + handle.x - handleSize / 2,
            top: element.position.y + handle.y - handleSize / 2,
            width: handleSize,
            height: handleSize,
            background: 'white',
            border: `${1 / zoom}px solid #1A73E8`,
            borderRadius: '50%',
            cursor: handle.cursor,
            zIndex: 1000
          }}
        />
      ))}

      {/* Rotation handle with connecting line */}
      <div
        style={{
          position: 'absolute',
          left: element.position.x + element.size.width / 2,
          top: element.position.y - rotateHandleDistance,
          width: 0,
          height: 0,
          zIndex: 1000
        }}
      >
        {/* Connection line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: rotateHandleDistance - handleSize,
          width: `${1 / zoom}px`,
          height: rotateHandleDistance - handleSize,
          background: '#1A73E8',
          transform: 'translateX(-50%)',
          pointerEvents: 'none'
        }} />
        
        {/* Rotation handle */}
        <div
          onMouseDown={(e) => handleMouseDown(e, 'rotate')}
          style={{
            position: 'absolute',
            left: -handleSize / 2,
            top: -handleSize / 2,
            width: handleSize,
            height: handleSize,
            background: 'white',
            border: `${1 / zoom}px solid #1A73E8`,
            borderRadius: '50%',
            cursor: 'grab'
          }}
        />
      </div>
    </>
  );
}
