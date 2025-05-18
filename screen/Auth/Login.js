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

import axios from "axios";

// IMPORTANTIONS
import URL from "../../constant/url";
import { AuthContext } from "../../context/AuthContext";

// ICONES
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const _onChangeText = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  return (
    <SafeAreaView style={styles.root}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://i.pinimg.com/564x/10/3e/0d/103e0d9cf5f12633337a30bd75deb027.jpg",
        }}
      />
      <Text style={styles.title}>Sneakers</Text>
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
      <TouchableOpacity style={styles.touchableOpacity} 
       onPress={() => login(user)}
      >
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>

      {/* Medias */}
      <View>
        <Text style={styles.textCenter}>Login with</Text>
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "#0065ff", marginLeft: 3 }}>
            Create an account
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
