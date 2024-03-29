import { View, Text, TouchableOpacity,  StyleSheet, Switch, Platform } from 'react-native'
import React,{useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import {Ionicons, AntDesign, FontAwesome}  from  '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { allCartItems } from '../store/actions/cart_actions'
import * as SecureStore from 'expo-secure-store';

const NavigationDrawer = () => {

    const navigation = useNavigation();
    const dispatch =  useDispatch()
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
    const [user_role, setUser_role] =  useState(null)

  const handleLogout = async () => {
    // Clear the secure store items
    await SecureStore.deleteItemAsync('token');

    setTimeout(() => { 
      navigation.navigate('Login');
    }, 3000);
  };

  const gettToken =  async () => {
    const storage = await SecureStore.getItemAsync('token');
    const user_role = JSON.parse(storage);
  
  if (user_role.doc.user.role === "admin") {
    setUser_role("admin");
  } else if (user_role.doc.user.role === "driver") {
    setUser_role("driver");
  }
}

useEffect(() => {
  gettToken();
}, []);

  // console.log(user_role)


    const handleToggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
      };

      const handleBasket = ()  => {
        dispatch( allCartItems() )
        setTimeout(() => {
          navigation.navigate('Basket');
        }, 500);
      }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
     {/* <Text className="text-white">Drawer Content</Text> */}
     <View className="my-4 pt-10 mb-10">

     <View className="border-b border-slate-300 my-2">
                <Text className={`text-lg font-bold text-white`}>Products & Categories</Text>
              <TouchableOpacity className="py-1 px-3 my-1.5 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                 onPress={() => navigation.navigate('AllProducts') }
              >
                 <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >All Products</Text>
                 <Text className="mt-0.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-2 px-2 my-1.5 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                 onPress={() => navigation.navigate('AllCategories') }
              >
                 <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >All Restaurants</Text>
                 <Text className="mt-0.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
              {
                user_role  ===  "admin" &&(
              <TouchableOpacity className="py-1.5 px-3 my-1.5 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                onPress={() => navigation.navigate("NewCategory")}
              >
                 <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >New Restaurant</Text>
                 <Text className="mt-0.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
                )
              }
     </View>

     <View className="border-b border-slate-300 my-2">
                <Text className={`text-lg font-bold text-white mb-2`}>Orders & Carts</Text>
                {
                  user_role ===  "admin" &&(
                    <TouchableOpacity className="py-1.5 px-3 my-1.5 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                      onPress={()  => navigation.navigate('AllOrders') }
                    >
                      <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >All Orders</Text>
                       <Text className="mt-0.5">
                         <AntDesign name='arrowright' size={18} color="white" />
                       </Text>
              </TouchableOpacity>
                  )
                }
                {
                  user_role === "driver" && (
                    <TouchableOpacity className="py-1.5 px-3 my-1.5 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                     onPress={()  => navigation.navigate('DriversOrder') }
                    >
                        <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >My Orders</Text>
                        <Text className="mt-0.5">
                          <AntDesign name='arrowright' size={18} color="white" />
                        </Text>
                 </TouchableOpacity>
                  )
                }
              
              <TouchableOpacity className="py-1.5 px-3 my-1.5 bg-slatee-500 flex flex-row justify-between space-x-6 active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                onPress={()  =>  handleBasket() }
              >
                <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >My Basket</Text>
                 <Text className="mt-0.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>

              </View>
              {/* <View className="border-b border-slate-300 my-2">
                <Text className={`text-xl font-bold text-white mb-2`}>Notifications</Text>

              <TouchableOpacity className="py-1 px-2 my-1.5 bg-selate-500 flex flex-row justify-between  active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})} mr-1`} >Allow Notifications</Text>
                 <Text className={`-mt-1 ml-2 ${Platform.select({android : '-mt-3.5'})}`}>
                   <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-1 px-3 my-1.5 bg-selate-500 flex flex-row justify-between  active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >All Notifications</Text>
                 <Text className="mt-0.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>

              </View> */}

              {
                user_role  === "admin" &&(
              <View className="border-b border-slate-300 my-2">
                <Text className={`text-lg font-bold text-white mb-2`}>Users</Text>

              
              <TouchableOpacity className="py-1 px-3 my-1.5 bg-selate-500 flex flex-row justify-between  active:bg-slate-500  hover:bg-slate-500 rounded-lg"
               onPress={() => navigation.navigate('AllUsers') }
              >
                 <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >All Users</Text>
                 <Text className="mt-0.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>

              </View>
                )
              }

              <View className="border-b border-slate-300 my-2">
                <Text className={`text-lg font-bold text-white mb-2`}>Settings</Text>

              <TouchableOpacity className="py-1.5 px-3 my-1.5 bg-slatee-500 flex flex-row justify-between  active:bg-slate-500  hover:bg-slate-500 rounded-lg"
               onPress={()=> navigation.navigate("Settings") }
              >
                 <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >Settings</Text>
                 <Text className="mt-0.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity className="py-1.5 px-3 my-1.5 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                 onPress={() => navigation.navigate('Location')}
              >
                 <Text className={`text-white font-medium text-sm ${Platform.select({android : 'text-xs'})}`} >Location Tracking</Text>
                 <Text className="mt-0.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity> */}

              </View>
              <View>
              <TouchableOpacity className="py-1.5 px-3 my-4 bg-red-400 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                onPress={handleLogout}
              >
                 <Text className={`text-white font-medium text-lg ${Platform.select({android : 'text-sm'})}`} >Sign Out</Text>
                 <Text className="mt-0.5">
                   <FontAwesome name='sign-out' size={24} color="white" />
                 </Text>
              </TouchableOpacity>
              </View>

          </View>
    </ScrollView>
  )
}

export default NavigationDrawer;


const  styles =   StyleSheet.create({
    component : {
    
    }
})