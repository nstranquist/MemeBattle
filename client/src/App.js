/* src/App.js */

// import components
import React from 'react';
import { Provider, connect } from 'react-redux'

// import navigation components
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { configureStore } from './store'

// import screen components
import { Home } from './screens/Home'
import { Profile } from './screens/Profile'
import { Battle } from './screens/Battle'
import { Login, SignUp, AuthMenu } from './screens/Auth'


const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const BattleStack = createStackNavigator();

const BattleStackNav = () => (
  <BattleStack.Navigator>
    {/* <BattleStack.Screen name="Lobby" component={Lobby} /> */}
    <BattleStack.Screen name="Battle" component={Battle} />
    {/* <BattleStack.Screen name="Results" component={Results} /> */}
  </BattleStack.Navigator>
)

const App = ({
  signedIn,
}) => {
  return (
    <NavigationContainer>
      {signedIn ? (
        <AppStack.Navigator>
          <AppStack.Screen name="Home" component={Home} />
          <AppStack.Screen name="Profile" component={Profile} />
          <AppStack.Screen name="Battle" component={BattleStackNav} />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="AuthMenu" headerMode="none">
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
          <AuthStack.Screen name="AuthMenu" component={AuthMenu} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({ ... })

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn
})

const ConnectedApp = connect(
  mapStateToProps,
  {  }
)(App)

const RootApp = () => (
  <Provider store={configureStore()}>
    <ConnectedApp />
  </Provider>
)

export default RootApp


// const BottomTabs = () => (
//   <BottomTabs.Navigator>
//     <BottomTabs.Screen name="Profile" component={Profile} />
//     <BottomTabs.Screen name="Battle" component={BattleStack} />
//   </BottomTabs.Navigator>
// )