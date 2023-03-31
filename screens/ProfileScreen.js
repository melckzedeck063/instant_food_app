import { View, Text, useWindowDimensions, Image } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {

    const navigation =  useNavigation();
    const {width, height} =  useWindowDimensions();
    useLayoutEffect(() => 
    {
        navigation.setOptions({
            // headerShown : false
            headerStyle : {
                backgroundColor : "#161E35"
            },
            headerTintColor : "white"
        })
    })


  return (
    <View style={{width : width, height: height}} className="bg-slate-800" >
      <Text className="text-white text-center font-bold text-xl" >ProfileScreen</Text>
     
    </View>
  )
}

export default ProfileScreen