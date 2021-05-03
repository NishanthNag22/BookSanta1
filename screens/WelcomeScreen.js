import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: false,
      firstName: '',
      lastName: '',
      contact: '',
      address: '',
      confirmPassword: '',
      isBookRequestActive: false
    }
  }

  userLogin = (emailId, password) => {
    firebase.auth().signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('DonateBooks')
      })
      .catch((error) => {
        var errorMessage = error.message;
        return alert(errorMessage)
      })
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert("password doesn't match \n Check your password.")
    } else {
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('users').add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contact: this.state.contact,
            emailId: this.state.emailId,
            address: this.state.address,
            isBookRequestActive: false
          })
          return alert(
            'User Added Successfully',
            '',
            [
              { text: 'OK', onPress: () => this.setState({ "isModalVisible": false }) },
            ]
          );
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage)
        });
    }
  }
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
              >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Contact"}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Email"}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Confrim Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.setState({ "isModalVisible": false })}
                >
                  <Text style={{ color: '#ff5722' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Book Santa</Text>
          <Image
            source={require("../assets/santa1.png")}
            style={{ width: 200, height: 210 }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.loginBox}
            placeholder="Enter Email Id"
            placeholderTextColor="#ffff"
            keyboardType='email-address'
            onChangeText={(text) => {
              this.setState({
                emailId: text
              })
            }}
          />

          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor="#ffff"
            onChangeText={(text) => {
              this.setState({
                password: text
              })
            }}
          />
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => { this.userLogin(this.state.emailId, this.state.password) }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8BE85',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -150
  },
  title: {
    fontSize: 65,
    fontWeight: '300',
    paddingBottom: 30,
    color: '#FF3D00'
  },
  buttonContainer: {
    flex: 0.45,
    marginTop: -160
  },
  loginBox: {
    width: 300,
    height: 50,
    borderBottomWidth: 1.5,
    borderColor: '#FF8A65',
    fontSize: 20,
    paddingLeft: 10,
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#FF5722',
    margin: 50
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#FFFF",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: 'center',
    borderColor: '#FFAB91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30
  },
  registerButtonText: {
    color: '#FF5722',
    fontSize: 15,
    fontWeight: 'bold'
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: "#FF9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 20
  }
})