import { View, Text, TouchableOpacity, TextInput, Button, ScrollView, Image, Platform } from 'react-native'
import React, { useState , useLayoutEffect} from 'react'
import {   useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'

import * as ImagePicker from 'expo-image-picker'
// import showImagePicker from 'expo-image-picker'
// import * as FileSystem from 'expo-file-system'
// import * as ImagePicker from 'react-native-image-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { Ionicons, MaterialIcons}  from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { createNewBakery, uploadImage } from '../store/reduxStore/actions/bakery_actions';
// import { FileSystemUploadType } from 'expo-file-system';
import axios from 'axios';
// import { BASE_URL } from '../store/url';

const NewCategory = () => {

    const [image, setImage] =   useState(null);
    const [imageData, setImageData] =  useState("")
    const [galleryPhoto, setgalleryPhoto] = useState(null)
    const { register,defaultValue, handleSubmit, control, formState : {error} } =  useForm();
    const navigation =  useNavigation();
    // const dispatch =   useDispatch()



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
      // console.log(response) 
                       
    //   return fetch(`${BASE_URL}/posts/upload_photo`, options)
    //               .then((response) => response.json())
    //               .then( (data) => setImageData(data.data) )
                  
    }
  } catch(e) {
    console.log(e, "error");
  }
  };


const onSubmit = (data) => {
  data.photo = imageData
  console.log(data)
    //   dispatch( createNewBakery(data))
      // uploadImage();
  }
// console.log(imageData)

useLayoutEffect(() => {
  navigation.setOptions({
      headerShown : true
  })
 })

  return (
    <KeyboardAwareScrollView style={{height : responsiveHeight(100), backgroundColor : '#0e2433' }}  >
    <ScrollView className="mt-10">
      <View  className ="my-4">
          <View className="relative">
          {/* <View className="absolute top-1 left-2 flex-row justify-between">
          
          <TouchableOpacity className="rounde-lg bgg-white h-8 w-8 -mt-8 rounded-full"
           onPress={()=> navigation.goBack()}
          >
            <Text className="-ml-1.5 mt-1 text-xl font-bold" > <Ionicons size={32} color="black" name='chevron-back' /> </Text>  
          </TouchableOpacity>
        </View> */}
        
          {/* <Text className="text-xl text-white my-3" >Restaurant Name</Text> */}
              <View  className="my-2 mb-4">
                <Text   className="text-center font-bold text-lg text-white" >
                  Add Category
                </Text>
              </View>
              <View style={{alignSelf : 'center', backgroundColor : '#1c4966'}} className="bg-white shadow-md rounded-lg px-4 py-5 w-10/12 my-2">
     {/* <Text className="text-2xl font-medium text-red-400 text-center" >Sign Up</Text> */}
<View className="my-2">
 <Text className={`text-xl text-white ${Platform.select({android  : 'text-lg'})}`} >Category Name</Text>
  <Controller
  control={control}
  rules={{
   required: true,
  }}
  name="bakeryName"
  render={({ field: { onChange, onBlur, value} }) => (
    <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})}`}
    placeholder="Enter bakery name"
      onBlur={onBlur}
      onChangeText={ onChange}
      value={value}
    />
  )}
/>
</View>
{/* <View className="my-2">
<Button title="Select 📑" onPress={pickImage} />
</View> */}
<Text className={`text-xl text-white my-1 ${Platform.select({android : 'text-lg'})}`} >Cover Photo</Text>
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View className="flex flex-row space-x-6">
        <Text className={`mt-2 ${Platform.select({android :  'mr-2'})}`}> 
          <MaterialIcons name='insert-photo' size={24} color="orange" />
        </Text>
        <Button title="Pick an image" color="orange" onPress={pickImage} className="bg-red-300" />
    </View>
      {image && <Image className="rounded-full" source={{ uri: image.uri }} style={{ width: 180, height: 180 }} />}
</View>
    {/* <Controller
  control={control}
  rules={{
   required: true,
  }}
  defaultValue="home"
  render={({ field: { onChange, onBlur, value} }) => (
    <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5`}
    placeholder="choose photo"
      onBlur={onBlur}
      // editable={false}
      onChangeText={onChange}
      value={value}
    />
  )}
  name="photo"
/> */}

{/* <View className="my-2">
<Text className="text-xl text-white" >Contacts</Text>
<Controller
  control={control}
  rules={{
   required: true,
  }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})}`}
    placeholder="Enter bakery contacts"
    keyboardType='phone-pad'
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
    />
  )}
  name="contacts"
/>
</View> */}
            <View className="my-2">
            <Text className="text-xl text-white" >Category Contents</Text>
            <Controller
  control={control}
  rules={{
   required: true,
  }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})}`}
    placeholder="Enter bakery email"
    multiline={true}
    autoCapitalize={false}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
    />
  )}
  name="email"
/>
      </View>

            <View>
       <TouchableOpacity className="bg-orange-400 rounded-md px-2 py-1 my-3"
         onPress={handleSubmit(onSubmit)}
       >
          <Text className={`text-2xl font-medium text-white text-center ${Platform.select({android  : 'text-xl'})}`} >Submit</Text>
       </TouchableOpacity>
  </View>
   </View> 
          </View>
      </View>
    </ScrollView>
</KeyboardAwareScrollView>
  )
}


export default NewCategory