/* src/App.js */

// import components
import React from 'react';

// import navigation components
import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import screen components
import { Profile } from './screens/Profile'
import { Battle } from './screens/Battle'
import { Login, SignUp, AuthMenu } from './screens/Auth'


const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const BattleStack = createStackNavigator();

const BattleStack = () => (
  <BattleStack.Navigator>
    {/* <BattleStack.Screen name="Lobby" component={Lobby} /> */}
    <BattleStack.Screen name="Battle" component={Battle} />
    {/* <BattleStack.Screen name="Results" component={Results} /> */}
  </BattleStack.Navigator>
)

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="AuthMenu" headerMode="none">
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Sign Up" component={SignUp} />
        <AuthStack.Screen name="Welcome" component={AuthMenu} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({ ... })

export default App;


// const BottomTabs = () => (
//   <BottomTabs.Navigator>
//     <BottomTabs.Screen name="Profile" component={Profile} />
//     <BottomTabs.Screen name="Battle" component={BattleStack} />
//   </BottomTabs.Navigator>
// )