import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'

import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { IMAGE_URL, NEW_IMAGE_URL } from '../store/URL'
import {useCart} from 'react-use-cart';

const ProductCard = (props) => {
  const navigation =  useNavigation();
  const {addItem} =  useCart()

  const handlCartItem = (data) => {
    // console.log(data)

    addItem(data);
  }

  // console.log(props)

  return (
    <View style={style.card} className="bg-slate-700 mx-1.5 my-1.5 relative rounded-lg">
      <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', {
        props
      }) } >
        <Image source={{uri  : `${NEW_IMAGE_URL}/${props.image}`}} className="h-52 w-full rounded-lg"  />
      <View style={{alignSelf : 'center', backgroundColor : '#1c4966'}} className="bg-slate-600 absolute w-11/12 rounded-lg -py-1 bottom-1" >
        <Text className={`text-white text-lg font-bold capitalize ${Platform.select({android : 'text-sm'})}`} > {props.name} </Text>
        <View className="flex-row justify-between px-1">
            <View className="mt-1">
              <Text className={`text-white -mt-0.5 ${Platform.select({android : 'text-xs'})}`} > {props.price} Tsh </Text>
            </View>
            <TouchableOpacity  className="bg-orange-500 rounded-l-xl bottom-3" 
              // onPress={() =>  handlCartItem(props)}
            >
                <Text className="text-white  text-xl px-1 py-0.5">
                    <FontAwesome name='heart' size={24} color="white"  />
                </Text>
            </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default ProductCard

const style = StyleSheet.create({
    card: {
      flex  : 1,
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius : 8,
      width  : '90%'
     }
  })