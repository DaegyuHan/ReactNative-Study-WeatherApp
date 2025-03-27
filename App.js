import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import {ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }

    const {
      coords:{ latitude, longitude },
    } = await Location.getCurrentPositionAsync({accuracy:5})

    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    console.log(location)
    setCity(location[0].city)
  };
  useEffect(() => {
    ask();
  }, []);
  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
        </ScrollView>
        <StatusBar style="light"></StatusBar>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"teal"
  },
  city: {
    flex: 1.1,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize:58,
    fontWeight: "500"
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temperature: {
    marginTop: 50,
    fontSize: 168
  },
  description: {
    marginTop: -30,
    fontSize: 60
  }
});
