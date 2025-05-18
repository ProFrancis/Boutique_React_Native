import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// URL & ACTIONS
import URL from "../../constant/url";
import { FETCH_START, FETCH_USER } from "../../redux/adminUser.slice";

export default function UserDetailAdmin({ route }) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.adminUser);
  console.log(data);
  
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

  if (loading || !data || !data._id) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: data.avatar }} style={styles.avatar} />

        <Text style={styles.name}>{data.prenom} {data.nom}</Text>
        <Text style={styles.email}>{data.email}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Statut :</Text>
          <Text
            style={[
              styles.status,
              data.isActive ? styles.active : styles.inactive,
            ]}
          >
            {data.isActive ? "ACTIF" : "INACTIF"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Rôle :</Text>
          <Text style={styles.value}>{data.role || "Utilisateur"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Téléphone :</Text>
          <Text style={styles.value}>{data.tel || "Non renseigné"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Adresse :</Text>
          <Text style={styles.value}>{data.adresse || "Non renseignée"}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  active: {
    color: "green",
  },
  inactive: {
    color: "red",
  },
});
