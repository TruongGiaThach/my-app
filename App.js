// In App.js in a new project
//UI source: https://towardsdev.com/how-to-build-a-calculator-app-using-react-native-a-step-by-step-tutorial-40ae327fae5f
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Column from "./components/Column";
import Main from './main';
import Histories from './histories'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'react-native';


const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <NavigationContainer style={styles.container}>

      <Tab.Navigator
        tabBarOptions={{
         
          labelStyle: {
            fontSize: 16,
            color: "#fff"
          },
          style: {
            backgroundColor: "#333333",
            marginTop: StatusBar.currentHeight,
            

          },
        }}
        initialRouteName="Computer"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato', },
        }}

      >
        <Tab.Screen name="Computer" component={Main} />
        <Tab.Screen
          name="Histories"
          component={Histories}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// create styles of app
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    justifyContent: "flex-end",
    flex: 1,
    marginTop: 100
  },
  text: {
    color: "yellow"
  },


});

// export default App;

// import * as React from 'react';
// import { Text, View, SafeAreaView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createMaterialTopTabNavigator();

// export default function App() {
//   return (
//     <View>
//       <NavigationContainer>
//         <Tab.Navigator>
//           <Tab.Screen name="Home" component={HomeScreen} />
//           <Tab.Screen name="Settings" component={SettingsScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// }