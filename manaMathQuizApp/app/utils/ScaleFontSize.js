// Author: Allan Wu

// Importing React Native Components
import { PixelRatio, Dimensions} from 'react-native';

// Get the dimensions of the device's window
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define a base width and height to scale against
const BASE_WIDTH = 375;  
const BASE_HEIGHT = 812; 

// Minimum and maximum scaling limits
const MIN_SCALE = 0.85;  // Prevent font from becoming too small
const MAX_SCALE = 1;  // Prevent font from becoming too large

// Function to scale font size based on screen width, height, and respect system font scaling
const scaleFontSize = (size) => {
  // Calculate scaling factor using both width and height
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
  
  // Average the scale for a more balanced result on the user devices.
  const scale = (scaleWidth + scaleHeight) / 2;

  // Clamp the scale between minimum and maximum to avoid extreme scaling
  const adjustedScale = Math.min(Math.max(scale, MIN_SCALE), MAX_SCALE);

  // Scale the provided font size and adjust for system font scaling
  const scaledSize = size * adjustedScale;

  // Respect the user's system font scale
  return Math.round(scaledSize / PixelRatio.getFontScale());
};

export default scaleFontSize;