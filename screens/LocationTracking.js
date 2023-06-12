import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState,useRef } from 'react';
import * as Location from 'expo-location';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { Tooltip } from 'react-native-elements';


const driversArround = [
  {latitude : -6.244117, longitude : 35.825196, name:"zedenga", phone : "0744219981"},
  {latitude : -6.325161, longitude : 35.845822, name:"zedenga", phone : "0744219981"},
  {latitude : -6.175218, longitude : 35.757743, name:"zedenga", phone : "0744219981"},
  {latitude : -6.181191, longitude : 35.735585, name:"zedenga", phone : "0744219981"},
  {latitude : -6.220824, longitude : 35.810764, name:"zedenga", phone : "0744219981"},
  {latitude : -6.217219, longitude : 35.807445, name:"zedenga", phone : "0744219981"},
  {latitude : -6.214630, longitude : 35.811648, name:"zedenga", phone : "0744219981"},
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

    
  const handleDriver = (data)  =>{
     console.log(data.name, data.phone)
  }
  

    return (
        <View style={styles.container} className="">
          

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
    initialRegion={{
      ...driversArround[0],
      latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    }}
  >
    {/* {location && (
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="Current Location"
      />
    )} */}

    {
      driversArround.map((item,index) =>
      <Marker coordinate={item} key={index.toString()}>
        <TouchableOpacity 
         onPress={() =>  handleDriver(item)}
        > 
        <Image source={require('../assets/images/motorcycle.png')} 
         resizeMode='cover'
         style={styles.driverImage}
         onPress={() =>  handleDriver(item)}
        />
        </TouchableOpacity>

      </Marker>
      )
    }
  </MapView>
            </View>
            <View>

            </View>
            <View className="">
            <Text style={{ fontSize: responsiveFontSize(2.3) }} className="text-slate-800 font-medium py-1.5">Choose your nearby delivery man</Text>
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
        marginBottom :  40
        // backgroundColor: '#0e2433'
    },
    mapContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    map: { 
      ...StyleSheet.absoluteFillObject,
    },
    driverImage : {
      height : responsiveHeight(6),
      width  : responsiveWidth(12)
    }
  
});
