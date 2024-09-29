// Author: Allan Wu

// Importing React Native Components
import React from "react";
import { View,Text, StyleSheet} from "react-native";

//importing my utils
import scaleFontSize from "../utils/ScaleFontSize";

//Generic App header across the different screens
const AppHeader = () => {
    return (
        // Header for my app
        <View style={styles.header}>
            <Text style={styles.headerText}>MANA MATH</Text>
        </View>
    )
};

// Styles for my header of my app
const styles = StyleSheet.create({
    //Stylings for the header
    header:{
        marginBottom:40,
    },
    //Styling for the header text
    headerText:{
        color: '#FFF', //Makes the text white
        fontWeight:'bold',
        fontSize:scaleFontSize(34),
        textAlign:'left',
    },
});

export default AppHeader;