import { useState } from 'react';

export default function ExportModal({ isOpen, onClose, onExport, projectTitle }) {
  const [format, setFormat] = useState('png');
  const [quality, setQuality] = useState('high');
  const [transparent, setTransparent] = useState(false);
  const [allPages, setAllPages] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    const options = {
      format,
      quality: quality === 'high' ? 0.95 : quality === 'medium' ? 0.85 : 0.75,
      scale: quality === 'high' ? 2 : quality === 'medium' ? 1.5 : 1,
      transparent: format === 'png' ? transparent : false,
      allPages: format === 'pdf' ? allPages : false
    };

    onExport(options);
  };

  const getFileExtension = () => {
    return format.toUpperCase();
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}
        onClick={onClose}
      >
        <div 
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '480px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600 }}>
            Export Design
          </h2>

          {/* Format Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
              Format
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['png', 'jpg', 'pdf'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: format === fmt ? '2px solid #1A73E8' : '2px solid #e5e7eb',
                    background: format === fmt ? '#eef2ff' : 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: format === fmt ? '#1A73E8' : '#6b7280',
                    transition: 'all 0.15s'
                  }}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Selection */}
          {(format === 'jpg' || format === 'png') && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                Quality
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['low', 'medium', 'high'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: quality === q ? '2px solid #1A73E8' : '2px solid #e5e7eb',
                      background: quality === q ? '#eef2ff' : 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: quality === q ? '#1A73E8' : '#6b7280',
                      textTransform: 'capitalize'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Transparent Background (PNG only) */}
          {format === 'png' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={transparent}
                  onChange={(e) => setTransparent(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px' }}>Transparent background</span>
              </label>
            </div>
          )}

          {/* All Pages (PDF only) */}
          {format === 'pdf' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={allPages}
                  onChange={(e) => setAllPages(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px' }}>Export all pages</span>
              </label>
            </div>
          )}

          {/* File Name Preview */}
          <div style={{ 
            padding: '12px', 
            background: '#f9fafb', 
            borderRadius: '8px', 
            marginBottom: '20px',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            <strong>File name:</strong> {projectTitle || 'design'}.{format}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                border: '1px solid #e5e7eb',
                background: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: '#1A73E8',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Export {getFileExtension()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
