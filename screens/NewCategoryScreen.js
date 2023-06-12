import { View, Text, TouchableOpacity, TextInput, Button, ScrollView, Image, Platform , StyleSheet} from 'react-native'
import React, { useState , useLayoutEffect, useEffect} from 'react'
import {   useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import * as Location from 'expo-location';


import * as ImagePicker from 'expo-image-picker'

import { Ionicons, MaterialIcons}  from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL, IMAGE_URL, NEW_IMAGE_URL } from '../store/URL';
import { useDispatch } from 'react-redux';
import { registerRestaurant } from '../store/actions/restaurant_action';


const NewCategory = () => {

    const [image, setImage] =   useState(null);
    const [imageData, setImageData] =  useState("")
    const [galleryPhoto, setgalleryPhoto] = useState(null)

    const [location, setLocation] = useState();
    const [address, setAddress]  =  useState({});

    useEffect(() =>{
        const  getPermissions = async () =>{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status  !== "granted"){
                console.log('Please grant location permissions');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log('location');
            console.log(currentLocation);
        };
        getPermissions();
    }, []);

    const geocode = async (data) => {
      console.log(data);
      const geocodedLocation = await Location.geocodeAsync(data);
      if (geocodedLocation.length > 0) {
        const { latitude, longitude } = geocodedLocation[0];
        setAddress({lat  : latitude, long : longitude})
        console.log('Geocoded address:', latitude, longitude);
      } else {
        console.log('No geocoded address found');
      }
    };


    const { register,defaultValue, reset, handleSubmit, control, formState : {errors} } =  useForm({
      defaultValues  : {
        restaurantName : '',
        location : '',
        contacts : '',
        email : '',
        description  : ''
    },
    mode : 'all'
    });
    const navigation =  useNavigation();
    const dispatch =  useDispatch();

    const [selectedLocation, setSelectedLocation] = useState(null);



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
      let selectedAsset = result.assets[0]; // Assuming you want to upload the first selected asset
      let localUri = selectedAsset.uri;
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

                       
      return fetch(`${NEW_IMAGE_URL}/api/v1/posts/upload_photo`, options)
                  .then((response) => response.json())
                  .then( (data) => {
                    console.log(data)
                    setImageData(data.data) 

                    const uploadedImageUrl = data.url;
                    console.log('Uploaded Image URL:', uploadedImageUrl);
                  })
                  
    }
  } catch(e) {
    console.log(e, "error");
  }
  };


const onSubmit = (data) => {
  data.photo = imageData
  const {location}  =  data;

  geocode(location)
  
  data.geo  =  address

  setTimeout(() => {
    console.log(data)
    // dispatch(registerRestaurant(data))
  }, 1500);
      // uploadImage();

      setTimeout(() => {
         reset()
      }, 1500);
  }

useLayoutEffect(() => {
  navigation.setOptions({
      headerShown : true
  })
 })

  return (
    <KeyboardAwareScrollView style={{height : responsiveHeight(100), backgroundColor : '#0e2433' }}  >
    <ScrollView className="mt-2">
      <View  className ="my-3">
          <View className="relative">
              <View  className="my-1 mb-1">
                <Text   className="text-center font-bold text-lg text-white" >
                  Register Restaurant
                </Text>
              </View>
              <View style={{alignSelf : 'center', backgroundColor : '#1c4966'}} className="bg-white shadow-md rounded-lg px-4 py-5 w-10/12 my-2">
     {/* <Text className="text-2xl font-medium text-red-400 text-center" >Sign Up</Text> */}
<View className="my-2">
 <Text className={`text-xl text-white ${Platform.select({android  : 'text-lg'})}`} >Restaurant Name</Text>
  <Controller
  control={control}
  rules={{
   required: true,
  }}
  render={({ field: { onChange, onBlur, value} }) => (
    <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})} ${errors.restaurantName? 'border-2 border-red-500' : 'border-2 border-slate-300'} `}
    placeholder="Enter restaurant name"
      onBlur={onBlur}
      onChangeText={ onChange}
      value={value}
      />
      )}
  name = "restaurantName"
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
<View className="my-2">
<Text className="text-xl text-white" >location</Text>
<Controller
  control={control}
  rules={{
   required: true,
  }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})} ${errors.location? 'border-2 border-red-500' : 'border-2 border-slate-300'}`}
    placeholder="Enter bakery location"
   onBlur={onBlur}
   onChangeText={onChange}
   value={value}
    />
  )}
  name="location"
/>
 
</View>
<View className="my-2">
<Text className="text-xl text-white" >Contacts</Text>
<Controller
  control={control}
  rules={{
   required: true,
  }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})} ${errors.contacts? 'border-2 border-red-500' : 'border-2 border-slate-300'}`}
    placeholder="Enter bakery contacts"
    keyboardType='phone-pad'
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      
    />
  )}
  name="contacts"
/>
</View>
<View className="my-2">
<Text className={`text-slate-100 text-xl ${Platform.select({android : 'text-lg'})}`} >Email</Text>
      <Controller
        control={control}
        defaultValue =  ""
        rules={{
          required: "email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput  className={`rounded-md text-slate-900 bg-gray-100 text-lgg px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} ${errors.email? 'border-2 border-red-500' : 'border-2 border-slate-300'}`}
          placeholder="Enter restaurant  email"
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize ={false}
            // autoComplete='email'
            value={value}
            // errors = {errors.name}
            // errorText = {errors?.name?.message}
          />
        )}
        name="email"
      />
      { errors.email && <Text className="text-red-400" > {errors.email.message} </Text>}
</View>
            <View className="my-2">
            <Text className="text-xl text-white" >Description</Text>
            <Controller
  control={control}
  rules={{
   required: true,
  }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput  className={`rounded-md bg-slate-100 px-4 py-1.5 ${Platform.select({ios : 'py-2.5'})}`}
    placeholder="Enter restaurant description"
    multiline={true}
    autoCapitalize={false}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
    />
  )}
  name="description"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
  },
  autocompleteContainer: {
    flex: 1,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  listView: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    marginTop: 4,
    borderRadius: 8,
  },
  selectedLocationContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  selectedLocationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedLocationName: {
    fontSize: 16,
    marginBottom: 4,
  },
  selectedLocationAddress: {
    fontSize: 14,
    color: 'gray',
  },
});
