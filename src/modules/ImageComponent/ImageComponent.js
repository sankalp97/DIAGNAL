import React, { useState } from "react";

const Image = ({ src, alt, fallback }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleImageError = () => {
    setImgSrc(fallback); // Set the fallback image on error
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleImageError}
    />
  );
};

export default Image;