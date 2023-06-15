import { View, Text, useWindowDimensions } from 'react-native'
import React, {useEffect, useState, useLayoutEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import UserCard from '../components/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/actions/user_actions'
// import { fetchUsers } from '../store/reduxStore/reducers/userActions'


const AllUsers = () => {

  const navigation  =  useNavigation();
  const {height, width} =  useWindowDimensions()
  const dispatch  =  useDispatch();
  const [reload, setReload] =  useState(0)

  const AllUsers  =  useSelector(state => state.users);
//   console.log(AllUsers.all_users)

  setTimeout(() => {
    if(reload <= 4){
      setReload(reload => reload + 1)  
    }
  }, 1000);

  useEffect (() => {
    if(AllUsers && AllUsers.all_users.length <= 0 &&  reload <= 3 ){
      dispatch( fetchUsers() )
    }
  })

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown : true
    })
   })

  return (
    <>
  <View className="bg-slate-900 h-full w-full">

     
         <View  style={{alignSelf : 'center'}} className="border-slate-600 border-b-2 w-10/12">
            <Text className="font-bold text-lg text-center py-2 text-white" >All Users</Text>
         </View>

         
         
  <View className="py-2">
    {/* <Text className="text-center font-bold text-xl py-6" > Screen on production </Text> */}
  </View>
 

  {
    AllUsers?.all_users?.data?.data  ?
    <>
  <View className="">
    <FlatList style={{height : height/1.26}}
     numColumns={2}
     data={AllUsers.all_users.data.data}
     renderItem={(itemData) => {
      return(
        <UserCard name={itemData.item.firstName} role={itemData.item.role} id={itemData.item._id} lname={itemData.item.lastName} email={itemData.item.email} tel={itemData.item.telephone} />
      )
     }}
     keyExtractor={(item) => item._id}
     />
  </View>
    </>
     :  null
  }

</View>
</>
  )
}

export default AllUsers