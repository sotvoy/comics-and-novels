'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface UploadFile {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

interface UploadProgressProps {
  maxFiles?: number;
  acceptedTypes?: string[];
  maxFileSize?: number; // in MB
  onUploadComplete?: (urls: string[]) => void;
}

export default function UploadProgress({
  maxFiles = 20,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSize = 10,
  onUploadComplete,
}: UploadProgressProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate preview URL for images
  const generatePreview = (file: File): string | undefined => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  // Add files to queue
  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    
    const validFiles = fileArray.filter(file => {
      // Check file type
      if (!acceptedTypes.includes(file.type)) {
        return false;
      }
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        return false;
      }
      return true;
    });

    const newUploadFiles: UploadFile[] = validFiles.slice(0, maxFiles - files.length).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: generatePreview(file),
      progress: 0,
      status: 'pending',
    }));

    setFiles(prev => [...prev, ...newUploadFiles].slice(0, maxFiles));
  }, [files.length, maxFiles, acceptedTypes, maxFileSize]);

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  // Remove file from queue
  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  // Simulate upload (replace with real API)
  const simulateUpload = async (file: UploadFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Update file progress
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress: 100, status: 'completed' as const } : f
          ));
          
          // Return mock URL
          resolve(`https://picsum.photos/seed/${file.id}/800/1200`);
        } else {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress } : f
          ));
        }
      }, 200);
    });
  };

  // Upload all files
  const uploadFiles = async () => {
    setIsUploading(true);
    
    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');
    
    // Update status to uploading
    setFiles(prev => prev.map(f => ({
      ...f,
      status: 'uploading' as const,
    })));

    const uploadedUrls: string[] = [];
    
    for (const file of pendingFiles) {
      try {
        const url = await simulateUpload(file);
        uploadedUrls.push(url);
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'error' as const, error: 'Upload failed' } : f
        ));
      }
    }

    setIsUploading(false);
    onUploadComplete?.(uploadedUrls);
  };

  // Clear completed files
  const clearCompleted = () => {
    setFiles(prev => {
      prev.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      return prev.filter(f => f.status !== 'completed');
    });
  };

  // Clear all files
  const clearAll = () => {
    files.forEach(f => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const pendingCount = files.filter(f => f.status === 'pending').length;
  const uploadingCount = files.filter(f => f.status === 'uploading').length;
  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-red-500 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
        <Icons.Plus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="font-medium">
          Drag and drop images here, or click to select
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Max {maxFiles} files, up to {maxFileSize}MB each
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Supported: JPEG, PNG, WebP, GIF
        </p>
      </div>

      {/* File Queue */}
      {files.length > 0 && (
        <div className="space-y-3">
          {/* Queue Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">{files.length} files</span>
              {pendingCount > 0 && (
                <span className="text-sm text-gray-500">{pendingCount} pending</span>
              )}
              {completedCount > 0 && (
                <span className="text-sm text-green-500">{completedCount} uploaded</span>
              )}
            </div>
            <div className="flex gap-2">
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear completed
                </button>
              )}
              <button
                onClick={clearAll}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* File List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  {/* Preview */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icons.Folder className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file.file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.file.size)}</p>
                    
                    {/* Progress Bar */}
                    {file.status !== 'completed' && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            className={`h-full rounded-full ${
                              file.status === 'error' ? 'bg-red-500' : 'bg-red-500'
                            }`}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {file.status === 'uploading' ? `${Math.round(file.progress)}%` : 
                           file.status === 'error' ? file.error : 'Waiting...'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {file.status === 'completed' && (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Icons.Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {file.status === 'error' && (
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                        <Icons.Close className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {file.status === 'pending' && (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                      >
                        <Icons.Close className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                    {file.status === 'uploading' && (
                      <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Upload Button */}
          {pendingCount > 0 && (
            <button
              onClick={uploadFiles}
              disabled={isUploading}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isUploading
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading {uploadingCount} files...
                </span>
              ) : (
                `Upload ${pendingCount} file${pendingCount > 1 ? 's' : ''}`
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
