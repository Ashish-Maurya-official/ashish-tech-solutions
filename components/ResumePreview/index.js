import { getTemplate } from '../templates';

export default function ResumePreview({ templateId, data, scale = 1, forPrint = false, fitLayout = false }) {
  const template = getTemplate(templateId);
  const TemplateComponent = template.component;

  const wrapperStyle = fitLayout ? {
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
    width: '793px',
    height: '1122px'
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
