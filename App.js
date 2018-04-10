import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  Content
} from 'native-base';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <AppLoading/>
    }
    return(
      <Container>
        <Header>
          <Left>
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          </Left>
          <Body>
            <Title>Strix</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Text>This is a test for native-base</Text>
        </Content>
      </Container>
    )
  }
}

export default StackNavigator({
  Home: {
    screen: App,
  },
});