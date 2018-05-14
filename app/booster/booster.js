import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { 
    Container, 
    Header, 
    Content, 
    List, 
    ListItem, 
    Thumbnail,
    Button,
    Text, 
    Body,
    Left,
    Right,
    Title,
    Tab,
    Tabs,
    Card,
    CardItem,
} from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { user, search, camera, right } from '../partials/icons'
import firebaseService from '../service/firebase'
import Bar from '../partials/bar'
import Style from '../style'

const FIREBASE = firebaseService.database()
const STORAGE = firebaseService.storage()

const Tab1 = (props) => (
  <Card style={{marginLeft: 0}}>
    <CardItem header bordered>
        <Body style={{ flex: 3 }}>
            <Text style={Style.blue}>People in your current domain</Text>
        </Body>
        <Right style={{ flex: 1 }}>
            <MaterialIcons name="sort" size={25} color="#000" />
        </Right>
    </CardItem>
    <List
      dataArray={props.users}
      renderRow={(item) => 
        <View style={Style.listItem}>
          <ListItem>
            <Thumbnail small size={80} source={{ uri: item.val().image }} />
            <Body>
              <Text>{item.val().name}</Text>
            </Body>
            <Right>
              <Button transparent
                onPress={() => props.navigation.navigate('Info', { userId: item.key })} >
                <Ionicons name={right} size={27} color="#000" />
              </Button>
            </Right>
          </ListItem>
        </View>
      }>
    </List>
  </Card>
)

const Tab2 = (props) => (
  <Card>
    <CardItem>
      <Body>
        <Text>This is Tab 2 adfadfasdfsfasddddddddddddddddddddddddddddddddddd</Text>
      </Body>
    </CardItem>
  </Card>
)

export default class Booster extends Component {
  constructor(props) {
    super(props)
    
    this.state = { users: [] }
  }

  componentDidMount() {
    this._getUsers()
  }

  _getUsers = async() => {
    let uArr = []
    await FIREBASE.ref('users').orderByChild('name')
      .once('value', snapshot => {
        snapshot.forEach(snap => { uArr.push(snap) })
      })
      .then(() => { this.setState({ users: uArr }) })
      .catch(error => alert(error))
  }

  render() {
    const { users } = this.state

    return (
      <Container>
        <Header style={Style.bgWhite} hasTabs>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Ionicons name={user} size={26} style={Style.black}/>
            </Button>
          </Left>
          <Body style={Style.flexCenter}>
            <Title style={Style.title}>Strix</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent
              onPress={() => this.props.navigation.navigate('Search')}>
              <Ionicons name={search} size={26} style={Style.black}/>
            </Button>
          </Right>
        </Header>
        <Bar />
        <View style={{ flex: 1 }}>
          <Tabs initialPage={0}>
            <Tab heading="Mentors" textStyle={Style.black} activeTextStyle={Style.blue}
              tabStyle={Style.bgWhite} activeTabStyle={Style.bgWhite}>
                <Tab1 users={users} navigation={this.props.navigation} />
            </Tab>
            <Tab heading="My Appointments" textStyle={Style.black} activeTextStyle={Style.blue}
              tabStyle={Style.bgWhite} activeTabStyle={Style.bgWhite}>
              <Tab2 />
            </Tab>
          </Tabs>
          <TouchableHighlight style={Style.fab}
            onPress={() => this.props.navigation.navigate('QRScanner')}>
            <Ionicons name={camera} color='#fff' size={25} />
          </TouchableHighlight>
        </View>
      </Container>
    );
  }
}
