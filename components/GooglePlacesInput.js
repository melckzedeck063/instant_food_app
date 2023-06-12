import React from 'react';
import { Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from 'react-native-elements';

const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_API_KEY';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      query={{
        key: 'AIzaSyAP2g5HWBOT3Zx03hkfMvW6PTW5cmLA0R0',
        language: 'en', // language of the results
      }}
      currentLocation={true}
      currentLocationLabel='Current location'
      onPress={(data, details) => console.log(data, details)}
      textInputProps={{
        InputComp: Input,
        leftIcon: { type: 'font-awesome', name: 'chevron-left' },
        errorStyle: { color: 'red' },
      }}
    />
  );
};

export default GooglePlacesInput;