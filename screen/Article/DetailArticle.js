import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DetailArticle({ route, navigation }) {

  const { id } = route.params

  // useState
  // useEffect
  // faire une requete pour recupérer l article avec axios
  // on affiche l article

  return (
    <View>
      <Text>DetailArticle</Text>
    </View>
  )
}

const styles = StyleSheet.create({})