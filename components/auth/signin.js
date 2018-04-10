import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
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

import { onSignIn } from './chk';

export default class Signin extends Component {
  render() {
    return(
      <Container>
        <Content>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#000" />
          <Text style={styles.strix}>Strix</Text>
          <Item rounded style={styles.item} >
            <Input style={styles.input} placeholder="Username" />
          </Item>
          <Item rounded style={styles.item} >
            <Input style={styles.input} placeholder="Password" />
          </Item>
          <Button rounded dark style={styles.btnLogin}
            onPress={() => {
              onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
            }}>
            <Text style={styles.txtLogin}>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  strix: {
    fontSize: 70,
    // fontFamily: 'pacifico',
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
