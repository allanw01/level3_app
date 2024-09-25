// Author: Allan Wu

//Importing my different screens
import HomeScreen from './app/screens/HomeScreen';
import QuizScreen from './app/screens/QuizScreen';
import FinishScreen from './app/screens/FinishScreen';
import ViewRecordScreen from './app/screens/ViewRecordScreen';
import ReviewScreen from './app/screens/ReviewScreen';

//Importing the react-navigation module / library
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator(); // Creates a stack navigator instance

export default function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator is a component that manages the navigation across different screens */}
      {/* Stack.screen is the indvidual screens that I have and each has a unique name, used for navigation. it has a component that is the screen displayed. */}
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
        />
        <Stack.Screen 
          name="View Record"
          component={ViewRecordScreen}
        />
        <Stack.Screen 
          name="Review Answers"
          component={ReviewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

