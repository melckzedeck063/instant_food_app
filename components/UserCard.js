import { View, Text,Image, TouchableOpacity,StyleSheet, useWindowDimensions } from 'react-native'
import React, { useDebugValue } from 'react'
import image from '../assets/images/pexels-elina-sazonova-1850595.jpg'
import { useNavigation } from '@react-navigation/native'

const UserCard = (props) => {

    const navigation  =  useNavigation()
    const {width, height} =  useWindowDimensions()
  return (
    <View style={style.card} className="bg-slate-200 h-64 p-2.5 m-2 rounded-lg"> 
    <TouchableOpacity
       onPress={() => navigation.navigate('UserDetails', {props})}
    className="h-full w-full px-2">
        <View className="pyy-1">
            <Image style={{alignSelf : 'center'}} source={image} className="h-28 w-28 border-blue-400 border-4 rounded-full overflow-hidden" />
        </View>
        <View className="my-2">
           <Text className="text-white text-center font-bold capitalize"> {props.name} {props.lname} </Text>
           <Text className="text-orange-400 text-center py-1"> {props.email} </Text>
           <Text className="text-orange-400 text-center font-bold py-1">{props.tel} </Text>
        </View>
    </TouchableOpacity>
    </View>
  )
}

export default UserCard

const style = StyleSheet.create({
    card: {
      flex  : 1,
      elevation : 4,
      backgroundColor : '#1c4966',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius : 8,
     
     }
  })