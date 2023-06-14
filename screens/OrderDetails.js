import { View, Text, useWindowDimensions, Linking, Platform, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import OrderItem from '../components/OrderItem'
import moment from 'moment'
import {Ionicons} from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store';
import { confirmOrder } from '../store/actions/order_actions'
import { useDispatch } from 'react-redux'

const OrderDetails = () => {

    const navigation = useNavigation();
    const {params : {props}} =  useRoute();
    const  {width, height} =  useWindowDimensions();
    const delivery_fee = 4000;
    const [user_role, setUser_role] = useState(null)
    const dispatch  =  useDispatch();
    // console.log(props)

    const openCallLogs = (phoneNumber) => {
        let url = '';
        
        if (Platform.OS === 'android') {
          url = `tel:${phoneNumber}`;
        } else if (Platform.OS === 'ios') {
          url = `telprompt:${phoneNumber}`;
        }
        
        Linking.openURL(url)
          .catch((error) => console.error('Failed to open call logs:', error));
      };
      
      const gettToken =  async () => {
        const storage = await SecureStore.getItemAsync('token');
        const user_role = JSON.parse(storage);
      
      if (user_role.doc.user.role === "admin") {
        setUser_role("admin");
      } else if (user_role.doc.user.role === "driver") {
        setUser_role("driver");
      }
      else  {
        setUser_role("user")
      }
    }
    
    useEffect(() => {
      gettToken();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true
        })
    })
  return (
    <View style={{height :  responsiveHeight(96), width : responsiveWidth(99), backgroundColor :  '#0e2433'}}  className={`bg-slate-100 py-3 px-2.5`} >
        <View className={``}>            
        </View>
        <View className={`py-2`} >
            <View  style={{height:  responsiveHeight(45)}} className={`mx-1`}>
            {
                props?.products.length >= 1 && (
                    <FlatList 
                     data={props.products}
                     renderItem={(itemData) =>{ 
                        return (
                            <OrderItem photo={itemData.item.photo} name={itemData.item.productName} cost={itemData.item.price}  restaurant={itemData.item.prepared_by.restaurantName} />
                        )
                     }}
                    />
                )
              }
            </View>
            <View style={style.card} className={`bg-white w-full my-4 mx-2 py-2 rounded-lg`}>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-white text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> OrderID </Text>
                    <Text className={`text-white text-sm ${Platform.select({android : 'text-xs'})}`}> {props.order_id.substr(4,10)} </Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-white text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> SubTotal </Text>
                    <Text className={`font-medium text-orange-400 text-sm ${Platform.select({android : 'text-xs'})}`}> {Number(props.cost) + delivery_fee } </Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-white text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> Ordered </Text>
                    <Text className={`text-white text-sm ${Platform.select({android : 'text-xs'})}`}> {moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                </View>
                <View className={`flex-row justify-between py-2 border-b border-slate-200 px-2`}>
                    <Text className={`text-white text-lg ${Platform.select({android : 'text-sm'})} font-medium`}> OrderStatus </Text>
                    <Text className={`font-medium ${Platform.select({android: 'text-xs'})}  ${props.order_status === "Delivered"?'text-blue-500': 'text-orange-400'} ${props.order_status ==="Accepted"?'text-green-500': 'text-orange-400'} `}>  {props.order_status} </Text>
                </View>
                <View className="mx-3">
                    {
                        user_role === "admin" ||  user_role ==="driver" &&(

                    <View className="">
                         <Text className="text-white font-bold text-center py-1">Your Customer</Text>
                        <View className="flex flex-row justify-between mx-2 my-2">
                        <Text style={{fontSize : responsiveFontSize(2.1)}} className="text-white font-medium">Name </Text>
                        <Text style={{fontSize : responsiveFontSize(1.7)}} className="text-white font-medium pt-1">{props.user.firstName} {props.user.lastName} </Text>

                        </View>
                        <View className="flex-row flex justify-between mx-2 my-1">                           
                        <TouchableOpacity className="bg-green-600 px-2 py-1 rounded-xl"
                          onPress={() => openCallLogs(props.user.telephone)}
                        >
                            <Text style={{fontSize : responsiveFontSize(1.6)}} className="-ml-1">  <Ionicons  name='call' color="white" size={24} /> </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize : responsiveFontSize(2)}} className="text-white font-medium pt-1.5">{props.user.telephone} </Text>
                        </View>
                        {
                            props.order_status === "Pending"?(
                           <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-orange-400 w-5/12 px-2 rounded-lg py-1.5 my-3`}
                            onPress={() => dispatch( confirmOrder(props.uuid) ) }
                           >
                              <Text className={`text-lg text-white font-medium text-center ${Platform.select({android :  'text-sm'})}`}>Confirm Order</Text>
                           </TouchableOpacity>
                            )
                            :
                            <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-orange-400 w-5/12 px-2 rounded-lg py-1.5 my-3`}
                             onPress={() => navigation.navigate('DeliveryScreen', {props})}
                            >
                               <Text className={`text-lg text-white font-medium text-center ${Platform.select({android :  'text-sm'})}`}>Deliver Now</Text>
                            </TouchableOpacity>                         
                           }
                    </View>
                        )
                    }

                    {
                        user_role === "user" && (
                            <View className="">
                            <Text className="text-white font-bold text-center py-1">Delivery man</Text>
                           <View className="flex flex-row justify-between mx-2 my-2">
                           <Text style={{fontSize : responsiveFontSize(2.1)}} className="text-white font-medium">Name </Text>
                           <Text style={{fontSize : responsiveFontSize(1.7)}} className="text-white font-medium pt-1">{props.driver.firstName} {props.driver.lastName} </Text>
   
                           </View>
                           <View className="flex-row flex justify-between mx-2 my-1">                           
                           <TouchableOpacity className="bg-green-600 px-2 py-1 rounded-xl"
                             onPress={() => openCallLogs(props.driver.telephone)}
                           >
                               <Text style={{fontSize : responsiveFontSize(1.6)}} className="-ml-1">  <Ionicons  name='call' color="white" size={24} /> </Text>
                           </TouchableOpacity>
                           <Text style={{fontSize : responsiveFontSize(2)}} className="text-white font-medium pt-1.5">{props.driver.telephone} </Text>
                           </View>
                           {
                            props.order_status === "Pending"?(
                           <></>
                            )
                            :
                            <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-orange-400 w-5/12 px-2 rounded-lg py-1.5 my-3`}
                               onPress={()  =>  navigation.navigate('DeliveryWaiting', {props})}
                            >
                               <Text className={`text-lg text-white font-medium text-center ${Platform.select({android :  'text-sm'})}`}>Track Order</Text>
                            </TouchableOpacity>
                           }
                       </View>
                        )
                    }
                </View>
                <View>
                    {/* <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-orange-400 w-5/12 px-2 rounded-lg py-1.5 my-3`}>
                         <Text className={`text-lg text-white font-medium text-center ${Platform.select({android :  'text-sm'})}`}>Confirm Order</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    </View>
  )
}

export default OrderDetails

const style = StyleSheet.create({
    card: {
      elevation : 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset :{width : 0, height : 2} ,
      shadowOpacity: 0.25,
      backgroundColor : '#1c4966',
      shadowRadius: 8,
      alignSelf  : 'center'
     }
  })