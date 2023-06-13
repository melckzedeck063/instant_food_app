import { View, Text } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const PreparingOrder = () => {
    const navigation =  useNavigation();
    const {params : {data}} = useRoute()

    //  console.log(data)

    setTimeout(() => {
        navigation.navigate('Location', {data})
    }, 5000);

    useLayoutEffect (() => {
        navigation.setOptions({
            headerStyle : {
                backgroundColor : "#161E35"
            },
            headerTintColor : "white"
        })
    })

  return (
    <SafeAreaView className="bg-slate-900 h-full flex-1 justify-center items-center">
        <Animatable.Image  
          source={require('../assets/images/e507d704d4b6fdcb17116762fcd99acd.gif')}
          animation="slideInUp"
          iterationCount={1}
          className="h-96  w-96 -mt-14"
        />
        <View>
            <Text style={{fontSize : responsiveFontSize(2)}} className="text-white font-medium text-center p-4">Wait for restaurant to accept your order </Text>
        </View>
        <View>
            <Progress.Circle size={100} indeterminate={true} color='orange' borderWidth={3} />
        </View>
    </SafeAreaView>
  )
}

export default PreparingOrder