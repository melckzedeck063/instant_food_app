import { View, Text, TouchableOpacity, useWindowDimensions,TextInput, StyleSheet, ScrollView, FlatList, Platform, TouchableWithoutFeedback, ScrollViewBase } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import {Controller, useForm} from 'react-hook-form'
import { Ionicons, FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons }  from '@expo/vector-icons'
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions'


// import categoryCard from '../components/categoryCard';
import CategoryCard from '../components/categoryCard';
import ProductCard from '../components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationDrawer from '../components/NavigationDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurant } from '../store/actions/restaurant_action'
import { getAllProducts } from '../store/actions/product_actions'
import ProductSkeleton from '../components/productSkeleton'
import RestaurantSkeleton from '../components/RestaurantSkeleton'
import WelcomeCard from '../components/WelcomeCard'



const HomeScreen = () => {
    
    const navigation =  useNavigation();
    const {height, width} =  useWindowDimensions()
    const [reload, setReload]  =  useState(0);
    const dispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    setTimeout(() => {
      if(reload < 5){
        setReload(reload => reload + 1)
      }
    }, 1000);


    const restaurants =   useSelector(state => state.restaurant);
    // console.log(restaurants.restaurants)

    const  products =  useSelector(state => state.product);
    // console.log(products.all_products)

    useEffect(() => {
      if(restaurants && restaurants.restaurants && reload < 4){
        dispatch( getAllRestaurant() )
      }
    })
    // console.log(height);

    const handleOutsidePress = (event) => {

      setIsDrawerOpen(false);
};
   
useEffect(() => {
  if(products  && products.all_products && reload < 4){
    dispatch( getAllProducts());
  }
})

    useLayoutEffect(() => 
    {
        navigation.setOptions({
            headerShown : false,
            headerStyle : {
                backgroundColor : "black"
            },
            headerTintColor : "white"
        })
    })

    const { register, reset, control, handleSubmit, formState: { errors, isDirty, isValid } } =  useForm();
 
   


  return (
    <>
    <TouchableWithoutFeedback  onPress={handleOutsidePress} >
    
      {/* <SafeAreaView className="" /> */}
    <View style={{ height : height, width : width, backgroundColor :  '#0e2433'}} className={`bg-slate-800 text-white relative px-1`}>
      <View style={{height : responsiveHeight(2)}} className={`flex-row justify-between px-4 mt-12 mb-5 ${height<=500?Platform.select({android : 'mt-6'}) :height>700?Platform.select({android : 'mt-9'}) :Platform.select({android : 'mt-6'})}`} >

        <View className="" >
            <TouchableOpacity className="rounded-lg bg-whitee h-8  w-8"
               onPress={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                <Text >
                  {Platform.select({android : <FontAwesome name='navicon' size={24}  color="orange"  /> })}
                  {Platform.select({ios : <FontAwesome name='navicon' size={32}  color="orange"  /> })}
                </Text>
            </TouchableOpacity>
        </View>
        <View className="" >
        <TouchableOpacity className="rounded-lg bg-whitee h-8  w-8" >
                <Text>
                {Platform.select({android : <Ionicons name="heart" size={24} color="orange" /> })}
                {Platform.select({ios : <Ionicons name="heart" size={32} color="orange" />})}
                
                </Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={{alignSelf : 'center', height : responsiveHeight(14)}} className="mt-4 mb-2 flex-row space-x-6 justify-between w-full px-3" >
        <WelcomeCard  />
      </View>
      {/* <View style={[style.card, style.ad_card]} className={``}>

      </View> */}
      <View style={{height : responsiveHeight(26) }} className={`w-full ${Platform.select({android : 'mt-1'})}`} >
        <View className="flex-row justify-between" >
          <View>
             <Text className={`text-white font-bold text-lg px-2 py-1.5 ${Platform.select({android : 'text-sm'})}`} >Restaurants</Text>
          </View>
           <TouchableOpacity
            onPress={() =>  navigation.navigate('AllCategories')}
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-2'})}`}  > See All </Text>  
           </TouchableOpacity>
        </View>
         {
          restaurants?.restaurants?.data?.data?(
            <>
          <FlatList 
           data={restaurants.restaurants.data.data}
           horizontal = {true}
           showsHorizontalScrollIndicator ={false}
           contentContainerStyle = {{
             paddingHorizontal : 1,
             paddingVertical : 5
           }}
           renderItem={(itemData) => {
             return (
                <CategoryCard name={itemData.item.restaurantName} image={itemData.item.photo} register={itemData.item.registered_by} desc={itemData.item.description} id={itemData.item._id}  />
             )
           }}
           keyExtractor={(item) => item._id}
          />
            </>
          )
          :
          <>
          <View className="flex-row justify-between mx-1.5">
            <RestaurantSkeleton />
            <RestaurantSkeleton />
            <RestaurantSkeleton />
          </View>
          </>
         }

         
      </View>

      <View className={` mb-1.5 ${height> 750? '-mt-16' : '-mt-3'} ${height > 700 ?Platform.select({android : '-mt-8'}) : ''}`} >
        <View style={style.container} className="" >
         <View className="flex-row justify-between" >
          <View>
             <Text className={`text-white font-bold text-lg px-2 py-1.5 ${Platform.select({android : 'text-sm'})}`} > Products </Text>
          </View>
           <TouchableOpacity 
            onPress={() =>  navigation.navigate('AllProducts')}
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-3'})}`} > See All </Text>  
           </TouchableOpacity> 
          </View>
          {
            products?.all_products?.data?.data?(
              <>
            <FlatList className="borderd-2 border-gray-400 rounded pr-3 pl-1" 
             numColumns={2}
             data={products.all_products.data.data}
             renderItem={(itemData) => {
              return (
                <ProductCard name={itemData.item.productName} image={itemData.item.photo} price={itemData.item.price} quantity={itemData.item.quantity}
                 prepared_by={itemData.item.prepared_by} 
                 desc = {itemData.item.description}  id={itemData.item._id}
                 />
              )
             }}
            />
              </>
            )
            :
            <ScrollView className="mx-3">
            <View className="flex-row justify-between">
               <ProductSkeleton />
               <ProductSkeleton />
            </View>
            <View className="flex-row justify-between">
               <ProductSkeleton />
               <ProductSkeleton />
            </View>
          </ScrollView>
          }
        </View>
      </View>

      <View style={[style.drawer, isDrawerOpen ? { left: 0 } : { left: -250 }]} className="bg-slatee-700">
          

          <NavigationDrawer  />
      </View>

    </View>
    </TouchableWithoutFeedback>
    </>
  )
}

export default HomeScreen

const style = StyleSheet.create({
  card: {
    flex  : 1,
    elevation : 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset :{width : 0, height : 2} ,
    shadowOpacity: 0.25,
    shadowRadius : 8,
    width  : '90%'
   },
   ad_card :  {
    height  : responsiveHeight(10)
   },
   container: {
    height: responsiveHeight(46), // 50% of window height
    width: responsiveWidth(100), // 50% of window width
  },
  sampleText: {
    fontSize: responsiveFontSize(2) // 2% of total window size
  },
  drawer: {
    position: "absolute",
    left: -280,
    top: 0,
    bottom: 0,
    width: responsiveWidth(60),
    // height : responsiveHeight(80),
    backgroundColor :  '#1c4966',
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
})