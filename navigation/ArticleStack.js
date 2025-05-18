import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screen/Home";
import DetailArticle from "../screen/Article/DetailArticle";
import UpdateArticle from "../screen/Article/UpdateArticle";

const Stack = createNativeStackNavigator();

export default function ArticleStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailArticle} />
      <Stack.Screen name="Update" component={UpdateArticle} />
      
    </Stack.Navigator>
  )
}
