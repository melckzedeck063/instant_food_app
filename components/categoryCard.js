import { View, Text , StyleSheet, Image, TouchableOpacity, Platform} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import { IMAGE_URL, NEW_IMAGE_URL } from '../store/URL'

const CategoryCard = (props) => {

  const navigation =  useNavigation();

  return (
    <TouchableOpacity className="mx-1.5"
    onPress={() => navigation.navigate('Category', {
      props
    }) }
    >
      <View style={{backgroundColor  : '#1c4966'}}  className="bg-slate-700 rounded-xl h-24 w-36  border-1 border-slate-300">
        <Image  source={{uri : `${NEW_IMAGE_URL}/${props.image}`}} className="h-24 w-36 overflow-hidden rounded-xl"  />
      </View>
      <Text style={{fontSize :  responsiveFontSize(1.8)}} className={`text-white py-2 font-medium capitalize ${Platform.select({android : 'text-sm'})}`} > {props.name} </Text>
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