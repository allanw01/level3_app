// Author: Allan Wu

//Importing the Async Storage module / library
import AsyncStorage from '@react-native-async-storage/async-storage';

//Function that gets stored data ('@reviewAnswers' which is the data for the review answer screen and the export pdf data) from the async storage.
const getStoredData = async (pathID) => {
  //Gets the json value and converts it into readable format for my code
  try {
    const jsonValue = await AsyncStorage.getItem(pathID); 
    const storedData = jsonValue != null ? JSON.parse(jsonValue) : []; // Return an array or object (containing what is stored in the path ID) or an empty array

    return storedData;
    
  //Error message will be logged if it is unsucessful
  } catch (e) {
    console.error('Failed to retrieve data from AsyncStorage:', e);
  }
};

export default getStoredData;