import { View, Text, TouchableOpacity, useWindowDimensions,TextInput, StyleSheet, ScrollView, FlatList, Platform } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import {Controller, useForm} from 'react-hook-form'
import { Ionicons, FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons }  from '@expo/vector-icons'
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions'


import image1 from '../assets/images/pexels-william-choquette-2641886.jpg';
import image2 from '../assets/images/pexels-elevate-1267320.jpg';
import image3 from '../assets/images/pexels-elina-sazonova-1850595.jpg';
import image4 from '../assets/images/pexels-pixabay-262978.jpg';
// import categoryCard from '../components/categoryCard';
import CategoryCard from '../components/categoryCard';
import ProductCard from '../components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationDrawer from '../components/NavigationDrawer'

const categories =  [
  {name : "vegetables", image :image1, id : 1 },
  {name : "Fruits", image :image2, id : 2 },
  {name : "Drinks", image :image3, id: 3 },
  {name : "Bites", image : image4 , id : 4},
  {name : "Fast food", image :image1, id: 5 },
  {name : "Fruits", image :image2, id : 6 },
]

const HomeScreen = () => {
    
    const navigation =  useNavigation();
    const {height, width} =  useWindowDimensions()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    // console.log(height);
   

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
      {/* <SafeAreaView className="" /> */}
    <View style={{ height : height, width : width, backgroundColor :  '#0e2433'}} className={`bg-slate-800 text-white relative px-1`}>
      <View style={{height : responsiveHeight(2.8)}} className={`flex-row justify-between px-4 mt-16 ${height<=500?Platform.select({android : 'mt-8'}) :height>700?Platform.select({android : 'mt-14'}) :Platform.select({android : 'mt-8'})}`} >

        <View className="" >
            <TouchableOpacity className="rounded-lg bg-whitee h-8  w-8"
               onPress={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                <Text>
                    <FontAwesome name='navicon' size={32}  color="white"  />
                </Text>
            </TouchableOpacity>
        </View>
        <View className="" >
        <TouchableOpacity className="rounded-lg bg-whitee h-8  w-8" >
                <Text>
                <Ionicons name="notifications-sharp" size={32} color="white" />
                </Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={{alignSelf : 'center', height : responsiveHeight(5)}} className="my-8 flex-row space-x-6 justify-between w-full px-3" >
      <View className="w-10/12">       
      <Controller
        control={control}
        rules={{
          required: {value : true, message :  "Password is required"},
          pattern: {
            value: /^([a-zA-Z0-9]{8,16})$/,
            message: 'Must contain atleast 8 characters'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-600 text-lg text-white px-4 h-10 py-1  'border-2 border-green-500 ${Platform.select({android : 'py-1.5'})}`}
          placeholder="Search"
            onBlur={onBlur}
            paddingVertical={1}
            autoCapitalize={false}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="search"
      />
      </View>
      <TouchableOpacity className="" >
        <Text className="" > 
        <MaterialCommunityIcons name="sort" size={42} color="white" />
         </Text>
      </TouchableOpacity>
      </View>
      <View style={{height : responsiveHeight(27) }} className={`w-full ${Platform.select({android : 'mt-2'})}`} >
        <View className="flex-row justify-between" >
          <View>
             <Text className={`text-white font-bold text-lg px-2 py-1.5 ${Platform.select({android : 'text-sm'})}`} >Categories</Text>
          </View>
           <TouchableOpacity
            onPress={() =>  navigation.navigate('AllCategories')}
           > 
           <Text className={`text-amber-500 text-lg mr-1 ${Platform.select({android : 'text-sm mr-2'})}`}  > See All </Text>  
           </TouchableOpacity>
        </View>
        
         <FlatList 
          data={categories}
          horizontal = {true}
          showsHorizontalScrollIndicator ={false}
          contentContainerStyle = {{
            paddingHorizontal : 1,
            paddingVertical : 5
          }}
          renderItem={(itemData) => {
            return (
               <CategoryCard name={itemData.item.name} image={itemData.item.image}  />
            )
          }}
          keyExtractor={(item) => item.id}
         />
      </View>

      <View className={` mb-1.5 ${height> 750? '-mt-10' : '-mt-4'} ${height > 700 ?Platform.select({android : '-mt-8'}) : ''}`} >
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
          <FlatList className="borderd-2 border-gray-400 rounded pr-3 pl-1" 
           numColumns={2}
           data={categories}
           renderItem={(itemData) => {
            return (
              <ProductCard name={itemData.item.name} image={itemData.item.image}  />
            )
           }}
          />
        </View>
      </View>

      <View style={[style.drawer, isDrawerOpen ? { left: 0 } : { left: -250 }]} className="bg-slatee-700">
          <TouchableOpacity onPress={() => setIsDrawerOpen(false)} className="pt-4 right-2 my-2">
            <Ionicons name="close" size={48} color="red" />
          </TouchableOpacity>

          <NavigationDrawer  />
      </View>

    </View>
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