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
import Tab2 from './tab2'
import Style from '../style'

const FIREBASE = firebaseService.database()

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
            {item.val().image !== '' ? (<Thumbnail small size={80} source={{ uri: item.val().image }} />) : (<Thumbnail small size={80} source={require('../../assets/default.png')} />)}
            <Body>
              <Text>{item.val().name}</Text>
            </Body>
            <Right>
              <Button transparent
                onPress={() => props.navigation.navigate('Info', { userId: item.key })} >
                <Ionicons name={right} size={30} color="#000" style={{ marginLeft: 15 }} />
              </Button>
            </Right>
          </ListItem>
        </View>
      }>
    </List>
  </Card>
)

export default class Booster extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      users: [], userId: firebaseService.auth().currentUser.uid, currentUni: ''
    }
  }

  componentDidMount() {
    this._getCurrentUserUni()
    this._getUsers()
  }

  _getUsers = async() => {
    let uArr = []
    
    await FIREBASE.ref('users').orderByChild('name')
      .once('value', snapshot => {
        snapshot.forEach(snap => {
          if(snap.key !== this.state.userId) {
            uArr.push(snap)
          }
        })
      })
      .then(() => { 
        this.setState({ users: uArr.filter(u => u.val().uni === this.state.currentUni) }) 
      })
      .catch(error => alert(error))
  }

  _getCurrentUserUni = async() => {
    await FIREBASE.ref('users').child(this.state.userId).once('value', snapshot => {
      this.setState({ currentUni: snapshot.val().uni })
    }).catch(err => alert(err))
  }

  render() {
    const { users } = this.state

    return (
      <Container>
        <Header style={Style.bgWhite} hasTabs>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              style={Style.leftBtn}
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Ionicons name={user} size={26} style={Style.black}/>
            </Button>
          </Left>
          <Body style={Style.flexCenter}>
            <Title style={Style.title}>Hippo</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button 
              transparent
              style={Style.rightBtn}
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
              <Tab2 navigation={this.props.navigation} />
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
