import ClassicTemplate from './ClassicTemplate';

// Template registry with metadata
export const templates = {
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
  return templates[templateId] || templates.classic;
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
