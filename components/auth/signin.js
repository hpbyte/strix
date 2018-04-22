import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from 'native-base';
import firebaseService from '../service/firebase';
import style from './style';
import { signedIn } from './check'

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', error: '', loading: false };
  }

  onSigninPress() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;

    firebaseService.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', loading: false });
        // store that the user is logged in
        signedIn();
        // alert('Logged In')
        this.props.navigation.navigate("SignedIn")
      })
      .catch((err) => {
        // alert(err);
        this.setState({ error: err, loading: false })
      })
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Text style={style.strix}>Strix</Text>
        <Item rounded style={style.item} >
          <Input 
            value={this.state.email} 
            onChangeText={email => this.setState({email})} 
            style={style.input} placeholder="Email"
            placeholderTextColor="#000" />
        </Item>
        <Item rounded style={style.item} >
          <Input 
            value={this.state.password} 
            onChangeText={password => this.setState({password})} 
            secureTextEntry={true} style={style.input}
            placeholder="Password" placeholderTextColor="#000" />
        </Item>
        <Button rounded dark style={style.btn}
          onPress={this.onSigninPress.bind(this)}>
          <Text style={style.txtLogin}>Ok Go</Text>
        </Button>
      </View>
    );
  }
}
