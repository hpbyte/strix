import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {
  Footer,
  FooterTab,
  Button,
  Badge,
  Text,
  Icon
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { podium, link, noti } from './partials/icons';
import Style from './style';
import Leaderboard from './leaderboard/leaderboard';
import Search from './searchbar/searchbar'
import Profile from './profile/profile';
import Booster from './booster/booster'
import Signup from './auth/signup';
import Signin from './auth/signin';
import Home from './clusters';
import Noti from './noti/noti'

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
    Leaderboard: { screen: Leaderboard },
    Booster: { screen: Booster },
    Noti: { screen: Noti }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
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
              onPress={() => props.navigation.navigate('Booster')}>
              <Ionicons name={link} size={25} style={Style.white} />
              <Text style={Style.grey}>Appoint</Text>
            </Button>
            <Button
              badge vertical
              // active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate('Noti')}>
              <Badge><Text>7</Text></Badge>
              <Icon name={noti} style={Style.white} />
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
    Profile: { screen: Profile },
    Search: { screen: Search }
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
