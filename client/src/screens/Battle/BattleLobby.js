import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, } from 'react-native'


export const BattleLobby = ({
  
}) => {
  
  
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageLayout}>
        <Text style={styles.headerText}>BattleLobby</Text>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageLayout: {
    flex: 1,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: '#000',
    opacity: .73,
  },
})