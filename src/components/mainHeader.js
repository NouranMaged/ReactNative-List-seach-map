import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const MainHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.MainHeader}>
      <TouchableOpacity onPress={() => BackHandler.exitApp()}>
        <FontAwesomeIcon icon={faBackward} size={20} />
      </TouchableOpacity>
      <Text style={styles.title}> Restaurants</Text>
      <View style={styles.iconUser}>
        <FontAwesomeIcon icon={faUser} color="white" size={12} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "aliceblue",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  iconUser: {
    height: 30,
    width: 30,
    borderRadius: 6,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainHeader;
