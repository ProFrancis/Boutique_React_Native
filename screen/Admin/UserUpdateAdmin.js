import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Button,
  Switch,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import URL from "../../constant/url";
import {
  FETCH_START,
  FETCH_USER,
  UPDATE_USER,
} from "../../redux/adminUser.slice";

export default function UserUpdateAdmin({ route }) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.adminUser);
  const { id } = route.params;

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(FETCH_START());
      try {
        const response = await axios.get(`${URL.GET_USER}/${id}`);
        dispatch(FETCH_USER(response.data));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUser();
  }, []);

  const _onChangeText = (field, value) => {
    dispatch(UPDATE_USER({ field, value }));
  };

  const _handleSubmit = async () => {
    try {
      console.log(data);
      
      const response = await axios.put(`${URL.UPDATE_USER}/${id}`, data);
      if (response.status === 200) {
        console.log("User updated!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Modifier l'utilisateur</Text>

      <Image source={{ uri: data.avatar }} style={styles.avatar} />
      <TextInput
        style={styles.input}
        placeholder="URL Avatar"
        value={data.avatar}
        onChangeText={(value) => _onChangeText("avatar", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={data.prenom}
        onChangeText={(value) => _onChangeText("prenom", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={data.email}
        onChangeText={(value) => _onChangeText("email", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Rôle"
        value={data.role}
        onChangeText={(value) => _onChangeText("role", value)}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Actif :</Text>
        <Switch
          value={data.isActive}
          onValueChange={(value) => _onChangeText("isActive", value)}
        />
      </View>

      <Button title="Mettre à jour" onPress={_handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
