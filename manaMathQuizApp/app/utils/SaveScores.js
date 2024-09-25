// Author: Allan Wu

//Importing the Async Storage module / library
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to handle everything: add score, update storage, and return the updated array
export const SaveUserData = async (score, time, path) => {
  try {
    // Get the current date in the format "d-m-y"
    const getCurrentDate = () => {
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      return date + '-' + month + '-' + year; // Format: d-m-y
    };

    const date = getCurrentDate(); // Calls the getCurrentDate function to get today's date.

    // Read existing scores from AsyncStorage
    const readScores = async () => {
      const jsonValue = await AsyncStorage.getItem(path);
      return jsonValue != null ? JSON.parse(jsonValue) : []; // Return an array of scores or an empty array
    };

    // Write scores to AsyncStorage
    const writeScores = async (newScores) => {
      const jsonValue = JSON.stringify(newScores);
      await AsyncStorage.setItem(path, jsonValue); // Store the scores array as a JSON string
    };

    // Add the new score to the array and return the updated array
    const existingScores = await readScores();
    const newScore = { score, date, time };
    existingScores.push(newScore); // Add the new score to the existing array
    await writeScores(existingScores); // Save the updated array back to AsyncStorage

    return existingScores; // Return the updated array of scores
  } catch (e) {
    console.error('Error handling scores:', e);
    return []; // Return an empty array if something goes wrong
  }
};

//Function to clear all stored data (this action cannot be undone)
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage has been cleared');
  } catch (e) {
    //Error message will be logged if it is unsucessful
    console.error('Failed to clear AsyncStorage:', e);
  }
};