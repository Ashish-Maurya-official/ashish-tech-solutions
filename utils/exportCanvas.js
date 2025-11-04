// Export canvas to various formats
// Required dependencies:
// npm install html2canvas jspdf
// or
// yarn add html2canvas jspdf

export async function exportToPNG(canvasElement, filename = 'design.png', options = {}) {
  try {
    // Dynamic import html2canvas
    let html2canvas;
    try {
      html2canvas = (await import('html2canvas')).default;
    } catch (importError) {
      throw new Error('html2canvas library not installed. Run: npm install html2canvas');
    }
    
    const canvas = await html2canvas(canvasElement, {
      backgroundColor: options.transparent ? null : '#ffffff',
      scale: options.scale || 2, // Higher quality
      logging: false,
      useCORS: true
    });

    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');

    return { success: true };
  } catch (error) {
    console.error('Export to PNG failed:', error);
    return { success: false, error: error.message };
  }
}

export async function exportToJPG(canvasElement, filename = 'design.jpg', options = {}) {
  try {
    let html2canvas;
    try {
      html2canvas = (await import('html2canvas')).default;
    } catch (importError) {
      throw new Error('html2canvas library not installed. Run: npm install html2canvas');
    }
    
    const canvas = await html2canvas(canvasElement, {
      backgroundColor: '#ffffff',
      scale: options.scale || 2,
      logging: false,
      useCORS: true
    });

    // Convert to blob with quality setting
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/jpeg', options.quality || 0.95);

    return { success: true };
  } catch (error) {
    console.error('Export to JPG failed:', error);
    return { success: false, error: error.message };
  }
}

export async function exportToPDF(canvasElement, filename = 'design.pdf', options = {}) {
  try {
    let html2canvas, jsPDF;
    try {
      html2canvas = (await import('html2canvas')).default;
      const jsPDFModule = await import('jspdf');
      jsPDF = jsPDFModule.jsPDF;
    } catch (importError) {
      throw new Error('Required libraries not installed. Run: npm install html2canvas jspdf');
    }
    
    const canvas = await html2canvas(canvasElement, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true
    });

    // Get canvas dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate PDF dimensions (A4 in mm)
    const pdfWidth = options.pageWidth || 210;
    const pdfHeight = options.pageHeight || 297;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    // Add image to PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    // Save PDF
    pdf.save(filename);

    return { success: true };
  } catch (error) {
    console.error('Export to PDF failed:', error);
    return { success: false, error: error.message };
  }
}

// Export all pages to PDF
export async function exportAllPagesToPDF(pages, filename = 'design.pdf') {
  try {
    let html2canvas, jsPDF;
    try {
      html2canvas = (await import('html2canvas')).default;
      const jsPDFModule = await import('jspdf');
      jsPDF = jsPDFModule.jsPDF;
    } catch (importError) {
      throw new Error('Required libraries not installed. Run: npm install html2canvas jspdf');
    }
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    for (let i = 0; i < pages.length; i++) {
      const pageElement = pages[i];
      
      const canvas = await html2canvas(pageElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      if (i > 0) {
        pdf.addPage();
      }
      
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }
    
    pdf.save(filename);
    return { success: true };
  } catch (error) {
    console.error('Export all pages to PDF failed:', error);
    return { success: false, error: error.message };
  }
}
