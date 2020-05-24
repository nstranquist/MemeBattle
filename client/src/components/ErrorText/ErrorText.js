import React from 'react'
import { View, Text } from 'react-native'

export const ErrorText = ({
  text
}) => {
  return (
    <View style={{marginBottom:8,marginTop:8}}>
      <Text style={{color: "rgba(255,0,0,.8)",fontSize:16}}>{text}</Text>
    </View>
  )
}
