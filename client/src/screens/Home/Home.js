/* src/screens/Home/Home.js */

import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity } from 'react-native'

import { logout } from '../../store/Auth'
import { appColors } from '../../utils/app.colors'

const Home = ({
  navigation,
  logout,
}) => {
  
  
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageLayout}>
        <View style={styles.pageHeader}>
          <Text style={styles.headerText}>
            Welcome to MemeBattle Online!
          </Text>
        </View>
        <View style={styles.pageBody}>
          <View style={styles.homeItem}>
            <TouchableOpacity onPress={() => navigation.navigate("Battle")}>
              <Text style={styles.homeItemText}>Battle!</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.homeItem}>
            <TouchableOpacity onPress={() => navigation.navigate("Deck")}>
              <Text style={styles.homeItemText}>Strategy</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.homeItem}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Text style={styles.homeItemText}>Stats</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button title="Logout" onPress={() => logout()}>
            Logout
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({

})

export const ConnectedHome = connect(
  mapStateToProps,
  { logout }
)(Home)

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  pageLayout: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom:20,
  },
  headerText: {
    fontSize: 44,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: appColors.darkGray,
  },
  pageBody: {
    marginLeft: 10,
    marginRight: 10,
  },
  homeItem: {
    borderColor: appColors.neonGreen,
    borderWidth: 3,
    backgroundColor: appColors.darkGray,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 6,
    marginBottom: 6,
    // borderRadius: 3,
  },
  homeItemText: {
    color: appColors.light,
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'sans-serif'
  }
})