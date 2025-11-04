// Predefined shapes and decorative elements for resume styling

export const SHAPES = {
  // Divider Shapes
  dividers: [
    {
      id: 'line',
      name: 'Simple Line',
      svg: (color, width) => (
        <svg width={width} height="2" viewBox={`0 0 ${width} 2`}>
          <line x1="0" y1="1" x2={width} y2="1" stroke={color} strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'double-line',
      name: 'Double Line',
      svg: (color, width) => (
        <svg width={width} height="6" viewBox={`0 0 ${width} 6`}>
          <line x1="0" y1="1" x2={width} y2="1" stroke={color} strokeWidth="2"/>
          <line x1="0" y1="5" x2={width} y2="5" stroke={color} strokeWidth="1"/>
        </svg>
      )
    },
    {
      id: 'dotted',
      name: 'Dotted Line',
      svg: (color, width) => (
        <svg width={width} height="2" viewBox={`0 0 ${width} 2`}>
          <line x1="0" y1="1" x2={width} y2="1" stroke={color} strokeWidth="2" strokeDasharray="2,4"/>
        </svg>
      )
    },
    {
      id: 'wave',
      name: 'Wave',
      svg: (color, width) => (
        <svg width={width} height="8" viewBox={`0 0 ${width} 8`}>
          <path d={`M0,4 Q${width/4},0 ${width/2},4 T${width},4`} stroke={color} strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      id: 'zigzag',
      name: 'Zigzag',
      svg: (color, width) => (
        <svg width={width} height="8" viewBox={`0 0 ${width} 8`}>
          <path d={`M0,4 L${width/8},0 L${width/4},4 L${width*3/8},0 L${width/2},4 L${width*5/8},0 L${width*3/4},4 L${width*7/8},0 L${width},4`} stroke={color} strokeWidth="2" fill="none"/>
        </svg>
      )
    }
  ],

  // Header Decorations
  headerShapes: [
    {
      id: 'corner-accent',
      name: 'Corner Accent',
      svg: (color) => (
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, right: 0 }}>
          <path d="M100,0 L100,100 L0,100 Z" fill={color} opacity="0.1"/>
        </svg>
      )
    },
    {
      id: 'circle-pattern',
      name: 'Circle Pattern',
      svg: (color) => (
        <svg width="200" height="100" viewBox="0 0 200 100" style={{ position: 'absolute', top: 0, right: 0 }}>
          <circle cx="150" cy="50" r="40" fill={color} opacity="0.05"/>
          <circle cx="180" cy="30" r="25" fill={color} opacity="0.08"/>
        </svg>
      )
    },
    {
      id: 'geometric',
      name: 'Geometric',
      svg: (color) => (
        <svg width="150" height="150" viewBox="0 0 150 150" style={{ position: 'absolute', top: 0, left: 0 }}>
          <rect x="0" y="0" width="50" height="50" fill={color} opacity="0.05"/>
          <rect x="50" y="50" width="50" height="50" fill={color} opacity="0.08"/>
          <rect x="100" y="100" width="50" height="50" fill={color} opacity="0.05"/>
        </svg>
      )
    }
  ],

  // Section Backgrounds
  sectionBackgrounds: [
    {
      id: 'none',
      name: 'None',
      style: {}
    },
    {
      id: 'subtle',
      name: 'Subtle',
      style: (color) => ({
        backgroundColor: color,
        opacity: 0.03,
        padding: '16px',
        borderRadius: '8px'
      })
    },
    {
      id: 'bordered',
      name: 'Bordered',
      style: (color) => ({
        border: `2px solid ${color}`,
        borderLeft: `4px solid ${color}`,
        padding: '16px',
        borderRadius: '4px'
      })
    },
    {
      id: 'card',
      name: 'Card',
      style: (color) => ({
        backgroundColor: '#ffffff',
        border: `1px solid ${color}20`,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      })
    }
  ],

  // Bullet Styles
  bullets: [
    { id: 'disc', name: '●', symbol: '●' },
    { id: 'circle', name: '○', symbol: '○' },
    { id: 'square', name: '■', symbol: '■' },
    { id: 'arrow', name: '→', symbol: '→' },
    { id: 'check', name: '✓', symbol: '✓' },
    { id: 'star', name: '★', symbol: '★' },
    { id: 'diamond', name: '◆', symbol: '◆' },
    { id: 'triangle', name: '▸', symbol: '▸' }
  ]
};

export const ICON_SETS = {
  professional: {
    email: '✉️',
    phone: '📞',
    location: '📍',
    linkedin: '💼',
    github: '💻',
    website: '🌐',
    portfolio: '📁'
  },
  minimal: {
    email: '✉',
    phone: '☎',
    location: '⌖',
    linkedin: '⚲',
    github: '⚙',
    website: '⊕',
    portfolio: '⊞'
  },
  modern: {
    email: '📧',
    phone: '📱',
    location: '🗺️',
    linkedin: '🔗',
    github: '⚡',
    website: '🌍',
    portfolio: '💼'
  }
};

export const COLOR_PRESETS = [
  { name: 'Professional Blue', primary: '#1e40af', accent: '#3b82f6' },
  { name: 'Corporate Gray', primary: '#374151', accent: '#6b7280' },
  { name: 'Modern Purple', primary: '#6366f1', accent: '#8b5cf6' },
  { name: 'Creative Teal', primary: '#0d9488', accent: '#14b8a6' },
  { name: 'Bold Red', primary: '#dc2626', accent: '#ef4444' },
  { name: 'Elegant Green', primary: '#059669', accent: '#10b981' },
  { name: 'Classic Black', primary: '#000000', accent: '#404040' },
  { name: 'Warm Orange', primary: '#ea580c', accent: '#f97316' }
];

export const FONT_PAIRS = [
  { 
    name: 'Classic Professional',
    heading: 'Georgia',
    body: 'Arial'
  },
  {
    name: 'Modern Clean',
    heading: 'Helvetica',
    body: 'Segoe UI'
  },
  {
    name: 'Traditional',
    heading: 'Times New Roman',
    body: 'Georgia'
  },
  {
    name: 'Contemporary',
    heading: 'Verdana',
    body: 'Tahoma'
  },
  {
    name: 'Tech Minimal',
    heading: 'Courier New',
    body: 'Courier New'
  }
];

export const LAYOUT_TEMPLATES = [
  {
    id: 'single-column',
    name: 'Single Column',
    description: 'Traditional layout',
    preview: '▯'
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Modern split layout',
    preview: '▯▯'
  },
  {
    id: 'sidebar-left',
    name: 'Left Sidebar',
    description: 'Sidebar with main content',
    preview: '▮▯'
  },
  {
    id: 'sidebar-right',
    name: 'Right Sidebar',
    description: 'Main content with sidebar',
    preview: '▯▮'
  }
];
