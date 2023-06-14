import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'

import {Ionicons, FontAwesome, FontAwesome5} from '@expo/vector-icons'
import image2 from '../assets/images/pexels-elina-sazonova-1850595.jpg';
import { NEW_IMAGE_URL } from '../store/URL';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const OrderItem = (props) => {
  // console.log(props)
  return (
       <>
      <View style={style.card}  className="bg-white w-full rounded-lg px-2 py-2 my-1">
      <View   className="flex-row justify-between mx-autoo">
         <View className="">
            <Image source={{uri :  `${NEW_IMAGE_URL}/${props.photo}`}} className="w-20 h-20 rounded-full" />
         </View>
         <View className="">
            <Text style={{fontSize  : responsiveFontSize(2)}} className={`font-bold text-white ${Platform.select({android : 'text-sm'})}`}> {props.name} </Text>
            {/* <Text className="font-bold text-lg text-red-300"> {props.title} </Text> */}
            <View className="flex-row justify-between mx-auto mt-1">
            
              <View className="mx-1">
                <Text className={`font-medium text-lg mtt-1.5 text-white ${Platform.select({android : 'text-sm'})}`}>{props.restaurant}</Text>
                <Text className={`font-bold text-lg mtt-1.5 text-orange-400 ${Platform.select({android : 'text-sm'})}`}> 1 Item </Text>
              </View>
            
            </View>
         </View>
         <View className="mt-1">
         <View className="-mr-2">
          <View className="">
          <Text style={{alignItems : 'center'}} className={`font-bold text-lg text-white ${Platform.select({android : 'text-sm'})}`}> </Text>
            <Text style={{alignItems : 'center'}} className={`font-bold text-lg text-white ${Platform.select({android : 'text-sm'})}`}>  Price </Text>
          </View>
            {/* <Text className="font-bold text-lg text-red-300">  {props.cost} Tshs </Text> */}
         </View>
            <Text className={`font-bold text-lg text-orange-400 ${Platform.select({android : 'text-sm'})}`}> {props.cost} Tshs </Text>
         </View>
      </View>
    </View>
    </>
  )
}

export default OrderItem

const style = StyleSheet.create({
    card: {
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      backgroundColor : '#1c4966',
      shadowRadius: 8,
      alignSelf  : 'center'
     }
  })