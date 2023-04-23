import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

const RegisterBodaScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown :  true
        })
    })
  return (
    <KeyboardAwareScrollView style={{height : responsiveHeight(100), backgroundColor : '#0e2433' }} >
         <View className="mt-6">
           <Text  className={`text-white text-center font-bold text-xl`} >RegisterBodaScreen</Text>
         </View>
    </KeyboardAwareScrollView>
  )
}

export default RegisterBodaScreen