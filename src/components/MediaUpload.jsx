import React, { useState, useRef, useCallback } from 'react';
import Button from './ui/Button';
import Icon from './AppIcon';

const MediaUpload = ({ 
  onFilesChange, 
  maxFiles = 10, 
  acceptedTypes = 'image/*,video/*',
  maxSize = 50 * 1024 * 1024, // 50MB
  existingMedia = [],
  onRemoveMedia,
  onUpdateMedia,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFiles = useCallback((files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    fileArray.forEach((file, index) => {
      // Check file size
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`);
        return;
      }

      // Check file type
      const fileType = file.type;
      const isImage = fileType.startsWith('image/');
      const isVideo = fileType.startsWith('video/');
      
      if (!isImage && !isVideo) {
        errors.push(`${file.name} is not a supported file type`);
        return;
      }

      // Check if we haven't exceeded max files
      if (existingMedia.length + validFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      validFiles.push({
        id: `temp-${Date.now()}-${index}`,
        file,
        name: file.name,
        size: file.size,
        type: fileType,
        url: URL.createObjectURL(file),
        isUploading: false // Set to false initially
      });
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      // Immediately add files without simulation
      onFilesChange(validFiles);
    }
  }, [maxFiles, maxSize, existingMedia.length, onFilesChange]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const handleRemoveMedia = (mediaId) => {
    if (onRemoveMedia) {
      onRemoveMedia(mediaId);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.startsWith('video/')) return 'Video';
    return 'File';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-accent bg-accent/5'
            : 'border-border hover:border-accent/50 hover:bg-muted/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} className="text-muted-foreground" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload Photos & Videos
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports images and videos up to {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || existingMedia.length >= maxFiles}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Choose Files
          </Button>
        </div>
      </div>

      {/* Media Grid */}
      {existingMedia.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Media ({existingMedia.length}/{maxFiles})
            </h4>
            {existingMedia.length >= maxFiles && (
              <span className="text-xs text-muted-foreground">
                Maximum files reached
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingMedia.map((media) => (
              <div key={media.id} className="relative group">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  {media.type?.startsWith('image/') ? (
                    <img
                      src={media.url || media.thumbnail}
                      alt={media.name}
                      className="w-full h-full object-cover"
                    />
                  ) : media.type?.startsWith('video/') ? (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <video
                        src={media.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Play" size={24} className="text-white drop-shadow-lg" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name={getFileIcon(media.type)} size={32} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                
                {/* Upload Progress */}
                {media.isUploading && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                
                {/* File Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2 rounded-b-lg">
                  <p className="text-xs font-medium text-foreground truncate">
                    {media.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(media.size)}
                  </p>
                </div>
                
                {/* Alt Text Input */}
                <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2">
                  <div className="h-full flex flex-col justify-center">
                    <label className="text-xs font-medium text-foreground mb-1">
                      Alt Text (SEO)
                    </label>
                    <input
                      type="text"
                      value={media.altText || ''}
                      onChange={(e) => onUpdateMedia && onUpdateMedia(media.id, { altText: e.target.value })}
                      placeholder="Describe this image for SEO..."
                      className="w-full text-xs bg-background border border-border rounded px-2 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
                
                {/* Remove Button */}
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-background/90 hover:bg-destructive hover:text-destructive-foreground border-2 border-background/50 hover:border-destructive"
                  onClick={() => handleRemoveMedia(media.id)}
                >
                  <Icon name="X" size={14} />
                </Button>
                
                {/* Progress Bar */}
                {media.isUploading && uploadProgress[media.id] !== undefined && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-lg overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${uploadProgress[media.id]}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
