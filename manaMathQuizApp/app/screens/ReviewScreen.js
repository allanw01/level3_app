import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

import ReviewAnswerBtn from '../components/ReviewAnswerButton';
import getStoredData from '../components/GrabStoredData';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { clearStorage } from '../components/SaveScores';

import { StackActions } from '@react-navigation/native';

import PBStats from '../components/PBStats';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function ReviewScreen( props ) {

  // const userAnswers = getStoredData('@reviewAnswers')
  // console.log('User Answer Grabbed (Review Sceen)', userAnswers)
  const [reviewQuizData, setReviewQuizData] =useState()
  const [questionNumber, setQuestionNumber] = useState(0)
  const [loading, setLoading] = useState(true);

  // const fetchdata = async () => {
  //   const userAnswers = await getStoredData('@reviewAnswers');
  //   setReviewQuizData(userAnswers)
  //   console.log('User Answer Grabbed (Review Sceen)', userAnswers);
  // };
  
  const fetchdata = async () => {
    try {
      const userAnswers = await getStoredData('@reviewAnswers');
      setReviewQuizData(userAnswers);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchdata();
  }, []);

  
  const handleNext = () => {
    const nextQuestion = questionNumber +1;

    if (nextQuestion < reviewQuizData.length) {
      setQuestionNumber(nextQuestion)
    } else {
      console.log('last question')
    }
  };
  const handleBack = () => {
    const nextQuestion = questionNumber -1;

    if (nextQuestion > -1) {
      setQuestionNumber(nextQuestion)
    } else {
      console.log('first question')
    }
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

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
          <Text style={styles.title}>Question No {questionNumber+1}.</Text>
        </View>
        <Image style={styles.image} source={require("../assets/quickLinkIcons/review_answers.png")}/>
      </View>

      <View style={styles.board}>
        <Text style={styles.title}>Question: </Text>
        <Text style={styles.text}>{reviewQuizData[questionNumber][0]}</Text>
        <Text style={styles.title}>Your Answer: </Text>
        <Text style={styles.text}>{reviewQuizData[questionNumber][1]}</Text>
        <Text style={styles.title}>Correct Answer:</Text>
        <Text style={styles.text}>{reviewQuizData[questionNumber][2]}</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <ReviewAnswerBtn text='Next' direction="rightcircle" onPress={()=>handleNext()}/>
        <ReviewAnswerBtn text='Back' direction="leftcircle" onPress={() => handleBack()}/>
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