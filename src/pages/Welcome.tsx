import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { fonts, images, themes } from "../constants";
import { useNavigation } from "@react-navigation/core";

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"}
          suas plantas de{"\n"}
          forma fácil
        </Text>

        <Image source={images.watering} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={handleStart}
        >
          <MaterialIcons name="navigate-next" size={40} color={themes.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    color: themes.heading,
    fontFamily: fonts.heading,
    fontWeight: "bold",
    lineHeight: 34,
    paddingTop: 25,
    textAlign: "center",
  },
  subtitle: {
    paddingHorizontal: 20,
    color: themes.heading,
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.green,
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  }
});
