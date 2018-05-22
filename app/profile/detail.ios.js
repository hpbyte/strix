import React, { Component } from 'react';
import {
  Modal, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput
} from 'react-native'
import {
  Root, Container, Content, Left, Body, Right, Text, Button, List, ListItem, Card, CardItem, Toast, ActionSheet
} from 'native-base';
import QRCode from 'react-native-qrcode'
import firebaseService from '../service/firebase';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { school, work, user, mail, card } from '../partials/icons'
import { Grid, Row, Col } from 'react-native-easy-grid'
import Style from '../style'
import style from './style'

const FIREBASE = firebaseService.database();

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      uId: firebaseService.auth().currentUser.uid,
      name: '', 
      email: '', 
      dob: '', 
      school: '', 
      uni: '', 
      job: '', 
      showToast: false, 
      modalVisible: false }
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

  _editProfile = async() => {
    const { uId, name, email, dob, school, uni, job } = this.state
    
    await FIREBASE.ref("users/"+uId).update({
      name: name,
      dob: dob,
      school: school,
      uni: uni,
      job: job
    }).then(() => {
      this.setModalVisible(!this.state.modalVisible)

      Toast.show({
        text: 'Successfully Submitted!',
        buttonText: 'OK',
        duration: 3000,
        type: 'success',
        position: 'top'
      })
    }).catch(err => alert(err))
  }

  componentWillUnmount() {
    Toast.toastInstance = null
    ActionSheet.actionsheetInstance = null
  }

  render() {
    return(
    <Root>
      <Container>
        <Content>
          <Card>
            <CardItem header bordered>
              <Text onPress={() => { this.setModalVisible(true) }}>Edit Profile</Text>
            </CardItem>
            <CardItem>
              <Ionicons name={user} size={30} color="#303F9F" />
              <Body>
                <Text style={Style.pdlf}>Name</Text>
                <Text style={Style.pdlf} note>{this.state.name}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={mail} size={30} color="#D32F2F" />
              <Body>
                <Text style={Style.pdlf}>Email Address</Text>
                <Text style={Style.pdlf} note>{this.state.email}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={card} size={30} color="#388E3C" />
              <Body>
                <Text style={Style.pdlf}>Date-of-Birth</Text>
                <Text style={Style.pdlf} note>{this.state.dob}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={school} size={30} color="#E64A19" />
              <Body>
                <Text style={Style.pdlf}>High School</Text>
                <Text style={Style.pdlf} note>{this.state.school}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={school} size={30} color="#00796B" />
              <Body>  
                <Text style={Style.pdlf}>University</Text>
                <Text style={Style.pdlf} note>{this.state.uni}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Ionicons name={work} size={30} color="#AFB42B" />
              <Body>
                <Text style={Style.pdlf}>Job</Text>
                <Text style={Style.pdlf} note>{this.state.job}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Your Personal QRCode</Text>
            </CardItem>
            <CardItem>
              <View style={Style.flexCenter}>
                <QRCode
                  value={this.state.uId}
                  size={300}
                  bgColor='black'
                  fgColor='white' />
              </View>
            </CardItem>
          </Card>
        </Content>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <Grid>
                <Row size={10}>
                  <Col>
                    <FontAwesome
                      style={{ alignSelf: 'center' }} 
                      name="sort-down" size={50} color="#ccc" 
                      onPress={() => this.setModalVisible(!this.state.modalVisible)}
                    />
                  </Col>
                </Row>
                <Row size={5} />
                <Row size={85}>
                  <Col>
                    <Row size={10} style={style.item}>
                      <Col size={10} style={Style.itemCenter}>
                        <Ionicons name={user} size={30} color="#303F9F" />
                      </Col>
                      <Col size={90} style={style.verticalCenter}>
                        <TextInput
                          style={style.input}
                          placeholder={this.state.name} 
                          clearButtonMode="while-editing"
                          value={this.state.name}
                          onChangeText={name => this.setState({name})}
                        />
                      </Col>
                    </Row>
                    <Row size={10} style={style.item}>
                      <Col size={10} style={Style.itemCenter}>
                        <Ionicons name={mail} size={30} color="#D32F2F" />
                      </Col>
                      <Col size={90} style={style.verticalCenter}>
                        <TextInput
                          style={style.input}
                          placeholder={this.state.email}
                          clearButtonMode="while-editing"
                          value={this.state.email}
                          onChangeText={email => this.setState({email})}
                        />
                      </Col>
                    </Row>
                    <Row size={10} style={style.item}>
                      <Col size={10} style={Style.itemCenter}>
                        <Ionicons name={card} size={30} color="#388E3C" />
                      </Col>
                      <Col size={90} style={style.verticalCenter}>
                        <TextInput
                          style={style.input}
                          placeholder={this.state.dob}
                          clearButtonMode="while-editing"
                          value={this.state.dob}
                          onChangeText={dob => this.setState({dob})}
                        />
                      </Col>
                    </Row>
                    <Row size={10} style={style.item}>
                      <Col size={10} style={Style.itemCenter}>
                        <Ionicons name={school} size={30} color="#E64A19" />
                      </Col>
                      <Col size={90} style={style.verticalCenter}>
                        <TextInput 
                          style={style.input}
                          placeholder={this.state.school}
                          clearButtonMode="while-editing"
                          value={this.state.school}
                          onChangeText={school => this.setState({school})}
                        />
                      </Col>
                    </Row>
                    <Row size={10} style={style.item}>
                      <Col size={10} style={Style.itemCenter}>
                        <Ionicons name={school} size={30} color="#00796B" />
                      </Col>
                      <Col size={90} style={style.verticalCenter}>
                        <TextInput 
                          style={style.input}
                          placeholder={this.state.uni}
                          clearButtonMode="while-editing"
                          value={this.state.uni}
                          onChangeText={uni => this.setState({uni})}
                        />
                      </Col>
                    </Row>
                    <Row size={10} style={style.item}>
                      <Col size={10} style={Style.itemCenter}>
                        <Ionicons name={work} size={30} color="#AFB42B" />
                      </Col>
                      <Col size={90} style={style.verticalCenter}>
                        <TextInput 
                          style={style.input}
                          placeholder={this.state.job}
                          clearButtonMode="while-editing"
                          value={this.state.job}
                          onChangeText={job => this.setState({job})}
                        />                    
                      </Col>
                    </Row>
                    <Row size={40}>
                      <Col>
                        <Button rounded style={style.editBtn}
                          onPress={this._editProfile.bind(this)} >
                          <Text>Submit Change</Text>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Grid>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>
      </Container>
    </Root>
    );
  }
}
