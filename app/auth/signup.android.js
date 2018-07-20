import React, { Component } from 'react';
import {
  Keyboard, TouchableWithoutFeedback, TextInput
} from 'react-native';
import { Container, Button, Text } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import { mail, lock, user } from '../partials/icons'
import firebaseService from '../service/firebase';
import style from './style';
import { signedIn } from '../auth/check'

const FIREBASE = firebaseService.database();

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', email: '', password: '', error: null, loading: false }
  }

  _signUp = async() => {
    this.setState({ error: '', loading: true });
    const { name, email, password } = this.state;

    await firebaseService.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        // add it to the database
        FIREBASE.ref('users/'+firebaseService.auth().currentUser.uid).set({
            name: name,
            dob: "",
            school: "",
            uni: "",
            job: "",
            image: "",
            bio: "",
            points: 0,
            phone: ""
        })
        // store that the user is logged in
        signedIn()
        this.props.navigation.navigate('SignedIn');
      })
      .catch((err) => {
        this.setState({ error: err.code })
      });
  }

  render() {
    const error = this.state.error
    
    return(
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Grid>
                <Row size={30} style={style.verticalCenter}>
                    <Text style={style.strix}>Hippo</Text>
                </Row>
                <Row size={5}></Row>
                <Row size={8} style={style.inputView}>
                    <Col size={15} style={style.verticalCenter}>
                        <Ionicons name={user} size={25} style={style.inputIcon} />
                    </Col>
                    <Col size={85} style={style.verticalCenter}>
                        <TextInput 
                            value={this.state.name}
                            onChangeText={name => this.setState({name})}
                            style={style.input} placeholder="Name"
                            placeholderTextColor="#000"
                            underlineColorAndroid="transparent"
                            returnKeyType='next'
                        />
                    </Col>
                </Row>
                <Row size={5}></Row>
                <Row size={8} style={style.inputView}>
                    <Col size={15} style={style.verticalCenter}>
                        <Ionicons name={mail} size={25} style={style.inputIcon} />
                    </Col>
                    <Col size={85} style={style.verticalCenter}>
                        <TextInput 
                            value={this.state.email} 
                            onChangeText={email => this.setState({email})} 
                            style={style.input} placeholder="Email"
                            placeholderTextColor="#000"
                            underlineColorAndroid="transparent"
                            keyboardType='email-address'
                            returnKeyType='next'
                        />
                    </Col>
                </Row>
                <Row size={5}>
                    {error === "auth/email-already-in-use" ? <Text style={style.errorTxt}>Email is already used</Text> : null}
                    {error === "auth/invalid-email" ? <Text style={style.errorTxt}>Invalid Email</Text> : null}
                </Row>
                <Row size={8} style={style.inputView}>
                    <Col size={15} style={style.verticalCenter}>
                        <Ionicons name={lock} size={25} style={style.inputIcon} />
                    </Col>
                    <Col size={85} style={style.verticalCenter}>
                        <TextInput 
                            value={this.state.password} 
                            onChangeText={password => this.setState({password})} 
                            secureTextEntry style={style.input} placeholder="Password"
                            placeholderTextColor="#000"
                            underlineColorAndroid="transparent"
                            returnKeyType='done'
                        />
                    </Col>
                </Row>
                <Row size={5}>
                    {error === "auth/weak-password" ? <Text style={style.errorTxt}>Weak Password</Text> : null}
                </Row>
                <Row size={5}></Row>
                <Row size={15} style={style.verticalCenter}>
                    <Button rounded dark style={style.btn}
                        onPress={this._signUp.bind(this)}>
                        <Text style={style.txtLogin}>Register</Text>
                    </Button>
                </Row>
                <Row size={6}></Row>
            </Grid>
        </TouchableWithoutFeedback>
      </Container>
    );
  }
}
