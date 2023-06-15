import { View, Text, Image, useWindowDimensions, TouchableOpacity, ImageBackground, Platform } from 'react-native'
import React, { useLayoutEffect } from 'react'
import image2 from '../assets/images/product-238816929-1673073324827.jpeg'

import { useNavigation } from '@react-navigation/native'
// import { LinearGradient } from 'expo-linear-gradient'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'

const WelcomeScreen = () => {

    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown : false
    })
   })

  return (
    // <LinearGradient colors={['transparent', '#F54749']} className="bg-slate-100 w-full h-full" style={{flex : 1}}>
      <View className="bg-slatee-100 w-full h-full" style={{flex : 1, height : responsiveHeight(110)}}>
        <ImageBackground source={image2} resizeMode='cover'
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
          imageStyle={{ opacity : 0.9}}
        >
            <View className="absolute inset-0 bg-slate-700 opacity-0"></View>

       
      <View className="relative">
        
          <View className={`py-2 bg-slate-700 shadow-md px-2 rounded-xl absolute ${height < 450 ? 'top-3' : 'top-6'} ${width < 380 ? 'w-10/12' : 'w-9/12'}`}  style={{alignSelf : 'center', backgroundColor : '#0e2433'}}>
           <Text className={`text-xl font-medium text-amber-500 my-2 text-center ${ Platform.select({android : 'text-lg'})}`} >Instant Food Delivery For You at Your Door </Text>
           <Text className={`my-2 text-sm text-left text-white px-3 ${Platform.select({android : 'text-xs'})}`} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat labore ad similique esse ut vitae </Text>
           
        
        <View className="mt-2 py-2 flex flex-row justify-between" >
             <TouchableOpacity style={{alignSelf: 'center'}} className="rounded-lg px-2 py-1 bg-orange-400 hover:text-sky-300 w-5/12 mx-auto"
               onPress={() => navigation.navigate('Login') }
             >
                <Text className={`text-xl font-medium text-blue-100 text-center ${Platform.select({android : 'text-lg'})}`} >Sign In</Text>
             </TouchableOpacity>

             <TouchableOpacity style={{alignSelf: 'center', backgroundColor : '#1c4966'}} className="rounded-lg px-2 py-1 bg-amber-500 hover:text-sky-300 w-5/12 mx-auto"
               onPress={() => navigation.navigate('SignUp') }
             >
                <Text className={`text-xl font-medium text-white text-center ${Platform.select({android : 'text-lg'})}`} >Sign Up</Text>
             </TouchableOpacity>
        </View>
        
        </View>
        
            
      </View>
       {/* <Text className="text-blue-600 text-center" > Developed and maintained bt @Cotton </Text> */}
      </ImageBackground>
    </View>
    // </LinearGradient>
  )
}

export default WelcomeScreen