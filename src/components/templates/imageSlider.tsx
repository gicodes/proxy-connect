import React, { useState, useEffect } from "react";

function ImageSlider() {
  // Create state variables for the index and image array
  const [index, setIndex] = useState(0);
  const images = [
    // commented out imageURL for image height variations
    "/ryder-gp-index.avif",
    // "/ryder-gp-live.avif",
    "/ryder-gp-services.webp",
    "ryder-gp-rating.jpeg",
    // "ryder-gp-pro.jpeg",
  ];

  // Use useEffect to increment the index and update the image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  // Render the current image
  return (
    <img
      className="mx-auto w-full w-auto"
      src={images[index]}
      alt={"ryder-gp image slider"}
    />
  );
}

export default ImageSlider;
