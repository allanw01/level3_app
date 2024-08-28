import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import ReviewAnswerBtn from '../components/ReviewAnswerButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { clearStorage } from '../components/SaveScores';

import { StackActions } from '@react-navigation/native';

import PBStats from '../components/PBStats';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function ReviewScreen( props ) {

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back Button Clciked")}>
        <FontAwesome5 style={styles.backIcon} name="backspace" size={32} color="#ffbb33" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>

      <View style={styles.reviewAnswers}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Review Answers</Text>
          <Text style={styles.title}>Question 1:</Text>
        </View>
        <Image style={styles.image} source={require("../assets/quickLinkIcons/review_answers.png")}/>
      </View>

      <View style={styles.board}>
        <Text style={styles.title}>Question:</Text>
        <Text style={styles.text}>PlaceHolder</Text>
        <Text style={styles.title}>Your Answer:</Text>
        <Text style={styles.text}>PlaceHolder</Text>
        <Text style={styles.title}>Correct Answer:</Text>
        <Text style={styles.text}>PlaceHolder</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <ReviewAnswerBtn text='Next' direction="rightcircle" onPress={() => console.log("Next Button Clciked")}/>
        <ReviewAnswerBtn text='Back' direction="leftcircle" onPress={() => console.log("Back Button Clciked")}/>
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
    marginBottom:10,
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

  reviewAnswers:{
    width:329,
    height:110,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor:'#FFC700',
    borderRadius:20,
    marginBottom:10,
    padding:40,
    
  },
  
  image:{
    flexDirection:'column',
    alignItems:'flex-start',
    height:40,
    width:40,
    // paddingRight:20,
  },

  title:{
    // paddingLeft:20,
    fontWeight:'bold',
    fontSize:15,
    textAlign:'left',
  },

  board:{
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height:280,
    width:289,
    backgroundColor:'#395D89',
    borderRadius:20,
    padding:20,
  },

  text:{
    textAlign:'left',
  },

});

export default ReviewScreen;