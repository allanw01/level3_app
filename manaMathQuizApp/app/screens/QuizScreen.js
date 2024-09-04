import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';

import { StackActions } from '@react-navigation/native';

import { complexAlgebraData, integrationData, differentiationData } from "../config/quizData";

import Quiz from "../components/QuizButton.js";

import {SaveUserData} from '../components/SaveScores';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function QuizScreen( { navigation, route } ) {

  let quizData = route.params.quizData;
  let saveScorePath = route.params.quizType

  // Variables for running the quiz:
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFinishQuiz, setShowFinishQuiz] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  // const [saveUserScorePath, setSaveUserScorePath]= useState(saveScorePath)

  // Variables for the score Tracker:
  const [score, setScore] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);

  // Variables for the quiz timer:
  const [time, setTime] = useState(0); // State to keep track of the elapsed time in seconds
  const [timerIsRunning, setTimerIsRunning] = useState(true);  // State to determine if the stopwatch is running or not
  const timerRef = useRef(null); // Reference to store the interval ID for the timer

  // Quiz Timer:
  useEffect(() => {
    if (timerIsRunning) {
      // If the stopwatch is running, set an interval to update the time state every second
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!timerIsRunning && timerRef.current) {
      // If the stopwatch is not running, clear the interval
      clearInterval(timerRef.current);
    }
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerRef.current);
  }, [timerIsRunning]);

  const saveAndReturnScores = async () => {
    const userScore = score;
    const userTime = formatTime(time);
    const saveUserScorePath = saveScorePath
    console.log(saveUserScorePath)
    const updatedScores = await SaveUserData(userScore, userTime, saveUserScorePath);
    // console.log(updatedScores); // This will log the updated array of scores
  };


  // Before Navigating, makes sure the score state is updated properly
  useEffect(() => {
    if (shouldNavigate) {
      // SaveUserData(userScore = score, userTime = time, fil ='../userData/complex.txt')
      saveAndReturnScores()
      // Perform navigation after state update
      navigation.dispatch(
        StackActions.replace("Finish", { score: score , time: formatTime(time), quizType:saveScorePath})
      ); 
      setShouldNavigate(false); // Reset the navigation
    }
  }, [shouldNavigate, score, navigation]);


  // Handler for the start/stop button
  const handleStop = () => {
    setTimerIsRunning(false);
  };

  // Handler for the reset button
  const handleReset = () => {
    setTimerIsRunning(false);
    setTime(0);
  };

  // Function to format the time in HH:MM:SS format
  const formatTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // Running the Quiz (checking user answers)
  const handleAnswer = (selectedAnswer) => {
    const answer = quizData[currentQuestion]?.answer;
    const nextQuestion = currentQuestion + 1;


    // Saving User Answers so that it can be used for the Review Answer Screen
    const userQuestionAnswer = [quizData[currentQuestion]?.question, selectedAnswer, answer ];
    // console.log(userQuestionAnswer)

    userAnswers.push(userQuestionAnswer);
    setUserAnswers(userAnswers);
    // console.log(userAnswers);

    const writeScores = async (tempUserAnswers) => {
      const jsonValue = JSON.stringify(tempUserAnswers);
      await AsyncStorage.setItem('@reviewAnswers', jsonValue); // Store the scores array as a JSON string
    };
    
    // Checking the answers and switching questions or screens
    if(answer === selectedAnswer){
      // setScore((prevScore) => prevScore + 1);
      setScore(score+1);
      setCurrentQuestion(nextQuestion);
    }

    if(nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleStop()
      writeScores(userAnswers);
      setShouldNavigate(true);
    }
  }

  return (
    
    <View style={styles.container}>

      {/* Header + Back Button */}
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => console.log("Back Button Clciked")}>
        <FontAwesome5 style={styles.backIcon} name="backspace" size={32} color="#ffbb33" />
        </TouchableOpacity> */}
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>

      {showFinishQuiz ? <View>
        <Text>You have finish the quiz</Text>
        <Text>Your score {score} /2</Text>
        <Text>Your time is {formatTime(time)}</Text>
        
      </View> :
      <View style={styles.answerButtons}>
        {/* Statistics Pannel */}
        <View style={styles.statisticsPanel}>
          <View style={styles.statisticsPanelTop}>
            <Text style={styles.statisticsPanelText}>Question No. {currentQuestion+1}/10</Text>
            <View style={styles.timer}>
              <Image style={{marginRight:5,paddingBottom:5}} source={require('../assets/clock.png')} />
              <Text style={styles.statisticsPanelText}>{formatTime(time)}</Text>
            </View>
            {/* <Text style={styles.statisticsPannelText}>What is: </Text> */}
          </View>
          
          <View style={styles.statisticsPanelQuestion}>
            <Text style={styles.statisticsPanelText}>{quizData[currentQuestion]?.question} </Text>
          </View>
        </View>

        <View style={styles.answerButtons}>
        
        {/* Mutichoice Answer Buttons */}
        </View>
        {quizData[currentQuestion]?.options.map((item, index) => {
            return <Quiz key={index} text={item} onPress={()=> handleAnswer(item)}/>
          })}
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#172A41',
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

  answerButtons:{
    justifyContent:'center',
    alignItems:'center',
  },

  button:{
    flexDirection:'row',
    borderRadius:20,
    height: 60,
    width:289,
    backgroundColor:'#9DD93D',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    margin:5,
  },
  buttonText:{
    color: 'black',
    fontWeight:'bold',
    fontSize:15,
    textAlign:'left',
  },

  statisticsPanel:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    width:329,
    height:130,
    backgroundColor:'#FFC700',
    borderRadius:20,
    marginBottom:10,
  },

  statisticsPanelTop:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-evenly',
    alignItems:'center',
    // marginLeft:20,
    // marginRight:20,
    // paddingLeft:20,
    // paddingRight:20,
  },

  statisticsPanelQuestion:{
    width:'80%',
    // justifyContent:'flex-start',
    // alignItems:'center',
    // marginLeft:20,
    // marginRight:20,

  },

  timer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },

  

  statisticsPanelText:{
    color: 'black',
    fontWeight:'bold',
    fontSize:16,
    paddingTop:10,
    paddingBottom:10,
    textAlign:'left',
  },



});

export default QuizScreen;