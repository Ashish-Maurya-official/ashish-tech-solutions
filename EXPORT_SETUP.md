# Export Feature Setup

The export functionality requires two additional libraries to be installed.

## Installation

Run one of the following commands in your project directory:

### Using npm:
```bash
npm install html2canvas jspdf
```

### Using yarn:
```bash
yarn add html2canvas jspdf
```

## Features

Once installed, the export feature will support:

- **PNG Export** - High-quality PNG with optional transparent background
- **JPG Export** - JPEG with quality settings (low, medium, high)
- **PDF Export** - PDF generation with proper page dimensions

## Usage

1. Click **File** in the top toolbar
2. Select **Export**
3. Choose your format (PNG, JPG, or PDF)
4. Configure quality settings
5. Click **Export**

## Troubleshooting

If you see an error message about missing libraries:
1. Make sure you've run the installation command above
2. Restart your development server
3. Try the export again

If exports are failing:
- Check browser console for detailed error messages
- Ensure your canvas has elements to export
- Try a different format (PNG is most reliable)
