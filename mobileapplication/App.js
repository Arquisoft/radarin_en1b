import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

import MapView from 'react-native-maps';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App() {
  const [location, setLocation] = useState(null);
  
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }

  console.info(text);

  if(text.coords){
  return (
     <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: text.coords.latitude,
        longitude: text.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        <MapView.Marker
          coordinate={{latitude: text.coords.latitude,
            longitude: text.coords.longitude,}}
          title={'Ubicación del usuario'}
          description={'Aquí se encuentra usted'}
        />
      </MapView>
    </View>
  );
}else{
  return (
    <View style={styles.container}>
   </View>
 );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});