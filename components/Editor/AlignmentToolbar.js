export default function AlignmentToolbar({ 
  selectedElements, 
  onAlign,
  position = { x: 0, y: 0 }
}) {
  if (selectedElements.length < 2) return null;

  const alignments = [
    { id: 'left', icon: '⬅️', label: 'Align Left', action: 'alignLeft' },
    { id: 'center-h', icon: '↔️', label: 'Align Center', action: 'alignCenterH' },
    { id: 'right', icon: '➡️', label: 'Align Right', action: 'alignRight' },
    { id: 'top', icon: '⬆️', label: 'Align Top', action: 'alignTop' },
    { id: 'center-v', icon: '↕️', label: 'Align Middle', action: 'alignCenterV' },
    { id: 'bottom', icon: '⬇️', label: 'Align Bottom', action: 'alignBottom' },
    { id: 'distribute-h', icon: '⬌', label: 'Distribute Horizontally', action: 'distributeH' },
    { id: 'distribute-v', icon: '⬍', label: 'Distribute Vertically', action: 'distributeV' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y - 60,
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        gap: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 10000
      }}
    >
      {alignments.map((alignment, index) => (
        <div key={alignment.id}>
          {(index === 3 || index === 6) && (
            <div style={{
              width: '1px',
              height: '32px',
              background: '#e5e7eb',
              margin: '0 4px'
            }} />
          )}
          <button
            onClick={() => onAlign(alignment.action)}
            title={alignment.label}
            style={{
              width: '36px',
              height: '36px',
              border: 'none',
              background: 'transparent',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            {alignment.icon}
          </button>
        </div>
      ))}
    </div>
  );
}
