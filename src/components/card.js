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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "@react-navigation/native";

const Card = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
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
                  style={styles.cardImage}
                  source={{
                    uri: item.image_url,
                  }}
                />
                <View style={styles.heartIcon}>
                  <TouchableOpacity>
                    <FontAwesomeIcon icon={faHeart} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* CARD DETAILS */}
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemRating}>
                {item.review_count}Stars, {}Review
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  horizontalCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 150,
    marginTop: 15,
    alignContent: "center",
    flexDirection: "row",
  },

  griCard: {
    width: 250,
    padding: 10,
    height: 300,
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 10,
  },

  cardImage: {
    borderRadius: 15,
    height: 180,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },
  itemDescription: {
    fontSize: 13,
    color: "#bdbcc4",
  },
  itemRating: {
    color: "#3f4046",
    fontSize: 15,
  },
  addItem: {
    backgroundColor: "grey",
    borderRadius: 50,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  removeItem: {
    backgroundColor: "green",
    borderRadius: 50,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heartIcon: {
    backgroundColor: "red",
    borderRadius: 50,
    height: 25,
    width: 25,
    bottom: 170,
    left: 190,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
});

export default Card;
