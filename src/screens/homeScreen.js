import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Card from "../components/molecules/card";
import SearchBar from "../components/atoms/searchBar";
import { useSelector } from "react-redux";
import SearchScreen from "./searchScreen";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faList } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
  const searchInput = useSelector((state) => state.searchInput.searchInput);
  const [allRestaurants, setAllRestaurants] = useState({
    CostEffective: [],
    BitPricer: [],
    BiSpender: [],
  });
  const [showGrid, setShowGrid] = useState(true);

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem("@MySuperStore:key", JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const getAllRestaurants = async () => {
    const key =
      "Jw0oIMgpId1HV8x-mogAapr36SVRDSAM00qOEvAmLyxCaOV1I0T6kzJbSvazjA6Q7sNS46uHfHzRzLLAESkHYv3ES50h-sUQwtwvh836OsN-D5UwO6ObMswyxDM6YXYx";
    const config = {
      headers: {
        Authorization: "Bearer " + key,
      },

      params: {
        location: "san jose",
        limit: 50,
      },
    };

    axios
      .get("https://api.yelp.com/v3/businesses/search", config)
      .then(async (response) => {
        _storeData(response.data.businesses);
        const value = await AsyncStorage.getItem("@MySuperStore:key");
        if (value !== null) {
          let costEffective = [],
            bitPricer = [],
            biSpender = [];
          JSON.parse(value)?.filter((item) => {
            if (item.price === "$") {
              costEffective.push(item);
              allRestaurants.CostEffective = [item];
            } else if (item.price === "$$") {
              bitPricer.push(item);
              allRestaurants.BitPricer = bitPricer;
            } else if (item.price === "$$$") {
              biSpender.push(item);
              allRestaurants.BiSpender = biSpender;
            }
            setAllRestaurants({ ...allRestaurants });
          });
        }
      });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.subHeader}>
          {/* SEARCH BAR */}
          <SearchBar />
          <TouchableOpacity onPress={() => setShowGrid(!showGrid)}>
            <FontAwesomeIcon icon={faList} size={30} />
          </TouchableOpacity>
        </View>

        {searchInput == "" ? (
          <>
            {/* ITEMS SECTION */}
            {Object.entries(allRestaurants).map((restaurant, index) => {
              return (
                <>
                  <Text style={styles.title}>{restaurant[0]}</Text>
                  <View style={styles.container}>
                    <Card
                      data={restaurant[1]}
                      showGrid={showGrid}
                      key={index}
                    />
                  </View>
                </>
              );
            })}
          </>
        ) : (
          <SearchScreen />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2000,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  container: {
    marginTop: 20,
  },
});

export default HomeScreen;
