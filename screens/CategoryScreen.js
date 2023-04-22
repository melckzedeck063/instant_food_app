import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {useResponsiveHeight, useResponsiveWidth, useResponsiveFontSize} from 'react-native-responsive-dimensions';

import image1 from '../assets/images/pexels-william-choquette-2641886.jpg';
import image2 from '../assets/images/pexels-elevate-1267320.jpg';
import image3 from '../assets/images/pexels-elina-sazonova-1850595.jpg';
import image4 from '../assets/images/pexels-pixabay-262978.jpg';
// import categoryCard from '../components/categoryCard';
// import CategoryCard from '../components/categoryCard';
import ProductCard from '../components/ProductCard';


const categories =  [
  {name : "vegetables", image :image1, id : 1 },
  {name : "Fruits", image :image2, id : 2 },
  {name : "Drinks", image :image3, id: 3 },
  {name : "Bites", image : image4 , id : 4},
  {name : "Fast food", image :image1, id: 5 },
  {name : "Fruits", image :image2, id : 6 },
]

const CategoryScreen = () => {
    const navigation =  useNavigation();
    const {params : {props}} =  useRoute();
    const {width, height} =  useWindowDimensions();

    // console.log(props);

    useLayoutEffect(() => {
        navigation.setOptions({
        //    headerShown : false
        })
    })

  return (
    <>
     {/* <ScrollView   > */}
     <View style={{backgroundColor :  '#0e2433'}} className="h-full">
     <View className="relative">
        <Image style={{height : height/3.1}} source={props.image} className="w-full" />
        <View className='absolute inset-0 bg-black/60' ></View>
        <View className="absolute bottom-2 px-2">
            {/* <Text className={`font-bold my-1.5 text-2xl capitalize text-white ${Platform.select({android : 'text-xl'})}`}>{props.name}</Text> */}
        </View>
      </View>

     <View className="mx-2 px-2 mb-3">
      <View className="flex flex-row justify-between my-4">
        <Text className={`font-bold capitalize text-white text-xl py-2 ${Platform.select({android : 'text-lg'})}`}>{props.name}</Text>
        <TouchableOpacity className="px-2 h-9 -p-1 bg-orange-400 flex flex-row space-x-2 rounded-lg">
          <Text className={`mt-0.5`}>
            {Platform.select({android :<Ionicons name='add-circle' size={24}  color="white" /> ,  ios :<Ionicons name='add-circle' size={32}  color="white" /> })}
          </Text>
          <Text className={`text-white font-bold mt-1 text-lg ${Platform.select({android : 'text-sm'})}`}>New</Text>
        </TouchableOpacity>
      </View>
        <Text className={`font-mediumm capitalize text-slate-100 px-2 ${Platform.select({android : 'text-xs'})}`}> 
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quam suscipit veniam ut doloremque quas, reprehenderit commodi deserunt 
         perferendis ducimus ullam fuga sequi optio laboriosam quaerat ipsum asperiores eius nemo.
        </Text>
     </View>

     <View className={``}>

     </View>

      <View style={{height : height/2.6 }} className={`w-full px-2.5 ${Platform.select({android : 'mt-2'})}`} >
        <View className="flex-row justify-between" >
          <View>
             <Text className={`text-white font-bold text-lg px-2 py-1.5 ${Platform.select({android : 'text-sm'})}`} >Available Products</Text>
          </View>
           {/* <TouchableOpacity
            onPress={() =>  navigation.navigate('AllCategories')}
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-2'})}`}  > See All </Text>  
           </TouchableOpacity> */}
        </View>
        
         <FlatList 
          data={categories}
          horizontal = {false}
          showsHorizontalScrollIndicator ={false}
          numColumns={2}
          contentContainerStyle = {{
            paddingHorizontal : 1,
            paddingVertical : 5
          }}
          renderItem={(itemData) => {
            return (
               <ProductCard name={itemData.item.name} image={itemData.item.image}  />
            )
          }}
          keyExtractor={(item) => item.id}
         />
      </View>

     </View>
     {/* </ScrollView> */}
    </>
  )
}

export default CategoryScreen