import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from  '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigator from './components/BottomNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useLayoutEffect } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SIgnUpScreen from './screens/SIgnUpScreen';
import AllProducts from './screens/AllProducts';
import AllCategories from './screens/AllCategories';
import ProductScreen from './screens/ProductScreen';

const Stack =  createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <StatusBar style='light'/>
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#161E35',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
      >
         <Stack.Screen   name='Welcome' component={WelcomeScreen} 
            options={{ title: 'Overview'}} 
         />
         <Stack.Screen   name='Login' component={LoginScreen} 
            options={{ title: 'Sign In'}} 
         />
         <Stack.Screen   name='SignUp' component={SIgnUpScreen} 
            options={{ title: 'Sign Up'}} 
         />
         <Stack.Screen name='AllProducts' component={AllProducts} 
           options={{title : "All Products"}}
         />
          <Stack.Screen name='AllCategories' component={AllCategories} 
           options={{title : "All Categories"}}
         />
         <Stack.Screen name='ProductScreen' component={ProductScreen} />
         <Stack.Screen name='HomeTab' component={BottomNavigator}
         options={{
          headerShown : false,
         }}  />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

export const  HomeTab = () => {
  return (
      <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#E34749' },
        headerTintColor: 'white',
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: { backgroundColor: 'grey' },
        tabBarLabelStyle : {fontSize : 14, padding : 4, height :  32},
        headerShown: false
        }}
      >
      
      </Tab.Navigator>

  )
}

