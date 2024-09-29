// Author: Allan Wu

//Importing React Native Components
import React from "react";
import { View,Text, StyleSheet, Image, TouchableOpacity } from "react-native";

//importing my utils
import scaleFontSize from "../utils/ScaleFontSize";


//A button where there is an image on top of the text which is used in the finish screen.
//Takes in the parameters: 'text', 'onPress' function and the path 'imgSource'. 
const QuickLinkButtons = ({ text, imgSource, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.stats}>
                <Image style={styles.image} source={imgSource} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

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
        height:32, //Height of the image
        width:32, //Width of the image
    },
    text: {
        color: '#FFFFFF',
        fontWeight:'bold',
        fontSize:scaleFontSize(13),
        textAlign:'left',
    },
});


export default QuickLinkButtons;