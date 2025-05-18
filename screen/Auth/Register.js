import React, { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ICONES
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

import axios from 'axios'

import URL from '../../constant/url'

export default function Register({ navigation }) {

  const [user, setUser] = useState({
    prenom: "",
    email: "",
    password: "",
  });

  const _onChangeText = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const _handleSubmit = async () => {
    try {
      const { data, status } = await axios.post(URL.AUTH_REGISTER, user)
      if(status === 201 ){
        console.log("User created !");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://i.pinimg.com/564x/10/3e/0d/103e0d9cf5f12633337a30bd75deb027.jpg",
        }}
      />
      <Text style={styles.title}>Sneakers</Text>
      {/* PRENOM */}
      <View style={styles.inputContainer}>
        <Feather style={styles.entypo} name="user" />
        <TextInput
          style={styles.input}
          placeholder="prenom"
          placeholderTextColor="#808080"
          onChangeText={(val) => _onChangeText("prenom", val)}
        />
      </View>
      {/* EMAIL */}
      <View style={styles.inputContainer}>
        <Entypo style={styles.entypo} name="email" />
        <TextInput
          style={styles.input}
          placeholder="Your email"
          placeholderTextColor="#808080"
          onChangeText={(val) => _onChangeText("email", val)}
        />
      </View>
      {/* PASSWORD */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcon style={styles.entypo} name="security" />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#808080"
          secureTextEntry
          onChangeText={(val) => _onChangeText("password", val)}
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={_handleSubmit}
      >
        <Text style={styles.button}>Register</Text>
      </TouchableOpacity>

      {/* Medias */}
      <View>
        <Text style={styles.textCenter}>Register with</Text>
      </View>

      <View style={styles.mediaContainer}>
        {/* GOOGLE */}
        <TouchableOpacity style={styles.mediaButton}>
          <Image
            style={styles.media}
            source={require("../../assets/images/icones/google.png")}
          />
        </TouchableOpacity>
        {/* X */}
        <TouchableOpacity style={styles.mediaButton}>
          <Image
            style={styles.media}
            source={require("../../assets/images/icones/x.png")}
          />
        </TouchableOpacity>
        {/* FACEBOOK */}
        <TouchableOpacity style={styles.mediaButton}>
          <Image
            style={styles.media}
            source={require("../../assets/images/icones/facebook.png")}
          />
        </TouchableOpacity>
      </View>
      {/* REGISTER LINK  */}
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: 500 }}>
          Do you have an account ?
        </Text>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
        >
          <Text style={{ color: "#0065ff", marginLeft: 3 }}>
            Login 
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
  },
  logo: {
    alignSelf: "center",
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
    marginBottom: 30,
  },
  entypo: {
    size: 30,
    color: "#666",
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    outlineStyle: "none",
  },
  touchableOpacity: {
    marginBottom: 20,
    borderRadius: 5,
    padding: 20,
    backgroundColor: "#0065ff",
  },
  button: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
    color: "#fff",
  },
  textCenter: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
  mediaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  mediaButton: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  media: {
    width: 28,
    height: 28,
  },
});
