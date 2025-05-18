import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from "../../context/AuthContext";

import axios from 'axios';


// Icons
import Notif from "react-native-vector-icons/Ionicons";

// URL
import URL from '../../constant/url';

// ACTIONS
import { fetchArticleDetail, fetchStart } from '../../redux/articles.slice';

export default function DetailArticle({ route, navigation }) {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  
  const articleStore = useSelector(state => state.articles.data)

  const { id } = route.params;

  useEffect(() => {
    const fetchArticle = async () => {
      dispatch(fetchStart())
      try {
        const { data } = await axios.get(URL.GET_ARTICLE + '/' + id);
        dispatch(fetchArticleDetail(data))
      } catch (error) {
        throw error.message
      }
    }
    fetchArticle()
  },[])


  const deleteArticle = async () => {
    try {
      // 
      const { data, status } = await axios.delete(URL.DELETE_ARTICLE + '/' + id)
      // vérification du statut de la réponse du serveur
      if(status === 200){
        // utilisation de navigation.goBack() pour revenir à l'écran précédent.
        navigation.goBack()
      }
    } catch (error) {
      throw error.message
    }
  }

  return (
   <SafeAreaView style={styles.root}>
      <ScrollView>
        {/* BLOCK HEADER */}
        <View style={styles.flexCenter}>
          <View style={styles.block__avatar}>
            <Image
              style={styles.avatar}
              source={{
                uri: user.avatar,
              }}
            />
            <View>
              <Text style={{ fontSize: 12, color: "#696969", marginLeft: 10 }}>
                Hello {user?.firstname}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 600, marginLeft: 10 }}>
                What do you need today ?
              </Text>
            </View>
          </View>
          <View>
            <Notif size={20} name="notifications-outline" />
          </View>
        </View>

        {/* IMG */}
        <Image
          style={[styles.img, styles.imagePosition]}
          source={{ uri: articleStore?.picture }}
          resizeMode="contain"
        />

        {/* BLOCK AFTER IMAGE  */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../assets/images/icones/heart.png")}
              />
              <Text style={{ fontWeight: 600, marginLeft: 10 }}>
                {19}
              </Text>
            </View>
            <Text style={{ fontWeight: 600, fontSize: 18 }}>
              {articleStore?.name}
            </Text>
            <Text style={{ fontWeight: 600 }}>{articleStore?.price} €</Text>
          </View>

          {/* DESCRIPTION */}
          <Text style={{ fontSize: 20, paddingVertical: 30 }}>
            {articleStore?.description}
          </Text>

          {/* BUTTON (UPDATE, ADD, DELETE) */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Pressable
                onPress={() => navigation.navigate('Update', articleStore._id )}
              >
                <Image
                  style={{ width: 50, height: 50, marginBottom: 5 }}
                  source={require("../../assets/images/icones/refresh.png")}
                />
              </Pressable>
              <Text>Update</Text>
            </View>

            <View>
              <Pressable>
                <Image
                  style={{ width: 50, height: 50, marginBottom: 5 }}
                  source={require("../../assets/images/icones/plus.png")}
                />
              </Pressable>
              <Text>Add Cart</Text>
            </View>

            <View>
              <Pressable onPress={deleteArticle}>
                <Image
                  style={{ width: 50, height: 50, marginBottom: 5 }}
                  source={require("../../assets/images/icones/remove.png")}
                />
              </Pressable>
              <Text>Delete</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flexCenter: {
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  block__avatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 28,
    height: 28,
  },
  img: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#f6F6F6",
  },
});