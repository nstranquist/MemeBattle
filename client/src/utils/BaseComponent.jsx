import React from 'react'
import { StatusBar, SafeAreaView, ScrollView } from 'react-native'

export const BaseComponent = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
