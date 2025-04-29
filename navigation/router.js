import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// STACKS
import ArticleStack from './ArticleStack'

// SCREENS
import AddArticle from "../screen/Article/AddArticle"


const Tabs = createBottomTabNavigator();

export default function AppNavigation(){
  return(
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name='Home' component={ArticleStack} />
        <Tabs.Screen name='Add' component={AddArticle} />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}