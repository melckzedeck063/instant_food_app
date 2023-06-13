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
import OrderDetails from './screens/OrderDetails';
import ProfileScreen from './screens/ProfileScreen';
import CategoryScreen from './screens/CategoryScreen';
import SettingsScreen from './screens/SettingScreen';
import NewCategory from './screens/NewCategoryScreen';
import NewProduct from './screens/NewProductScreen';
import RegisterBodaScreen from './screens/RegisterBodaScreen';
import { Provider } from 'react-redux';
import store from './store/store';
import LocationTracking from './screens/LocationTracking';
import BasketScreen from './screens/BasketScreen';
import PreparingOrder from './screens/PreparingOrder';
import OrderConfirmation from './screens/OrderConfirmation';

const Stack =  createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <>
    <StatusBar style='light'/>
    <Provider store={store} >
     <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0e2433',
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
         <Stack.Screen  name='OrderDetails' component={OrderDetails} 
           options={{ title :  "Order Details" }}
         />
         <Stack.Screen name='Profile' component={ProfileScreen} 
           options={{title : 'Profile'}}
         />
         <Stack.Screen name='Category' component={CategoryScreen} 
           options={{title : 'Category Screen'}}
         />
         <Stack.Screen name='Settings' component={SettingsScreen} 
           options={{title : 'Settings Screen'}}
         />
         <Stack.Screen name='NewCategory' component={NewCategory} 
           options={{title : 'Create Category'}}
         />
         <Stack.Screen name='NewProduct' component={NewProduct} 
           options={{title : 'Create  Product'}}
         />
         <Stack.Screen name='RegisterBoda' component={RegisterBodaScreen} 
           options={{title : 'Register as Boda'}}
         />
          <Stack.Screen name='Location' component={LocationTracking} 
           options={{title : 'Location Tracking'}}
         />
          <Stack.Screen name='Basket' component={BasketScreen} 
           options={{title : 'My Basket', presentation :  'modal', headerShown : false}}
         />
          <Stack.Screen name='OrderWaiting' component={PreparingOrder} 
           options={{title : 'Order Preparation'}}
         />
         <Stack.Screen name='ConfirmOrder' component={OrderConfirmation} 
           options={{title : 'Confirm Order'}}
         />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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


