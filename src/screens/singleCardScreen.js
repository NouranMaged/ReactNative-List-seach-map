import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { singleCard } from "../apis/singleCard";

const SingleCardScreen = (props) => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  console.log(singleCard);
  const id = props.route.params.id;
  const [singleCardData, setSingleCardData] = useState(singleCard);
  const handleShowSingleCard = () => {
    // getSingleCardData(id).then((data) => {
    console.log("data");
    // });
    const key =
      "Jw0oIMgpId1HV8x-mogAapr36SVRDSAM00qOEvAmLyxCaOV1I0T6kzJbSvazjA6Q7sNS46uHfHzRzLLAESkHYv3ES50h-sUQwtwvh836OsN-D5UwO6ObMswyxDM6YXYx";
    const config = {
      headers: {
        Authorization: "Bearer " + key,
      },
    };

    axios
      .get(`https://api.yelp.com/v3/businesses/${id}`, config)
      .then((response) => {
        console.log(response); //These are the results sent back from the API!
        setPosition({
          latitude: singleCardData.coordinates.latitude,
          longitude: singleCardData.coordinates.longitude,
        });
      });
  };
  useEffect(() => {
    console.log("object");
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
    height: 400,
    width: 400,
  },
});
export default SingleCardScreen;
