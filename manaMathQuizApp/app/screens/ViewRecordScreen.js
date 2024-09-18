import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { clearStorage } from '../utils/SaveScores';

import { StackActions } from '@react-navigation/native';

import PBStats from '../components/PBStats';

import colours from '../utils/colours';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function ViewRecordScreen( { navigation, route } ) {

  let saveScorePath = route.params.quizType
  let recordName = route.params.name

  const [userData, setUserData] = useState([]);
 
  

  // Function to retrieve data from AsyncStorage
  const getStoredData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(saveScorePath);
      const storedData = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Reverse the array to show the last item first (Shows the recent scores first)
      updateStoredData = storedData.reverse();
      
      setUserData(updateStoredData);
    } catch (e) {
      console.error('Failed to retrieve data from AsyncStorage:', e);
    }
  };
  
  useEffect(() => {
    getStoredData(); // Fetch data when the component mounts
  }, []);

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.column}>{item.date}</Text>
      <Text style={styles.column}>{item.score}</Text>
      <Text style={styles.column}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back Button Clciked")}>
        </TouchableOpacity>
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>

      <View style={styles.viewRecord}>
        <Text style={styles.PBTitle}>{recordName} Record</Text>
        <View style={styles.pbStats}>
          <PBStats text='Date' imgSource ={require('../assets/date.png')}/>
          <PBStats text='Score' imgSource ={require('../assets/score.png')}/>
          <PBStats text='Time' imgSource ={require('../assets/clock.png')}/>
        </View>     
      </View>




      <View style={styles.statsBoard}>
        {/* <View style={styles.text}>
          <Text>7/10</Text>
          <Text>7/10</Text>
          <Text>7/10</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.text}>
          <Text>07/2/20</Text>
          <Text>07/2/20</Text>
          <Text>07/2/20</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.text}>
          <Text>10-21-22</Text>
          <Text>10-21-02</Text>
        </View> */}
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.boardHeader}>
              <Text style={styles.column}>Date</Text>
              <Text style={styles.column}>Score</Text>
              <Text style={styles.column}>Time</Text>
          </View>
        }
      />
      </View>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header:{
    marginBottom:60,
  },
  backIcon:{
    alignSelf:'flex-start',
    paddingBottom:5,
  },
  headerText:{
    color: '#FFF',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'left',
  },

  viewRecord:{
    width:329,
    height:112,
    justifyContent: 'center',
    backgroundColor: colours.board,
    borderRadius:20,
    marginBottom:10,
    
  },
  PBTitle:{
    paddingLeft:20,
    fontWeight:'bold',
    fontSize:15,
    textAlign:'left',
  },
  pbStats:{
    flexDirection:'row',
    justifyContent:'space-around'
  },

  statsBoard:{
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height:319,
    width:289,
    backgroundColor: colours.secondary,
    borderRadius:20,
  },

  text:{
    margin:20,
  },

  line:{
    height:'100%',
    width:3,
    backgroundColor: '#FFF'
  },

  boardHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  column: {
    flex: 1,
    textAlign: 'center',
  },

});

export default ViewRecordScreen;