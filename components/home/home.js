import React, { Component } from 'react';
import { Image, StatusBar } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  FooterTab
} from 'native-base';
import Style from '../style';
import { FontAwesome } from '@expo/vector-icons';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <FontAwesome name='navicon' style={Style.black} />
            </Button>
          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={Style.title}>Strix</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <FontAwesome name='search' style={Style.black} />
            </Button>
          </Right>
        </Header>
        <Content>
          <StatusBar
            barStyle='light-content'
            backgroundColor='#000' />
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require("../../assets/logo.png")} />
                <Body>
                  <Text>John</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require("../../assets/drawer-cover.png")} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <FontAwesome name='thumbs-o-up' />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <FontAwesome name='comments-o' />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require("../../assets/logo.png")} />
                <Body>
                  <Text>John</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require("../../assets/drawer-cover.png")} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <FontAwesome name='thumbs-o-up' />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <FontAwesome name='comments-o' />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require("../../assets/logo.png")} />
                <Body>
                  <Text>John</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require("../../assets/drawer-cover.png")} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <FontAwesome name='thumbs-o-up' />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <FontAwesome name='comments-o' />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab style={Style.bgBlack}>
            <Button>
              <FontAwesome name='camera' style={Style.white} />
            </Button>
            <Button>
              <FontAwesome name='user' style={Style.white} />
            </Button>
            <Button>
              <FontAwesome name='th' style={Style.white} />
            </Button>
            <Button>
              <FontAwesome name='heart-o' style={Style.white} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
