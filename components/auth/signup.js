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

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', error: '', loading: false };
  }

  onSignupPress() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;

    firebaseService.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Signup Successful!');
        this.props.navigation.navigate('SignedIn');
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return(
      <Container>
        <Content>
          <Text style={styles.strix}>Strix</Text>
          <Item rounded style={styles.item} >
            <Input style={styles.input} placeholder="Name" />
          </Item>
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
              secureTextEntry style={styles.input} placeholder="Password" />
          </Item>
          <Item rounded style={styles.item} >
            <Input style={styles.input} placeholder="Date Of Birth" />
          </Item>
          <Button rounded dark style={styles.btnLogin}
            onPress={this.onSignupPress.bind(this)}>
            <Text style={styles.txtLogin}>Ok Go</Text>
          </Button>
        </Content>
      </Container>
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
