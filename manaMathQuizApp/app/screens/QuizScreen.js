import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

import { complexAlgebraData } from "../config/quizData";

import Quiz from "../components/QuizButton.js";

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function QuizScreen(props) {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFinishQuiz, setShowFinishQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0);

  const clickAnswer = (clickAnswer) => {
    const userClicked = clickAnswer
    console.log('user anw ' + userClicked)
    setSelectedAnswer(true)
    setUserAnswer(clickAnswer)
    console.log(userAnswer)
  }

  const handleAnswer = (confirmAnswer) => {
    const answer = complexAlgebraData[currentQuestion]?.answer;
    
    console.log('submit pressed ' + answer)
    if(answer === userAnswer){
      setScore((prevScore) => prevScore + 1);
      console.log('Current score: ' + score)
    }
    
    if (selectedAnswer) {
      const nextQuestion = currentQuestion + 1;
      if(nextQuestion < complexAlgebraData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowFinishQuiz(true);
      }
      setSelectedAnswer(false)
    }
    
  }

  return (
    
    <View style={styles.container}>

      {/* Header + Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back Button Clciked")}>
        <FontAwesome5 style={styles.backIcon} name="backspace" size={32} color="#ffbb33" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>

      

      {showFinishQuiz ? <View>
        <Text>You have finish the quiz</Text>
        <Text>Your score {score} /10</Text>
        
      </View> :
      <View style={styles.answerButtons}>
        {/* <Text>Questions</Text> */}
        {/* <Text style={styles.questionText}> {complexAlgebraData[currentQuestion]?.question} </Text> */}
        {/* Answer Options */}

        <View style={styles.statisticsPannel}>
          <View style={styles.statisticsPanelleft}>
            <Text style={styles.statisticsPannelText}>Question No. {currentQuestion+1}/10</Text>
            <Text style={styles.statisticsPannelText}>What is: </Text>
          </View>
          
          <View style={styles.statisticsPannelright}>
            <View style={styles.timer}>
              <Image style={{marginRight:5,paddingBottom:5}} source={require('../assets/clock.png')} />
              {/* <Ionicons name="timer-outline" size={16} color="black" /> */}
              <Text style={styles.statisticsPannelText}>00-00-00</Text>
            </View>
            <Text style={styles.statisticsPannelText}>{complexAlgebraData[currentQuestion]?.question} </Text>
          </View>
        </View>

        <View style={styles.answerButtons}>

        </View>
        {complexAlgebraData[currentQuestion]?.options.map((item, index) => {
            return <Quiz key={index} text={item} onPress={()=> clickAnswer(item)}/>
            // <TouchableOpacity onPress={()=> handleAnswer(item)}>
            //   <Text>{item}</Text>
            // </TouchableOpacity>
          })}
        
        <TouchableOpacity onPress={()=> handleAnswer()}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
                <FontAwesome5 name="arrow-circle-right" size={32} color="black" />
                <FontAwesome5 name="arrow-circle-right" size={32} color="black" />
            </View>
        </TouchableOpacity>
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

  statisticsPannel:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    width:329,
    height:112,
    backgroundColor:'#FFC700',
    borderRadius:20,
    marginBottom:10,
  },

  statisticsPannelleft:{
    flexDirection:'column',
    justifyContent:'space-around',
    // alignItems:'center',
    // marginLeft:20,
    marginRight:20,

  },
  timer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },

  statisticsPannelright:{
    flexDirection:'column',
    justifyContent:'space-around',
    // alignItems:'center',
    marginLeft:20,
    // marginRight:20,
  },

  statisticsPannelText:{
    color: 'black',
    fontWeight:'bold',
    fontSize:16,
    paddingTop:10,
    paddingBottom:10,
    // textAlign:'left',
  },



});

export default QuizScreen;