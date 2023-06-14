import { View, Text } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const DeliveryWaiting = () => {
    const navigation = useNavigation();
    const { params: { props } } = useRoute();
    const customer = props.user.live_location;
    const driver = props.driver.live_location;
    const [distance, setDistance] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#161E35"
            },
            headerTintColor: "white"
        });
    });

    const calculateDistance = () => {
        const lat1 = customer.latitude;
        const lon1 = customer.longitude;
        const lat2 = driver.latitude;
        const lon2 = driver.longitude;

        const R = 6371; // Radius of the Earth in kilometers
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        setDistance(distance);

        // Assuming an average speed of 40 km/h, calculate the time taken
        const averageSpeed = 40; // km/h
        const timeTaken = distance / averageSpeed;
        setTimeTaken(timeTaken);
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    useEffect(() => {
        calculateDistance();
    }, []);

    return (
        <SafeAreaView className="bg-slate-900 h-full flex-1 justify-center items-center">
            <Animatable.Image
                source={require('../assets/images/delivery.gif')}
                animation="slideInUp"
                iterationCount={1}
                className="h-96  w-96 -mt-14 mb-6"
            />
            <View>
                <Text style={{ fontSize: responsiveFontSize(2) }} className="text-white font-medium text-center p-4">Wait for delivery man to submit your order </Text>
                <Text style={{ fontSize: responsiveFontSize(2) }} className="text-white font-medium text-center p-4">Distance: {distance.toFixed(2)} km</Text>
                <Text style={{ fontSize: responsiveFontSize(2) }} className="text-white font-medium text-center p-4">Time Taken: {timeTaken.toFixed(2)} hours</Text>
            </View>
            <View>
                {/* <Progress.Circle size={100} indeterminate={true} color='orange' borderWidth={3} /> */}
            </View>
        </SafeAreaView>
    );
}

export default DeliveryWaiting;
