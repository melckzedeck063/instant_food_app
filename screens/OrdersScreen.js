import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const OrdersScreen = () => {

    const navigation   =  useNavigation();

    useLayoutEffect(() => 
    {
        navigation.setOptions({
            // headerShown : false,
            headerStyle : {
                backgroundColor : "#161E35"
            },
            headerTintColor : "white"
        })
    })

  return (
    <View>
        <View className={`bg-slate-900 h-full`}>
          <Text className={`text-center font-bold text-lg py-2 text-white`}>OrdersScreen</Text>
        </View>
    </View>
  )
}

export default OrdersScreen