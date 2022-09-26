import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screen/MainScreen';
import IrcScreen from './src/screen/IrcScreen';
import LoginScreen from './src/screen/LoginScreen';
import DunScreen from './src/screen/DunScreen';
import TeacherScreen from './src/screen/TeacherScreen';
import FaScreen from './src/screen/FaScreen';
import { PhoneValue } from './src/PhoneContext';
import InsertIrc from './src/screen/InsertIrc';
import InsertYvc from './src/screen/InsertYvc';
import TeacherClass from './src/screen/TeacherClass';
import TeacherLesson from './src/screen/TeacherLesson';
import MyContextProvider from './src/context/MyContext';
import TeacherMyClass from './src/screen/TeacherMyClass';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyContextProvider>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#560027',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="FaScreen" component={FaScreen} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="IrcScreen" component={IrcScreen} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="TeacherScreen" component={TeacherScreen} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="DunScreen" component={DunScreen} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="InsertIrc" component={InsertIrc} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="InsertYvc" component={InsertYvc} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="TeacherClass" component={TeacherClass} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="TeacherLesson" component={TeacherLesson} options={{ title: "Өвөрхангай ПК" }} />
          <Stack.Screen name="TeacherMyClass" component={TeacherMyClass} options={{ title: "Өвөрхангай ПК" }} />
        </Stack.Navigator>
      </MyContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
