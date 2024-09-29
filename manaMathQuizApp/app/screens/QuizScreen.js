// Author: Allan Wu

// Importing React Native Components
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';

//Importing react native stack navigation from '@react-navigation'
import { StackActions } from '@react-navigation/native';

// Importing my components
import Quiz from "../components/QuizButton.js";
import AppHeader from '../components/AppHeader.js';

//importing my utils
import {SaveUserData} from '../utils/SaveScores';
import scaleFontSize from '../utils/ScaleFontSize.js';

//Importing my colours
import colours from '../utils/colours';

//Importing the Async Storage module / library
import AsyncStorage from '@react-native-async-storage/async-storage';

//Quiz Screen Function
function QuizScreen( { navigation, route } ) {

  //Retrieves the values that I pass in from the finish or home screen
  let quizData = route.params.quizData;
  let saveScorePath = route.params.quizType

  //Declearing my react states that I used in this function: 
  const [currentQuestion, setCurrentQuestion] = useState(0); //Determines the question to be display. Intially set to 0 for the first question
  const [shouldNavigate, setShouldNavigate] = useState(false); //This state is used to determine when its ready to switch to the finish screen after states are updated
  const [score, setScore] = useState(0); // This states tracks the user score

  const [userAnswers, setUserAnswers] = useState([]); //This states stores the current quiz questions / correct answers / user answers for the quiz so that it can be saved and use after the user finishes the quiz

  // React States for the quiz timer:
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

  //Function to save user scores so that it can view in the view record screen
  const saveAndReturnScores = async () => {
    const userScore = score;
    const userTime = formatTime(time);
    const saveUserScorePath = saveScorePath //Path Id where the score is saved depending what quiz the user is doing
    await SaveUserData(userScore, userTime, saveUserScorePath);
  };

  // Before Navigating, makes sure the score state is updated properly
  useEffect(() => {
    if (shouldNavigate) {
      saveAndReturnScores()
      // Perform navigation after state update
      navigation.dispatch(
        StackActions.replace("Finish", { score: score , time: formatTime(time), quizType:saveScorePath})
      ); 
      setShouldNavigate(false); // Reset the navigation
    }
  }, [shouldNavigate, score, navigation]);


  // Handler for the start/stop the timer
  const handleStop = () => {
    setTimerIsRunning(false);
  };

  // Function to format the time in HH:MM:SS format
  const formatTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // Running the Quiz ( fucntion for checking the user answers)
  const handleAnswer = (selectedAnswer) => {
    const answer = quizData[currentQuestion]?.answer; //Finds the correct answer for the current question
    const nextQuestion = currentQuestion + 1; // Determines the next question ID

    // Saving User Answers so that it can be used for the Review Answer Screen
    const userQuestionAnswer = [quizData[currentQuestion]?.question, selectedAnswer, answer ];
    
    //Storing the user's answers into the state
    userAnswers.push(userQuestionAnswer);
    setUserAnswers(userAnswers);

    //Function to save (write) the user answers for later use (stores: questions, user answers and correct answers)
    const writeScores = async (tempUserAnswers) => {
      const jsonValue = JSON.stringify(tempUserAnswers);
      await AsyncStorage.setItem('@reviewAnswers', jsonValue); // Store the scores array as a JSON string
    };
    
    // Checking the answers and switching questions or screens
    if(answer === selectedAnswer){
      setScore(score+1);
      setCurrentQuestion(nextQuestion); //Switches to next question is it is correct
    }

    if(nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion); //Switches to next question is it is incorrect
    } else {
      handleStop() //Stops the timer
      writeScores(userAnswers); //Saves the user's answers
      setShouldNavigate(true); //Allows for navigation
    }
  }

  return (  
    <View style={styles.container}>

      {/* App Header*/}
      <AppHeader/>

      <View style={styles.quizWrapper}>
        {/* Statistics Pannel (Yellow Board) */}
        <View style={styles.statisticsPanel}>
          <View style={styles.statisticsPanelTop}>
            <Text style={styles.statisticsPanelText}>Question No. {currentQuestion+1}/10</Text>
            {/* Timer for the quiz */}
            <View style={styles.timer}>
              <Image style={styles.timerImage} source={require('../assets/clock.png')} />
              <Text style={styles.statisticsPanelText}>{formatTime(time)}</Text>
            </View>
          </View>
          {/* Quiz Questions */}
          <View style={styles.statisticsPanelQuestion}>
            <Text style={styles.statisticsPanelText}>{quizData[currentQuestion]?.question} </Text>
          </View>
        </View>

        {/* Mutichoice Answer Buttons */}
        {quizData[currentQuestion]?.options.map((item, index) => {
            return <Quiz key={index} text={item} onPress={()=> handleAnswer(item)}/>
          })}
      </View>
      
    </View>
  );
}

//Styling the quiz screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.primary,
  },

  //Styling the layout of the quiz app (statistics panel and the answer buttons)
  quizWrapper:{
    justifyContent:'center',
    alignItems:'center',
  },

  //Styling for the statistics panel that contains: image+timer, question no and the question
  statisticsPanel:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    width:329, //Width of the panel
    height:130, //Height of the panel
    backgroundColor: colours.board,
    borderRadius:20,
    marginBottom:10,
  },

  //Styling the top row (question no. and timer)
  statisticsPanelTop:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-evenly',
    alignItems:'center',
  },

  //Styling the timer in the statistic panel
  timer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  //Styling of the image of the timer
  timerImage:{
    marginRight:5,
    paddingBottom:5,
  },

  //Styling the question in the statistic panel
  statisticsPanelQuestion:{
    width:'80%',
  },

  //Styles for the text found in the statisitc panel
  statisticsPanelText:{
    color: 'black',
    fontWeight:'bold',
    fontSize:scaleFontSize(18),
    paddingTop:10,
    paddingBottom:10,
    textAlign:'left',
  },
});

export default QuizScreen;