import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screen/Home";
import DetailArticle from "../screen/Article/DetailArticle"

const Stack = createNativeStackNavigator();

export default function ArticleStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={DetailArticle} />
    </Stack.Navigator>
  )
}
