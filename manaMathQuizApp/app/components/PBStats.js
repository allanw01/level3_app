// Author: Allan Wu

//Importing React Native components
import React from "react";
import { View,Text, StyleSheet, Image, TouchableOpacity } from "react-native";

//Component (button) for image on top and text below it for the view record button found in the home screen. 
//Takes in the parameters: 'text', 'onPress' function and the path 'imgSource'.
const PBStats = ({ onPress, text, imgSource}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.stats}>
                <Image style={styles.image} source={imgSource} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
};

//Styles for the component above
const styles = StyleSheet.create({
    stats:{
        flexDirection:'column', 
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
    },
    image:{
        flexDirection:'column',
        alignItems:'flex-start',
        height:40, //Height of the button
        width:40, //Width of the button
    },
    text: {
        color: 'black',
        fontWeight:'bold',
        fontSize:13,
        textAlign:'left',
    },
});


export default PBStats;