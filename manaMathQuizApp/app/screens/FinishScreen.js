// Author: Allan Wu

// Importing React Native Components
import React from 'react';
import { StyleSheet, Text, View,  Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

//Importing my colours
import colours from '../utils/colours';

// Importing my components
import QuickLinkButtons from '../components/QuickLinkButton';
import AppHeader from '../components/AppHeader';

//importing my utils
import getStoredData from '../utils/GrabStoredData';
import {createAndSharePDF} from '../utils/ExportResults';
import getRandomQuestions from '../utils/GetRandomQuestions'; //Imports the function that gets a random set of questions for the user to answer in the quiz screen
import scaleFontSize from '../utils/ScaleFontSize';

//importing my dataset for the play again button
import { complexAlgebraData, integrationData, differentiationData } from "../utils/quizData";

//Importing my expo icons
import { Ionicons } from '@expo/vector-icons';

//Finish screen function
function FinishScreen( { navigation, route } ) {

  //Declearing my react states that I used in this function 
  const [loading, setLoading] = useState(true); //This state makes sure the data is loaded
  const [exportData, setExportData] =useState([]) //This state stores the export data
  const [quizData, setQuizData]=useState([]) //This state stores the data for the type of quiz the user just completed
  const [viewRecordName, setViewRecordName] = useState() // This state stores the string of name of the quiz for the view record screen
  
  //Retrieves the values that I pass in from the quiz screen
  let score = route.params.score;
  let time = route.params.time;
  let saveScorePath = route.params.quizType

  //Function that fetches data from the async storage containing the user's question and answers and correct answers
  const fetchdata = async () => {
    try {
      const userAnswers = await getStoredData('@reviewAnswers');
      setExportData(userAnswers); //Setting the exportData state to the user' questions and answers and correct answers.
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

  //Figures out what the quiz the user just completed and stores it in the state decleared and described above in the background
  useEffect(()=>{
    if (saveScorePath == '@intergrationScores') {
      setQuizData(integrationData)
      setViewRecordName('Intergration')
    } else if (saveScorePath == '@complexScores') {
      setQuizData(complexAlgebraData)
      setViewRecordName('Complex Numbers')
    } else {
      setQuizData(differentiationData)
      setViewRecordName('Differentiation')
    }
  },[]);
  
  //Fiunction to generate pdf when the export or share button is pressed
  const handleGeneratePDF = () => {
    createAndSharePDF(exportData, score, time);
  };

  //Function that handles the play again button when pressed
  const handlePlayAgain =() => {
    //Calls the getRandomQuestion function to get new set of questions
    const quizQuestions=getRandomQuestions(quizData,10)
    
    //Navigates the screen back to the quiz screen with the new set of questions and the path to save the user score to
    navigation.navigate("Quiz", { quizData: quizQuestions, quizType:saveScorePath})
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

      {/* Header for my app */}
      <AppHeader/>

    {/* Podium style tropy icon */}
    <Ionicons name="trophy-sharp" size={128} color="#FED843" />

      {/* Wrapper for the bottom half of the finsh screen */}
      <View style={styles.wrapper}>
         {/* The statistics Panel (Yellow Board) of the finish screen */}
        <View style={styles.statisticsPanel}>
          {/* User's time section */}
          <View style={styles.statisticsPanelTimer}>
            <Image style={styles.image} source={require('../assets/clock.png')} />
            <Text style={styles.statisticsPanelText}>Time: {time}</Text>
          </View>
          {/* User's Score section */}
          <View style={styles.statisticsPanelScore}>
            <Image style={styles.image} source={require('../assets/score.png')} />
            <Text style={styles.statisticsPanelText}>Final Score: {score}</Text>
          </View>
        </View>

        {/* Quick Links (actions/ buttons) Section of the finish screen */}
        {/* Play again and View Record buttons */}
        <View style={styles.quickLinks}>
          <View style={styles.quickLinksColumn}>
            <QuickLinkButtons text='Play Again' imgSource ={require('../assets/quickLinkIcons/play_again.png')} onPress={() => handlePlayAgain()}/>
            <QuickLinkButtons text='View Record' imgSource ={require('../assets/quickLinkIcons/view_record.png')} onPress={() => navigation.navigate("View Record",{quizType:saveScorePath,name:viewRecordName})}/>
          </View>
          {/* Home and Export buttons */}
          <View style={styles.quickLinksColumn}>
            <QuickLinkButtons text='   Home    ' imgSource ={require('../assets/quickLinkIcons/home.png')} onPress={() => navigation.navigate("Home")}/>
            <QuickLinkButtons text='Export' imgSource ={require('../assets/quickLinkIcons/export.png')} onPress={()=>handleGeneratePDF()} />
          </View>
          {/* Reiview answers and share butttons */}
          <View style={styles.quickLinksColumn}>
            <QuickLinkButtons text='Review' imgSource ={require('../assets/quickLinkIcons/review_answers.png')} onPress={() => navigation.navigate("Review Answers")}/>
            <QuickLinkButtons text='   Share   ' imgSource ={require('../assets/quickLinkIcons/share.png')} onPress={()=>handleGeneratePDF()}/>
          </View>
        </View>
      </View>
      
    </View>
  );
}

//Styles for the finish screen
const styles = StyleSheet.create({
  //Generic styling for the container of the finish screen
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Styling for the main content of the finish screen
  wrapper:{
    backgroundColor: colours.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Styling of the statisitics panel
  statisticsPanel:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    width:329, //Width of the statisitcs panel
    height:112, //Height of the statisitcs panel
    backgroundColor:colours.board, // Makes the panel yellow
    borderRadius:20,
    zIndex:1, //Brings the statitics Panel fowards on top of the quick links panel
  },
  //Styling of the images in the statistics panel
  image:{
    marginRight:5,
    paddingBottom:5,
  },
  //Styling of the statistics panel user score
  statisticsPanelScore:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  //Styling of the statistics panel user time for the quiz
  statisticsPanelTimer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  statisticsPanelText:{ // Styling of the statisitc panel text
    color: 'black',
    fontWeight:'bold',
    fontSize:scaleFontSize(18),
    paddingTop:10,
    paddingBottom:10,
  },

  // Stylings for the quick link section of the finish screen
  quickLinks:{
    width:270, //Width of the quick link section
    height:210, //Height of the quick link section
    backgroundColor: colours.secondary,
    borderRadius:20,
    marginTop:-20,
    flexDirection:'row', //Aligns my three coloumns in a row
    justifyContent:'space-around',
    alignItems:'center',
  },

  // Makes the buttons align in a column. (I have 3 columns in total, each containing 2 buttons. Each coloumn is align in a row)
  quickLinksColumn:{
    flexDirection:'column',
  },

});

export default FinishScreen;