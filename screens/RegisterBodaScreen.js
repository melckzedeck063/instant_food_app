import { View, Text, KeyboardAvoidingView,Button, ScrollView,Image, TouchableOpacity, TextInput, Platform, useWindowDimensions } from 'react-native'
import React, { useState, useCallback, useLayoutEffect }  from 'react'
import  { useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons}  from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

const RegisterBodaScreen = () => {

  const [image, setImage] =   useState(null);
  const [imageData, setImageData] =  useState("")
//   const dispatch =  useDispatch();

    const { register, handleSubmit, control, formState : {error} } =  useForm();
    const navigation =  useNavigation();
    const {width, height}  =  useWindowDimensions()

    const pickImage = async () => {
      // No permissions request is necessary for launching the image 
      try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      // console.log(result);
  
      if (!result.cancelled) {
        setImageData(result.data)
        setImage(result)
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
  
        // const response =  
                         
        // return fetch(`${BASE_URL}/posts/upload_photo`, options)
        //             .then((response) => response.json())
        //             .then( (data) => setImageData(data.data) )
                    
      }
    } catch(e) {
      console.log(e, "error");
    }
    };


    const onSubmit = data => {
      data.photo = imageData
      // data.id =  restaurant_id
      console.log(data)
      // createNewProduct(data)
    //   dispatch(  makeNewProduct(data) )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown :  true
        })
    })
  return (
    <KeyboardAwareScrollView style={{height : responsiveHeight(100), backgroundColor : '#0e2433' }} >
            <View style={{height : responsiveHeight(96)}} className ={`${height >= 850 ? 'my-6' : height >= 700 ? 'my-2' : 'mt-0'}`}>
                <View className="relative">
                    <View className="mb-1">
                      <Text   className={`text-center font-bold text-xl text-slate-50 ${Platform.select({android : 'text-lg -mb-1'})}`} >
                        Register as  Bodaboda
                      </Text>
                    </View>
     <View style={{alignSelf : 'center', backgroundColor : '#1c4966'}} className={`bg-white shadow-md rounded-lg px-4 py-5 w-10/12 my-10 ${height <=  700 ? 'py-2' :  ''} ${Platform.select({android : '-pt-1'})} `}>
           {/* <Text className="text-2xl font-medium text-red-400 text-center" >Sign Up</Text> */}
      {/* <Text className={`text-xl text-center font-medium text-slate-50 my-1 -mt-1 ${Platform.select({android :  'text-lg'})}`} >{props.name} product</Text> */}
      
      <View className="my-2">
       <Text className={`text-xl text-white ${Platform.select({android : 'text-lg'})}`} >License  No</Text>
        <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})}`}
          placeholder="Enter license no"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="license_no"
      />
      </View>

      <View className="my-2">
      <Text className={`text-xl text-white ${Platform.select({android : 'text-lg'})}`} >License Photo</Text>
      <View  className="px-2 bg-slatee-100">
         <Button className="text-red-50 text-2xl" color={"orange"}  title="Pick an image" onPress={pickImage} />
         {image && <Image className="rounded-lg mt-2.5" source={{ uri: image.uri }} style={{ width: responsiveWidth(78), height: responsiveHeight(20), alignSelf : 'center' }} />}
      </View>
      </View>

      <View className="my-2">
      <Text className={`text-xl text-white ${Platform.select({android : 'text-lg'})}`} >Motorcycle No</Text>
    <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})}`}
          placeholder="Enter motorcycle no"
          keyboardType='phone-pad'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="motorcycle_no"
      />
      </View>
      <View className="my-2">
          <Text className={`text-xl text-white ${Platform.select({android : 'text-lg'})}`} >Location</Text>
          <Controller
            control={control}
            rules={{
             required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})}`}
              placeholder="Enter location"
              keyboardType='phone-pad'
              onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="location"
          />

        </View>
                  {/* <View className="my-2">
                  <Text className={`text-xl text-white ${Platform.select({android : 'text-lg'})}`} >Description</Text>
                  <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})}`}
          placeholder="Enter Description"
          multiline={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
            </View> */}
     
                  <View>
             <TouchableOpacity className="bg-orange-400 rounded-md px-2 py-1 my-3"
               onPress={handleSubmit(onSubmit)}
             >
                <Text className={`text-2xl font-medium text-white text-center ${Platform.select({android : 'text-xl'})}`} >Submit</Text>
             </TouchableOpacity>
        </View>
         </View> 
                </View>
            </View>
      </KeyboardAwareScrollView>
  )
}

export default RegisterBodaScreen