import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

// Import each image individually
import img1 from '../../assets/elements/1.png';
import img2 from '../../assets/elements/2.png';
import img3 from '../../assets/elements/3.png';
import img4 from '../../assets/elements/4.png';
import img5 from '../../assets/elements/5.png';
import img6 from '../../assets/elements/6.png';
import img7 from '../../assets/elements/7.png';
import img8 from '../../assets/elements/8.png';
import img9 from '../../assets/elements/9.png';
import img10 from '../../assets/elements/10.png';
import img11 from '../../assets/elements/11.png';
import img12 from '../../assets/elements/12.png';
import img13 from '../../assets/elements/13.png';
import img14 from '../../assets/elements/14.png';
import img15 from '../../assets/elements/15.png';
import img16 from '../../assets/elements/16.png';
import img17 from '../../assets/elements/17.png';
import img18 from '../../assets/elements/18.png';
import img19 from '../../assets/elements/19.png';
import img20 from '../../assets/elements/20.png';
import img21 from '../../assets/elements/21.png';
import img22 from '../../assets/elements/22.png';
import img23 from '../../assets/elements/23.png';
import img24 from '../../assets/elements/24.png';
import img25 from '../../assets/elements/25.png';
import img26 from '../../assets/elements/26.png';
import img27 from '../../assets/elements/27.png';
import img28 from '../../assets/elements/28.png';

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19,
  img20, img21, img22, img23, img24, img25, img26, img27, img28
];

// Function to get a random subset of images
const getRandomImages = (count) => {
  const shuffled = images.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to calculate non-overlapping positions outside the center
const getNonOverlappingPosition = (existingPositions, imgSize) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const centerArea = {
    top: screenHeight * 0.33,
    bottom: screenHeight * 0.66,
    left: screenWidth * 0.33,
    right: screenWidth * 0.66,
  };
  let position;
  let tries = 0;
  const maxTries = 50;

  do {
    position = {
      top: Math.random() * (screenHeight - imgSize),
      left: Math.random() * (screenWidth - imgSize),
    };

    tries++;
  } while (
    tries < maxTries &&
    (
      // Check overlap with center area
      (position.top + imgSize > centerArea.top &&
       position.top < centerArea.bottom &&
       position.left + imgSize > centerArea.left &&
       position.left < centerArea.right) ||
      // Check overlap with existing positions
      existingPositions.some(
        (pos) =>
          Math.abs(pos.top - position.top) < imgSize &&
          Math.abs(pos.left - position.left) < imgSize
      )
    )
  );

  existingPositions.push(position);
  return position;
};

const ArtBackground = ({ children }) => {
  const [backgroundImages, setBackgroundImages] = useState([]);
  const minSize = 50; // Minimum size of images
  const maxSize = 150; // Maximum size of images
  const screenWidth = Dimensions.get('window').width;
  
  // Determine the number of images based on screen width
  const numberOfImages = screenWidth >= 768 ? 6 : 3; // 6 for desktop, 3 for mobile

  useEffect(() => {
    const selectedImages = getRandomImages(numberOfImages); // Adjusted based on screen size
    const positions = [];
    const imagesWithPositions = selectedImages.map((image) => {
      // Random size for each image
      const imgSize = Math.random() * (maxSize - minSize) + minSize;
      return {
        image,
        position: getNonOverlappingPosition(positions, imgSize),
        size: imgSize,
      };
    });
    setBackgroundImages(imagesWithPositions);
  }, [numberOfImages]); // Add numberOfImages as a dependency

  return (
    <View style={styles.container}>
      {backgroundImages.map((bgImage, index) => (
        <Image
          key={index}
          source={bgImage.image}
          style={[
            styles.backgroundImage,
            {
              top: bgImage.position.top,
              left: bgImage.position.left,
              width: bgImage.size, // Use random width
              height: bgImage.size, // Use random height
              transform: [{ rotate: `${Math.random() * 360}deg` }],
            },
          ]}
          resizeMode="contain"
        />
      ))}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    opacity: 0.6,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
});

export default ArtBackground;
