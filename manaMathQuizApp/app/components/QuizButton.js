// Author: Allan Wu

//Importing React Native Components
import React from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";

// Importing my colours
import colours from '../utils/colours';

// Importing icons from expo
import { AntDesign } from '@expo/vector-icons';

// This is the quiz button (the four options for your answers) found in the quiz screen.
// Takes in the parameters text (which is the answer option) and onPress function (what to do when the button is pressed).
const Quiz=({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
          <Text style={styles.buttonText}>{ text }</Text>
          <AntDesign name="checkcircleo" size={32} color="black" />
      </View>
    </TouchableOpacity>
  );
}

//Quiz Button Styles
const styles = StyleSheet.create({
  button:{
    flexDirection:'row',
    borderRadius:20,
    height: 60,
    width:289,
    backgroundColor: colours.secondary,
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

export default Quiz;