import React, { Component } from 'react';
import { Modal, View } from 'react-native'
import {
  Root,
  Content,
  Left,
  Body,
  Right,
  Text,
  Button,
  List,
  ListItem,
  Card,
  CardItem,
  Form,
  Item,
  Input,
  Textarea,
  Toast,
  ActionSheet
} from 'native-base';
import firebaseService from '../service/firebase';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { school, work, user, mail, card, down } from '../partials/icons'
import { Grid, Row, Col } from 'react-native-easy-grid'
import style from './style'

const FIREBASE = firebaseService.database();

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', email: '', dob: '', school: '', uni: '', job: '', showToast: false, modalVisible: false }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  componentDidMount() {
    firebaseService.auth().onAuthStateChanged(user => {
      if(user) {
        // getting user data on db
        try{
          FIREBASE.ref('users/'+user.uid).once('value').then(snapshot => {
            this.setState({
              name: snapshot.val().name,
              dob: snapshot.val().dob,
              school: snapshot.val().school,
              uni: snapshot.val().uni,
              job: snapshot.val().job
            })
          })
        } catch(error) { alert(error) }
        // getting email from auth
        this.setState({ email: user.email })
      }
    });
  }

  async _editProfile() {
    const { name, email, dob, school, uni, job } = this.state
    
    await FIREBASE.ref("users/"+firebaseService.auth().currentUser.uid).update({
      name: name,
      dob: dob,
      school: school,
      uni: uni,
      job: job
    }).then(
      this.setModalVisible(!this.state.modalVisible),

      Toast.show({
        text: 'Successfully Submitted!',
        buttonText: 'OK',
        duration: 3000,
        type: 'success',
        position: 'top'
      })
    ).catch(err => alert(err))
  }

  componentWillUnmount() {
    Toast.toastInstance = null
    ActionSheet.actionsheetInstance = null
  }

  render() {
    return(
      <Root>
        <Content>
          <Card>
            <CardItem header bordered>
              <Text onPress={() => { this.setModalVisible(true) }}>Edit Profile</Text>
            </CardItem>
            <CardItem>
              <Ionicons name={user} size={30} color="#303F9F" />
              <Body>
                <Text style={style.pdlf}>Name</Text>
                <Text style={style.pdlf} note>{this.state.name}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={mail} size={30} color="#D32F2F" />
              <Body>
                <Text style={style.pdlf}>Email Address</Text>
                <Text style={style.pdlf} note>{this.state.email}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={card} size={30} color="#388E3C" />
              <Body>
                <Text style={style.pdlf}>Date-of-Birth</Text>
                <Text style={style.pdlf} note>{this.state.dob}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={school} size={30} color="#E64A19" />
              <Body>
                <Text style={style.pdlf}>High School</Text>
                <Text style={style.pdlf} note>{this.state.school}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={school} size={30} color="#00796B" />
              <Body>  
                <Text style={style.pdlf}>University</Text>
                <Text style={style.pdlf} note>{this.state.uni}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={work} size={30} color="#AFB42B" />
              <Body>
                <Text style={style.pdlf}>Job</Text>
                <Text style={style.pdlf} note>{this.state.job}</Text>
              </Body>
            </CardItem>
          </Card>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
            <Grid>
              <Col>               
                <FontAwesome
                  style={{ alignSelf: 'center' }} 
                  name="sort-down" size={45} color="#ccc" 
                  onPress={() => this.setModalVisible(!this.state.modalVisible)} />
                <Form style={{ marginTop: 25 }}>
                  <Item style={style.item}>
                    <Ionicons name={user} size={30} color="#303F9F" />
                    <Input style={style.input} placeholder={this.state.name}
                      value={this.state.name} onChangeText={name => this.setState({name})}/>
                  </Item>
                  <Item style={style.item}>
                    <Ionicons name={mail} size={30} color="#D32F2F" />
                    <Input style={style.input} placeholder={this.state.email}
                      value={this.state.email} onChangeText={email => this.setState({email})}/>
                  </Item>
                  <Item style={style.item}>
                    <Ionicons name={card} size={30} color="#388E3C" />
                    <Input style={style.input} placeholder={this.state.dob}
                      value={this.state.dob} onChangeText={dob => this.setState({dob})}/>
                  </Item>
                  <Item style={style.item}>
                    <Ionicons name={school} size={30} color="#E64A19" />
                    <Input style={style.input} placeholder={this.state.school}
                      value={this.state.school} onChangeText={school => this.setState({school})}/>
                  </Item>
                  <Item style={style.item}>
                    <Ionicons name={school} size={30} color="#00796B" />
                    <Input style={style.input} placeholder={this.state.uni}
                      value={this.state.uni} onChangeText={uni => this.setState({uni})}/>
                  </Item>
                  <Item style={style.item}>
                    <Ionicons name={work} size={30} color="#AFB42B" />
                    <Input style={style.input} placeholder={this.state.job}
                      value={this.state.job} onChangeText={job => this.setState({job})}/>
                  </Item>
                  <Button rounded style={style.editBtn}
                    onPress={this._editProfile.bind(this)}>
                    <Text>Submit Change</Text>
                  </Button>
                </Form>
              </Col>
            </Grid>
          </Modal>
        </Content>
      </Root>
    );
  }
}
