import { getTemplate } from '../templates';

export default function ResumePreview({ templateId, data, scale = 1, forPrint = false, fitLayout = false }) {
  const template = getTemplate(templateId);
  const TemplateComponent = template.component;

  // A4 dimensions in pixels (210mm x 297mm at 96 DPI)
  const a4Width = 793;
  const a4Height = 1122;

  const wrapperStyle = fitLayout ? {
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
    width: `${a4Width}px`,
    height: `${a4Height}px`,
  } : {
    transform: `scale(${scale})`,
    transformOrigin: 'top center'
  };

  return (
    <div 
      className={`resume-preview-wrapper ${forPrint ? 'for-print' : ''} ${fitLayout ? 'fit-layout' : ''}`}
      style={wrapperStyle}
    >
      <div className="resume-page a4-page" data-template={templateId}>
        <TemplateComponent data={data} />
      </div>
    </div>
  );
}
