import React, { Component } from 'react';
import {
  View, TouchableHighlight, TouchableOpacity, ImageBackground, Dimensions, FlatList, StyleSheet
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Title,
  Text,
  Button,
  Card,
  CardItem
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { add, user } from '../partials/icons'
import { Grid, Col, Row } from "react-native-easy-grid";
import firebaseService from '../service/firebase'
import Bar from '../partials/bar'
import Sheader from '../partials/sheader'
import Style from '../style';

const FIRELUST = firebaseService.database().ref('clusters')
const WIDTH = Dimensions.get('screen').width / 1.2
const HEIGHT = Dimensions.get('screen').height / 4
const quotes = [
  'if you fear failure, you will never go anywhere',
  'yesterday, you said tommorrow',
  'we do not see things as they are, we see things as we are',
  'you can feel sore tomorrow or you can feel sorry tomorrow, you choose',
  'it is never too late to be what you might have been',
  'creativity is intelligence having fun',
  'never give up on a dream just because of the time it will take to accomplish it. the time will pass anyway',
  'life isn’t about finding yourself. Life is about creating yourself',
  'a year from now you will wish you had started today',
  'be kind whenever possible. It is always possible',
  'it is not the years in your life that count. it is the life in your years',
  'the best way to find out if you can trust somebody is to trust them',
  'failure is simply the opportunity to begin again, this time more intelligently',
  'the privilege of a lifetime is being who you are',
  'keep your goals away from the trolls',
  "don't compare your beginning to someone else's middle",
  'if you can dream it, you can do it',
  'adventure is worthwhile in itself',
  "if it ain't fun, don't do it",
  "it is not the load that breaks you down. it's the way you carry it"
]

export default class Clusters extends Component {
  constructor(props) {
    super(props)

    this.state = { clusters: [], cs: [], notcs: [] }

    this.generateRandomNum.bind(this)
    this.generateRandomQuote.bind(this)
  }

  generateRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  generateRandomNum = () => {
    return Math.floor(Math.random() * 100)
  }

  componentDidMount() {
    // this._getAllClusters()
    this._getCSclusters()
    this._getNotCsClusters()
  }

  // _getAllClusters = async() => {
  //   let arr = []

  //   try {
  //     await FIRELUST.once('value', (snapshot) => {

  //       snapshot.forEach(s => {
  //         s.forEach(ss => {
  //           ss.forEach(sss => {
  //             arr.push(sss)
  //           })
  //         })      
  //       })
  //     }).then(() => {
  //       this.setState({ clusters: arr })
  //     })
  //   } catch(error) { alert(error) }
  // }

  _getCSclusters = async() => {
    let arr = []

    try {
      await FIRELUST.once('value', (snapshot) => {

        snapshot.forEach(s => {
          if(s.key === 'COMPUTER SCIENCE') {
            s.forEach(ss => {
              ss.forEach(sss => {
                arr.push(sss)
              })
            })
          }
        })
      }).then(() => {
        this.setState({ cs: arr })
      })
    } catch(error) { alert(error) }
  }

  _getNotCsClusters = async() => {
    let arr = []

    try {
      await FIRELUST.once('value', (snapshot) => {

        snapshot.forEach(s => {
          if(s.key !== 'COMPUTER SCIENCE') {
            s.forEach(ss => {
              ss.forEach(sss => {
                arr.push(sss)
              })
            })
          }
        })
      }).then(() => {
        this.setState({ notcs: arr })
      })
    } catch(error) { alert(error) }
  }

  render() {
    return(
      <Container>
        <Sheader navigation={this.props.navigation} />
        <Bar />
        <View style={[Style.bgWhite, {flex: 1}]}>
          <View style={{ height: 10 }} />
          <Grid>
            <Row size={20}>
              <Text style={style.welTxt}>Clusters of your Interests</Text>
            </Row>
            <Row size={10}>
              <Text style={style.welNotetxt}># {this.generateRandomQuote()}</Text>
            </Row>
            <Row size={35} style={style.marLft7}>
              <FlatList
                data={this.state.cs}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  return(
                    <TouchableOpacity
                      id={item.key}
                      onPress={() => this.props.navigation.navigate('Cluster', { cluster: item.val().cluster })}>
                      <ImageBackground source={{ uri: item.val().bgimg }} style={style.bgImg} borderRadius={10}>
                        <View style={[Style.flexCenter, style.bgImgDarken]}>
                          <Text style={style.clusTxt}># {item.val().cluster}</Text>
                          <Text style={{ fontSize: 14, color: '#fff' }}>{this.generateRandomNum()} people this week</Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  )
                }}
              />
            </Row>
            <Row size={35} style={style.marLft7}>
              <FlatList
                data={this.state.notcs}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  return(
                    <TouchableOpacity
                      id={item.key}
                      onPress={() => this.props.navigation.navigate('Cluster', { cluster: item.val().cluster })}>
                      <ImageBackground source={{ uri: item.val().bgimg }} style={[style.bgImg, {
                          width: WIDTH / 1.2, height: HEIGHT / 1.2
                        }]} borderRadius={10}>
                        <View style={[Style.flexCenter, style.bgImgDarken]}>
                          <Text style={style.clusTxt}># {item.val().cluster}</Text>
                          <Text style={{ fontSize: 14, color: '#fff' }}>{this.generateRandomNum()} people this week</Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  )
                }}
              />
            </Row>
          </Grid>
          <TouchableHighlight style={Style.fab}
            onPress={() => this.props.navigation.navigate('Add')}>
            <Ionicons name={add} color='#fff' size={30} />
          </TouchableHighlight>
        </View>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  bgImg: {
    width: WIDTH,
    height: HEIGHT,
    margin: 5,
    padding: 0
  },
  bgImgDarken: {
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 10
  },
  clusTxt: {
    fontSize: 20,
    color: '#fff'
  },
  welTxt: {
    margin: 15,
    marginRight: 25,
    fontSize: 35,
    fontWeight: 'bold',
    // fontFamily: 'permanent'
  },
  welNotetxt: {
    marginLeft: 15,
    color: '#000'
  },
  marLft7: {
    marginLeft: 7
  }
})