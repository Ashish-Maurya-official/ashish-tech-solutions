// API endpoint to manage individual resume
import fs from 'fs';
import path from 'path';

const RESUMES_DIR = path.join(process.cwd(), 'data', 'resumes');

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(RESUMES_DIR, `${id}.json`);

  if (req.method === 'GET') {
    // Get single resume
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load resume' });
    }
  } else if (req.method === 'PUT') {
    // Update resume
    try {
      const updatedData = {
        ...req.body,
        updatedAt: new Date().toISOString()
      };
      
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update resume' });
    }
  } else if (req.method === 'DELETE') {
    // Delete resume
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      
      fs.unlinkSync(filePath);
      res.status(200).json({ message: 'Resume deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete resume' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
