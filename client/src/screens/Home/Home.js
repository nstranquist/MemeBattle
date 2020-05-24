/* src/screens/Home/Home.js */

import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, SafeAreaView, TouchableHighlight } from 'react-native'

import { logout } from '../../store/Auth'
import { appColors } from '../../utils/app.colors'

const Home = ({
  navigation
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
          <TouchableHighlight onPress={() => navigation.navigate("Battle")}>
            <View style={styles.homeItem}>
              <Text style={styles.homeItemText}>Battle!</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigation.navigate("Battle")}>
            <View style={styles.homeItem}>
              <Text style={styles.homeItemText}>Strategy</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigation.navigate("Battle")}>
            <View style={styles.homeItem}>
              <Text style={styles.homeItemText}>Stats</Text>
            </View>
          </TouchableHighlight>
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
  homeItem: {
    borderColor: appColors.neonGreen,
    borderWidth: 2,
    backgroundColor: appColors.darkGray,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 6,
    marginBottom: 6,
    // borderRadius: 3,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageLayout: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:20,
    paddingBottom:20
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: '#000',
    opacity: .73,
  },
  pageBody: {

  }
})