import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Text, } from 'react-native'
import { appColors } from '../../utils/app.colors'
import { TouchableOpacity } from 'react-native-gesture-handler'


export const AuthMenu = ({
  navigation
}) => {
  
  useEffect(() => {
    // get random gif from giphy

  }, [])
  
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageLayout}>
        <Text style={styles.headerText}>MemeBattle</Text>
        <View>
          <TouchableOpacity
            style={[styles.menuButton, { marginBottom: 21 }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.menuButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.menuButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: appColors.darkGray
  },
  pageLayout: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    fontSize: 48,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: appColors.light,
    fontWeight: "400"
  },
  menuButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.14)",
    backgroundColor: appColors.light,
    padding: 6,
  },
  menuButtonText: {
    color: appColors.darkestGray,
    textAlign:"center",
    fontSize: 20
  }
})