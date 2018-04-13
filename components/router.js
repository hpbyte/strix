import React from 'react';
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import {
  Footer,
  FooterTab,
  Button,
  Text
} from 'native-base';

import { Ionicons } from '@expo/vector-icons';
import Style from './style';
import Profile from './profile/profile';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Home from './home/home';
import Leaderboard from './leaderboard/leaderboard';

export const AuthTaber = TabNavigator(
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

export const Stacker = StackNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
);

export const MainTaber = TabNavigator(
  {
    Stacker: { screen: Stacker },
    Leaderboard: { screen: Leaderboard }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return(
        <Footer>
          <FooterTab style={Style.bgBlack}>
            <Button
              vertical
              onPress={() => props.navigation.navigate('Stacker')}>
              <Ionicons name='ios-home' size={25} style={Style.white} />
            </Button>
            <Button
              vertical
              onPress={() => props.navigation.navigate('Leaderboard')}>
              <Ionicons name='ios-list-box' size={25} style={Style.white} />
            </Button>
            <Button
              vertical
              >
              <Ionicons name='ios-apps' size={25} style={Style.white} />
            </Button>
            <Button
              vertical
              >
              <Ionicons name='ios-locate' size={25} style={Style.white} />
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedOut: { screen: AuthTaber },
      SignedIn: { screen: MainTaber }
    },
    {
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
}
