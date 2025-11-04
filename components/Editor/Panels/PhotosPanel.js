import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addElement } from '../../../store/store';

export default function PhotosPanel() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample stock photos (placeholder URLs)
  const samplePhotos = [
    'https://images.unsplash.com/photo-1557683316-973673baf926',
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
    'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5',
    'https://images.unsplash.com/photo-1557682268-e3955ed5d83f',
    'https://images.unsplash.com/photo-1557682260-96773eb01377',
    'https://images.unsplash.com/photo-1557683311-eac922347aa1'
  ];

  const handlePhotoClick = (photoUrl) => {
    dispatch(addElement({
      type: 'image',
      src: photoUrl + '?w=400&h=300&fit=crop',
      size: { width: 300, height: 225 },
      styling: { borderRadius: '0px' }
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert('Photo search with Unsplash API coming soon! For now, click on sample photos below.');
  };

  return (
    <div className="photos-panel">
      {/* Search */}
      <form onSubmit={handleSearch} className="search-section">
        <input
          type="text"
          placeholder="Search photos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <circle cx="7" cy="7" r="5" strokeWidth="2"/>
            <path d="M11 11l4 4" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </form>

      {/* Upload Button */}
      <button className="upload-btn">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <path d="M10 14V6M10 6L6 10M10 6L14 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 17h14" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>Upload Image</span>
      </button>

      {/* Sample Photos */}
      <div className="section">
        <h4 className="section-title">Sample Photos</h4>
        <p className="section-description">Click to add to canvas</p>
        <div className="photos-grid">
          {samplePhotos.map((photo, index) => (
            <button
              key={index}
              className="photo-thumb"
              onClick={() => handlePhotoClick(photo)}
            >
              <img 
                src={photo + '?w=200&h=150&fit=crop'} 
                alt={`Sample ${index + 1}`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .photos-panel {
          padding: 0;
        }

        .search-section {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .search-input {
          flex: 1;
          padding: 10px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
          border-color: #1A73E8;
        }

        .search-btn {
          width: 44px;
          height: 44px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: all 0.15s;
        }

        .search-btn:hover {
          border-color: #1A73E8;
          color: #1A73E8;
          background: #f9fafb;
        }

        .upload-btn {
          width: 100%;
          padding: 12px 16px;
          border: 2px dashed #d1d5db;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.15s;
          margin-bottom: 24px;
        }

        .upload-btn:hover {
          border-color: #1A73E8;
          color: #1A73E8;
          background: #f9fafb;
        }

        .section {
          margin-bottom: 24px;
        }

        .section-title {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .section-description {
          margin: 0 0 12px 0;
          font-size: 12px;
          color: #6b7280;
        }

        .photos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .photo-thumb {
          width: 100%;
          aspect-ratio: 4/3;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.15s;
          padding: 0;
          background: #f3f4f6;
        }

        .photo-thumb:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-color: #1A73E8;
        }

        .photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
