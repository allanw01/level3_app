import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

import HomeBtn from "../components/HomeButton";

function HomeScreen(props) {

  return (
    <View style={styles.container}>
      <Text>MANA MATH</Text>
      <View style={styles.homeBtn}>
        <HomeBtn onPress={() => console.log("Practice")} text='Practice' imgSource ={require('../assets/practice.png')}/>
        <HomeBtn onPress={() => console.log("integration")} text='Integration' imgSource ={require('../assets/integration.png')}/>
        <HomeBtn onPress={() => console.log("Differentiation")} text='Differentiation' imgSource ={require('../assets/differentiation.png')}/>
        <HomeBtn onPress={() => console.log("Complex Numbers")} text='Complex Numbers' imgSource ={require('../assets/complexNum.png')}/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172A41',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBtn:{

  },
});

export default HomeScreen;