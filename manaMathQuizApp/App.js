import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import QuizScreen from './app/screens/QuizScreen';
import HomeScreen from './app/screens/HomeScreen';
import FinishScreen from './app/screens/FinishScreen';

export default function App() {
  return <QuizScreen/>;
}

