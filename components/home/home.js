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
  Icon,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  FooterTab
} from 'native-base';
import Style from '../style';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header style={Style.header}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='menu' style={Style.black} />
            </Button>
          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={Style.title}>Strix</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Icon name='search' style={Style.black} />
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
                <Thumbnail source={require("../../assets/images/logo.png")} />
                <Body>
                  <Text>John</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require("../../assets/images/drawer-cover.png")} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
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
              <Icon name='camera' style={Style.white} />
            </Button>
            <Button>
              <Icon name='person' style={Style.white} />
            </Button>
            <Button>
              <Icon name='apps' style={Style.white} />
            </Button>
            <Button>
              <Icon name='navigate' style={Style.white} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
