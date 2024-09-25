// Author: Allan Wu

// Importing React Native Components
import React from "react";
import { View,Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// Importing my colours
import colours from "../utils/colours";

// Importing icons from expo
import { FontAwesome5 } from '@expo/vector-icons';

// Generic Home Button that takes in the parameters: 'text', 'onPress' function and the path 'imgSource'. 
//The image will be the icon of the specific quiz and is to the left of text that displays the specific quiz and is to the left of the expo icon of an arrow.
const HomeBtn = ({ text, onPress,imgSource}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Image style={styles.image} source={imgSource} />
                <Text style={styles.buttonText}>{ text }</Text>
                <FontAwesome5 name="arrow-circle-right" size={32} color="black" />
            </View>
        </TouchableOpacity>
    )
}

// Styles for my button
const styles = StyleSheet.create({
    button:{
        flexDirection:'row', //Make the items go in a row
        borderRadius:20,
        height: 60, //Height of the button
        width:289, //Width of the button
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
    image:{
        flexDirection:'column',
        alignItems:'flex-start',
        height:40, //Setting height of the image
        width:40, //Setting width of the image
        marginLeft:10,
        
    },
});


export default HomeBtn;