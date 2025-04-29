import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URL from '../constant/url'

export default function Home({ navigation }) {

  const [articles, setArticles] = useState([]);

  useEffect(() => {

    const fetchArticles = async () => {
      try {
        // Faire une requete GET  à l url spécifiée avec axios
        const { data } = await axios.get(URL.GET_ALL_ARTICLES);
        setArticles(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchArticles();
  }, [])

  const renderItem = ({ item }) => {

    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('Detail', { id: item._id })
          }}
        >
          <Image 
            source={{ uri: item.picture }}
            style={styles.img}
          />
          <Text>{item.name}</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View>
      <Text>Home</Text>
      <FlatList
        data={articles}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 90
  }
})