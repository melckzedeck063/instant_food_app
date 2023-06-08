import { View, Text, useWindowDimensions, FlatList, TextInput } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

import image1 from '../assets/images/pexels-elina-sazonova-1850595.jpg';
import image2 from '../assets/images/pexels-elina-sazonova-1850595.jpg';
import image3 from '../assets/images/pexels-elina-sazonova-1850595.jpg';
import image4 from '../assets/images/pexels-elina-sazonova-1850595.jpg';
// import categoryCard from '../components/categoryCard';
import { useState, useEffect } from 'react'
import {Controller, useForm, Control} from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons';

import CategoryCard from '../components/categoryCard';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch,useSelector } from 'react-redux';
import { getAllRestaurant } from '../store/actions/restaurant_action';
import RestaurantSkeleton from '../components/RestaurantSkeleton';

const categories =  [
  {name : "vegetables", image :image1, id : 1 },
  {name : "Fruits", image :image2, id : 2 },
  {name : "Drinks", image :image3, id: 3 },
  {name : "Bites", image : image4 , id : 4},
  {name : "Fast food", image :image1, id: 5 },
  {name : "Fruits", image :image2, id : 6 },
]

const AllCategories = () => {

    const navigation =  useNavigation();
    const {width,height} =  useWindowDimensions()
    const [reload, setReload]=  useState(0)
    const dispatch= useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

    setTimeout(() => {
      if(reload < 5){
        setReload(reload => reload + 1)
      }
    }, 1000);


    const restaurants =   useSelector(state => state.restaurant);
    // console.log(restaurants.restaurants)

    useEffect(() => {
      if(restaurants && restaurants.restaurants.length < 1 && reload < 4){
        dispatch( getAllRestaurant() )
      }
    })

    const {  control } = useForm();
    const [items, setItems] =  useState([]);
    // setItems(restaurants.restaurants.data.data)
    useEffect(() => {
      if (
        restaurants &&
        restaurants.restaurants &&
        restaurants.restaurants.data &&
        restaurants.restaurants.data.data
      ) {
        setItems(restaurants.restaurants.data.data);
        setFilteredData(restaurants.restaurants.data.data)
        // console.log('data set');
      }
    }, [restaurants]);

  const handleSearch = (text) => {
  const updatedSearchQuery = text; // Use a separate variable to store the updated search query
  setSearchQuery(updatedSearchQuery);

  const filteredResults = items.filter((item) => {
    const propertiesToSearch = ['restaurantName', 'location']; // adjust to the properties you want to search
    return propertiesToSearch.some((property) =>
      item[property].toLowerCase().includes(updatedSearchQuery.toLowerCase())
    );
    // item.restaurantName.toLowerCase().includes(text.toLowerCase())

  });

  setFilteredData(filteredResults);
}



  // console.log(items)
  // console.log(items, "home")


    useLayoutEffect(() => 
    {
        navigation.setOptions({
            // headerShown : false,
            headerStyle : {
                backgroundColor : "#161E35"
            },
            headerTintColor : "white"
        })
    })
    
  return (
    <View className="w-full h-full bg-slate-800">
      <View style={{alignSelf : "center"}} className="my-4 border-b-2 border-slate-400 w-11/12">
        {/* <Text className="text-lg text-center text-green-500" > All Categories </Text> */}

      <View style={{alignSelf : 'center'}} className={`my-3 bg-red-100 flex flex-row space-x-3 rounded-lg  ${width < 480 ? 'ml-1.5 w-9/12' : 'ml-4 w-10/12' } `}>
        <Text className={`mt-1.5 mx-1`} > <Ionicons name='search' size={28} /> </Text>
         <Controller
        control={control}
        rules={{
          required: true,
          min : 8
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-reds-300 text-lg px-4 pb-1 -mt-1.5 ${Platform.select({android : 'py-1.5'})}` }
          placeholder="Search"
          onBlur={onBlur}
          value={searchQuery}
          onChangeText={handleSearch}
          />
        )}
        name="searchQuery"
      />
      
      {/* {errors.password && <Text className="text-red-500">This is required.</Text>} */}
       </View>
      </View>


      <View style={{alignSelf : 'center'}} className="px-2 w-11/12">
      {
          restaurants?.restaurants?.data?.data?(
            <>
          <FlatList 
           data={filteredData}
           numColumns={2}
           contentContainerStyle = {{
             paddingHorizontal : 1,
             paddingVertical : 5
           }}
           renderItem={(itemData) => {
             return (
                <CategoryCard name={itemData.item.restaurantName} image={itemData.item.photo} desc={itemData.item.description} id={itemData.item._id}   />
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
    </View>
  )
}

export default AllCategories