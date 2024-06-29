import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { complexAlgebraData } from "../config/quizData";

import Quiz from "../components/QuizButton.js";

import { FontAwesome5 } from '@expo/vector-icons';

function QuizScreen(props) {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFinishQuiz, setShowFinishQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(false);

  const clickAnswer = (clickAnswer) => {
    const userAnswer = clickAnswer
    console.log(userAnswer)
    setSelectedAnswer(true)
  }

  const handleAnswer = (confirmAnswer) => {
    const answer = complexAlgebraData[currentQuestion]?.answer;

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
      {showFinishQuiz ? <View>
        <Text>You have finish the quiz</Text>
      </View> :
      <View>
        <Text>Questions</Text>
        <Text style={styles.questionText}> {complexAlgebraData[currentQuestion]?.question} </Text>
        {/* Answer Options */}
        {complexAlgebraData[currentQuestion]?.options.map((item) => {
            return <Quiz text={item} onPress={()=> clickAnswer(item)}/>
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
});

export default QuizScreen;