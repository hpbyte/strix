import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Container,
  Left,
  Right,
  Badge,
  Button
} from "native-base";

import styles from "./style";
import { onSignOut } from '../auth/chk';
import { Ionicons } from '@expo/vector-icons';

const drawerCover = require("../../assets/drawer-cover.png");
// const drawerImage = require("../../../assets/logo.png");
const datas = [
  {
    name: "Home",
    route: "Home",
    icon: "ios-home",
    bg: "#C5F442"
  },
  {
    name: "Signin",
    route: "Signin",
    icon: "ios-paper-plane",
    bg: "#C5F442"
  },
  {
    name: "Activity",
    route: "Activity",
    icon: "ios-paper-plane",
    bg: "#C5F442"
  },
  {
    name: "Notifications",
    route: "Notifications",
    icon: "ios-notifications",
    bg: "#477EEA",
    types: "8"
  },
  {
    name: "Profile",
    route: "Profile",
    icon: "ios-person",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Settings",
    route: "Settings",
    icon: "ios-settings",
    bg: "#4DCAE0"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          {/* <Image square style={styles.drawerImage} source={drawerImage} /> */}

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Ionicons
                    active
                    name={data.icon}
                    style={{ color: "#000", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />

          <Button
            onPress={() => {
              onSignOut().then(() => this.props.navigation.navigate('SignedOut'))
            }}
            >
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
