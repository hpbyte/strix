import React, { Component } from 'react'
import { View, ListView, TouchableOpacity, TouchableHighlight } from 'react-native'
import { 
    Container, Content, Button, List, ListItem, Thumbnail, Text, Body
} from 'native-base'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { add, trash } from '../partials/icons'
import Sheader from '../partials/sheader'
import Bar from '../partials/bar'
import Style from '../style'
import Map from '../map'

const datas = [
  'It is time to build a difference that has good impact on our world',
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
  'Joe Allen',
  'Phil Coutinho',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
]

class Noti extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      basic: true,
      listViewData: datas,
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    
    return (
      <Container>
        <Sheader navigation={this.props.navigation} />
        <Bar />
        <View style={{ flex: 1 }}>
          <Content>
            <List
              style={{ marginTop: 12 }}
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={data =>
                <TouchableOpacity style={{ height: 85 }}>
                  <ListItem style={{height: 85, paddingLeft: 10}}>
                        <Thumbnail square source={require('../../assets/scene.jpg')} />
                        <Body><Text style={Style.blue}>{ data }</Text></Body>
                  </ListItem>
                </TouchableOpacity>}
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full style={Style.bgRed}
                  onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                  <Ionicons active name={trash} size={27} />
                </Button>}
              rightOpenValue={-75}
              disableRightSwipe={true}
            />
          </Content>
          <TouchableHighlight style={Style.fab} 
            onPress={() => this.props.navigation.navigate('Map')}>
            <Ionicons name={add} color='#fff' size={30} />
          </TouchableHighlight>
        </View>
      </Container>
    );
  }
}

export default MapStack = StackNavigator(
  {
    Map: { screen: Map },
    Noti: { screen: Noti }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Noti'
  }
)