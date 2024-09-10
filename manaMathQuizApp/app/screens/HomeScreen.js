import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { useState } from 'react';

import HomeBtn from "../components/HomeButton";
import PBStats from "../components/PBStats";

import { clearStorage } from '../components/SaveScores';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Ionicons } from '@expo/vector-icons';

import { complexAlgebraData, integrationData, differentiationData } from "../config/quizData";

function HomeScreen( { navigation } ) {

  const [modalVisible, setModalVisible] = useState(false);

  const clearDataAlert = () =>
    Alert.alert('Are sure you want to erase all Data?', 'This action cannot be undone', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Proceed', onPress: () => {setModalVisible(false); clearStorage();}},
    ]);

  const getRandomQuestions = (arr, num) => {
    // Shuffle the array
    const shuffled = arr.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffle
    return shuffled.slice(0, num);
  };

  const switchScreen = (arr, scoreSavePath) => {
    quizQuestions = getRandomQuestions(arr,10)
    console.log(scoreSavePath)
    navigation.navigate("Quiz", { quizData: quizQuestions, quizType:scoreSavePath})
  };

  return (
    <View style={styles.container}>

      <Modal style={{height: 300, width: 300}}
        visible={modalVisible}
        onRequestClose={()=> setModalVisible(false)}
        animationType="slide" 
        presentationStyle='formSheet'
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitleText}>Settings</Text>
            <Text style={styles.modalText}>Do you want clear view record Data? ACTION CANNOT BE UNDONE</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity  onPress={() => clearDataAlert()}>
                <View style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>Yes</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={styles.modalButton}>
                    <Text style={styles.modalButtonText} >No</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>      
      </Modal>
      
      
      {/* Header + Settings Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons style={styles.settingIcon} name="settings-outline" size={32} color="#FFC66C" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>
    
      {/* View Record Pannel */}
      <View style={styles.viewRecord}>
        <Text style={styles.PBTitle}>View Your Record:</Text>
        <View style={styles.pbStats}>
          <PBStats onPress={() => navigation.navigate("View Record",{quizType:'@intergrationScores', name:'Intergration'})} text='Intergration' imgSource ={require('../assets/integration.png')}/>
          <PBStats onPress={() => navigation.navigate("View Record",{quizType:'@differentiationScores', name:'Differentiation'})} text='Differentiation' imgSource ={require('../assets/differentiation.png')}/>
          <PBStats onPress={() => navigation.navigate("View Record",{quizType:'@complexScores',name:'Complex Number'})} text='Complex Number' imgSource ={require('../assets/complexNum.png')}/>
        </View>     
      </View>

      {/* Home Screen Navigation Buttons */}
      <View style={styles.homeBtn}>
        {/* <HomeBtn onPress={() => console.log("Practice")} text='Practice' imgSource ={require('../assets/practice.png')}/> */}
        <HomeBtn onPress={() => switchScreen(integrationData,'@intergrationScores')} text='Integration' imgSource ={require('../assets/integration.png')}/>
        <HomeBtn onPress={() => switchScreen(differentiationData,'@differentiationScores')} text='Differentiation' imgSource ={require('../assets/differentiation.png')}/>
        <HomeBtn onPress={() => switchScreen(complexAlgebraData,'@complexScores')} text='Complex Numbers' imgSource ={require('../assets/complexNum.png')}/>
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.1)', 
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // backgroundColor: 'transparent',
    
  },
  modalContent: {
    width: 300, // Adjust width
    height: 200, // Adjust height
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButtonContainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-around',
  },

  modalButton:{
    width:80,
    height:50,
    backgroundColor:'#24A0ED',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },

  modalTitleText:{
    // color: '#FFF',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'left',
    marginBottom:20,
  },

  modalText:{
    // color: '#FFF',
    fontWeight:'bold',
    fontSize:15,
    textAlign:'left',
    marginBottom:20,
  },

  modalButtonText:{
    // color: '#FFF',
    fontWeight:'bold',
    fontSize:15,
    textAlign:'left',
  },

  header:{
    marginBottom:60,
  },
  settingIcon:{
    alignSelf:'flex-end',
    paddingBottom:5,
  },
  headerText:{
    color: '#FFF',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'left',
  },
  viewRecord:{
    width:329,
    height:166,
    justifyContent: 'center',
    backgroundColor:'#FFC700',
    borderRadius:20,
    marginBottom:10,
    
  },
  PBTitle:{
    paddingLeft:20,
    fontWeight:'bold',
    fontSize:15,
    textAlign:'left',
  },
  pbStats:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
});

export default HomeScreen;