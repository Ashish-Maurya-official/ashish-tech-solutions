import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalTemplate from './MinimalTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechTemplate from './TechTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';

// Template registry with metadata
export const templates = {
  modern: {
    id: 'modern',
    name: 'Modern',
    component: ModernTemplate,
    category: 'Professional',
    color: '#3B82F6',
    description: 'Clean and contemporary design with gradient header'
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    component: ClassicTemplate,
    category: 'Traditional',
    color: '#1F2937',
    description: 'Timeless black and white professional layout'
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    component: CreativeTemplate,
    category: 'Design',
    color: '#8B5CF6',
    description: 'Eye-catching sidebar design with personality'
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    component: MinimalTemplate,
    category: 'Clean',
    color: '#10B981',
    description: 'Simple and elegant with maximum readability'
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    component: ExecutiveTemplate,
    category: 'Corporate',
    color: '#DC2626',
    description: 'Professional design for senior positions'
  },
  tech: {
    id: 'tech',
    name: 'Tech',
    component: TechTemplate,
    category: 'Developer',
    color: '#059669',
    description: 'Developer-focused with code-style elements'
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    component: ProfessionalTemplate,
    category: 'Academic',
    color: '#000000',
    description: 'Clean academic-style resume with clear sections'
  },
  elegant: {
    id: 'elegant',
    name: 'Elegant',
    component: ModernTemplate,
    category: 'Refined',
    color: '#7C3AED',
    description: 'Sophisticated and refined appearance'
  },
  bold: {
    id: 'bold',
    name: 'Bold',
    component: ClassicTemplate,
    category: 'Impact',
    color: '#EA580C',
    description: 'Strong visual impact with bold typography'
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    component: MinimalTemplate,
    category: 'Concise',
    color: '#0891B2',
    description: 'Space-efficient for extensive experience'
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    component: CreativeTemplate,
    category: 'Visual',
    color: '#BE185D',
    description: 'Visual timeline of your career journey'
  },
  sidebar: {
    id: 'sidebar',
    name: 'Sidebar',
    component: CreativeTemplate,
    category: 'Layout',
    color: '#4338CA',
    description: 'Two-column layout with sidebar'
  },
  gradient: {
    id: 'gradient',
    name: 'Gradient',
    component: ModernTemplate,
    category: 'Modern',
    color: '#7C2D12',
    description: 'Modern gradient accents throughout'
  }
};

// Get template component by ID
export function getTemplate(templateId) {
  return templates[templateId] || templates.modern;
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
