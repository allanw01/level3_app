// Author: Allan Wu

// Importing React Native Components
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

// Importing my components
import ReviewAnswerBtn from '../components/ReviewAnswerButton';
import AppHeader from '../components/AppHeader';

//importing my utils
import getStoredData from '../utils/GrabStoredData';

//Importing my colours
import colours from '../utils/colours';

//Function for my Review Answer Screen
function ReviewScreen( props ) {

  //Declearing my react states that I used in this function 
  const [reviewQuizData, setReviewQuizData] =useState() //This state contains arrays which store the question, user answer, and correct answer data
  const [questionNumber, setQuestionNumber] = useState(0) //This states tells the app which question to display
  const [loading, setLoading] = useState(true); //This state makes sure the data is loaded
  
  //Function that fetches data from the async storage containing the user's question and answers and correct answers
  const fetchdata = async () => {
    try {
      const userAnswers = await getStoredData('@reviewAnswers');
      setReviewQuizData(userAnswers); //Setting the exportData state to the user' questions and answers and correct answers.
    } catch (error) {
      //Logs the error if something fail when executing this function
      console.error('Failed to fetch data:', error);
    } finally {
      //Tells the app the data has been fetch successfully.
      setLoading(false);
    }
  };
  
  //Runs the fetchdata function while loading the rest of the application (in the background)
  useEffect(() => {
    fetchdata();
  }, []);

  //Function that is called when the next button is pressed
  const handleNext = () => {
    const nextQuestion = questionNumber +1; //Sets next question to be display

    // Checks whether the next question number is greater than the total number of questions
    if (nextQuestion < reviewQuizData.length) {
      setQuestionNumber(nextQuestion) // If the next question is not greater than the total number of questions, then display next question
    } else {
      // Sets the question to the first one once is reaches the last question
      setQuestionNumber(0)
    }
  };

  //Function that is called when the back button is pressed
  const handleBack = () => {
    const nextQuestion = questionNumber -1; //Sets the previous question to be display

    if (nextQuestion > -1) {
      setQuestionNumber(nextQuestion)
    } else {
      //If the question displayed is the first question then display last question
      setQuestionNumber(9)
    }
  };

  if (loading) { //Displays a simple loading to screen when it retrives the user data via async so the app does not crash
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* App Header */}
      <AppHeader/>

      {/* Review Answer Screen header containing the question number etc */}
      <View style={styles.reviewAnswers}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Review Answers</Text>
          <Text style={styles.title}>Question No {questionNumber+1}.</Text>
        </View>
        <Image style={styles.image} source={require("../assets/quickLinkIcons/review_answers.png")}/>
      </View>

      {/* Review Answer content section that displays the questions and user answers, correct answers */}
      {/* reviewQuizData is an array that contains arrays which contains the data for each question */}
      <View style={styles.board}>
        <Text style={styles.title}>Question: </Text>
        <Text style={styles.text}>{reviewQuizData[questionNumber][0]}</Text>
        <Text style={styles.title}>Your Answer: </Text>
        <Text style={styles.text}>{reviewQuizData[questionNumber][1]}</Text>
        <Text style={styles.title}>Correct Answer:</Text>
        <Text style={styles.text}>{reviewQuizData[questionNumber][2]}</Text>
      </View>

      {/* Next and Back button for navigating between the different questions */}
      <View style={styles.buttonWrapper}>
        <ReviewAnswerBtn text='Next' direction="rightcircle" onPress={()=>handleNext()}/>
        <ReviewAnswerBtn text='Back' direction="leftcircle" onPress={() => handleBack()}/>
      </View>

    </View>
  );
}

//Styles for the Review Answer Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Styles for the review Answer screen header section (yellow board)
  reviewAnswers:{
    width:305, //width of the header section
    height:105, //height of the header section
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor:colours.board,
    borderRadius:20,
    marginBottom:10,
    padding:40,
    
  },
  
  //styling for the header
  image:{
    flexDirection:'column',
    alignItems:'flex-start',
    height:40,
    width:40,
  },

  //Styling for the title in the header
  title:{
    fontWeight:'bold',
    fontSize:17,
    textAlign:'left',
  },

  //Styling for the review answer content
  board:{
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height:280,
    width:289,
    backgroundColor:colours.secondary,
    borderRadius:20,
    padding:20,
  },
  //Styling for the review answer content text
  text:{
    textAlign:'left',
    fontSize:15,
  },

});

export default ReviewScreen;