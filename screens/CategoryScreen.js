import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import * as SecureStore from 'expo-secure-store';

import ProductCard from '../components/ProductCard';
import { IMAGE_URL, NEW_IMAGE_URL } from '../store/URL'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantProducts } from '../store/actions/product_actions'
import ProductSkeleton from '../components/productSkeleton'


const CategoryScreen = () => {
    const navigation =  useNavigation();
    const {params : {props}} =  useRoute();
    const {width, height} =  useWindowDimensions();
    const [reload, setReload] = useState(0);
    const [isOWner , setIsOwner] = useState(false)
    const  dispatch =  useDispatch();


    const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);

    setTimeout(() => {
      if(reload < 5){
        setReload(reload => reload + 1)
      }
    }, 1000);

    const restaurantProducts = useSelector(state => state.product);
    // console.log(restaurantProducts.restaurant_products);

    // console.log(props);

    const gettToken =  async () => {
      const storage = await SecureStore.getItemAsync('token');
      const user_role =  JSON.parse(storage)
      // console.log( "user role : ",user_role.doc.user.role)
      // console.log(props)
      if(user_role.doc.user.role === "admin" || user_role.doc.user._id === props.register._id){
        setIsOwner(true)
      }
      
    }
  // console.log(isOWner)
    gettToken();

    useLayoutEffect(() => {
        navigation.setOptions({
        //    headerShown : false
        })
    })

    useEffect(() => {
      if(restaurantProducts && restaurantProducts.restaurant_products && reload < 4 ){
        dispatch( getRestaurantProducts(props.id) )
      }
    })

  return (
    <>
     {/* <ScrollView   > */}
     <View style={{backgroundColor :  '#0e2433'}} className="h-full">
     <View className="relative">
        <Image style={{height : responsiveHeight(31)}} source={{uri : `${NEW_IMAGE_URL}/${props.image}`}} className="w-full" />
        <View className='absolute inset-0 bg-black/60' ></View>
        <View className="absolute bottom-2 px-2">
            {/* <Text className={`font-bold my-1.5 text-2xl capitalize text-white ${Platform.select({android : 'text-xl'})}`}>{props.name}</Text> */}
        </View>
      </View>

     <View className="mx-2 px-2 mb-2">
      <View className={`flex flex-row justify-between my-3 ${height <  850 ?  'my-2' :  ''}`}>
        <Text className={`font-bold capitalize text-white text-xl py-2 ${Platform.select({android : 'text-lg'})}`}>{props.name}</Text>

        {
          isOWner &&(
            <TouchableOpacity className="px-2 h-9 -p-1 bg-orange-400 flex flex-row space-x-2 rounded-lg"
            onPress={()  => navigation.navigate('NewProduct',{
              props
            }) }
          >
            <Text className={`mt-0.5`}>
              {Platform.select({android :<Ionicons name='add-circle' size={24}  color="white" /> ,  ios :<Ionicons name='add-circle' size={32}  color="white" /> })}
            </Text>
            <Text className={`text-white font-bold mt-1 text-lg ${Platform.select({android : 'text-sm'})}`}>New</Text>
          </TouchableOpacity>
          )
        }
        
       

      </View>
        <Text className={`font-mediumm capitalize text-slate-100 ${height  < 838 ? '-mt-1' :  ''} px-2 ${Platform.select({android : 'text-xs'})}`}> {props.desc} </Text>
     </View>

     <View className={``}>

     </View>

      <View style={{height : responsiveHeight(41)}} className={`w-full mb-3 px-2.5 ${Platform.select({android : 'mt-2'})}`} >
        <View className="flex-row justify-between" >
          <View>
             <Text className={`text-white font-bold text-xl px-2 -mt-1 pb-1.5 ${Platform.select({android : 'text-lg'})}`} >Available Products</Text>
          </View>
           {/* <TouchableOpacity
            onPress={() =>  navigation.navigate('AllCategories')}
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-2'})}`}  > See All </Text>  
           </TouchableOpacity> */}
        </View>
        {
          restaurantProducts?.restaurant_products?.data?.product.length >=1?(
            <>
          <FlatList 
           data={restaurantProducts.restaurant_products.data.product}
           horizontal = {false}
           showsHorizontalScrollIndicator ={false}
           numColumns={2}
           contentContainerStyle = {{
             paddingHorizontal : 1,
             paddingVertical : 5
           }}
           renderItem={(itemData) => {
             return (
               <ProductCard name={itemData.item.productName} image={itemData.item.photo} price={itemData.item.price} quantity={itemData.item.quantity}
                 prepared_by={itemData.item.prepared_by} 
                 desc = {itemData.item.description} id={itemData.item._id}
                 />
             )
           }}
           keyExtractor={(item) => item.id}
          />
            </>
          )
          :
          <>
             <View className="flex-row justify-between mx-1">
              <ProductSkeleton  />
              <ProductSkeleton  />
             </View>
          </>
        }
      </View>

     </View>
     {/* </ScrollView> */}
    </>
  )
}

export default CategoryScreen