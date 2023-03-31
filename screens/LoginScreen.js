import { View, Text, Form, TextInput, useWindowDimensions, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller, useController, useWatch } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import  { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
// import * as Yup from 'yup';



const LoginScreen = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();


    const {  handleSubmit,setValue, control, reset, formState: { errors, isValid, isDirty } } = useForm({
        defaultValues  : {
          username : "",
          password :  ""
        },
        mode : 'all',
        reValidateMode : "onChange"
      })

      const onSubmit = data => {
        console.log(data)
        navigation.navigate('HomeTab')
      }

      useLayoutEffect(() => 
    {
        navigation.setOptions({
            headerShown : false,
            headerStyle : {
                backgroundColor : "#161E35"
            },
            headerTintColor : "white"
        })
    })

  return (
    <View>
      <KeyboardAwareScrollView>
      <ScrollView>

           {/* <LinearGradient colors={['transparent', '#F54749']} > */}
           <View className={`bg-slate-900 w-full h-full ${height < 300 ? 'py-2' : 'py-6'} ${Platform.select({ios : 'pb-96', android : "pb-56"})}`}>
          {/* <Text className={`text-sky-600 text-center font-medium text-3xl ${height < 400 ? 'mt-1' : 'mt-24'} `}>Login Screen</Text> */}
        <View className={`mx-auto shadow-md bg-slate-700 rounded-lg ${height < 400 ? 'mt-32 py-1' : 'py-6 mt-52'} ${width < 400 ? 'w-10/12' : 'w-9/12'} px-6`}  style={{alignSelf : 'center'}} >
      <Text className="text-2xl font-medium text-slate-100 text-center" >Sign In</Text>
          <View className="my-2">
           <Text className={`text-slate-100 text-xl ${Platform.select({android : 'text-lg'})}`} > Username</Text>
      <Controller
        control={control}
        defaultValue =  ""
        rules={{
          required: "Username is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md text-white bg-gray-600 text-lgg px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.username? 'border-2 border-red-500' : 'border-2 border-green-400'}`}
          placeholder="Enter username"
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize ={false}
            // autoComplete='email'
            value={value}
            // errors = {errors.name}
            // errorText = {errors?.name?.message}
          />
        )}
        name="username"
      />
      { errors.username && <Text className="text-red-400" > {errors.username.message} </Text>}
          </View>
       <View className="my-2">
         <Text className={`text-slate-100 text-xl ${Platform.select({android : 'text-lg'})}`} > Password</Text>
         <Controller
        control={control}
        rules={{
          required:  "Password is required",
          pattern: {
            value: /^([a-zA-Z0-9]{8,16})$/,
            message: 'Must contain atleast 8 characters'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md text-white bg-gray-600 px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.password? 'border-2 border-red-400' : 'border-2 border-green-500'}`}
          placeholder="Enter password"
            onBlur={onBlur}
            autoCapitalize = {false}
            secureTextEntry={true}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && <Text className="text-red-400"> {errors.password.message} </Text>}
       </View>
        <View>
             <TouchableOpacity className="bg-green-500 rounded-md px-2 py-1 my-3"
               onPress={handleSubmit(onSubmit)}
             >
                <Text className={`text-2xl font-medium text-white text-center ${Platform.select({android : 'text-xl'})}`} >Sign In</Text>
             </TouchableOpacity>
        </View>
        <View>
            <View className="-mt-2" >
            <Text className="font-medium text-slate-700 text-center" >Don't have an account ? </Text>
             <TouchableOpacity className="rounded-md px-2 py-1 hover:text-sky-300"
             onPress={() => navigation.navigate('SignUp') }
             >
                <Text className="text-xl font-medium text-green-500 text-center" >Sign Up</Text>
             </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
           {/* </LinearGradient> */}
      </ScrollView>
          </KeyboardAwareScrollView>
    </View>
  )
}

export default LoginScreen