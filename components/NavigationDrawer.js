import { View, Text, TouchableOpacity,  StyleSheet, Switch } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {Ionicons, AntDesign}  from  '@expo/vector-icons'

const NavigationDrawer = () => {

    const navigation = useNavigation();
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

    const handleToggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
      };

  return (
    <View>
     {/* <Text className="text-white">Drawer Content</Text> */}
     <View className="my-1 pt-2">

     <View className="border-b border-slate-300 my-2">
                <Text className={`text-lg font-bold text-white`}>Products & Categories</Text>
              <TouchableOpacity className="py-2 px-3 my-2 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                 onPress={() => navigation.navigate('AllProducts') }
              >
                 <Text className={`text-white font-medium text-lg`} >All Products</Text>
                 <Text className="mt-1.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-2 px-2 my-2 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg"
                 onPress={() => navigation.navigate('AllCategories') }
              >
                 <Text className={`text-white font-medium text-lg`} >All Categories</Text>
                 <Text className="mt-1.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-2 px-3 my-2 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-lg`} >All Products</Text>
                 <Text className="mt-1.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
     </View>

     <View className="border-b border-slate-300 my-2">
                <Text className={`text-xl font-bold text-white`}>Orders & Carts</Text>

              <TouchableOpacity className="py-2 px-3 my-2 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-lg`} >All Orders</Text>
                 <Text className="mt-1.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-2 px-3 my-2 bg-slatee-500 flex flex-row justify-between space-x-6 active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-lg`} >Products</Text>
                 <Text className="mt-1.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>

              </View>
              <View className="border-b border-slate-300 my-2">
                <Text className={`text-xl font-bold text-white`}>Notifications</Text>

              <TouchableOpacity className="py-2 px-2 my-2 bg-selate-500 flex flex-row justify-between  active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-lg mr-1`} >Allow Notifications</Text>
                 <Text className="">
                   {/* <AntDesign name='arrowright' size={18} color="white" /> */}
                   <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-2 px-3 my-2 bg-selate-500 flex flex-row justify-between  active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-lg`} >All Products</Text>
                 <Text className="mt-1.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>

              </View>

              <View className="border-b border-slate-300 my-2">
                <Text className={`text-xl font-bold text-white`}>Account</Text>

              <TouchableOpacity className="py-2 px-3 my-2 bg-slatee-500 flex flex-row justify-between  active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-lg`} >All Products</Text>
                 <Text className="mt-1.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-2 px-3 my-2 bg-slatee-500 flex flex-row justify-between active:bg-slate-500  hover:bg-slate-500 rounded-lg">
                 <Text className={`text-white font-medium text-lg`} >All Products</Text>
                 <Text className="mt-1.5">
                   <AntDesign name='arrowright' size={18} color="white" />
                 </Text>
              </TouchableOpacity>

              </View>

          </View>
    </View>
  )
}

export default NavigationDrawer;


const  styles =   StyleSheet.create({
    component : {
    
    }
})