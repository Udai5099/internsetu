import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Upload, FileText, Trash2 } from "lucide-react";

// A helper function to format file sizes nicely
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Initial data, now with size in bytes for accurate formatting
const initialDocuments = [
  { name: "Resume.pdf", size: 2202010, uploaded: "2023-04-10" },
  { name: "Certificates.zip", size: 5976883, uploaded: "2023-03-22" },
  { name: "ID Proof.jpg", size: 512000, uploaded: "2023-02-15" },
];

export default function StudentDocuments() {
  const [documents, setDocuments] = useState(initialDocuments);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newDocument = {
      name: file.name,
      size: file.size,
      uploaded: new Date().toISOString().split('T')[0],
    };

    setDocuments([newDocument, ...documents]);
  };

  const handleDelete = (docNameToDelete: string) => {
    setDocuments(documents.filter(doc => doc.name !== docNameToDelete));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Documents</h1>
          <button
            onClick={handleUploadClick}
            className="btn bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
          >
            <Upload size={16} /> Upload New
          </button>
          {/* This is the actual file input, but it's hidden from view */}
          <input
            type="file"
            ref={fileInputRef}
            // --- FIX: Corrected the function name here ---
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        
        <div className="mt-8 space-y-4">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <FileText size={24} className="text-gray-500" />
                  <div>
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-sm text-gray-500">{formatBytes(doc.size)} - Uploaded on {doc.uploaded}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.name)}
                  className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">You have not uploaded any documents yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

