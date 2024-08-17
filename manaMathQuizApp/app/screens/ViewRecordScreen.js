import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

import { StackActions } from '@react-navigation/native';

import PBStats from '../components/PBStats';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function ViewRecordScreen( props ) {

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back Button Clciked")}>
        <FontAwesome5 style={styles.backIcon} name="backspace" size={32} color="#ffbb33" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>

      <View style={styles.viewRecord}>
        <Text style={styles.PBTitle}>Differentiation Record</Text>
        <View style={styles.pbStats}>
          <PBStats text='Score' imgSource ={require('../assets/integration.png')}/>
          <PBStats text='Date' imgSource ={require('../assets/differentiation.png')}/>
          <PBStats text='Time' imgSource ={require('../assets/complexNum.png')}/>
        </View>     
      </View>




      <View style={styles.statsBoard}>
        <View style={styles.text}>
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
        </View>
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

  statsBoard:{
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height:319,
    width:289,
    backgroundColor:'#395D89',
    borderRadius:20,
  },

  text:{
    margin:20,
  },

  line:{
    height:'100%',
    width:3,
    backgroundColor: '#FFF'
  }

});

export default ViewRecordScreen;