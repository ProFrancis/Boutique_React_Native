import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import URL from '../../constant/url'

export default function AddArticle() {

 const [article,setArticle] = useState({
  name:'',
  content: '',
  category: '',
  brand: '',
  price: 0,
  picture: '',
  status: true,
  stock: 0
 })

  const _onChangeText = (name , value) => {
    setArticle({ ...article, [name]: value }); 
  }

  const _handleSubmit = async () => {
    // 
  }

  return (
    <View>
      <TextInput 
        style={styles.textInput}
        placeholder="Nom de l'article"
        onChangeText={(value) => _onChangeText("name", value)}
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Content de l'article"
        onChangeText={(value) => _onChangeText("content", value)}
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Category de l'article"
        onChangeText={(value) => _onChangeText("category", value)}
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Brand de l'article"
        onChangeText={(value) => _onChangeText("brand", value)}
      />
      <TextInput
        style={styles.textInput} 
        placeholder="Price de l'article"
        onChangeText={(value) => _onChangeText("price", value)}
      />
      <TextInput
        style={styles.textInput} 
        placeholder="Picture de l'article"
        onChangeText={(value) => _onChangeText("picture", value)}
      />
      <TextInput
        style={styles.textInput} 
        placeholder="Stock de l'article"
        onChangeText={(value) => _onChangeText("stock", value)}
      />
      <Button 
        title='valider'
        onPress={_handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    height: 50,
  }
})