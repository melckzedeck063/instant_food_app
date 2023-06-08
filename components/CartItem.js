import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState,useCallback } from 'react'
import { useCart} from 'react-use-cart'
import { useNavigation, useRoute } from '@react-navigation/native'
// import image1 from '../assets/images/product-741755043-1673243019360.jpeg';
import {AntDesign, EvilIcons, MaterialIcons, Entypo} from '@expo/vector-icons'

import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { IMAGE_URL, NEW_IMAGE_URL } from '../store/URL';
import { allCartItems, deleteCartItem, updateCartItem } from '../store/actions/cart_actions'
import { useDispatch } from 'react-redux'


const CartItem = (props) => {
    const  navigation =  useNavigation();
    // const  {params :  {props}} =  useRoute();
    const [item,setItem] = useState(props.quantity);
    const [amount,  setAmount] =  useState(1)
    const dispatch =   useDispatch();

    // console.log(items)
    const addAmount = () => {
      setAmount(amount =>  amount + 1)
      setTimeout(() => {
  
        if(amount != 1){
          const data = {
            amount : amount,
            id :  props.id,
            total_cost : props.price * amount
          }
          dispatch( updateCartItem(data))
          setTimeout(() => {
            dispatch( allCartItems() )
            // navigation.navigate('CartScreen')
          }, 500);
        }
      }, 1000);
   }
  
   const  decreaseAmount = () => {
    if(props.amount >=  2){  
      setAmount( props.amount - 1)
      setTimeout(() => {
          const data = {
            amount : amount,
            id :  props.id,
            total_cost : props.price * amount
          }
          dispatch( updateCartItem(data))
          setTimeout(() => {         
            dispatch( allCartItems() )
            // navigation.navigate('CartScreen')
          }, 500);
      }, 1000);
    }
   }
  
    const deleteItem = (id) => {
      dispatch( deleteCartItem(props.id) )
      dispatch( allCartItems() )
      // navigation.navigate('CartScreen')
    }
    
    const totalBills =  (data)  => {
      let total = 0;
  
      for(let x= 0;   x < data.length;  x++){
         total += parseInt(data[x].total_cost)
      }
      return total;
    }

    const {updateItem, removeItem,updateItemQuantity} =  useCart();

    const removeCartItem = (id) => {
        removeItem(id)
    }

    
    // console.log(item)

  return (
    <View>
      <View style={style.card} className="flex-row justify-between p-1 my-1 rounded-lg">
                <View className="h-20 w-24 rounded-full">
                    <Image source={{uri : `${NEW_IMAGE_URL}/${props.image}`}} className="h-20 w-24 rounded-lg" />
                </View>
                <View>
                    <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-xl text-slate-100 font-medium my-1.5`}> {props.name} </Text>
                    <View className="flex-row justify-between space-x-2">
                        <TouchableOpacity className="h-8 w-8 bg-yellow-600 rounded-lg px-1 py-1"
                          onPress={() => decreaseAmount(props.id) }
                        >
                            <Text className={`text-xl text-white font-semi-bold -mt-0.5`}> 
                                 <Entypo name='minus' size={24} color="white"  />
                             </Text>
                        </TouchableOpacity>
                        <View>
                        <Text style={{fontSize :  responsiveFontSize(2.5)}} className={`text-2xl text-slate-100 font-bold`}> {props.amount} </Text>
                        </View>
                        <TouchableOpacity className="h-8 w-8 bg-white  border-2 border-slate-800 rounded-lg px-1 py-1"
                         onPress={() => addAmount(props.id) }
                        >
                            <Text className={`text-xl text-slate-800 font-bold -mt-1 -ml-0.5`}>
                                <MaterialIcons name='add' size={24} color="black"  />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="my-1 mt-3 pr-1.5 relative">
                    <TouchableOpacity className={`text-slate-800 font-medium aboslute -right-14 -top-3`}
                     onPress={() => deleteItem(props.id)}
                    > 
                    <EvilIcons name="close-o" size={36} color="orangered" className="absolute top-1 right-1" />
                    </TouchableOpacity>
                    <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-xl text-orange-500 font-bold pt-2 -mt-1`}> {props.price} Tsh </Text>
                </View>
             </View>
    </View>
  )
}

export default CartItem;

const style = StyleSheet.create({
    card: {
    //   flex  : 1,
      elevation : 4,
      backgroundColor: '#1c4966',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius : 8,
      width  : '95%',
      alignSelf : 'center'
     }
  })