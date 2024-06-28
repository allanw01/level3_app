import React from "react";
import { View,Text, StyleSheet, Image } from "react-native";

const PBStats = ({ time, imgSource}) => {
    return (
        <View style={styles.stats}>
            <Image style={styles.image} source={imgSource} />
            <Text style={styles.time}>{time}</Text>
        </View>
        
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
    time: {
        color: 'black',
        fontWeight:'bold',
        fontSize:13,
        textAlign:'left',
    },
});


export default PBStats;