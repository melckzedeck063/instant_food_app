import { View, Text, useWindowDimensions, SafeAreaView, TextInput, Platform, Image, TouchableOpacity  } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useForm,  Controller } from 'react-hook-form';
import {Ionicons} from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';
import image2 from '../assets/images/pexels-elina-sazonova-1850595.jpg';
import { useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import { getLogedUser } from '../store/reduxStore/reducers/userActions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const MyProfile = () => {

    const navigation  = useNavigation();
    const {width, height} = useWindowDimensions();
    const  dispatch =  useDispatch();
    const { params : {current_user}  }  =  useRoute()
    const [reload, setReload] =  useState(0);
    
    // console.log(current_user)


      
    const { register, reset, control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues :  {
          user_role : current_user.role,
          username : current_user.email,
          firstName : current_user.firstName,
          lastName : current_user.lastName,
          telephone : current_user.telephone
        },
          mode: 'all',
      })

      const onSubmit = data => {
        console.log(data);
      //   dispatch( signUpUser(data) )
        
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true
        })
    })

  return (
    <View className="bg-slate-900 h-full">
        <KeyboardAwareScrollView className="">
        <SafeAreaView  />

   <View className={`w-full h-full bg-slatee-700 mt-3 ${Platform.select({ios : 'py-12', android : 'py-12'})}`}>
     <View style={{alignSelf : 'center', backgroundColor : '#1c4966' }} className="bg-slate-700 shadow-md rounded-lg px-4 py-5 w-10/12 my-3">
    <View className="">
           {/* <Text className="text-2xl font-medium text-orange-400 text-center my-2" >User Profile</Text>  */}
           <View style={{alignSelf : 'center', borderWidth : 2}} className="p-0.5 border-sky-400 rounded-full bg-sky-500">
             <Image  source={image2} className="overflow-hidden h-32 w-32 rounded-full" />
           </View>
          </View>
          
          <View className="my-1" >
          </View>
       <View className="my-2">
       <Text className="text-lg text-slate-200" >FirstName</Text>
        <Controller
        control={control}
        rules={{
         required: {value : true, message : "Firstname is required"},
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-500 text-white px-4 py-3 capitalize ${errors.firstName? 'border-2 border-red-400' : ''}`}
          placeholder="Enter firstName"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {  errors.firstName && <Text className="text-red-500" > {errors.firstName.message} </Text>}
      </View>
      <View className="my-2">
      <Text className="text-lg text-slate-200" >LastName</Text>
    <Controller
        control={control}
        rules={{
          required: {value : true, message : "Lastname is required"},
          minLength : {value : 3,  message : "Requires atleast three characters"}
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-500 text-white px-4 py-3 capitalize ${errors.lastName? 'border-2 border-red-400' : ''}`}
          placeholder="Enter lastName"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {  errors.lastName && <Text className="text-red-500" > {errors.lastName.message} </Text>}
      </View>
      <View className="my-2">
      <Text className="text-lg text-slate-200" >Username</Text>
     <Controller
        control={control}
        rules={{
          required: "Username is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-500 text-white px-4 py-3 ${errors.username? 'border-2 border-red-400' : ''}`}
          placeholder="Enter username or email"
            onBlur={onBlur}
            autoCapitalize = {false}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {  errors.username && <Text className="text-red-500" > {errors.username.message} </Text>}
      </View>
                  <View className="my-2">
                  <Text className="text-lg text-slate-200" >Telephone</Text>
                  <Controller
        control={control}
        rules={{
         required: "Telephone is  required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-500 text-white px-4 py-3 ${errors.telephone? 'border-2 border-red-400' : ''}`}
          placeholder="Enter telephone"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="telephone"
      />
      {  errors.telephone && <Text className="text-red-500" > {errors.telephone.message} </Text>}
            </View> 
      {/* <View className="my-2">
       <Text className="text-lg text-slate-200" > User Role </Text>
       <Controller
        control={control}
        rules={{
          required: {value : true, message :  "user_role is required"},
          pattern: {
            value: /^([a-zA-Z0-9]{2,16})$/,
            message: 'user role is required'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-500 text-white px-4 py-3 capitalize ${errors.user_role? 'border-2 border-red-400' : ''}`}
          placeholder="Enter user_role"
            onBlur={onBlur}
            autoCapitalize={false}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="user_role"
      />
      {errors.user_role && <Text className="text-red-500"> {errors.user_role.message} </Text>}
                  </View> */}
                 
         <View>
             <TouchableOpacity className="bg-orange-400 rounded-md px-2 py-1 my-3"
               onPress={handleSubmit(onSubmit)}
             >
                <Text style={{fontSize :  responsiveFontSize(2)}} className="font-medium text-white text-center" > Update </Text>
             </TouchableOpacity>
        </View>
        </View>
        </View>

    </KeyboardAwareScrollView>
    </View>

    
  )
}

export default MyProfile