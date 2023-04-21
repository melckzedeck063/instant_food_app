import { View, Text, useWindowDimensions, Platform , StyleSheet, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {useResponsiveHeight, useResponsiveWidth} from 'react-native-responsive-dimensions'
import OrderItem from '../components/OrderItem'
import moment from 'moment'

const OrderDetailsScreen = () => {

    const navigation = useNavigation();
    const {params : {props}} =  useRoute();
    const  {width, height} =  useWindowDimensions();
    console.log(props)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true
        })
    })
  return (
    <View style={{height :  useResponsiveHeight(96), width : useResponsiveWidth(99)}}  className={`bg-slate-100 py-3 px-2.5`} >
        <View className={``}>            
           <Text className={`font-bold text-center text-slate-800 text-lg ${Platform.select({android :  'text-sm'})}`} >OrderDetailsScreen</Text>
        </View>
        <View className={`py-2`} >
            <View className={`mx-1`}>
                <OrderItem  title={"Banana"} />
                <OrderItem  title={"Strawberry"} />
                <OrderItem  title={"Vannila cakes"} />
                <OrderItem  title={"Banana"} />
            </View>
            <View style={style.card} className={`bg-white w-full my-4 mx-2 py-2 rounded-lg`}>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> OrderID </Text>
                    <Text className={`text-slate-800 text-sm ${Platform.select({android : 'text-xs'})}`}> {props.order_id.substr(4,10)} </Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> SubTotal </Text>
                    <Text className={`font-medium text-red-400 text-sm ${Platform.select({android : 'text-xs'})}`}> {props.cost} </Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> Ordered </Text>
                    <Text className={`text-slate-800 text-sm ${Platform.select({android : 'text-xs'})}`}> {moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-slate-800 text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> OrderStatus </Text>
                    <Text className={`font-medium ${Platform.select({android: 'text-xs'})}  ${props.order_status === "Delivered"?'text-blue-500': 'text-red-400'} ${props.order_status ==="Confirmed"?'text-green-500': 'text-red-400'} `}>  {props.order_status} </Text>
                </View>
                <View>
                    <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-red-400 w-5/12 px-2 rounded-lg py-1.5 my-3`}>
                         <Text className={`text-lg text-white font-medium text-center ${Platform.select({android :  'text-sm'})}`}>Confirm Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default OrderDetailsScreen

const style = StyleSheet.create({
    card: {
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius: 8,
      alignSelf  : 'center'
     }
  })