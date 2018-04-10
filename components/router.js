import React from 'react';
import {
  TabNavigator,
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import {
  Footer,
  FooterTab,
  Button,
  Text
} from 'native-base';

import Style from './style';
import SideBar from './sidebar';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Home from './home/home';

export const Taber = TabNavigator(
  {
    Signin: { screen: Signin },
    Signup: { screen: Signup }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return(
        <Footer>
          <FooterTab style={Style.bgBlack}>
            <Button
              vertical
              // active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate('Signin')}
              >
              <Text style={Style.white}>Sign In</Text>
            </Button>
            <Button
              vertical
              // active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('Signup')}
              >
              <Text style={Style.white}>Sign Up</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export const Drawer = DrawerNavigator(
  {
    Home: { screen: Home }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedOut: { screen: Taber },
      SignedIn: { screen: Drawer }
    },
    {
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
}
