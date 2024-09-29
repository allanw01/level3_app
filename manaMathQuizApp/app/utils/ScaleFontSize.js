// Author: Allan Wu

//Importing React Native components
import {Dimensions, PixelRatio  } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width; // Get the dimensions of the device's window
const BASE_WIDTH = 375; // A base width to scale font sizes against

// Function to scale font size based on screen width and respect system font scaling
const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const scaledSize = size * scale;
  return Math.round(scaledSize / PixelRatio.getFontScale()); // Respect system font scaling
};

export default scaleFontSize;