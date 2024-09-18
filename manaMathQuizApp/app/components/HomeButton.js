import React from "react";
import { View,Text, StyleSheet, Touchable, TouchableOpacity, Image } from "react-native";
// import { Image } from 'expo-image';

import colours from "../config/colours";

import { FontAwesome5 } from '@expo/vector-icons';


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
        // flexWrap:'wrap'
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
        height:40,
        width:40,
        marginLeft:10,
        
    },
});


export default HomeBtn;