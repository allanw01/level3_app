import React from "react";
import { View,Text, StyleSheet, Image, TouchableOpacity } from "react-native";

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
        height:32,
        width:32,
        
        
    },
    text: {
        color: '#FFFFFF',
        fontWeight:'bold',
        fontSize:11,
        textAlign:'left',
    },
});


export default QuickLinkButtons;