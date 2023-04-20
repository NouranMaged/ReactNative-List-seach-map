import React from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import metrics from "../themes/metrics";

const Card = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {props.data?.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SingleCardScreen", {
                  id: "YwBw5RE9BCB1Kuq863t1hg",
                })
              }
              key={index}
            >
              <View
                key={index}
                style={props.showGrid ? styles.griCard : styles.horizontalCard}
              >
                {/* CARD BODY  */}
                <View>
                  <Image
                    style={
                      props.showGrid ? styles.gridCardImg : styles.fullScreenImg
                    }
                    source={{
                      uri: item.image_url,
                    }}
                  />
                </View>

                {/* CARD DETAILS */}
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemRating}>
                  {item.review_count}Stars, {}Review
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },

  horizontalCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 150,
    marginTop: 15,
    alignContent: "center",
    flexDirection: "row",
    flexBasis: "50%",
  },

  griCard: {
    width: metrics.screenWidth / 2.5,
    padding: 10,
    height: 300,
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 10,
    flexBasis: "50%",
  },

  gridCardImg: {
    borderRadius: 15,
    height: 180,
  },
  fullScreenImg: {
    borderRadius: 15,
    height: 100,
    width: metrics.screenWidth / 3,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },

  itemRating: {
    color: "#3f4046",
    fontSize: 15,
  },
});

export default Card;
