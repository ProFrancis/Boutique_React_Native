import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// REDUX 
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_USERS, FETCH_START } from "../../redux/adminUser.slice";

// URL
import URL from "../../constant/url";

// Icons
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

export default function UserAdmin() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { data, loading } = useSelector((state) => state.adminUser);

  const fetchUsers = async () => {
    dispatch(FETCH_START());
    try {
      const response = await axios.get(URL.GET_ALL_USERS);
      setTimeout(() => {
        dispatch(FETCH_ALL_USERS(response.data));
      }, 200);
    } catch (error) {
      console.error(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const deleteUser = async (userId) => {
    try {
      await axios.put(`${URL.DESACTIVE_USER}/${userId}`);
      await fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userText}>
          <Text style={styles.name}>{item.prenom}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text
            style={[
              styles.status,
              item.isActive ? styles.active : styles.inactive,
            ]}
          >
            {item.isActive ? "ACTIF" : "INACTIF"}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => navigation.navigate("UserDetailAdmin", { id: item._id })}
          style={styles.iconButton}
        >
          <Ionicons name="eye" size={22} color="#007bff" />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("UserUpdateAdmin", { id: item._id })}
          style={styles.iconButton}
        >
          <Feather name="edit" size={22} color="#28a745" />
        </Pressable>

        <Pressable
          onPress={() => deleteUser(item._id)}
          style={styles.disableButton}
        >
          <Text style={styles.disableText}>Désactiver</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utilisateurs</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  userText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  status: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: "bold",
  },
  active: {
    color: "green",
  },
  inactive: {
    color: "red",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  disableButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc3545",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  disableText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "500",
  },
  iconButton: {
    padding: 6,
  },
});
