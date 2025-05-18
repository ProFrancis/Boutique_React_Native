import React, {createContext, useEffect, useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL
import URL from "../constant/url";

export const AuthContext = createContext(); // Créez un contexte d'authentification.

export const AuthProvider = ({ children }) => {

  // 1 - État pour suivre si l'authentification est en cours.
  const [isLoading, setLoading] = useState(false);
  // 2 - État pour stocker les informations de l'utilisateur connecté.
  const [user, setUser] = useState(null);

  // 3 - Fonction pour gérer l'authentification de l'utilisateur
  const login = async (dataForm) => {
    
    setLoading(true); // Définissez isLoading à true pendant l'authentification.
    try {
      // Une requête POST vers l'URL d'authentification avec les données utilisateur.
      const { data, status } = await axios.post(URL.AUTH_LOGIN, dataForm);

      if(status === 200){
        // Met à jour l'état user avec les données de data
        setUser(data)

        // Stockez les données de l'utilisateur dans l AsyncStorage
        await AsyncStorage.setItem("auth", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false) // Met isLoading à false apres une authentification réussie.
      }, 500)
    }
  }

  // FONCTION POUR SE DECONNECTER
  const logout = () => {
    // Met isLoading à true
    setLoading(true)

     // Reinitialisez l état de l user à null.
     setUser(null);

     // supprimer les informations de l user du stockage local.
     AsyncStorage.removeItem("auth");

    // Met isLoading à false apres la deconnexion
    setTimeout(() => {
      setLoading(false) // Met isLoading à false apres une authentification réussie.
    }, 500);
  }

  // FONCTION POUR VERIFIER SI UN USER EST DEJA CONNECTE.
  const isLoggedIn = async () => {

    // Récupérez les données de l user depuis le stockage local
    let currentAuth = await AsyncStorage.getItem('auth')
    
    // Met à jour l etat user avec les données récupérées.
    setUser(currentAuth ? JSON.parse(currentAuth) : null);

    // Met isLoading à false apres la verification.
    setTimeout(() => {
      setLoading(false) // Met isLoading à false apres une authentification réussie.
    }, 500);
    
  }

  // Utilisez useEffect pour appeler la fonction isLoggedIn lors du montage du composant.
  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )  
}