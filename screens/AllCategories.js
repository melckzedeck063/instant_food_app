import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

import image1 from '../assets/images/pexels-pixabay-38544.jpg';
import image2 from '../assets/images/pexels-miguel-Ã¡-padriÃ±Ã¡n-1591060.jpg';
import image3 from '../assets/images/pexels-julias-torten-und-tÃ¶rtchen-1120464.jpg';
import image4 from '../assets/images/pexels-realtoughcandycom-11035380.jpg';
// import categoryCard from '../components/categoryCard';

import CategoryCard from '../components/categoryCard';
import { SafeAreaView } from 'react-native-safe-area-context'

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
    <View className="w-full h-full bg-slate-900">
      <View style={{alignSelf : "center"}} className="my-4 border-b-2 border-slate-400 w-10/12">
        <Text className="text-lg text-center text-green-500" > All Categories </Text>
      </View>
      <View className="">
         <FlatList
          data={categories}
          numColumns={3} 
          renderItem={(itemData) => {
            return(
                <CategoryCard name={itemData.item.name} image={itemData.item.image}  />
            )
          }}
          keyExtractor={(item) =>item.id }
         />
      </View>
    </View>
  )
}

export default AllCategories