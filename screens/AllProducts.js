import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React, { useLayoutEffect, useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import  {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'

import image1 from '../assets/images/pexels-elevate-1267320.jpg';
import image2 from '../assets/images/pexels-matheus-guimarÃ£es-1291712.jpg';
import image3 from '../assets/images/pexels-julias-torten-und-tÃ¶rtchen-1120464.jpg';
import image4 from '../assets/images/pexels-pixabay-262978.jpg';
import image5 from '../assets/images/pexels-miguel-Ã¡-padriÃ±Ã¡n-1591060.jpg';
import image6 from '../assets/images/pexels-william-choquette-2641886.jpg';
import image7 from '../assets/images/product-741755043-1673243019360.jpeg';
import ProductCard from '../components/ProductCard';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProducts } from '../store/actions/product_actions';


const data = [
    {name : "vegetables", image :image1, id : 1 },
  {name : "Fruits", image :image2, id : 2 },
  {name : "Drinks", image :image3, id: 3 },
  {name : "Bites", image : image4 , id : 4},
  {name : "Fast food", image :image1, id: 5 },
  {name : "Fruits", image :image2, id : 6 },
  {name : "Bites", image : image5 , id : 4},
  {name : "Fast food", image :image6, id: 5 },
  {name : "Fruits", image :image7, id : 6 },
]


const AllProducts = () => {

    const navigation =  useNavigation();
    const {width, height} =  useWindowDimensions();
    const dispatch =  useDispatch();
    const [reload, setReload] =  useState(0)

    const  products =  useSelector(state => state.product);
    // console.log(products.all_products)

    setTimeout(() => {
        if(reload <5){
            setReload(reload => reload + 1)
        }
    }, 1000);


    useEffect(() => {
        if(products  && products.all_products && reload < 4){
          dispatch( getAllProducts() );
        }
      })

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
        <View style={{alignSelf : 'center'}} className="border-slate-400 border-b-2 w-10/12" >           
            <Text className="text-lg text-white text-center font-bold py-3" >AllProducts</Text>
        </View>
        <View style={{height  : responsiveHeight(82.5)}} className="my-4 mb-10">
            { products?.all_products?.data?.data?
          <>
          <FlatList 
           data={products.all_products.data.data}
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
           :  null    
        }
        </View>
    </View>
  )
}

export default AllProducts