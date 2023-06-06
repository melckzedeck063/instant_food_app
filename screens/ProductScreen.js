import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {useResponsiveHeight, useResponsiveWidth, useResponsiveFontSize} from 'react-native-responsive-dimensions'
import { IMAGE_URL, NEW_IMAGE_URL } from '../store/URL'
import { useCart } from 'react-use-cart'

const ProductScreen = () => {

    const navigation =  useNavigation();
    const {params : {props}} =  useRoute();
    const {width, height} =  useWindowDimensions();
    const [amount,setAmount]  = useState(1);

    const {addItem} = useCart()

    // console.log(props);

    useLayoutEffect(() => {
        navigation.setOptions({
        //    headerShown : false
        })
    })

    const handlCartItem = (data) => {
        props.quantity = amount
    
        // console.log(data)
        addItem(data);
      }


    const handleIncrement  = useCallback(() => {
        setAmount((prevAmount) => prevAmount + 1)
    },[])

    const handleDecrement = useCallback(() => {
        if(amount >=  2){
            setAmount((prevAmount) => prevAmount - 1)
        }
    })

  return (
    <>
     <ScrollView style={{backgroundColor : '#0e2433'}}  className="bg-slate-800 h-full">
     <View >
     <View className="relative">
        <Image style={{height : height/2.6}} source={{uri : `${NEW_IMAGE_URL}/${props.image}`}} className="w-full" />
        <View className='absolute inset-0 bg-black/30' ></View>
        <View className="absolute bottom-2 px-2">
            <Text className={`font-bold my-1.5 text-2xl capitalize text-white ${Platform.select({android : 'text-xl'})}`}>{props.name}</Text>
            <View  className="flex flex-row justify-between bg-orange-500 p-0.5 rounded-lg">
                <TouchableOpacity className={`bg-slatee-700 rounded-full h-10 w-10 mt-1 ${!amount > 1? '' : ''}`}
                disabled={!amount > 1}
                 onPress={handleDecrement}
                >
                    <Text className="text-center font-bold -ml-0.5 -mt-0.5">
                        {Platform.select({ios : <FontAwesome name='minus-circle' size={42} color={`${!amount > 1 ? 'grey' : 'white'}`} /> })}
                        {Platform.select({android : <FontAwesome name='minus-circle' size={32} color="white" /> })}
                          </Text>
                </TouchableOpacity>
                <Text className={`font-bold text-white text-3xl px-2 py-1 ${Platform.select({android : 'text-2xl'})}`}> {amount} </Text>
                <TouchableOpacity className={`bg-slatee-700 rounded-full h-10 w-10 mt-1`}
                 onPress={handleIncrement}
                >
                    {Platform.select({ios : <Text className="text-center font-bold -ml-0.5 -mt-0.5"> <Ionicons name='ios-add-circle' size={42} color="white" /> </Text> })}
                    {Platform.select({android : <Text className="text-center font-bold -ml-0.5 -mt-0.5"> <Ionicons name='ios-add-circle' size={32} color="white" /> </Text> })}
                    
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View className="flex flex-row justify-between py-2 my-2 px-4">
        <View>
            <Text className={`font-bold capitalize text-white text-xl ${Platform.select({android : 'text-lg'})}`}>{props.name}</Text>
            <Text className={`text-white font-medium py-1 ${Platform.select({android : 'text-xs'})}`}>Product category</Text>
        </View>
        <View>
            <Text className={`text-white font-bold text-2xl py-2 ${Platform.select({android : 'text-xl'})}`}> {props.price} Tshs</Text>
        </View>
      </View>

     <View className="mb-3 p-2">
       <Text className={`font-bold capitalize text-white px-1.5 text-xl ${Platform.select({android : 'text-lg'})}`}>Ingredients</Text>
       <View className="bg-slate-700 rounded-lg shadow-lg felx flex-row justify-between m-3 py-1 px-2">
        <View className="bg-slate-600 rounded-2xl w-10 h-10">
            <Text className="text-center font-bold mt-1"> <MaterialCommunityIcons name='fruit-watermelon' size={32} color="orange" /> </Text>
        </View>
        <View className="bg-slate-600 rounded-2xl w-10 h-10">
            <Text className="text-center mt-1 font-bold"><MaterialCommunityIcons name='fruit-grapes' size={32} color="red" /></Text>
        </View>
        <View className="bg-slate-600 rounded-2xl w-10 h-10">
            <Text className="text-center mt-1 font-bold"><MaterialCommunityIcons name='fruit-pineapple' size={32} color="gold" /></Text>
        </View>
        <View className="bg-slate-600 rounded-2xl w-10 h-10">
            <Text className="text-center mt-1 font-bold"><MaterialCommunityIcons name='fruit-citrus' size={32} color="orange" /></Text>
        </View>
       </View>
     </View>

     <View className="mx-2 px-2 mb-3">
        <Text className={`font-bold capitalize text-white text-xl ${Platform.select({android : 'text-lg'})}`}>Description</Text>
        <Text className={`font-mediumm capitalize text-white px-2 ${Platform.select({android : 'text-xs'})}`}> 
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quam suscipit veniam ut doloremque quas, reprehenderit commodi deserunt 
         perferendis ducimus ullam fuga sequi optio laboriosam quaerat ipsum asperiores eius nemo.
        </Text>
     </View>

     <View style={{height : height/9.99, width : width}} className="mt-8 px-3 bg-slate-700 w=full">
        <View className="flex flex-row mt-1  justify-between">
            <View className=""> 
                <Text className={`font-bold text-white text-xl ${Platform.select({android : 'text-lg'})}`}> Total</Text>
                <Text className={`font-bold text-amber-500 text-xl ${Platform.select({android : 'text-lg'})}`}> {(props.price) * amount } Tshs </Text>  
            </View>
            <TouchableOpacity className="bg-orange-500 rounded-lg h-10 px-4 py-0.5 mt-4"
             onPress={() => handlCartItem(props) }
            >
                <Text className={`font-bold text-white mt-1 text-lg ${Platform.select({android : 'text-sm'})}`}>Add  to Cart</Text>
            </TouchableOpacity>
        </View>
     </View>

     </View>
     </ScrollView>
    </>
  )
}

export default ProductScreen
