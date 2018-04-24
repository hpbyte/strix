import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {
  Footer,
  FooterTab,
  Button,
  Badge,
  Text
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { podium, link, noti } from './partials/icons';
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
              // active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate('Home')}>
              <Ionicons name='logo-buffer' size={25} style={Style.white} />
              <Text style={Style.grey}>Clusters</Text>
            </Button>
            <Button
              vertical
              // active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('Leaderboard')}>
              <Ionicons name={podium} size={25} style={Style.white} />
              <Text style={Style.grey}>Rank</Text>
            </Button>
            <Button
              vertical
              // active={props.navigationState.index === 2}
              >
              <Ionicons name={link} size={25} style={Style.white} />
              <Text style={Style.grey}>Appoint</Text>
            </Button>
            <Button
              badge vertical
              // active={props.navigationState.index === 3}
              >
              <Badge><Text>7</Text></Badge>
              <Ionicons name={noti} size={25} style={Style.white} />
              <Text style={Style.grey}>Noti</Text>
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
