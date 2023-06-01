import { View, Text, useWindowDimensions, FlatList, TouchableOpacity, Platform } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

import image1 from '../assets/images/pexels-elevate-1267320.jpg';
import image2 from '../assets/images/pexels-matheus-guimarÃ£es-1291712.jpg';
import image3 from '../assets/images/pexels-julias-torten-und-tÃ¶rtchen-1120464.jpg';
import image4 from '../assets/images/pexels-pixabay-262978.jpg';
import image5 from '../assets/images/pexels-miguel-Ã¡-padriÃ±Ã¡n-1591060.jpg';
import image6 from '../assets/images/pexels-william-choquette-2641886.jpg';
import image7 from '../assets/images/product-741755043-1673243019360.jpeg';
import ProductCard from '../components/ProductCard';
import CartItem from '../components/CartItem';
import {useResponsiveHeight, useResponsiveWidth} from 'react-native-responsive-dimensions';


const data = [
  {name : "vegetables", image :image1, id : 1 , price : 2400, quantity :  3},
  {name : "Fruits", image :image2, id : 2 , price : 2400, quantity :  3},
  {name : "Drinks", image :image3, id: 3 , price : 2400, quantity :  3},
  {name : "Bites", image : image4 , id : 4, price : 2400, quantity :  3},
  {name : "Fast food", image :image1, id: 5 , price : 2400, quantity :  3},
  {name : "Fruits", image :image2, id : 6 , price : 2400, quantity :  3},
  {name : "Bites", image : image5 , id : 7, price : 2400, quantity :  3},
  {name : "Fast food", image :image6, id: 8 , price : 2400, quantity :  3},
  {name : "Fruits", image :image7, id : 9 , price : 2400, quantity :  3},
]


const CartScreen = () => {

    const navigation =  useNavigation()
    const {height, width} = useWindowDimensions();
    
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
    <View style={{height : height, width: width, backgroundColor : '#0e2433'}} className="bg-slate-900" >
      <View style={{alignSelf : 'center'}} className="border-b-2 border-slate-300 w-10/12 py-3">
        <Text className="text-white text-center font-bold text-xl" >Cart Items (3) </Text>
      </View>
      <View style={{height  :  height/1.5}} className="px-2">
        <FlatList style={{height : height/1}}
         data={data}
         renderItem={(itemData) => {
          return(
            <CartItem image={itemData.item.image} name={itemData.item.name} quantity={itemData.item.quantity} price={itemData.item.price} />
          )
         }}
         keyExtractor={(item) => item.id}
        />
      </View>
      <View className={`bg-slate-800 p-2 ${Platform.select({android :'mt-2 py-5'})}`}>
         <View className="flex-row flex justify-between px-2">
          <View>
            <Text className={`text-white font-bold text-lg ${Platform.select({android  :  'text-sm'})}`}> Total (5) Items </Text>
            <Text className={`text-white font-bold text-lg ${Platform.select({android  :  'text-sm'})}`}> 3425 Tshs </Text>
          </View>
          <TouchableOpacity style={{alignSelf : 'center'}} className={`bg-orange-500 rounded-lg px-4 py-2 w-5/12`} >
             <Text className={`text-white font-medium text-center ${Platform.select({ios  :  'text-lg'})}`}> Place Order </Text>
          </TouchableOpacity>
         </View>
      </View>
    </View>
  )
}

export default CartScreen