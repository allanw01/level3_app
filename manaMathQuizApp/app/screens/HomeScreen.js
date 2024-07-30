import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

import HomeBtn from "../components/HomeButton";
import PBStats from "../components/PBStats";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen( { navigation } ) {

  return (
    <View style={styles.container}>
      
      {/* Header + Settings Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Settings Clciked")}>
          <Ionicons style={styles.settingIcon} name="settings-outline" size={32} color="#FFC66C" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>
    
      {/* View Record Pannel */}
      <View style={styles.viewRecord}>
        <Text style={styles.PBTitle}>Personal Best(100%)</Text>
        <View style={styles.pbStats}>
          <PBStats time='00:00:00' imgSource ={require('../assets/integration.png')}/>
          <PBStats time='00:00:00' imgSource ={require('../assets/differentiation.png')}/>
          <PBStats time='00:00:00' imgSource ={require('../assets/complexNum.png')}/>
        </View>
        <TouchableOpacity onPress={() => console.log("View Record Clicked")}>
          <View style={styles.viewRecordBtn}>
            <Text style={styles.viewRecordText}>View Record</Text>
            <FontAwesome6 style={styles.viewRecordIcon} name="arrow-right-to-bracket" size={32} color="black" />
            <FontAwesome6 style={styles.viewRecordIcon} name="arrow-right-to-bracket" size={32} color="black" />
          </View>
        </TouchableOpacity>      
      </View>

      {/* Home Screen Navigation Buttons */}
      <View style={styles.homeBtn}>
        <HomeBtn onPress={() => console.log("Practice")} text='Practice' imgSource ={require('../assets/practice.png')}/>
        <HomeBtn onPress={() => console.log("integration")} text='Integration' imgSource ={require('../assets/integration.png')}/>
        <HomeBtn onPress={() => console.log("Differentiation")} text='Differentiation' imgSource ={require('../assets/differentiation.png')}/>
        <HomeBtn onPress={() => navigation.navigate("Quiz")} text='Complex Numbers' imgSource ={require('../assets/complexNum.png')}/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172A41',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header:{
    marginBottom:60,
  },
  settingIcon:{
    alignSelf:'flex-end',
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
    height:166,
    justifyContent: 'center',
    backgroundColor:'#FFC700',
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
  viewRecordBtn:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    padding:10,
  },
  viewRecordText:{
    fontWeight:'bold',
    fontSize:13,
    textAlign:'left',
    paddingRight:10,
  },
  viewRecordIcon:{
    paddingRight:10,
  },
  homeBtn:{
    
  },
});

export default HomeScreen;