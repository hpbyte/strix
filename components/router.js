import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
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
import Home from './clusters';
import Leaderboard from './leaderboard/leaderboard';

export const AuthTaber = TabNavigator(
  {
    Signin: { screen: Signin },
    Signup: { screen: Signup }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
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

export const MenuTaber = TabNavigator(
  {
    Home: { screen: Home },
    Leaderboard: { screen: Leaderboard }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarComponent: props => {
      return(
        <Footer>
          <FooterTab style={Style.bgBlack}>
            <Button
              vertical
              onPress={() => props.navigation.navigate('Home')}>
              <Ionicons name='ios-school' size={25} style={Style.white} />
              <Text style={Style.grey}>Clusters</Text>
            </Button>
            <Button
              vertical
              onPress={() => props.navigation.navigate('Leaderboard')}>
              <Ionicons name='ios-list-box-outline' size={25} style={Style.white} />
              <Text style={Style.grey}>Rank</Text>
            </Button>
            <Button
              vertical
              >
              <Ionicons name='ios-chatboxes' size={25} style={Style.white} />
              <Text style={Style.grey}>Discuss</Text>
            </Button>
            <Button
              vertical
              >
              <Ionicons name='ios-locate' size={25} style={Style.white} />
              <Text style={Style.grey}>Appoint</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export const MainStacker = StackNavigator(
  {
    MenuTaber: { screen: MenuTaber },
    Profile: { screen: Profile }
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'MenuTaber'
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedOut: { screen: AuthTaber },
      SignedIn: { screen: MainStacker }
    },
    {
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
}
