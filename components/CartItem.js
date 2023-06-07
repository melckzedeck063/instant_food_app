import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState,useCallback } from 'react'
import { useCart} from 'react-use-cart'
import { useNavigation, useRoute } from '@react-navigation/native'
import image1 from '../assets/images/product-741755043-1673243019360.jpeg';
import {AntDesign, EvilIcons, MaterialIcons, Entypo} from '@expo/vector-icons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { IMAGE_URL } from '../store/URL';


const CartItem = (props) => {
    const  navigation =  useNavigation();
    // const  {params :  {props}} =  useRoute();
    const [item,setItem] = useState(props.quantity);
    const [amount,  setAmount] =  useState(1)

    // console.log(items)
    const handleIncrement  = useCallback((id) => {
      setAmount((prevAmount) => prevAmount + 1)

        setTimeout(() => {
            updateItemQuantity(id, amount)
        }, 500);
  },[])

  const handleDecrement = useCallback((id) => {
      if(amount >=  2){
          setAmount((prevAmount) => prevAmount - 1)

        //   setTimeout(() => {
        //     if(props.quantity  >= 2){
        //         updateItemQuantity(id, (props.quantity - amount))
        //     }
        // }, 500);
      }
  })
    console.log(props.quantity)

    const {updateItem, removeItem,updateItemQuantity} =  useCart();

    const removeCartItem = (id) => {
        removeItem(id)
    }

    
    // console.log(item)

  return (
    <View>
      <View style={style.card} className="flex-row justify-between p-1 my-1 rounded-lg">
                <View className="h-20 w-24 rounded-full">
                    <Image source={{uri : `${IMAGE_URL}/${props.image}`}} className="h-20 w-24 rounded-lg" />
                </View>
                <View>
                    <Text style={{fontSize :  responsiveFontSize(2)}} className={`text-xl text-slate-100 font-medium my-1.5`}> {props.name} </Text>
                    <View className="flex-row justify-between space-x-2">
                        <TouchableOpacity className="h-8 w-8 bg-yellow-600 rounded-lg px-1 py-1"
                          onPress={() => handleDecrement(props.id) }
                        >
                            <Text className={`text-xl text-white font-semi-bold -mt-0.5`}> 
                                 <Entypo name='minus' size={24} color="white"  />
                             </Text>
                        </TouchableOpacity>
                        <View>
                        <Text style={{fontSize :  responsiveFontSize(2.5)}} className={`text-2xl text-slate-100 font-bold`}> {props.quantity} </Text>
                        </View>
                        <TouchableOpacity className="h-8 w-8 bg-white  border-2 border-slate-800 rounded-lg px-1 py-1"
                         onPress={() => handleIncrement(props.id) }
                        >
                            <Text className={`text-xl text-slate-800 font-bold -mt-1 -ml-0.5`}>
                                <MaterialIcons name='add' size={24} color="black"  />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="my-1 mt-3 pr-1.5 relative">
                    <TouchableOpacity className={`text-slate-800 font-medium aboslute -right-14 -top-3`}
                     onPress={() => removeCartItem(props.id)}
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