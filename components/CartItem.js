import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {FontAwesome, Ionicons} from '@expo/vector-icons';

const CartItem = (props) => {
  return (
    <View style={{color : 'white', backgroundColor  :  '#053F5E'}} className="my-2 bg-slate-700 py-3 rounded-lg" >
      {/* <Text>CartItem</Text> */}
      <View className="flex-row justify-between px-2">
        <View className=" h-10 w-10 rounded-full" >
            <Image source={props.image} className="h-20 w-20 rounded-full"  />
        </View>
        <View style={{color : "white"}} className="text-white" > 
           <Text className="text-green text-white font-bold text-lg" > {props.name} </Text>
           <Text className="text-green text-white" > Home sweet home 2 </Text>
           <Text className="text-green py-2 font-medium text-amber-500" > Tshs 3500 </Text>
         </View>
         <View className="py-5" >
            <TouchableOpacity className="bg-green-500 rounded-md p-2 " >
                <Text className="font-bold text-center" >
                    <FontAwesome name='close' size={24} color="white"/>
                </Text>
            </TouchableOpacity>
         </View>
      </View>
    </View>
  )
}

export default CartItem