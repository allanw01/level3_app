import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

import { StackActions } from '@react-navigation/native';


import QuickLinkButtons from '../components/QuickLinkButton';
import getStoredData from '../components/GrabStoredData';
import {createAndSharePDF} from '../components/ExportResults';

import { complexAlgebraData, integrationData, differentiationData } from "../config/quizData";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function FinishScreen( { navigation, route } ) {

  const [loading, setLoading] = useState(true);
  const [exportData, setExportData] =useState([])
  const [quizData, setQuizData]=useState([])
  const [viewRecordName, setViewRecordName] = useState()
  
  let score = route.params.score;
  let time = route.params.time;
  let saveScorePath = route.params.quizType

  const fetchdata = async () => {
    try {
      const userAnswers = await getStoredData('@reviewAnswers');
      setExportData(userAnswers);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchdata();
  }, []);

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
  
  const handleGeneratePDF = () => {
    console.log(time)
    createAndSharePDF(exportData, score, time);
  };

  const getRandomQuestions = (arr, num) => {
    // Shuffle the array
    const shuffled = arr.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffle
    return shuffled.slice(0, num);
  };

  const handlePlayAgain =() => {
    const quizQuestions=getRandomQuestions(quizData,10)
    console.log(quizData)
    
    navigation.navigate("Quiz", { quizData: quizQuestions, quizType:saveScorePath})
  
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
        </TouchableOpacity>
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>
    <Ionicons name="trophy-sharp" size={128} color="#FED843" />
      <View style={styles.wrapper}>

        <View style={styles.statisticsPanel}>

          <View style={styles.statisticsPanelTimer}>
            <Image style={{marginRight:5,paddingBottom:5}} source={require('../assets/clock.png')} />
            <Text style={styles.statisticsPanelText}>Time: {time}</Text>
          </View>
          <View style={styles.statisticsPanelScore}>
            <Image style={{marginRight:5,paddingBottom:5}} source={require('../assets/score.png')} />
            <Text style={styles.statisticsPanelText}>Final Score: {score}</Text>
          </View>

        </View>

        <View style={styles.quickLinks}>
          <View style={styles.quickLinksRow}>
            <QuickLinkButtons text='Play Again' imgSource ={require('../assets/quickLinkIcons/play_again.png')} onPress={() => handlePlayAgain()}/>
            <QuickLinkButtons text='View Record' imgSource ={require('../assets/quickLinkIcons/view_record.png')} onPress={() => navigation.navigate("View Record",{quizType:saveScorePath,name:viewRecordName})}/>
            {/* <QuickLinkButtons text='Review Answers' imgSource ={require('../assets/quickLinkIcons/review_answers.png')}/> */}
          </View>
          <View style={styles.quickLinksRow}>
            <QuickLinkButtons text='   Home    ' imgSource ={require('../assets/quickLinkIcons/home.png')} onPress={() => navigation.navigate("Home")}/>
            <QuickLinkButtons text='Export' imgSource ={require('../assets/quickLinkIcons/export.png')} onPress={()=>handleGeneratePDF()} />
            {/* <QuickLinkButtons text='Share' imgSource ={require('../assets/quickLinkIcons/share.png')}/> */}
          </View>
          <View style={styles.quickLinksRow}>
            <QuickLinkButtons text='Review' imgSource ={require('../assets/quickLinkIcons/review_answers.png')} onPress={() => navigation.navigate("Review Answers")}/>
            <QuickLinkButtons text='   Share   ' imgSource ={require('../assets/quickLinkIcons/share.png')} onPress={()=>handleGeneratePDF()}/>
          </View>
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
  
  wrapper:{
    backgroundColor: '#172A41',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statisticsPanel:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    width:329,
    height:112,
    backgroundColor:'#FFC700',
    borderRadius:20,
    // marginBottom:10,
    zIndex:1,
  },

  statisticsPanelScore:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  statisticsPanelTimer:{
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
  },

  quickLinks:{
    width:270,
    height:210,
    backgroundColor:'#395D89',
    borderRadius:20,
    marginTop:-20,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    

  },

  quickLinksRow:{
    flexDirection:'column',
    // justifyContent:'space-around',
    // alignItems:'center',
  },

});

export default FinishScreen;