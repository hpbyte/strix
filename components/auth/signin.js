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
      <View>
        <Text style={styles.strix}>Strix</Text>
        <Item rounded style={styles.item} >
          <Input 
            value={this.state.email} 
            onChangeText={email => this.setState({email})} 
            style={styles.input} placeholder="Email" />
        </Item>
        <Item rounded style={styles.item} >
          <Input 
            value={this.state.password} 
            onChangeText={password => this.setState({password})} 
            secureTextEntry={true} style={styles.input}
            placeholder="Password" />
        </Item>
        <Button rounded dark style={styles.btnLogin}
          onPress={this.onSigninPress.bind(this)}>
          <Text style={styles.txtLogin}>Ok Go</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  strix: {
    fontSize: 70,
    fontFamily: 'pacifico',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30
  },
  item: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 10,
    marginRight: 10
  },
  btnLogin: {
    marginTop: 40,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  txtLogin: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20
  }
});
