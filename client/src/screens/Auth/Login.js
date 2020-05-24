/* src/screens/Auth/Login.js */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

// import components
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { ErrorText } from '../../components/ErrorText'
import { appColors } from '../../utils/app.colors'

import { login, clearErrors } from '../../store/Auth'

const emptyLoginForm = {
  username: "Nicostran",
  password: "Demodemo"
}

const Login = ({
  navigation,
  loading,
  errors,
  login,
  clearErrors,
}) => {
  const [loginForm, setLoginForm] = useState(emptyLoginForm)
  const [formErrors, setFormErrors] = useState(null) // errors from local state

  useFocusEffect(
    React.useCallback(() => {
      return () => resetForm()
    }, [])
  )
  
  const handleChange = (text, name) => {
    setLoginForm({
      ...loginForm,
      [name]: text
    })
  }

  const handleSubmit = () => {
    const {username, password} = loginForm

    // if(...) { setFormErrors("example error message") }
    if(username.length < 1 || password.length < 1)
      setFormErrors('username or password cannot be empty')
    else {
      login(username, password)
      // resetForm()
    }
  }

  const resetForm = () => {
    setLoginForm(emptyLoginForm)
    setFormErrors(null)
    clearErrors()
  }
  
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageLayout}>
        <Text style={styles.headerText}>Login</Text>
        <View style={styles.loginForm}>
          {formErrors && <ErrorText text={formErrors} />}
          {errors && <ErrorText text={errors} />}
          <View style={styles.loginInput}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              autoFocus
              style={[styles.textInput, { marginBottom: 6 }]}
              value={loginForm.username}
              onChangeText={text => handleChange(text, "username")}
            />
          </View>
          <View style={styles.loginInput}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              textContentType="password"
              style={styles.textInput}
              value={loginForm.password}
              onChangeText={text => handleChange(text, "password")}
            />
          </View>
        </View>
        <View style={styles.menuButtons}>
          <TouchableOpacity
            style={[styles.menuButton, { marginBottom: 16, backgroundColor: appColors.darkGray }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.menuButtonText, { color: appColors.lightest }]}>
              Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuButton, { marginBottom: 16 }]}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.menuButtonText}>
              Sign Up</Text>
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

export const ConnectedLogin = connect(
  mapStateToProps,
  { login, clearErrors }
)(Login)

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