import ClassicTemplate from './ClassicTemplate';
import DynamicTemplate from './DynamicTemplate';
import CanvasTemplate from './CanvasTemplate';

// Template registry with metadata
export const templates = {
  canvas: {
    id: 'canvas',
    name: 'Canvas',
    component: CanvasTemplate,
    category: 'Freeform',
    color: '#8b5cf6',
    description: 'Free-form canvas - drag any element anywhere like Canva'
  },
  dynamic: {
    id: 'dynamic',
    name: 'Dynamic',
    component: DynamicTemplate,
    category: 'Modern',
    color: '#6366f1',
    description: 'Flexible drag-and-drop layout with full customization'
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    component: ClassicTemplate,
    category: 'Traditional',
    color: '#1F2937',
    description: 'Timeless black and white professional layout'
  }
};

// Get template component by ID
export function getTemplate(templateId) {
  return templates[templateId] || templates.canvas;
}

// Get all template IDs
export function getTemplateIds() {
  return Object.keys(templates);
}

// Get template metadata
export function getTemplateMetadata(templateId) {
  const template = templates[templateId];
  if (!template) return null;
  
  return {
    id: template.id,
    name: template.name,
    category: template.category,
    color: template.color,
    description: template.description
  };
}

export default templates;
