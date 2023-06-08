import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import image1 from '../assets/images/product-741755043-1673243019360.jpeg';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const WelcomeCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={image1}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Food Delivery!</Text>
        <Text style={styles.subtitle}>Order delicious food right to your doorstep.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width  :  responsiveWidth(94)
  },
  image: {
    width: '100%',
    height: responsiveHeight(7),
    borderRadius: 10,
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default WelcomeCard;
