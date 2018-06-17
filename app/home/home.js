import React, { Component } from 'react';
import {
  View, TouchableHighlight, TouchableOpacity, ImageBackground, Dimensions, FlatList, StyleSheet
} from 'react-native';
import { Container, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { add, quote } from '../partials/icons'
import { Grid, Row } from "react-native-easy-grid";
import firebaseService from '../service/firebase'
import Bar from '../partials/bar'
import Sheader from '../partials/sheader'
import Style from '../style';

const FIRELUST = firebaseService.database().ref('clusters')
const WIDTH = Dimensions.get('screen').width / 1.2
const HEIGHT = Dimensions.get('screen').height / 4
const quotes = [
  'If you fear failure, you will never go anywhere',
  'Yesterday, you said tommorrow',
  "We don't see things as they are, we see things as we are",
  'You can feel sore tomorrow or you can feel sorry tomorrow, you choose',
  "It's never too late to be what you might have been",
  'Creativity is intelligence having fun',
  'Life isn’t about finding yourself. Life is about creating yourself',
  'A year from now you will wish you had started today',
  'Be kind whenever possible. It is always possible',
  "It's not the years in your life that count. it's the life in your years",
  'The best way to find out if you can trust somebody is to trust them',
  'Failure is simply the opportunity to begin again, this time more intelligently',
  'The privilege of a lifetime is being who you are',
  'Keep your goals away from the trolls',
  "Don't compare your beginning to someone else's middle",
  'If you can dream it, you can do it',
  'Adventure is worthwhile in itself',
  "If it ain't fun, don't do it",
  "It's not the load that breaks you down. it's the way you carry it",
  "If you lose, don't lose the lesson",
  'Dream big dreams. Small dreams have no magic',
  "Don't let the success of others discourage you. Let it inspire you",
  "Success is the ability to go from failure to failure without losing your enthusiasm"
]

export default class Clusters extends Component {
  constructor(props) {
    super(props)

    this.state = { cs: [], notcs: [], quote: '' }

    this.generateRandomNum.bind(this)
  }

  _generateRandomQuote = () => {
    let rand = Math.floor(Math.random() * quotes.length)
    this.setState({ quote: quotes[rand] })
  }

  generateRandomNum = () => {
    return Math.floor(Math.random() * 100)
  }

  componentDidMount() {
    this._getClusters()
    this._generateRandomQuote()
  }

  _getClusters = async() => {
    let arr1 = []
    let arr2 = []

    try {
      await FIRELUST.once('value', (snapshot) => {

        snapshot.forEach(s => {
          if(s.key === 'COMPUTER SCIENCE') {
            s.forEach(ss => {
              ss.forEach(sss => {
                arr1.push(sss)
              })
            })
          } else {
            s.forEach(ss => {
              ss.forEach(sss => {
                arr2.push(sss)
              })
            })
          }
        })
      }).then(() => {
        this.setState({ cs: arr1, notcs: arr2 })
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
            <Row size={22} style={Style.verticalCenter}>
              <Text style={style.welTxt}>Clusters of your Interests</Text>
            </Row>
            <Row size={13} style={Style.verticalCenter}>
              <Text style={style.welNotetxt}><Ionicons name={quote} size={20} />  {this.state.quote}</Text>
            </Row>
            <Row size={35} style={[style.marLft7, Style.verticalCenter]}>
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
            <Row size={30} style={[style.marLft7, Style.verticalCenter]}>
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
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 10
  },
  clusTxt: {
    fontSize: 20,
    color: '#fff'
  },
  welTxt: {
    marginLeft: 15,
    marginRight: 25,
    fontSize: 35,
    fontWeight: 'bold',
  },
  welNotetxt: {
    marginLeft: 15,
    marginRight: 15,
    color: '#000'
  },
  marLft7: {
    marginLeft: 7
  }
})