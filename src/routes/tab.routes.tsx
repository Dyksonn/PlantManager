import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import { themes } from '../constants';
import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';

const {
  Navigator,
  Screen
} = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: themes.green,
        inactiveTintColor: themes.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: 20,
          height: 88
        }
      }}
    >
      <Screen 
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons color={color} size={size} name="add-circle-outline" />
        }}
      />
      <Screen 
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons color={color} size={size} name="format-list-bulleted" />
        }}
      />
    </Navigator>
  );
}

export default AuthRoutes;