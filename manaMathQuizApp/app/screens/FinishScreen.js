import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';


function FinishScreen(props) {

  return (
    <View style={styles.container}>

    <Ionicons name="trophy-sharp" size={128} color="#FED843" />

      <View style={styles.statisticsPanel}>

          <View style={styles.statisticsPanelTimer}>
            <Image style={{marginRight:5,paddingBottom:5}} source={require('../assets/clock.png')} />
            <Text style={styles.statisticsPanelText}>Your time: 00-00-00</Text>
          </View>

          <View style={styles.statisticsPanelScore}>
            <Image style={{marginRight:5,paddingBottom:5}} source={require('../assets/score.png')} />
            <Text style={styles.statisticsPanelText}>Final Score: 10/10</Text>
          </View>
          
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

  statisticsPanel:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    width:329,
    height:112,
    backgroundColor:'#FFC700',
    borderRadius:20,
    marginBottom:10,
  },

  statisticsPanelScore:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // flexDirection:'column',
    // justifyContent:'space-around',
    // alignItems:'center',
    // marginLeft:20,
    // marginRight:20,

  },
  statisticsPanelTimer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },

  statisticsPanelText:{
    color: 'black',
    fontWeight:'bold',
    fontSize:16,
    paddingTop:10,
    paddingBottom:10,
  },

});

export default FinishScreen;