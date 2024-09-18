import React from "react";
import { View,Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";

import colours from '../utils/colours';


import { AntDesign } from '@expo/vector-icons';


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