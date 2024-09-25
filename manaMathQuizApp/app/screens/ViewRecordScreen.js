// Author: Allan Wu

// Importing React Native Components
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

//Importing the Async Storage module / library
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importing my components
import PBStats from '../components/PBStats';
import AppHeader from '../components/AppHeader';

//Importing my colours
import colours from '../utils/colours';

//View Record Screen function
function ViewRecordScreen( { navigation, route } ) {

  //Retrieves the values that I pass in from the home or finish screen
  let saveScorePath = route.params.quizType
  let recordName = route.params.name

  //Declearing my react states that I used in this function 
  const [userData, setUserData] = useState([]); //State that stores the scores/dates/times of the user
 
  // Function to retrieve data from AsyncStorage
  const getStoredData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(saveScorePath);
      const storedData = jsonValue != null ? JSON.parse(jsonValue) : []; // Return an array or object (containing what is stored in the path ID) or an empty array

      // Reverse the array to show the last item first (Shows the recent scores first)
      updateStoredData = storedData.reverse();
      
      setUserData(updateStoredData);
    } catch (e) {
      console.error('Failed to retrieve data from AsyncStorage:', e); //Error message will be logged if it is unsucessful
    }
  };
  
  useEffect(() => {
    getStoredData(); // Fetch data when the component mounts
  }, []);

  // Function Render each item so that it can be displayed in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.text}>{item.date}</Text>
      <Text style={styles.text}>{item.score}</Text>
      <Text style={styles.text}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header for my app */}
      <AppHeader/>

      {/* View Record Screen header (yellow board/panel) */}
      <View style={styles.viewRecord}>
        <Text style={styles.PBTitle}>{recordName} Record</Text>
        {/* Date / Score/ Time Headers */}
        <View style={styles.pbStats}>
          <PBStats text='Date' imgSource ={require('../assets/date.png')}/>
          <PBStats text='Score' imgSource ={require('../assets/score.png')}/>
          <PBStats text='Time' imgSource ={require('../assets/clock.png')}/>
        </View>     
      </View>

      {/* View Record Screen content displays the user score /date/ time for each quiz they did in a react native flat list  */}
      <View style={styles.statsBoard}>
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.statsboardHeader}>
              <Text style={styles.text}>Date</Text>
              <Text style={styles.text}>Score</Text>
              <Text style={styles.text}>Time</Text>
          </View>
        }
      />
      </View>
  
    </View>
  );
}

//Styles for the view record screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Styles for the view record screen header
  viewRecord:{
    width:329, //width of the header
    height:112, //height of the header
    justifyContent: 'center',
    backgroundColor: colours.board,
    borderRadius:20,
    marginBottom:10,
    
  },
  //Styles for the title to tell user what record they are look at
  PBTitle:{
    paddingLeft:20,
    fontWeight:'bold',
    fontSize:15,
    textAlign:'left',
  },

  // styles for the Date / Score/ Time Headers 
  pbStats:{
    flexDirection:'row', //aligns the headers in a row
    justifyContent:'space-around'
  },

  //styles View Record Screen main content section (flat list)
  statsBoard:{
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height:319, //Height of the stats board
    width:289, //width of the stats board
    backgroundColor: colours.secondary,
    borderRadius:20,
  },

  //Styles for the header inside the stats board
  statsboardHeader: {
    flexDirection: 'row', //Makes the items align in a row
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  //Styles to for the data the user take 
  row: {
    flexDirection: 'row', //Makes the data for date / score/ time align in a row
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  //Styles to align the text in the stats board centre
  text: {
    flex: 1,
    textAlign: 'center',
  },

});

export default ViewRecordScreen;