import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { complexAlgebraData } from "../config/quizData";

function QuizScreen(props) {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFinishQuiz, setShowFinishQuiz] = useState(false)

  const handleAnswer = (selectedAnswer) => {
    const answer = complexAlgebraData[currentQuestion]?.answer;

    const nextQuestion = currentQuestion + 1;
    if(nextQuestion < complexAlgebraData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowFinishQuiz(true);
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
            return <TouchableOpacity onPress={()=> handleAnswer(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
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
  },
});

export default QuizScreen;