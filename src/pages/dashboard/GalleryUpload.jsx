import { useState } from 'react';
import Button from '../../components/UI/Button';
import React from 'react';
const GalleryUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    // Upload files to API
  };

  return (
    <div className="gallery-upload-page">
      <h1>Upload Photos</h1>
      <input type="file" multiple onChange={handleFileSelect} />
      <div className="file-preview">
        {selectedFiles.map((file, idx) => (
          <div key={idx}>{file.name}</div>
        ))}
      </div>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default GalleryUpload;
