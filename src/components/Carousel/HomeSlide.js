import React, { useState, useEffect } from "react";
import styles from "./HomeSlide.module.css";

const images = [
  "/ss1.svg",
  "/ss2.svg",
  "/ss3.svg",
  // Add more image paths as needed
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className={styles.carousel}>
      <div className={styles.imageContainer}>
        <img src={images[index]} alt={`Slide ${index + 1}`} className={styles.image} />
      </div>
    </div>
  );
};

export default Carousel;
