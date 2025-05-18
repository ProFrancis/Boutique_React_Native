import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'

import URL from '../../constant/url'
import { fetchArticleDetail, fetchArticleUpdate, fetchStart } from '../../redux/articles.slice'

export default function UpdateArticle({ route }) {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.articles)
  const { id } = route.params;

  // const [article, setArticle] = useState({})
  
  useEffect(() => {
    const fetchArticle = async () => {
      dispatch(fetchStart())
      try {
        const { data } = await axios.get(URL.GET_ARTICLE + '/' + id)
        dispatch(fetchArticleDetail(data))
        // setArticle(data)
      } catch (error) {
        console.error(error.message);
      }
    } 
    fetchArticle();
  }, [])

  const _onChangeText = (name , value) => {
    // setArticle({ ...article, [name]: value }); 
    dispatch(fetchArticleUpdate({ field: name, value }))
  }

  const _handleSubmit = async () => {
    try {
      // const { data, status } = await axios.put(`${URL.UPDATE_ARTICLE}/${id}`, article);      
      const response = await axios.put(URL.UPDATE_ARTICLE + '/' + id, data);
      if(response.status === 200){
        console.log("Article Updated ! ");
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <View>
      <TextInput 
        style={styles.textInput}
        defaultValue={data.name}
        onChangeText={(value) => _onChangeText("name", value)}
      />
      <TextInput 
        style={styles.textInput}
        defaultValue={data.content}
        onChangeText={(value) => _onChangeText("content", value)}
      />
      <TextInput 
        style={styles.textInput}
        defaultValue={data.category}
        onChangeText={(value) => _onChangeText("category", value)}
      />
      <TextInput 
        style={styles.textInput}
        defaultValue={data.brand}
        onChangeText={(value) => _onChangeText("brand", value)}
      />
      <TextInput
        style={styles.textInput} 
        defaultValue={data.price}
        onChangeText={(value) => _onChangeText("price", value)}
      />
      <TextInput
        style={styles.textInput} 
        defaultValue={data.picture}
        onChangeText={(value) => _onChangeText("picture", value)}
      />
      <TextInput
        style={styles.textInput} 
        defaultValue={data.stock}
        onChangeText={(value) => _onChangeText("stock", value)}
      />
      <Button 
        title='valider'
        onPress={_handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({})