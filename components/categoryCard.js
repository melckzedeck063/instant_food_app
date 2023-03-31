import { View, Text , StyleSheet, Image, TouchableOpacity, Platform} from 'react-native'
import React from 'react'

const CategoryCard = (props) => {
  return (
    <TouchableOpacity className="mx-1.5">
      <View style={{backgroundColor  : '#1c4966'}}  className="bg-slate-700 p-2.5 rounded-xl">
        <Image source={props.image} className="h-20 w-32"  />
      </View>
      <Text className={`text-white text-lg font-medium capitalize ${Platform.select({android : 'text-sm'})}`} > {props.name} </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard

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
     }
  })