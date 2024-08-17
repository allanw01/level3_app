import React from "react";
import { View,Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const PBStats = ({ onPress, text, imgSource}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.stats}>
                <Image style={styles.image} source={imgSource} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
        
        
    )
}

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
        height:40,
        width:40,
        
        
    },
    text: {
        color: 'black',
        fontWeight:'bold',
        fontSize:13,
        textAlign:'left',
    },
});


export default PBStats;