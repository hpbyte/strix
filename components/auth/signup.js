import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from 'native-base';
import firebaseService from '../service/firebase';
import style from './style';

const FIREBASE = firebaseService.database();

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '', 
      password: '',
      dob: '', 
      error: '', 
      loading: false 
    };
  }

  onSignupPress() {
    this.setState({ error: '', loading: true });
    const { name, email, password, dob } = this.state;

    firebaseService.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        // add it to the database
        FIREBASE.ref('users/'+firebaseService.auth().currentUser.uid).set(
          {
            name: name,
            dob: dob
          }, (error) => {
            if(error) {
              alert(error.message)
            }              
          }
        )
        // alert('Signup Successful!');
        this.props.navigation.navigate('SignedIn');
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  render() {
    return(
      <Container>
        <View style={{flex: 1}}>
          <Text style={style.strix}>Strix</Text>
          <Item rounded style={style.item} >
            <Input 
              value={this.state.name}
              onChangeText={name => this.setState({name})}
              style={style.input} placeholder="Name" />
          </Item>
          <Item rounded style={style.item} >
            <Input 
              value={this.state.email} 
              onChangeText={email => this.setState({email})} 
              style={style.input} placeholder="Email" />
          </Item>
          <Item rounded style={style.item} >
            <Input 
              value={this.state.password} 
              onChangeText={password => this.setState({password})} 
              secureTextEntry style={style.input} placeholder="Password" />
          </Item>
          <Item rounded style={style.item} >
            <Input
              value={this.state.dob}
              onChangeText={dob => this.setState({dob})}
              style={style.input} placeholder="Date Of Birth" />
          </Item>
          <Button rounded dark style={style.btn}
            onPress={this.onSignupPress.bind(this)}>
            <Text style={style.txtLogin}>Ok Go</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
