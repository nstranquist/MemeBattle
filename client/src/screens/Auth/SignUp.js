import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { StyleSheet, SafeAreaView, View, TextInput, Text, TouchableOpacity } from 'react-native'
import { ErrorText } from '../../components/ErrorText'
import { appColors } from '../../utils/app.colors'
// import redux
import { signup, clearErrors } from '../../store/Auth'


const emptySignUpForm = {
  username: 'Nicostran',
  password: 'Demodemo',
  confirmPassword: 'Demodemo',
}

export const SignUp = ({
  navigation,
  loading,
  errors,
  signup,
  clearErrors,
}) => {
  const [formData, setFormData] = useState(emptySignUpForm)
  const [formErrors, setFormErrors] = useState(null)

  useFocusEffect(
    React.useCallback(() => {
      return () => resetForm()
    }, [])
  )
  
  const handleChange = (text, name) => {
    setFormData({
      ...formData,
      [name]: text
    })
  }
  
  const handleSubmit = () => {
    console.log('formData:', formData)
    const { username, password, confirmPassword } = formData

    if(username.length < 1 || password.length < 1)
      setFormErrors("username or password is empty")
    else if(password !== confirmPassword)
      setFormErrors('passwords must match')
    else {
      signup(username, password)
      // resetForm()
    }
  }
  
  const resetForm = () => {
    setFormData(emptySignUpForm)
    setFormErrors(null)
    clearErrors()
  }
  
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageLayout}>
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.loginForm}>
          {formErrors && <ErrorText text={formErrors} />}
          {errors && <ErrorText text={errors} />}
          <View style={styles.loginInput}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              autoFocus
              style={[styles.textInput, { marginBottom: 4 }]}
              value={formData.username}
              onChangeText={text => handleChange(text, "username")}
            />
          </View>
          <View style={styles.loginInput}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={[styles.textInput, { marginBottom: 4 }]}
              value={formData.password}
              onChangeText={text => handleChange(text, "password")}
            />
          </View>
          <View style={styles.loginInput}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.textInput}
              value={formData.confirmPassword}
              onChangeText={text => handleChange(text, "confirmPassword")}
            />
          </View>
        </View>
        <View style={styles.menuButtons}>
          <TouchableOpacity
            style={[styles.menuButton, { marginBottom: 16, backgroundColor: appColors.darkGray }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.menuButtonText, { color: appColors.lightest }]}>
              Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuButton, { marginBottom: 16 }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.menuButtonText}>
              Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("AuthMenu")}
          >
            <Text style={styles.menuButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  errors: state.auth.errors
})

export const ConnectedSignUp = connect(
  mapStateToProps,
  { signup, clearErrors }
)(SignUp)


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: appColors.light,
  },
  pageLayout: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  headerText: {
    fontSize: 48,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: appColors.darkGray,
  },
  loginForm: {
    padding: 20
  },
  loginInput: {
    marginBottom: 10
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "rgba(0,0,0,.14)",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20
  },
  inputLabel: {
    fontSize:13,
    marginBottom: 3,
    opacity:.75,
  },
  menuButtons: {
    marginLeft: 60,
    marginRight: 60
  },
  menuButton: {
    textAlign: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.14)",
    backgroundColor: appColors.light,
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    elevation: 2,
    padding: 4
  },
  menuButtonText: {
    color: appColors.darkGray,
    textAlign: "center",
    fontSize: 22,
    fontFamily: "sans-serif"
  }
})

// const styles = StyleSheet.create({
//   pageContainer: {
//     flex: 1,
//     backgroundColor: appColors.darkGray,
//   },
//   pageLayout: {
//     flex: 1,
//   },
//   header: {
//     padding: 5,
//   },
//   headerText: {
//     fontSize: 32,
//     fontFamily: 'sans-serif',
//     textAlign: 'center',
//     color: appColors.light,
//   },
// })