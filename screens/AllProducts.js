import { View, Text, useWindowDimensions, FlatList,TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import  {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import {Controller, useForm, Control} from 'react-hook-form'

import image1 from '../assets/images/product-741755043-1673243019360.jpeg';

import ProductCard from '../components/ProductCard';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProducts } from '../store/actions/product_actions';
import ProductSkeleton from '../components/productSkeleton';
import { Ionicons } from '@expo/vector-icons';


const data = [
    {name : "vegetables", image :image1, id : 1 },
  {name : "Fruits", image :image1, id : 2 },
  {name : "Drinks", image :image1, id: 3 },
  {name : "Bites", image : image1 , id : 4},
  {name : "Fast food", image :image1, id: 5 },
  {name : "Fruits", image :image1, id : 6 },
  {name : "Bites", image : image1 , id : 4},
  {name : "Fast food", image :image1, id: 5 },
  {name : "Fruits", image :image1, id : 6 },
]


const AllProducts = () => {

    const navigation =  useNavigation();
    const {width, height} =  useWindowDimensions();
    const dispatch =  useDispatch();
    const [reload, setReload] =  useState(0)
    const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

    const  products =  useSelector(state => state.product);
    // console.log(products.all_products)

    setTimeout(() => {
        if(reload <5){
            setReload(reload => reload + 1)
        }
    }, 1000);


    useEffect(() => {
        if(products  && products.all_products && reload < 4){
          // dispatch( getAllProducts() );
        }
      })

      const {  control } = useForm();

      const [items,setItems] =  useState([])

      useEffect(() => {
        if(products && 
          products.all_products &&
          products.all_products.data &&
          products.all_products.data.data
          ){
            setItems(products.all_products.data.data);
            setFilteredData(products.all_products.data.data)
          }
      },[products])

      const handleSearch = (text) => {
        const updatedSearchQuery = text; // Use a separate variable to store the updated search query
        setSearchQuery(updatedSearchQuery);
      
        const filteredResults = items.filter((item) => {
          const propertiesToSearch = ['productName', 'price']; // adjust to the properties you want to search
          return propertiesToSearch.some((property) =>
            item[property].toLowerCase().includes(updatedSearchQuery.toLowerCase())
          );
          // item.restaurantName.toLowerCase().includes(text.toLowerCase())
      
        });
      
        setFilteredData(filteredResults);
      }

      
    useLayoutEffect (() => {
        navigation.setOptions({
            headerStyle : {
                backgroundColor : "#161E35"
            },
            headerTintColor : "white"
        })
    })

    return (


    <View style={{width : width, height : height, marginBottom : 20}} className="bg-slate-900 mb-6">
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
        <View style={{height  : responsiveHeight(82.5)}} className="my-4 mb-10">
            { products?.all_products?.data?.data?
          <>
          <FlatList 
           data={filteredData}
           numColumns={2}
           style={{
            padding : 3,
            marginBottom : 12,
            height : height/1.3
           }}
           renderItem = {(itemData) => {
            return (
               <ProductCard name={itemData.item.productName} image={itemData.item.photo} price={itemData.item.price} quantity={itemData.item.quantity}
                 prepared_by={itemData.item.prepared_by} 
                 desc = {itemData.item.description}  id={itemData.item._id}
                 />
            )
           }}
           keyExtractor={(item) => item._id}
          />
          </>
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
  )
}

export default AllProducts