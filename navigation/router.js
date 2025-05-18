import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  View,
  Text,
} from "react-native";

// STACKS
import ArticleStack from "./ArticleStack";
import AuthStack from "./AuthStack";
import AdminStack from "./AdminStack";

// SCREENS
import AddArticle from "../screen/Article/AddArticle";
import Profil from "../screen/User/Profil";
import Panier from "../screen/Article/Panier";

// CONTEXT
import { AuthContext } from "../context/AuthContext";

// DRAWER
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// ICONES
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Cart from "../screen/Article/Panier";

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView>
      <SafeAreaView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#f4f4f4",
            borderBottomWidth: 1,
          }}
        >
          <Image
            style={{
              width: 130,
              height: 130,
            }}
            source={{
              uri: user?.avatar,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              color: "#696969",
            }}
          >
            {user?.prenom}
          </Text>
        </View>
      </SafeAreaView>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => logout()}
        icon={() => <MaterialIcons name="logout" size={20} color="gray" />}
      />
    </DrawerContentScrollView>
  );
};

const TabsNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Tabs.Navigator>
      {/* condition ternaire */}
      {user == null ? (
        <Tabs.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
        />
      ) : (
        <>
          <Tabs.Screen
            name="Home"
            component={ArticleStack}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Add"
            component={AddArticle}
            options={{
              title: "Add",
              headerShown: false,
              tabBarLabel: "Add",
              tabBarIcon: ({ color, size }) => (
                <Feather name="shopping-bag" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Panier"
            component={Panier}
            options={{
              headerShown: false,
              tabBarLabel: "Panier",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart-outline" size={size} color={color} />
              ),
            }}
          />
        </>
      )}
    </Tabs.Navigator>
  );
};

export default function AppNavigation() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user == null ? (
          <AuthStack />    
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Articles" component={TabsNavigator} />
          <Drawer.Screen
            name="Profil"
            component={Profil}
            options={{
              drawerLabel: "Profil",
              title: "profil",
            }}
          />
          <Drawer.Screen
            name="Admin"
            component={AdminStack}
            options={{
              drawerLabel: "Admin",
              title: "Admin",
            }}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
