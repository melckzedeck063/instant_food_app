import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const CurrentLocation = () => {
    const [location, setLocation] = useState();
    const [address, setAddress]  =  useState();

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

    const geocode =  async () => {
        const geocodedLocation =    await Location.geocodeAsync(address.toString());
        console.log('Goecoded address');
        console.log(geocodedLocation)
    }

    const reverseGeocode = async () => {
        const reversedGeocodedAddress =  await  Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude :  location.coords.longitude
        });

        console.log('Geocode Address');
        console.log(reversedGeocodedAddress)
    }

  return (
    <View style={styles.container}>
      <Text style={{fontSize  :  responsiveFontSize(2.3)}} >LocationTracking</Text>

      <View className="my-6 w-9/12 mx-auto">
        <TextInput placeholder='Address'  className={`rounded-md bg-slate-200  text-slate-800 px-4 py-2.5 ${Platform.select({android : 'py-1.5'})} -2 border-slate-300`}
          value={address}   
          onChangeText={setAddress}
        />
        <TouchableOpacity className="bg-red-400 py-1 px-2 rounded-lg my-4"
          onPress={ geocode}
        >
            <Text style={{fontSize  :  responsiveFontSize(2.3)}} className="text-white font-medium text-center py-1"> Geocode Address </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-400 py-1 px-2 rounded-lg my-4"
          onPress={ reverseGeocode}
        >
            <Text style={{fontSize  :  responsiveFontSize(2.3)}} className="text-white font-medium text-center py-1"> Geocode Address </Text>
        </TouchableOpacity>
      </View>
      <View>

      </View>
    </View>
  )
}

export default CurrentLocation;

const styles =  StyleSheet.create({
    container :{
        flex :  1,
        alignItems : 'center',
        justifyContent :  'center',
        backgroundColor : 'white'
    }
})