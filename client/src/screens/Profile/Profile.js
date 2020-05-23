import React from 'react'
import { StyleSheet, View, Text, } from 'react-native'


export const Profile = ({
  
}) => {
  
  
  return (
    <View style={styles.pageLayout}>
      <Text style={styles.headerText}>Profile</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  pageLayout: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: '#000',
    opacity: .73,
  },
})