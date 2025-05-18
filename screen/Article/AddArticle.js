import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import URL from '../../constant/url';

export default function AddArticle() {
  const [article, setArticle] = useState({
    name: '',
    content: '',
    category: '',
    brand: '',
    price: 0,
    picture: '',
    status: true,
    stock: 0,
  });

  const _onChangeText = (name, value) => {
    setArticle({ ...article, [name]: value });
  };

  const _handleSubmit = async () => {
    try {
      const { status } = await axios.post(URL.POST_ARTICLE, article);
      if (status === 201) {
        Alert.alert("Succès", "Article ajouté avec succès !");
      }
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajouter un Article</Text>

      {[
        { placeholder: "Nom de l'article", field: "name" },
        { placeholder: "Contenu", field: "content" },
        { placeholder: "Catégorie", field: "category" },
        { placeholder: "Marque", field: "brand" },
        { placeholder: "Prix", field: "price", keyboardType: "numeric" },
        { placeholder: "Image (URL)", field: "picture" },
        { placeholder: "Stock", field: "stock", keyboardType: "numeric" },
      ].map(({ placeholder, field, keyboardType }) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(value) => _onChangeText(field, value)}
          keyboardType={keyboardType || "default"}
          placeholderTextColor="#999"
        />
      ))}

      <Pressable style={styles.button} onPress={_handleSubmit}>
        <Text style={styles.buttonText}>Valider</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
