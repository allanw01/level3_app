// Author: Allan Wu

// Importing React Native Components
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { useState } from 'react';

// Importing my components
import HomeBtn from "../components/HomeButton";
import PBStats from "../components/PBStats";
import AppHeader from '../components/AppHeader';

//importing my utils
import { clearStorage } from '../utils/SaveScores';
import getRandomQuestions from '../utils/GetRandomQuestions';
import scaleFontSize from '../utils/ScaleFontSize';

//Importing my colours
import colours from '../utils/colours';

//Importing my expo icons
import { Ionicons } from '@expo/vector-icons';

//importing my dataset for the play again button
import { complexAlgebraData, integrationData, differentiationData } from "../utils/quizData";

//Function for my Home Screen
function HomeScreen( { navigation } ) {

  const [modalVisible, setModalVisible] = useState(false); //React state to determine when to display my settings modal

  //clearDataAlert function to ask user for confirmation before deleting the user quiz history
  //Gives the user an alert using native ios or andriod components
  const clearDataAlert = () =>
    Alert.alert('Are sure you want to erase all Data?', 'This action cannot be undone', [
      {
        //Cancel button on the alert
        text: 'Cancel',
        style: 'cancel',
      },
      //Proceed button on the alert
      {text: 'Proceed', onPress: () => {setModalVisible(false); clearStorage();}}, // when pressed setModalVisible closes the settings and clears the user's quiz history
    ]);

  //Function that switches the screen to the quiz screen, by passing in the quiz questions and the pathID so that it knows where to save the score.
  const switchScreen = (arr, scoreSavePath) => {
    quizQuestions = getRandomQuestions(arr,10) //Gets the quiz questions
    navigation.navigate("Quiz", { quizData: quizQuestions, quizType:scoreSavePath}) //Switches to quiz screen and passes the quiz questions and the path to save the score
  };

  return (
    <View style={styles.container}>

      {/* Settings Modal */}
      <Modal style={{height: 300, width: 300}}
        visible={modalVisible}
        onRequestClose={()=> setModalVisible(false)}
        animationType="slide" 
        presentationStyle='formSheet'
      >

        {/* Modal Content */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
            {/* Modal Header Title */}
            <Text style={styles.modalTitleText}>Settings</Text>
            
            {/* Settings Modal Options */}
            <View style={styles.modalButtonOptions}>
              {/* Clearing data option */}
              <Text style={styles.modalText}>Do you want clear view {'\n'}record Data?</Text>
              {/* Clear Data button */}
              <TouchableOpacity  onPress={() => clearDataAlert()}>
                <View style={styles.modalButtonOptionsBtn}>
                    <Text style={styles.modalButtonText}>Clear</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* Close settings modal button */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={styles.modalButtonClose}>
                    <Text style={styles.modalButtonText} >Close</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.supportText}>Contact Support: help@manaMath.com</Text>
          </View>
        </View>      
      </Modal>
      
      {/* Settings Button */}
      <View style={styles.settingsBtn}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons style={styles.settingIcon} name="settings-outline" size={32} color="#FFC66C" />
        </TouchableOpacity>
      </View>

      {/* App Header */}
      <AppHeader/>
    
      {/* View Record Pannel */}
      <View style={styles.viewRecord}>
        <Text style={styles.PBTitle}>View Your Record:</Text>
        <View style={styles.pbStats}>
          {/* View Record Buttons */}
          <PBStats onPress={() => navigation.navigate("View Record",{quizType:'@intergrationScores', name:'Intergration'})} text='Intergration' imgSource ={require('../assets/integration.png')}/>
          <PBStats onPress={() => navigation.navigate("View Record",{quizType:'@differentiationScores', name:'Differentiation'})} text='Differentiation' imgSource ={require('../assets/differentiation.png')}/>
          <PBStats onPress={() => navigation.navigate("View Record",{quizType:'@complexScores',name:'Complex Number'})} text='Complex Number' imgSource ={require('../assets/complexNum.png')}/>
        </View>     
      </View>

      {/* Home Screen Navigation Buttons */}
      <View style={styles.homeBtn}>
        {/* Quiz Buttons */}
        <HomeBtn onPress={() => switchScreen(integrationData,'@intergrationScores')} text='Integration' imgSource ={require('../assets/integration.png')}/>
        <HomeBtn onPress={() => switchScreen(differentiationData,'@differentiationScores')} text='Differentiation' imgSource ={require('../assets/differentiation.png')}/>
        <HomeBtn onPress={() => switchScreen(complexAlgebraData,'@complexScores')} text='Complex Numbers' imgSource ={require('../assets/complexNum.png')}/>
      </View>
    </View>
  );
}

//Styles for the Home Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Styling for the settings modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalContent: {
    width: 320, // Adjust width
    height: 300, // Adjust height
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // stlying for the settings options (modal)
  modalButtonOptions:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-around',
    marginTop:10,
    marginBottom:10,
  },
  //Styles for the modal options button
  modalButtonOptionsBtn:{
    width:80,
    height:50,
    backgroundColor:'#fc0d0d',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  //Styles for the Close the settings button
  modalButtonClose:{
    width:200,
    height:50,
    backgroundColor:'#24A0ED',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
    marginBottom:10,
  },
  // Styles for the settings title
  modalTitleText:{
    fontWeight:'bold',
    fontSize:scaleFontSize(32),
    textAlign:'left',
    marginBottom:20,
  },
  // Styles for any body text in the settings modal
  modalText:{
    fontWeight:'bold',
    fontSize: scaleFontSize(17),
    textAlign:'left',
    marginBottom:20,
  },
  // Styles for the text inside each buttons
  modalButtonText:{
    fontWeight:'bold',
    fontSize:scaleFontSize(17),
    textAlign:'left',
  },
  //Styles for the support text
  supportText:{
    fontSize:scaleFontSize(14),
  },

  //Styles for the settings button
  settingsBtn:{
    marginLeft:300,
  },
  //Styles for the settings icon within the settings button
  settingIcon:{
    alignSelf:'flex-end',
    paddingBottom:5,
  },

  //Styles for view record buttons found in the home screen
  //Styles for the view record board/ panel
  viewRecord:{
    width:329, //width of the view record board /panel
    height:140, //height of the view record board /panel
    justifyContent: 'center',
    backgroundColor:  colours.board,
    borderRadius:20,
    marginBottom:10,
    
  },
  //Styles for the name of the view record board
  PBTitle:{
    paddingLeft:20,
    fontWeight:'bold',
    fontSize:scaleFontSize(19),
    textAlign:'left',
  },
  //Styles for the arrangments of each view record buttons (intergration, differientiation, complex numbers)
  pbStats:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
});

export default HomeScreen;