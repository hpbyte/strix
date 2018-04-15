import React from 'react';
import { createRootNavigator } from './components/router';
import { isSignedIn } from './components/auth/check';
import { AppLoading, Font } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      signedIn: false,
      checkedSignIn: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'pacifico': require('./assets/fonts/pacifico.ttf'),
    });

    // isSignedIn()
    //   .then(res => this.setState({signedIn: res, checkedSignIn: true  }))
    //   .catch(err => alert('An error occurred!'));
    if(isSignedIn()) {
      this.setState({ signedIn: true, checkedSignIn: true })
    }

    this.setState({ loading: false });
  }
  render() {
    const { checkedSignIn, signedIn, loading } = this.state;

    if(loading) {
      return <AppLoading/>
    }

    const Layout = createRootNavigator(signedIn);

    return <Layout />;
  }
}
