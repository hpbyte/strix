import React from 'react';
import { YellowBox } from 'react-native'
import { createRootNavigator } from './app/router';
import { AppLoading, Font } from 'expo';
import firebaseService from './app/service/firebase';
import { isSignedIn } from './app/auth/check'

// hiding the timer issue associated with firebase
YellowBox.ignoreWarnings(['Setting  a timer'])
console.ignoredYellowBox = ['Setting a timer']

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, signedIn: false };
  }
  
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'chelaone': require('./assets/fonts/chelaone.ttf'),
      'pacifico': require('./assets/fonts/pacifico.ttf'),
    });
  
    this.setState({ loading: false });
  }

  componentDidMount() {
    // check if user is logged in
    isSignedIn()
      .then(res => this.setState({ signedIn: res }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { signedIn, loading } = this.state;

    if(loading) {
      return <AppLoading/>
    }

    const Layout = createRootNavigator(signedIn);

    return <Layout />;
  }
}
