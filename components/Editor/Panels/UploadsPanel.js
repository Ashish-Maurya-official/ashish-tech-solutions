export default function UploadsPanel() {
  return (
    <div className="uploads-panel">
      <div className="empty-state">
        <div className="empty-icon">📁</div>
        <h4>No uploads yet</h4>
        <p>Upload images to use them in your designs</p>
        <button className="upload-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M10 14V6M10 6L6 10M10 6L14 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 17h14" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Upload Files</span>
        </button>
      </div>

      <style jsx>{`
        .uploads-panel {
          padding: 0;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h4 {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .empty-state p {
          margin: 0 0 24px 0;
          font-size: 14px;
          color: #6b7280;
        }

        .upload-btn {
          padding: 12px 24px;
          border: 2px solid #1A73E8;
          background: #1A73E8;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.15s;
        }

        .upload-btn:hover {
          background: #1557b0;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
        }
      `}</style>
    </div>
  );
}
