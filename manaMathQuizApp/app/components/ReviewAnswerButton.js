// Author: Allan Wu

//Importing React Native Components
import React from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";

// Importing icons from expo
import AntDesign from '@expo/vector-icons/AntDesign';

//Component for the Review Answer Button (Next and Back Button) used in the Review Answer Screen. 
// Takes in the parameters 'text' which is the text display by the button ('next' or 'back'), 'direction' which is the direction the image (expo icon of an arrow) is oriented which has a value of a string ('leftcircle' or 'rightcircle')
// The items are place in a row and the image (expo icon) is place to the right of the text of the button
//Takes in the parameter 'onPress' function which tells the code what to do when pressed  
const ReviewAnswerBtn=({text, direction, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
          <Text style={styles.buttonText}>{ text }</Text>
          <View style={styles.iconWrapper}>
            <AntDesign style={styles.icon} name= {direction} size={32} color="black" />
          </View>
      </View>
    </TouchableOpacity>
  );
}

//Styles for the component above
const styles = StyleSheet.create({
  button:{
    flexDirection:'row',
    borderRadius:20,
    height: 60, //Height of the button
    width:289, // Width of the button
    backgroundColor:'#1cc72d',
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
  //Centers the image (expo icon) of the button.  
  iconWrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  //Add padding so the icon and text is not clump together
  icon:{
    paddingRight:10,
  },

});

export default ReviewAnswerBtn;