// API endpoint to manage resumes
import fs from 'fs';
import path from 'path';

const RESUMES_DIR = path.join(process.cwd(), 'data', 'resumes');

// Ensure resumes directory exists
if (!fs.existsSync(RESUMES_DIR)) {
  fs.mkdirSync(RESUMES_DIR, { recursive: true });
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get all resumes
    try {
      const files = fs.readdirSync(RESUMES_DIR);
      const resumes = files
        .filter(file => file.endsWith('.json'))
        .map(file => {
          const filePath = path.join(RESUMES_DIR, file);
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          return {
            id: file.replace('.json', ''),
            ...data
          };
        });
      
      res.status(200).json(resumes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load resumes' });
    }
  } else if (req.method === 'POST') {
    // Create new resume
    try {
      const { name, template } = req.body;
      const id = `resume_${Date.now()}`;
      
      const defaultData = {
        id,
        name: name || 'Untitled Resume',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        selectedDesign: template || 'classic',
        data: {
          name: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          github: '',
          summary: '',
          experience: [],
          education: [],
          skills: [],
          projects: [],
          languages: [],
          links: [],
          customSections: [],
          styling: {},
          sectionVisibility: {},
          headings: {}
        }
      };
      
      const filePath = path.join(RESUMES_DIR, `${id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
      
      res.status(201).json(defaultData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create resume' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
