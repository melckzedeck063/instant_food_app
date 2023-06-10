import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState,useRef } from 'react';
import * as Location from 'expo-location';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'

const driversArround = [
  {latitude : -6.244117, longitude : 35.825196},
  {latitude : -6.325161, longitude : 35.845822},
  {latitude : -6.175218, longitude : 35.757743},
  {latitude : -6.181191, longitude : 35.735585},
  {latitude : -6.220824, longitude : 35.810764},
  {latitude : -6.217219, longitude : 35.807445},
  {latitude : -6.214630, longitude : 35.811648},
]

const LocationTracking = () => {
    const [location, setLocation] = useState();
    const [address, setAddress] = useState();
    const  _map = useRef(1)
    const [latlong, setLatlong]  = useState({});

    Location.setGoogleApiKey('AIzaSyAP2g5HWBOT3Zx03hkfMvW6PTW5cmLA0R0')

   const checkPermission = async () => {
     const hasPermission = await Location.requestForegroundPermissionsAsync();

     if(hasPermission.status === "granted"){
      const permission =  askPermission();
      return permission
     }
      return true
   }

   const askPermission = async() => {
     const permission  = await Location.requestForegroundPermissionsAsync();
     return  permission.status === "granted"
   }

    
    const getCurrentLocation =  async () =>{
      try{
        const  {granted} = await Location.requestForegroundPermissionsAsync();
        if(!granted) return
        const {
          coords : {latitude, longitude},
        } = await Location.getCurrentPositionAsync();
        setLatlong({latitude : latitude,  longitude : longitude})

      }
      catch(error){ 
        // console.log(error)
      }
    }

    useEffect(() => {
      checkPermission();
      getCurrentLocation();

      console.log(latlong)
  }, []);

    

  

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: responsiveFontSize(2.3) }} className="text-white font-medium">Location Tracking</Text>

            {/* <View className="my-6 w-9/12 mx-auto">
                <TextInput
                    placeholder='Address'
                    className={`rounded-md bg-slate-200 text-slate-800 px-4 py-2.5 ${Platform.select({ android: 'py-1.5' })} -2 border-slate-300`}
                    value={address}
                    onChangeText={setAddress}
                />
                <TouchableOpacity
                    className="bg-red-400 py-1 px-2 rounded-lg my-4"
                    onPress={geocode}
                >
                    <Text style={{ fontSize: responsiveFontSize(2.3) }} className="text-white font-medium text-center py-1"> Geocode Address </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-red-400 py-1 px-2 rounded-lg my-4"
                    onPress={reverseGeocode}
                >
                    <Text style={{ fontSize: responsiveFontSize(2.3) }} className="text-white font-medium text-center py-1"> Reverse Geocode </Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.mapContainer} className="flex-1 justify-center items-center bg-white">
            <MapView  
            ref = {_map}
    provider={PROVIDER_GOOGLE}
    style={styles.map}
    showsUserLocation={true}
    followsUserLocation={true}
    rotateEnabled={true}
    zoomControlEnabled={true}
    toolbarEnabled={true}
    // initialRegion={{
    //   latitude: location ? location.coords.latitude : 0,
    //   longitude: location ? location.coords.longitude : 0,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // }}
  >
    {location && (
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="Current Location"
      />
    )}

    {
      driversArround.map((item,index) =>
      <MapView.Marker coordinate={item} key={index.toString()}>
        <Image source={require('../assets/images/motorcycle.png')} className="" />
      </MapView.Marker>
      )
    }
  </MapView>
            </View>
            <View>

            </View>
        </View>
    )
}

export default LocationTracking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0e2433'
    },
    mapContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    map: { 
      ...StyleSheet.absoluteFillObject,
    },
  
});
