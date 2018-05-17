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
import { user, search, camera, right, calendar, menu } from '../partials/icons'
import firebaseService from '../service/firebase'
import moment from 'moment'
import Bar from '../partials/bar'
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
            <Thumbnail small size={80} source={{ uri: item.val().image }} />
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

const Tab2 = (props) => (
  <Card>
    <List
      dataArray={props.appointments}
      renderRow={(item) => {
        return(
          <ListItem>
            <Left style={{ flex: 1 }}>
              <Ionicons name={calendar} size={50} color="#0d47a1" />
              <Body style={{ marginLeft: 16 }}>
                <Text style={{ fontSize: 19 }}>{moment(item.val().startTime).format('Do')}</Text>
                <Text style={{ fontSize: 13 }}>{moment(item.val().startTime).format('MMM / YYYY')}</Text>
              </Body>
            </Left>
            <Right style={{ flex: 1 }}>
              {/* <Text note>{moment(item.val().startTime).format('ddd h:mm a')}</Text> */}
              <Button transparent
                onPress={() => props.navigation.navigate('End', {
                  appointmentId: item.key,
                  startTime: item.val().startTime,
                  endTime: item.val().endTime,
                  totalTime: item.val().totalTime,
                  status: item.val().status,
                })}>
                <Ionicons name={menu} size={25} color='#000' style={{ marginLeft: 20 }} />
              </Button>
            </Right>
          </ListItem>
        )
      }}>
    </List>
  </Card>
)

export default class Booster extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      users: [], userId: firebaseService.auth().currentUser.uid, appoints: []
    }
  }

  componentDidMount() {
    this._getUsers()
    this._findAppointments()
  }

  _getUsers = async() => {
    const uId = this.state.userId
    let uArr = []
    
    await FIREBASE.ref('users').orderByChild('name')
      .once('value', snapshot => {
        snapshot.forEach(snap => {
          if(snap.key !== uId) {
            uArr.push(snap)
          }
        })
      })
      .then(() => { this.setState({ users: uArr }) })
      .catch(error => alert(error))
  }

  _findAppointments = async() => {
    const uId = this.state.userId
    let exists = false
    let boosterIds = []

    await FIREBASE.ref('booster')
      .once('value', snapshot => {
        snapshot.forEach(snap => {
          pupil = snap.val().pupil
          mentor = snap.val().mentor

          if(uId === pupil || uId === mentor) {
            exists = true
            boosterIds.push(snap.key)
          }
        })
      })
      .then(() => {
        if(exists) {
          this._getAppointments(boosterIds)
        }
      })
      .catch(error => alert(error))
  }

  _getAppointments = (boosterIds) => {
    let appArr = []

    for(let key in boosterIds) {
      let arr = []

      try {
        FIREBASE.ref('booster').child(boosterIds[key]).child('appointments')
          .once('value', snapshot => {
            snapshot.forEach(snap => {
              arr.push(snap)
            })
          })
          .then(() => {
            // append arrays
            appArr = appArr.concat(arr)
            this.setState({ appoints: appArr })
          })
          .catch(error => alert(error))
      }
      catch(error) { alert(error.message) }
    }
  }

  render() {
    const { users, appoints } = this.state

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
              <Tab2 appointments={appoints} navigation={this.props.navigation} />
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
