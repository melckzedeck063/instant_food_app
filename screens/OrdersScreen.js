import { View, Text, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useWindowDimensions } from 'react-native';


import image1 from '../assets/images/pexels-elevate-1267320.jpg';
import image2 from '../assets/images/pexels-matheus-guimarÃ£es-1291712.jpg';
import image3 from '../assets/images/pexels-julias-torten-und-tÃ¶rtchen-1120464.jpg';
import image4 from '../assets/images/pexels-pixabay-262978.jpg';
import image5 from '../assets/images/pexels-miguel-Ã¡-padriÃ±Ã¡n-1591060.jpg';
import image6 from '../assets/images/pexels-william-choquette-2641886.jpg';
import image7 from '../assets/images/product-741755043-1673243019360.jpeg';
import OrderComponent from '../components/OrderComponent';


const data = [
    {name : "vegetables", image :image1, id : 1 },
  {name : "Fruits", image :image2, id : 2 },
  {name : "Drinks", image :image3, id: 3 },
  {name : "Bites", image : image4 , id : 4},
  {name : "Fast food", image :image1, id: 5 },
  {name : "Fruits", image :image2, id : 6 },
  {name : "Bites", image : image5 , id : 14},
  {name : "Fast food", image :image6, id: 15 },
  {name : "Fruits", image :image7, id : 10 },
]

const OrdersScreen = () => {

    const navigation   =  useNavigation();
    const {width,  height} =  useWindowDimensions();

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
    <View>
        <View style={{backgroundColor : '#0e2433'}} className={`bg-slate-900 h-full`}>
          <View>
             <Text className={`text-center font-bold text-lg py-2 text-white`}>OrdersScreen</Text>
          </View>

          <View style={{height : height/1.32}} className={`mx-1`} >
              <FlatList 
              data={data}
                 renderItem={(itemData)  => {
                  return(
                    <OrderComponent date={"2023-03-24"} uuid={"234545"} user={"melckzedeck james"} order_status={"pending"} order_id={"12yrt67732"} cost={"234566"} items={"4"} products={["banana", "tomato"]} />
                  )
                 }}
                 keyExtractor={(item)  =>  item.id}
              />
          </View>
        </View>
    </View>
  )
}

export default OrdersScreen