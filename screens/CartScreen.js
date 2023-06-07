import { View, Text, useWindowDimensions, FlatList, TouchableOpacity, Platform } from 'react-native'
import React, {useLayoutEffect, useState, useCallback} from 'react'
import { useNavigation } from '@react-navigation/native'

import ProductCard from '../components/ProductCard';
import CartItem from '../components/CartItem';
import {useResponsiveHeight, useResponsiveWidth} from 'react-native-responsive-dimensions';
import { useCart } from 'react-use-cart';





const CartScreen = () => {

    const navigation =  useNavigation()
    const {height, width} = useWindowDimensions();
    const {items, totalUniqueItems, cartTotal} = useCart();
    

    
    useLayoutEffect(() => 
    {
        navigation.setOptions({
            // headerShown : false,
            headerStyle : {
                backgroundColor : "#0e2433"
            },
            headerTintColor : "white"
        })
    })

  return (
    <View style={{height : height, width: width, backgroundColor : '#0e2433'}} className="bg-slate-900" >
      <View style={{alignSelf : 'center'}} className="border-b-2 border-slate-300 w-10/12 py-3">
        <Text className="text-white text-center font-bold text-xl" >Cart Items ({totalUniqueItems}) </Text>
      </View>
      <View style={{height  :  height/1.5}} className="px-2">
        {
          items &&  items.length >= 1?(
            <>
          <FlatList style={{height : height/1}}
           data={items}
           renderItem={(itemData) => {
            return(
              <CartItem image={itemData.item.image} name={itemData.item.name} quantity={itemData.item.quantity} price={itemData.item.price}  id={itemData.item.id} />
            )
           }}
           keyExtractor={(item) => item.id}
          />
            </>
          )
          :
          <>
          <View>
            <Text className="font-medium text-slate-200 text-center py-16 animate-bounce" >Your cart is empty! Add items</Text>
          </View>
          </>
        }
      </View>
      <View className={`bg-slate-800 p-2 ${Platform.select({android :'mt-2 py-5'})}`}>
         <View className="flex-row flex justify-between px-2">
          <View>
            <Text className={`text-white font-bold text-lg ${Platform.select({android  :  'text-sm'})}`}> Total ({totalUniqueItems}) Items </Text>
            <Text className={`text-white font-bold text-lg ${Platform.select({android  :  'text-sm'})}`}> {cartTotal} Tshs </Text>
          </View>
          <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-orange-500 rounded-lg px-4 py-2 w-5/12`} 
            onPress={() => navigation.navigate('Location')}
          >
             <Text className={`text-white font-medium text-center ${Platform.select({ios  :  'text-lg'})}`}> Place Order </Text>
          </TouchableOpacity>
         </View>
      </View>
    </View>
  )
}

export default CartScreen