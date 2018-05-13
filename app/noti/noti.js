import React, { Component } from 'react'
import { ListView, TouchableOpacity } from 'react-native'
import { 
    Container, 
    Header, 
    Content, 
    Button,
    List, 
    ListItem, 
    Thumbnail,
    Text, 
    Body,
    Left,
    Right,
    Title
} from 'native-base'
import { Row, Col } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import { user, search, trash } from '../partials/icons'
import Sheader from '../partials/sheader'
import Bar from '../partials/bar'
import Style from '../style'

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

export default class Noti extends Component {
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
      </Container>
    );
  }
}