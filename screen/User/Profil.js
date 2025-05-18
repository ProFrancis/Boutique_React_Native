import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import URL from "../../constant/url";

export default function Profil() {
  const { user, setUser } = useContext(AuthContext);
  const [profilUser, setProfilUser] = useState({});

  const _onChangeText = (key, value) => {
    setProfilUser({ ...profilUser, [key]: value });
  };

  const _handleSubmit = async () => {
    try {
      const { data, status } = await axios.put(
        URL.UPDATE_USER + "/" + user._id,
        profilUser
      );
      if (status === 200) {
      console.log("Succès", "Profil mis à jour !");
      }
    } catch (error) {
    console.log("Erreur", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />

        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          defaultValue={user.prenom}
          onChangeText={(val) => _onChangeText("prenom", val)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          defaultValue={user.email}
          onChangeText={(val) => _onChangeText("email", val)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Avatar (URL)</Text>
        <TextInput
          style={styles.input}
          defaultValue={user.avatar}
          onChangeText={(val) => _onChangeText("avatar", val)}
        />

        <Pressable style={styles.button} onPress={_handleSubmit}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 24,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#19196b",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 6,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#19196b",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
