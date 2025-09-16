import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  onError,
  ...props
}) {

  const handleError = (e) => {
    console.log('AppImage - Image failed to load:', src);
    e.target.src = "/assets/images/no_image.png";
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}

export default Image;
