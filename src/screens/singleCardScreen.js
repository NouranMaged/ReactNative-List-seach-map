import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import metrics from "../themes/metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleCardScreen = (props) => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem("@MySuperStore:id", JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };
  const id = props.route.params.id;
  const [singleCardData, setSingleCardData] = useState({});
  const handleShowSingleCard = () => {
    const key =
      "Jw0oIMgpId1HV8x-mogAapr36SVRDSAM00qOEvAmLyxCaOV1I0T6kzJbSvazjA6Q7sNS46uHfHzRzLLAESkHYv3ES50h-sUQwtwvh836OsN-D5UwO6ObMswyxDM6YXYx";
    const config = {
      headers: {
        Authorization: "Bearer " + key,
      },
    };

    axios
      .get(`https://api.yelp.com/v3/businesses/${id}`, config)
      .then(async (response) => {
        _storeData(response.data);
        const value = await AsyncStorage.getItem("@MySuperStore:id");
        if (value !== null) {
          setPosition({
            latitude: JSON.parse(value.coordinates.latitude),
            longitude: JSON.parse(value.coordinates.longitude),
          });
          setSingleCardData(JSON.parse(value));
        }
      });
  };
  useEffect(() => {
    handleShowSingleCard();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>{singleCardData.name}</Text>
        <Text>
          {Object.entries(singleCardData.location).map((i, index) => (
            <Text key={index}>
              {i[0] + ":" + i[1]} {"\n"}
            </Text>
          ))}
        </Text>
        <MapView
          style={styles.map}
          initialRegion={position}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
        >
          <Marker
            title="Yor are here"
            description="This is a description"
            coordinate={position}
          />
        </MapView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  map: {
    height: metrics.screenHeigth / 3,
    width: metrics.screenWidth,
  },
});
export default SingleCardScreen;
