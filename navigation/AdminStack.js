import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserAdmin from "../screen/Admin/UserAdmin";
import UserDetailAdmin from "../screen/Admin/UserDetailAdmin";
import UserUpdateAdmin from "../screen/Admin/UserUpdateAdmin";

const Stack = createNativeStackNavigator();

export default function AdminStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="UserAdmin" component={UserAdmin} options={{ headerShown: false }}/>
      <Stack.Screen name="UserDetailAdmin" component={UserDetailAdmin} />
      <Stack.Screen name="UserUpdateAdmin" component={UserUpdateAdmin} />
    </Stack.Navigator>
  )
}
