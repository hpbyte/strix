import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation'
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Title,
  Button,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Badge,
  View
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import { user, search } from '../partials/icons'
import Sheader from '../partials/sheader'
import firebaseService from '../service/firebase'
import Bar from '../partials/bar'
import Info from '../info/info'
import Style from '../style';

const FIREUSER = firebaseService.database().ref('users')

const dataIndex = 0;

class Leaderboard extends Component {
  constructor(props) {
    super(props)

    this.state = { users: [] }
  }

  componentDidMount() {
    this._getUsers()
  }

  _getUsers = async() => {
    try{
      FIREUSER.orderByChild('points').on('value', snapshot => {
        let uArr = []

        snapshot.forEach(snap => {
          uArr.push(snap)
        })

        this.setState({ users: uArr })
      })
    } catch(error) { alert(error.message) }
  }

  render() {
    return (
      <Container>
        <Sheader navigation={this.props.navigation} />
        <Bar />
        <Content style={Style.bgWhite}>
          <Card style={{ marginLeft: 0 }}>
            <List
              dataArray={this.state.users.reverse()}
              renderRow={(item) => 
              <View style={Style.listItem}>
                <ListItem>
                  <Thumbnail size={80} source={{ uri: item.val().image }} />
                  <Body>
                    <Text>{item.val().name}</Text>
                  </Body>
                  <Right>
                    <Badge style={Style.bgBlue}>
                      <Text>{++dataIndex}</Text>
                    </Badge>
                  </Right>
                </ListItem>
              </View>
              }>
            </List>
          </Card>    
        </Content>
      </Container>
      );
  }
}

export default Leaderboard = StackNavigator(
  {
    Leaderboard: { screen: Leaderboard },
    Info: { screen: Info }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Leaderboard'
  }
)