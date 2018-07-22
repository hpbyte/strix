import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {
  Footer, FooterTab, Button, Badge, Text
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { podium, link, navi, calendar } from './partials/icons';
import Style from './style';
import Leaderboard from './leaderboard/leaderboard';
import Search from './searchbar/searchbar'
import Profile from './profile';
import Booster from './booster/'
import Signup from './auth/signup';
import Signin from './auth/signin';
import Home from './home';
import EventStacker from './event'

const AuthTaber = TabNavigator(
  {
    Signin: { screen: Signin },
    Signup: { screen: Signup }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
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

const MenuTaber = TabNavigator(
  {
    Home: { screen: Home },
    Leaderboard: { screen: Leaderboard },
    Booster: { screen: Booster },
    EventStacker: { screen: EventStacker }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazy: true,
    tabBarComponent: props => {
      return(
        <Footer>
          <FooterTab style={Style.bgBlack}>
            <Button
              vertical
              // active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate('Home')}>
              <Ionicons name='logo-buffer' size={25} style={Style.white} />
              {/* <Text style={Style.grey}>Clusters</Text> */}
            </Button>
            <Button
              vertical
              // active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('Leaderboard')}>
              <Ionicons name={podium} size={25} style={Style.white} />
              {/* <Text style={Style.grey}>Rank</Text> */}
            </Button>
            <Button
              vertical
              // active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate('Booster')}>
              <Ionicons name={link} size={25} style={Style.white} />
              {/* <Text style={Style.grey}>Appoint</Text> */}
            </Button>
            <Button
              badge vertical
              // active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate('EventStacker')}>
              <Ionicons name={calendar}size={25} style={Style.white} />
              {/* <Text style={Style.grey}>Events</Text> */}
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

const MainStacker = StackNavigator(
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
