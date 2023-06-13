import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState,useRef } from 'react';
import * as Location from 'expo-location';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { Tooltip } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';



const driversAround = [
  {latitude : -6.244117, longitude : 35.825196, name:"zedenga", phone : "0744219981"},
  {latitude : -6.325161, longitude : 35.845822, name:"cotton", phone : "0764212971"},
  {latitude : -6.175218, longitude : 35.757743, name:"james", phone : "0744219287"},
  {latitude : -6.181191, longitude : 35.735585, name:"ezekiel", phone : "0747814981"},
  {latitude : -6.220824, longitude : 35.810764, name:"charles", phone : "0743219876"},
  {latitude : -6.217219, longitude : 35.807445, name:"kajobi", phone : "0762887634"},
  {latitude : -6.214630, longitude : 35.811648, name:"mumbara", phone : "0675645387"},
]

const LocationTracking = () => {
    const [location, setLocation] = useState();
    const [address, setAddress] = useState();
    const navigation = useNavigation();
    const  _map = useRef(1)
    const [latlong, setLatlong]  = useState({});
    const [selectedDriver, setSelectedDriver] = useState(null); 

    const {params : {data}} = useRoute();

    // console.log(data)

    // Location.setGoogleApiKey('AIzaSyAP2g5HWBOT3Zx03hkfMvW6PTW5cmLA0R0')

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
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = coords;
        // console.log('Latitude: ', latitude);
        // console.log('Longitude: ', longitude);
        setLatlong({
          latitude : latitude,
          longitude :  longitude
        })
        // Do something with the location data

      }
      catch(error){ 
        console.log(error)
      }
    }
    

    

    useEffect(() => {
      checkPermission();
      getCurrentLocation();

    }, []);
    
    // console.log(latlong)
    
  const handleDriver = (data) => {
    setSelectedDriver(data); // Set the selected driver to the state variable
    // console.log(data.name, data.phone);
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
      ...driversAround[0],
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

      { driversAround.map((item, index) =>
            <Marker coordinate={item} key={index.toString()}
            onPress={() => handleDriver(item)}
            >
                <Image
                  source={require('../assets/images/motorcycle.png')}
                  resizeMode='cover'
                  style={styles.driverImage}
                />
            </Marker>
          )}
         </MapView>
            </View>
            <View>

            </View>
            <View className="">
              <View></View>
            <Text style={{ fontSize: responsiveFontSize(2.3) }} className="text-slate-800 font-medium py-1.5">Choose your nearby delivery man</Text>
            {selectedDriver != null && (
              <View className="">
                <View className="flex-row justify-between">
                <Text style={{ fontSize: responsiveFontSize(1.8) }} className="text-slate-700 font-medium p-1"> Name : {selectedDriver.name}</Text>
                <Text style={{ fontSize: responsiveFontSize(1.8) }} className="text-slate-700 font-medium p-1"> Tel : {selectedDriver.phone} </Text>
                </View>

                <View className="flex-row justify-between my-1">
                   <Text style={{ fontSize: responsiveFontSize(2) }} className="text-slate-700 font-medium p-1"> Your delivery man </Text>
                  <TouchableOpacity className="bg-orange-400 px-3 py-1 rounded-md"
                   onPress={() => navigation.navigate('ConfirmOrder', {selectedDriver, latlong})}
                  >
                    <Text className="font-medium text-white text-center mt-0.5">Next</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            )}
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
