import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useWindowDimensions } from 'react-native';

const OrderDetails = () => {

    const  navigation =  useNavigation();
    const {width, height} =  useWindowDimensions();

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
    <View style={{width : width, height: height, backgroundColor  : '#0e2433'}} className="bg-slate-800" >
      <Text className="text-white text-center font-bold text-xl" >Order Details</Text>
     
    </View>
  )
}

export default OrderDetails