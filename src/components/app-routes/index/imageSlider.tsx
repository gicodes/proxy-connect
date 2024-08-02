import React, { useState, useEffect } from "react";

function ImageSlider() {
  // Create state variables for the index and image array
  const [index, setIndex] = useState(0);
  const images = [
    // commented out imageURL for width, height or pixel variation
    // "/two-hands-touching-origin-unsplash-dest-proxyConnect.avif",
    "/connecting-to-beauty-src-unsplash-dest-proxy-connect.avif",
    "/passion-led-us-here-src-unsplash-dest-proxy-connect.avif",
    "/ryder-gp-index.avif",
    "/web-connect-abstract-src-unsplash-dest-proxy-connect.avif",
    // "/ryder-gp-services.webp",
    "/connect-platform-src-unsplash-dest-proxy-connect.avif",
    "/two-heavy-chains-connect-origin-unsplash-dest-proxyConnect.avif",
    "/ryder-gp-rating.jpeg",
  ];

  // Use useEffect to increment the index and update the image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Render the current image
  return (
    <div className="mx-auto md:h-96 lg:h-auto img-slider">
      <img
        className="img object-cover w-full h-full"
        src={images[index]}
        alt={images[index] ? `connect to services around you` : `index media unavailable`}
      />
    </div>
  );
}

export default ImageSlider;
