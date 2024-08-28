import React from "react";
import { View,Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";


import AntDesign from '@expo/vector-icons/AntDesign';


const ReviewAnswerBtn=({text, direction, onPress}) => {

    return (
      <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ text }</Text>
                <View style={styles.iconWrapper}>
                  <AntDesign style={styles.icon} name= {direction} size={32} color="black" />
                  <AntDesign style={styles.icon} name= {direction} size={32} color="black" />
                </View>
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
    iconWrapper:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
    icon:{
      paddingRight:10,
    },

  });

  export default ReviewAnswerBtn;