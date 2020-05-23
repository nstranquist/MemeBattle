import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput, Text, Button } from 'react-native'
// import redux
// import { attemptSignup } from '../../store/auth'


const emptyForm = {
  email: '',
  password: '',
  confirmPassword: '',
}

export const SignUp = ({
  // attemptSignup
}) => {
  const [formData, setFormData] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState(null)
  
  const handleChange = (text, name) => {
    setFormData({
      ...formData,
      [name]: text
    })
  }
  
  const handleSubmit = () => {
    console.log('formData:', formData)
    const { email, password, confirmPassword } = formData

    if(password !== confirmPassword)
      setFormErrors('passwords must match')
    // else if() { ... }
    else {
      // attemptSignup(formData.email, formData.password)
      resetForm()
    }
  }
  
  const resetForm = () => {
    setFormData(emptyForm)
  }
  
  return (
    <View style={styles.pageLayout}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SignUp</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          value={formData.email}
          onTextChange={text => handleChange(text, 'email')}
        />
        <TextInput
          value={formData.password}
          onTextChange={text => handleChange(text, 'password')}
        />
        <TextInput
          value={formData.confirmPassword}
          onTextChange={text => handleChange(text, 'confirmPassword')}
        />
        <Button title='Create Account' onPress={handleSubmit}>
          Create Account
        </Button>
        <View style={styles.footer}>
          <Button title='Back to Login' onPress={() => navigation.navigate('Login')}>
            Back to Login
          </Button>
        </View>
      </View>
    </View>
  )
}


export const ConnectedSignUp = connect(
  null,
  //{ attemptSignup }
)(SignUp)


const styles = StyleSheet.create({
  pageLayout: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 5,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: '#000',
    opacity: .73,
  },
})