import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

import QuickLinkButtons from '../components/QuickLinkButton';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function FinishScreen(props) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back Button Clciked")}>
        <FontAwesome5 style={styles.backIcon} name="backspace" size={32} color="#ffbb33" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MANA MATH</Text>
      </View>
    <Ionicons name="trophy-sharp" size={128} color="#FED843" />
      <View style={styles.wrapper}>

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

        <View style={styles.quickLinks}>
          <View style={styles.quickLinksRow}>
            <QuickLinkButtons text='Play Again' imgSource ={require('../assets/quickLinkIcons/play_again.png')}/>
            <QuickLinkButtons text='View Record' imgSource ={require('../assets/quickLinkIcons/view_record.png')}/>
            {/* <QuickLinkButtons text='Review Answers' imgSource ={require('../assets/quickLinkIcons/review_answers.png')}/> */}
          </View>
          <View style={styles.quickLinksRow}>
            <QuickLinkButtons text='   Home    ' imgSource ={require('../assets/quickLinkIcons/home.png')}/>
            <QuickLinkButtons text='Export' imgSource ={require('../assets/quickLinkIcons/export.png')}/>
            {/* <QuickLinkButtons text='Share' imgSource ={require('../assets/quickLinkIcons/share.png')}/> */}
          </View>
          <View style={styles.quickLinksRow}>
            <QuickLinkButtons text='Review' imgSource ={require('../assets/quickLinkIcons/review_answers.png')}/>
            <QuickLinkButtons text='   Share   ' imgSource ={require('../assets/quickLinkIcons/share.png')}/>
          </View>
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

  header:{
    marginBottom:60,
  },
  backIcon:{
    alignSelf:'flex-start',
    paddingBottom:5,
  },
  headerText:{
    color: '#FFF',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'left',
  },
  
  wrapper:{
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
    // marginBottom:10,
    zIndex:1,
  },

  statisticsPanelScore:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
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

  quickLinks:{
    width:270,
    height:210,
    backgroundColor:'#395D89',
    borderRadius:20,
    marginTop:-20,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    

  },

  quickLinksRow:{
    flexDirection:'column',
    // justifyContent:'space-around',
    // alignItems:'center',
  },

});

export default FinishScreen;