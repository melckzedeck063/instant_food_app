import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import { useRoute } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';

const DeliveryScreen = () => {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const _map = useRef(1)
  const [latlong, setLatlong] = useState({});
  const { params: { props } } = useRoute();

  const customer = [props.user.live_location];


  const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();

    if (hasPermission.status === "granted") {
      const permission = askPermission();
      return permission
    }
    return true
  }

  const askPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === "granted"
  }

  const getCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLatlong({ latitude: latitude, longitude: longitude })

    }
    catch (error) {
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
      <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: 'bold' }} className="text-slate-700 py-1">Location Tracking</Text>

      <View style={styles.mapContainer}>
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          rotateEnabled={true}
          zoomControlEnabled={true}
          toolbarEnabled={true}
        >
          {customer.map((item, index) =>
            <Marker coordinate={item} key={index.toString()}>
              <Image
                source={require('../assets/images/house.png')}
                style={styles.driverImage}
                resizeMode='cover'
              />
            </Marker>
          )}

          {latlong.latitude && latlong.longitude && customer.length > 0 && (
            <MapViewDirections
              origin={{ latitude: latlong.latitude, longitude: latlong.longitude }}
              destination={customer[0]}
              apikey="AIzaSyAP2g5HWBOT3Zx03hkfMvW6PTW5cmLA0R0"
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
              }}
              onError={(errorMessage) => {
                console.log('Error:', errorMessage);
              }}
            />
          )}
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  driverImage: {
    height: responsiveHeight(8),
    width: responsiveWidth(14)
  }

});

export default DeliveryScreen;
