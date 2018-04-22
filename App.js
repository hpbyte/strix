import React from 'react';
import { createRootNavigator } from './components/router';
import { AppLoading, Font } from 'expo';
import firebaseService from './components/service/firebase';
import { isSignedIn } from './components/auth/check'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      signedIn: false
    };
  }
  
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'pacifico': require('./assets/fonts/pacifico.ttf'),
    });
  
    this.setState({ loading: false });
  }

  componentDidMount() {
    // firebaseService.auth().onAuthStateChanged(user => {
    //   if(user) {
    //     this.setState({ signedIn: true });
    //   }
    // })
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
