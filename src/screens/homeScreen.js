import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Card from "../components/card";
import { apiResponse } from "../apis/cardData";
import SearchBar from "../components/searchBar";
import { useSelector } from "react-redux";
import SearchScreen from "./searchScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import axios from "axios";
// import yelp from "../apis/yelp";
import { faList } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
  const searchInput = useSelector((state) => state.searchInput.searchInput);
  const [allRestaurants, setAllRestaurants] = useState({
    CostEffective: [],
    BitPricer: [],
    BiSpender: [],
  });
  const [showGrid, setShowGrid] = useState(true);

  const getAllRestaurants = () => {
    // const response = await yelp.get("", {
    //   params: {
    //     limit: 50,
    //     location: "san jose",
    //   },
    // });
    // setAllRestaurants(response.data?.businesses);
    let costEffective = [],
      bitPricer = [],
      biSpender = [];
    apiResponse.businesses.filter((item) => {
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
  };
  useEffect(() => {
    getAllRestaurants();
  }, []);
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
            {/* EXPLORE ITEMS SECTION */}

            {Object.entries(allRestaurants).map((restaurant, index) => {
              return (
                <>
                  <Text style={styles.title}>{restaurant[0]}</Text>
                  <View style={styles.container}>
                    <Card data={restaurant[1]} showGrid={showGrid} />
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
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
