// Project storage utilities for save/load functionality

const STORAGE_KEY = 'canva-editor-project';
const TIMESTAMP_KEY = 'canva-editor-project-timestamp';
const AUTOSAVE_KEY = 'canva-editor-autosave';

export function saveProject(project) {
  try {
    const projectData = JSON.stringify(project);
    localStorage.setItem(STORAGE_KEY, projectData);
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
    return { success: true };
  } catch (error) {
    console.error('Save failed:', error);
    return { success: false, error: error.message };
  }
}

export function loadProject() {
  try {
    const projectData = localStorage.getItem(STORAGE_KEY);
    if (!projectData) {
      return { success: false, error: 'No saved project found' };
    }
    
    const project = JSON.parse(projectData);
    const timestamp = localStorage.getItem(TIMESTAMP_KEY);
    
    return { 
      success: true, 
      project,
      timestamp: timestamp ? parseInt(timestamp) : null
    };
  } catch (error) {
    console.error('Load failed:', error);
    return { success: false, error: error.message };
  }
}

export function autoSaveProject(project) {
  try {
    const projectData = JSON.stringify(project);
    localStorage.setItem(AUTOSAVE_KEY, projectData);
    localStorage.setItem(`${AUTOSAVE_KEY}-timestamp`, Date.now().toString());
    return { success: true };
  } catch (error) {
    console.error('Auto-save failed:', error);
    return { success: false, error: error.message };
  }
}

export function loadAutoSave() {
  try {
    const projectData = localStorage.getItem(AUTOSAVE_KEY);
    if (!projectData) {
      return { success: false, error: 'No auto-save found' };
    }
    
    const project = JSON.parse(projectData);
    const timestamp = localStorage.getItem(`${AUTOSAVE_KEY}-timestamp`);
    
    return { 
      success: true, 
      project,
      timestamp: timestamp ? parseInt(timestamp) : null
    };
  } catch (error) {
    console.error('Load auto-save failed:', error);
    return { success: false, error: error.message };
  }
}

export function hasAutoSave() {
  return localStorage.getItem(AUTOSAVE_KEY) !== null;
}

export function clearAutoSave() {
  localStorage.removeItem(AUTOSAVE_KEY);
  localStorage.removeItem(`${AUTOSAVE_KEY}-timestamp`);
}

export function getLastSaveTime() {
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);
  return timestamp ? parseInt(timestamp) : null;
}

export function formatSaveTime(timestamp) {
  if (!timestamp) return 'Never';
  
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export function exportProjectAsJSON(project, filename) {
  try {
    const projectData = JSON.stringify(project, null, 2);
    const blob = new Blob([projectData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename || `${project.title || 'design'}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    return { success: true };
  } catch (error) {
    console.error('Export JSON failed:', error);
    return { success: false, error: error.message };
  }
}

export function importProjectFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target.result);
        resolve({ success: true, project });
      } catch (error) {
        reject({ success: false, error: 'Invalid JSON file' });
      }
    };
    
    reader.onerror = () => {
      reject({ success: false, error: 'Failed to read file' });
    };
    
    reader.readAsText(file);
  });
}
