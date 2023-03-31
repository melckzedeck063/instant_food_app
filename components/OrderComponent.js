import { View, Text, FlatList, SafeAreaView, useWindowDimensions, TouchableOpacity, StyleSheet, Platform, useAnimatedValue } from 'react-native'
import React from 'react'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const OrderComponent = (props) => {

    // console.log(props)
    const navigation =  useNavigation();
    const handleOrder = (id) => {
       navigation.navigate('OrderDetails', {
        props
       })
    }


  return (
    <View style={{backgroundColor : '#1c4966'}}  className="my-1.5 bg-black/10 opacityy-40">
      <TouchableOpacity style={style.card} className="p-2  borderr border-slatee-500 mx-3 rounded-md"
         onPress={() => handleOrder(props.uuid) }
      >
          <View className="p-1" >
            <View className="">
              <Text className="text-white text-sm font-bold text-center text-llg"> Order Details </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-white ${Platform.select({android :'text-xs'})}`}> Order ID </Text>
              <Text className={`${Platform.select({android : 'text-xs'})} font-medium text-slate-100`}>  {props.order_id.substr(4,10)} </Text>
            </View>
            
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-white ${Platform.select({android :'text-xs'})}`}> Ordered By </Text>
              <Text className="font-medium text-slate-100 capitalize "> {props.user} {props.user.lastName} </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-white ${Platform.select({android :'text-xs'})}`}> Order Status</Text>
              <Text className={`font-medium text-slate-100 ${Platform.select({android: 'text-xs'})}  ${props.order_status === "Delivered"?'text-blue-500': 'text-orange-400'} ${props.order_status ==="Confirmed"?'text-green-500': 'text-orange-400'} `}>  {props.order_status} </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-white ${Platform.select({android :'text-xs'})}`}> Items  </Text>
              <Text className={`font-medium text-slate-100 ${Platform.select({android: 'text-xs'})} `} >  {props.products.length} (items) </Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-white ${Platform.select({android :'text-xs'})}`}> Total Cost </Text>
              <Text className={`font-medium ${Platform.select({android: 'text-xs'})}  text-orange-400`} > {props.cost} Tshs</Text>
            </View>
            <View className="flex flex-row justify-between mr-2">
              <Text className={`font-bold text-white ${Platform.select({android :'text-xs'})}`}> Date </Text>
              <Text style={{color  : 'white'}} classsName={`${Platform.select({android : 'text-xs  text-white'})} font-medium text-white`} > {moment(props.date).format('MMMM Do YYYY, h:mm:ss a')} </Text>
            </View>
        </View>
          </TouchableOpacity>
    </View>
  )
}

export default OrderComponent


const style = StyleSheet.create({
    card: {
      elevation : 4,
      backgroundColor: 'transparent',
      shadowColor: '#1c4966',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      shadowRadius: 8
     }
  })