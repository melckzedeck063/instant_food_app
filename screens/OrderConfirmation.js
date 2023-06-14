import { View, Text, useWindowDimensions, FlatList, TouchableOpacity, Platform } from 'react-native'
import React, {useLayoutEffect, useState, useCallback, useEffect} from 'react'

import ProductCard from '../components/ProductCard';
import CartItem from '../components/CartItem';
import {responsiveFontSize, responsiveHeight, useResponsiveHeight, useResponsiveWidth} from 'react-native-responsive-dimensions';
import { useCart } from 'react-use-cart';
import { useDispatch, useSelector } from 'react-redux';
import { allCartItems, deleteCartItems } from '../store/actions/cart_actions';
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { placeOrder } from '../store/actions/order_actions';

const OrderConfirmation = () => {
    const navigation =  useNavigation();
    const {params  : {selectedDriver,latlong} } =  useRoute()

    // console.log(selectedDriver);
    // console.log("My location : ",latlong)
    
    const {height, width} = useWindowDimensions();
    const {items, totalUniqueItems, cartTotal} = useCart();
    const dispatch =  useDispatch();
    const [reload,setReload] =  useState(0)
    const [deliveryFee, setDeliveryFee] =  useState(4000)

    const cart_items =  useSelector(state => state.cartItem);

    // console.log(cart_items.cart_items);
    // let data  =   cart_items.cart_items;

    setTimeout(() => {
      if(reload  < 5){
        setReload(reload => reload + 1)
      }
    }, 1000);

    useEffect(()  => {
      if(cart_items && cart_items.cart_items && reload < 4){
        dispatch( allCartItems() )
      }
    })

    const totalBills =  (data)  => {
      let total = 0;
  
      for(let x= 0;   x < data.length;  x++){
         total += parseInt(data[x].total_cost)
      }
      return total;
    }

    const order_items =[];
  let costs = 0;

    const orderDetails = (data) => {
      // console.log(data)

      const items = cart_items.cart_items.data.data;
    for(let m = 0 ; m< items.length; m++) {
        order_items.push(items[m].product._id)
        costs += parseInt(items[m].total_cost)
    } 
    const driver = selectedDriver._id
    const datas = {
      order_items,
      costs,
      driver,
      latlong,
      deliveryFee
    }
       
    // console.log(datas)
    setTimeout(() => {
      dispatch(  placeOrder(datas) )

      setTimeout(() => {
        dispatch( deleteCartItems() )
        setTimeout(() => {
          navigation.navigate('HomeTab')
        }, 500);
      }, 2000);
    }, 1000);
    }
    
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

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown  : true
        })
    })
  return (
       <View style={{height : height, width: width, backgroundColor : '#0e2433'}} className="bg-slate-900" >
      <View style={{alignSelf : 'center'}} className="border-b-2 border-slate-300 w-10/12 py-3">
        {
          cart_items?.cart_items?.data?.data?(
            <>
            <Text className="text-white text-center font-bold text-xl" >Order Items ({cart_items.cart_items.results}) </Text>
            </>
          )
          :
          <>
          <Text className="text-white text-center font-bold text-xl" >Cart Items (0) </Text></>
        }
      </View>
      <View style={{height  :  responsiveHeight(65)}} className="px-2">
        {
          cart_items?.cart_items?.data?.data?(
            <>
          <FlatList style={{height : height/1}}
           data={cart_items.cart_items.data.data}
           renderItem={(itemData) => {
            return(
              <CartItem image={itemData.item.product.photo} name={itemData.item.product.productName} price={itemData.item.product.price} amount = {itemData.item.amount} cost={itemData.item.total_cost} date={itemData.item.date_created} id={itemData.item._id} results={itemData.item.results}/>
            )
           }}
           keyExtractor={(item) => item._id}
          />
            </>
          )
          :
          <>
          <View>
            <Text className="font-medium text-slate-200 text-center py-16 animate-bounce" >Your cart is empty! Add items</Text>
          </View>
          </>
        }
      </View>
      <View className={`bg-slate-800 p-2 ${Platform.select({android :'mt-2 py-5'})}`}>
         <View className="px-2">
          {
            cart_items?.cart_items?.data?.data?(
              <>
          <View className="flex-row justify-between">
            <Text style={{fontSize  :  responsiveFontSize(2)}} className={`text-white font-bold`}> Total ({cart_items.cart_items.results}) Items </Text>
            <Text style={{fontSize  :  responsiveFontSize(2)}} className={`text-orange-400 font-bold`}> {totalBills(cart_items.cart_items.data.data)} Tshs </Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{fontSize  :  responsiveFontSize(2)}} className={`text-white font-bold`}> Delivery fee </Text>
            <Text style={{fontSize  :  responsiveFontSize(2)}} className={`text-orange-400 font-bold`}> {deliveryFee} Tshs </Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{fontSize  :  responsiveFontSize(2)}} className={`text-white font-bold`}> Total Cost </Text>
            <Text style={{fontSize  :  responsiveFontSize(2)}} className={`text-orange-400 font-bold`}> {Number(deliveryFee) +  Number(totalBills(cart_items.cart_items.data.data)) } Tshs </Text>
          </View>
          <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-orange-500 rounded-lg px-4 py-1 w-5/12`} 
            onPress={() => orderDetails(cart_items.cart_items.data.data)}
          >
             <Text style={{fontSize :responsiveFontSize(2)}} className={`text-white font-medium text-center`}> Confirm Order </Text>
          </TouchableOpacity>
              </>
            )
            :
            <>
             <View>
            <Text style={{fontSize  :  responsiveFontSize(2)}} className={`text-white font-bold`}> Total (0) Items </Text>
            <Text style={{fontSize  :  responsiveFontSize(2)}} className={`text-white font-bold`}> 0 Tshs </Text>
          </View>
          <TouchableOpacity disabled style={{alignSelf : 'center'}} className={`bg-orange-500 rounded-lg px-4 py-2 w-5/12`} 
            onPress={() => navigation.navigate('OrderWaiting')}
          >
             <Text className={`text-white font-medium text-center ${Platform.select({ios  :  'text-lg'})}`}> Place Order </Text>
          </TouchableOpacity>
            </>
          }
         </View>
      </View>
    </View>

  )
}

export default OrderConfirmation