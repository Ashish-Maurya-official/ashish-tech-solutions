export default function Grid({ gridSize = 20, width, height, visible = true }) {
  if (!visible) return null;

  const lines = [];
  const cols = Math.ceil(width / gridSize);
  const rows = Math.ceil(height / gridSize);

  // Vertical lines
  for (let i = 0; i <= cols; i++) {
    lines.push(
      <line
        key={`v-${i}`}
        x1={i * gridSize}
        y1={0}
        x2={i * gridSize}
        y2={height}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i <= rows; i++) {
    lines.push(
      <line
        key={`h-${i}`}
        x1={0}
        y1={i * gridSize}
        x2={width}
        y2={i * gridSize}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  }

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {lines}
    </svg>
  );
}
