import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useWindowDimensions } from 'react-native';


import OrderComponent from '../components/OrderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../store/actions/order_actions';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const OrdersScreen = () => {

    const navigation   =  useNavigation();
    const {width,  height} =  useWindowDimensions();
    const dispatch =  useDispatch();
    const  [reload, setReload] =  useState(0);

    setTimeout(() => {
      if(reload  <  5){
        setReload(reload => reload +1)
      }
    }, 1000);

    const my_orders = useSelector(state => state.orders)
    // console.log(my_orders.my_orders)

    useEffect(() => {
      if(my_orders && my_orders.my_orders && reload  < 4){
        dispatch ( getMyOrders())
      }
    })

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
    <View>
        <View style={{backgroundColor : '#0e2433'}} className={`bg-slate-900 h-full`}>
          <View>
             <Text className={`text-center font-bold text-lg py-2 text-white`}>My Orders</Text>
          </View>
          <View style={{height  : responsiveHeight(78), width : responsiveWidth(98), alignSelf  :  'center'}} className="bg-whitee">
          {
            my_orders?.my_orders?.data?.data.length >= 1?(
              <>
              <FlatList 
              data={my_orders.my_orders.data.data}
                 renderItem={(itemData)  => {
                  return(
                    <OrderComponent date={itemData.item.createdAt} uuid={itemData.item._id} user={itemData.item.ordered_by} driver={itemData.item.driver} order_status={itemData.item.order_status} order_id={itemData.item.order_id} cost={itemData.item.total_cost} items={itemData.item.order_items.length} products={itemData.item.order_items} />
                  )
                 }}
                 keyExtractor={(item)  =>  item._id}
              />
              </>
            )
            :
            <>
            <View  className="flex-1 justify-center items-center">
              <Text style={{fontSize  :  responsiveFontSize(2.5)}} className="text-orange-400 font-bold text-center"> !Ooops </Text>
              <Text style={{fontSize  :  responsiveFontSize(2.1)}} className="text-white font-bold text-center"> No order available </Text>
            </View>
            </>
          }
          </View>
          
        </View>
    </View>
  )
}

export default OrdersScreen