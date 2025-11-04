import { useState } from 'react';
import FreeDraggable from '../FreeDraggable';
import ContextMenu from './ContextMenu';
import Grid from './Grid';
import TransformHandles from './TransformHandles';
import AlignmentToolbar from './AlignmentToolbar';

export default function BlankCanvas({ 
  elements = [],
  pageStyle = {},
  onElementSelect,
  onElementUpdate,
  onBatchUpdate,
  onElementDelete,
  onElementDuplicate,
  onElementBringForward,
  onElementSendBackward,
  onElementLock,
  onAlign,
  selectedElementIds = [],
  gridSettings = {},
  isEditing = true 
}) {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [groupDragOffset, setGroupDragOffset] = useState(null);
  const [draggedElementId, setDraggedElementId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const handleDragStart = (elementId) => {
    if (selectedElementIds.length > 1 && selectedElementIds.includes(elementId)) {
      setDraggedElementId(elementId);
      setGroupDragOffset({ x: 0, y: 0 });
    }
  };

  const handleDragMove = (elementId, offset) => {
    if (selectedElementIds.length > 1 && selectedElementIds.includes(elementId)) {
      setGroupDragOffset(offset);
    }
  };

  const handleDragEnd = () => {
    setDraggedElementId(null);
    setGroupDragOffset(null);
  };



  // Snap position to grid
  const snapToGrid = (position) => {
    if (!gridSettings.snapToGrid) return position;
    
    const gridSize = gridSettings.gridSize || 20;
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize
    };
  };

  const handlePositionChange = (elementId, newPosition, delta) => {
    if (!onElementUpdate) return;

    // Apply snap to grid
    const snappedPosition = snapToGrid(newPosition);

    // If multiple elements are selected and this element is one of them, move all together
    if (selectedElementIds.length > 1 && selectedElementIds.includes(elementId) && delta) {
      // Prepare batch updates for all selected elements
      const updates = selectedElementIds.map(id => {
        const element = elements.find(el => el.id === id);
        if (element) {
          const currentPos = element.position || { x: 0, y: 0 };
          const updatedPosition = snapToGrid({
            x: currentPos.x + delta.x,
            y: currentPos.y + delta.y
          });
          return { elementId: id, updates: { position: updatedPosition } };
        }
        return null;
      }).filter(Boolean);

      // Use batch update if available, otherwise fall back to individual updates
      if (updates.length > 0) {
        if (onBatchUpdate) {
          onBatchUpdate(updates);
        } else {
          updates.forEach(update => {
            onElementUpdate(update.elementId, update.updates);
          });
        }
      }
    } else {
      // Single element move
      onElementUpdate(elementId, { position: snappedPosition });
    }
  };

  const handleElementClick = (elementId, event) => {
    if (event) {
      event.stopPropagation();
    }
    const isMultiSelect = event?.shiftKey || false;
    const isAlreadySelected = selectedElementIds.includes(elementId);
    
    // If clicking on an already selected element without Shift, don't change selection
    // This allows dragging multiple selected elements
    if (isAlreadySelected && !isMultiSelect && selectedElementIds.length > 1) {
      return;
    }
    
    if (onElementSelect) {
      onElementSelect(elementId, isMultiSelect);
    }
  };

  const renderElement = (element) => {
    const isSelected = selectedElementIds.includes(element.id);
    const isHovered = hoveredElement === element.id;

    switch (element.type) {
      case 'text':
        const textWidth = element.size?.width ?? 200
        const textHeight = element.size?.height
        return (
          <div
            style={{
              ...element.styling,
              width: textWidth,
              ...(textHeight ? { height: textHeight } : {}),
              padding: '8px 12px',
              background: element.styling?.background || 'transparent',
              borderRadius: element.styling?.borderRadius || '4px',
              minWidth: '100px',
              cursor: isEditing ? 'move' : 'default'
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {element.content || 'Text'}
          </div>
        );

      case 'heading':
        const HeadingTag = element.level || 'h1';
        const headingWidth = element.size?.width ?? undefined
        const headingHeight = element.size?.height ?? undefined
        return (
          <HeadingTag
            style={{
              ...element.styling,
              ...(headingWidth ? { width: headingWidth } : {}),
              ...(headingHeight ? { height: headingHeight } : {}),
              margin: 0,
              padding: '8px 12px',
              cursor: isEditing ? 'move' : 'default'
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {element.content || 'Heading'}
          </HeadingTag>
        );

      case 'rectangle':
        return (
          <div
            style={{
              width: element.size?.width || 200,
              height: element.size?.height || 100,
              backgroundColor: element.styling?.fill || '#6366f1',
              border: element.styling?.border || 'none',
              borderRadius: element.styling?.borderRadius || '0px',
              boxShadow: element.styling?.boxShadow || 'none',
              cursor: isEditing ? 'move' : 'default'
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          />
        );

      case 'circle':
        return (
          <div
            style={{
              width: element.size?.width || 100,
              height: element.size?.height || 100,
              backgroundColor: element.styling?.fill || '#8b5cf6',
              border: element.styling?.border || 'none',
              borderRadius: '50%',
              boxShadow: element.styling?.boxShadow || 'none',
              cursor: isEditing ? 'move' : 'default'
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          />
        );

      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${(element.size?.width || 100) / 2}px solid transparent`,
              borderRight: `${(element.size?.width || 100) / 2}px solid transparent`,
              borderBottom: `${element.size?.height || 100}px solid ${element.styling?.fill || '#f59e0b'}`,
              cursor: isEditing ? 'move' : 'default'
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          />
        );

      case 'star':
        return (
          <div
            style={{
              fontSize: element.size?.width || 60,
              color: element.styling?.fill || '#fbbf24',
              cursor: isEditing ? 'move' : 'default',
              lineHeight: 1
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            ★
          </div>
        );

      case 'line':
        return (
          <div
            style={{
              width: element.size?.width || 200,
              height: element.size?.height || 2,
              backgroundColor: element.styling?.fill || '#000000',
              cursor: isEditing ? 'move' : 'default'
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          />
        );

      case 'arrow-right':
      case 'arrow-left':
      case 'arrow-up':
      case 'arrow-down':
        const arrowIcons = {
          'arrow-right': '→',
          'arrow-left': '←',
          'arrow-up': '↑',
          'arrow-down': '↓'
        };
        return (
          <div
            style={{
              fontSize: element.size?.width || 48,
              color: element.styling?.fill || '#000000',
              cursor: isEditing ? 'move' : 'default',
              lineHeight: 1,
              fontWeight: 'bold'
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {arrowIcons[element.type]}
          </div>
        );

      case 'image':
        return (
          <img
            src={element.src || 'https://via.placeholder.com/200'}
            alt={element.alt || 'Image'}
            style={{
              width: element.size?.width || 200,
              height: element.size?.height || 'auto',
              borderRadius: element.styling?.borderRadius || '0px',
              boxShadow: element.styling?.boxShadow || 'none',
              cursor: isEditing ? 'move' : 'default'
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          />
        );

      case 'icon':
        return (
          <div
            style={{
              fontSize: element.size?.width || 48,
              cursor: isEditing ? 'move' : 'default',
              lineHeight: 1
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {element.content || '⭐'}
          </div>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  const handleCanvasClick = (e) => {
    // Only deselect if clicking directly on canvas (not on an element)
    if (e.target === e.currentTarget) {
      onElementSelect && onElementSelect(null);
    }
  };

  const handleContextMenu = (e, elementId = null) => {
    e.preventDefault();
    e.stopPropagation();

    // If right-clicking on an element that's not selected, select it first
    if (elementId && !selectedElementIds.includes(elementId)) {
      onElementSelect && onElementSelect(elementId, false);
    }

    const hasSelection = elementId || selectedElementIds.length > 0;
    if (!hasSelection) return;

    const targetIds = elementId ? [elementId] : selectedElementIds;
    const selectedCount = targetIds.length;
    
    // Check if any selected elements are locked
    const targetElements = elements.filter(el => targetIds.includes(el.id));
    const anyLocked = targetElements.some(el => el.locked);
    const allLocked = targetElements.every(el => el.locked);

    const actions = [
      {
        icon: '📋',
        label: 'Duplicate',
        shortcut: 'Ctrl+D',
        onClick: () => {
          targetIds.forEach(id => onElementDuplicate && onElementDuplicate(id));
        }
      },
      { divider: true },
      {
        icon: '⬆️',
        label: 'Bring Forward',
        shortcut: 'Ctrl+]',
        onClick: () => {
          targetIds.forEach(id => onElementBringForward && onElementBringForward(id));
        }
      },
      {
        icon: '⬇️',
        label: 'Send Backward',
        shortcut: 'Ctrl+[',
        onClick: () => {
          targetIds.forEach(id => onElementSendBackward && onElementSendBackward(id));
        }
      },
      { divider: true },
      {
        icon: allLocked ? '🔓' : '🔒',
        label: allLocked ? 'Unlock Element' + (selectedCount > 1 ? 's' : '') : 'Lock Element' + (selectedCount > 1 ? 's' : ''),
        onClick: () => {
          const shouldLock = !allLocked;
          targetIds.forEach(id => onElementLock && onElementLock(id, shouldLock));
        }
      },
      { divider: true },
      {
        icon: '🗑️',
        label: selectedCount > 1 ? `Delete (${selectedCount})` : 'Delete',
        shortcut: 'Del',
        danger: true,
        onClick: () => {
          targetIds.forEach(id => onElementDelete && onElementDelete(id));
        }
      }
    ];

    setContextMenu({
      position: { x: e.clientX, y: e.clientY },
      actions,
      selectedCount
    });
  };

  return (
    <>
      <div
        onClick={handleCanvasClick}
        onContextMenu={(e) => handleContextMenu(e)}
        style={{
          position: 'relative',
          width: pageStyle.width || '210mm', // A4 width
          minHeight: pageStyle.minHeight || '297mm', // A4 height
          padding: pageStyle.padding || '40px',
          margin: '0 auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backgroundColor: pageStyle.backgroundColor || '#ffffff',
          backgroundImage: pageStyle.backgroundImage,
          ...pageStyle
        }}
    >
      {/* Grid Overlay */}
      {gridSettings.gridEnabled && (
        <Grid
          gridSize={gridSettings.gridSize || 20}
          width={parseInt(pageStyle.width) || 800}
          height={parseInt(pageStyle.minHeight) || 1100}
          visible={true}
        />
      )}

      {/* Transform handles for single selected element */}
      {selectedElementIds.length === 1 && elements.find(el => el.id === selectedElementIds[0]) && (
        <TransformHandles
          element={elements.find(el => el.id === selectedElementIds[0])}
          onResize={(updates) => {
            onElementUpdate(selectedElementIds[0], updates);
          }}
          onRotate={(rotation) => {
            onElementUpdate(selectedElementIds[0], { rotation });
          }}
          zoom={1}
        />
      )}

      {/* Alignment toolbar for multiple selected elements */}
      {selectedElementIds.length >= 2 && (
        <AlignmentToolbar
          selectedElements={elements.filter(el => selectedElementIds.includes(el.id))}
          onAlign={onAlign}
          position={{
            x: window.innerWidth / 2 - 200,
            y: 120
          }}
        />
      )}

      {/* Render all elements */}
      {elements.map((element) => {
        const isSelected = selectedElementIds.includes(element.id);
        const isDraggingGroup = draggedElementId && selectedElementIds.includes(element.id);
        const isBeingDragged = element.id === draggedElementId;
        const isLocked = element.locked || false;
        
        // Apply group drag offset to non-dragged selected elements
        const adjustedPosition = (isDraggingGroup && !isBeingDragged && groupDragOffset) ? {
          x: (element.position?.x || 0) + groupDragOffset.x,
          y: (element.position?.y || 0) + groupDragOffset.y
        } : (element.position || { x: 0, y: 0 });

        return (
          <FreeDraggable
            key={element.id}
            id={element.id}
            initialPosition={adjustedPosition}
            onPositionChange={handlePositionChange}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            isEnabled={isEditing && !isLocked}
            onSelect={(id, event) => {
              handleElementClick(id, event);
            }}
            isSelected={isSelected}
          >
            <div 
              onClick={(e) => {
                e.stopPropagation();
                if (isLocked) {
                  alert('This element is locked. Right-click and select "Unlock" to edit it.');
                }
              }}
              onContextMenu={(e) => handleContextMenu(e, element.id)}
            >
              {renderElement(element)}
            </div>
          </FreeDraggable>
        );
      })}

      {/* Empty state */}
      {elements.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#9ca3af',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
            Blank Canvas
          </div>
          <div style={{ fontSize: '14px' }}>
            Click "Add Element" to start creating
          </div>
        </div>
      )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          position={contextMenu.position}
          actions={contextMenu.actions}
          selectedCount={contextMenu.selectedCount}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
}
