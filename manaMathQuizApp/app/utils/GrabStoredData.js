import AsyncStorage from '@react-native-async-storage/async-storage';

const getStoredData = async (pathID) => {
  try {
    const jsonValue = await AsyncStorage.getItem(pathID);
    const storedData = jsonValue != null ? JSON.parse(jsonValue) : [];
    
    console.log('grabbing user data (from GrabStoredData.js)' ,storedData)
    return storedData;

  } catch (e) {
    console.error('Failed to retrieve data from AsyncStorage:', e);
  }
};

export default getStoredData;