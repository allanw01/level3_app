import HomeScreen from './app/screens/HomeScreen';
import QuizScreen from './app/screens/QuizScreen';
import FinishScreen from './app/screens/FinishScreen';
import ViewRecordScreen from './app/screens/ViewRecordScreen';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{title: "Welcome"}}
        />
        <Stack.Screen 
          name="Quiz"
          component={QuizScreen}
        />
        <Stack.Screen 
          name="Finish"
          component={FinishScreen}
          // options={{headerShown: false}}
        />
        <Stack.Screen 
          name="View Record"
          component={ViewRecordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

