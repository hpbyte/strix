import React, { Component } from 'react';
import {
    StyleSheet, Dimensions, ScrollView, Animated, View, Image, TextInput, TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import {
    Container, Header, Text, Left, Right, Body, Title, Button, Toast, ActionSheet, Root, Card, CardItem, List, Item, ListItem, Content
} from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import { alert, more, back, camera } from '../../partials/icons'
import firebaseService from '../../service/firebase'
import { ImagePicker, Permissions } from 'expo'
import Bar from '../../partials/bar'
import Style from '../../style'

const FIRELUST = firebaseService.database().ref('clusters')
const STORAGE = firebaseService.storage()
const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height
const xOffset = new Animated.Value(0)
const rand = Math.floor(Math.random() * 1000000)

const transitionAnimation = index => {
    return {
        transform: [
            { perspective: 800 },
            {
                rotateY: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * SCREEN_WIDTH,
                        index * SCREEN_WIDTH,
                        (index + 1) * SCREEN_WIDTH
                    ],
                    outputRange: ["-45deg", "0deg", "45deg"]
                })
            }
        ]
    }
}

const warnings = [
    {
        color: 'red',
        text: "Make sure the cluster does not already exist in the system"
    },
    {
        color: 'orange',
        text: "Desired cluster should be relatable to the system"
    },
    {
        color: 'green',
        text: "Think carefully to those questions asked in each page"
    },
    {
        color: 'steelblue',
        text: "Swipe to the left to navigate to the next screen"
    },
    {
        color: 'skyblue',
        text: "You can swipe right to the previous one to change your decision"
    }
]

export default class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imgId: rand, showToast: false, root: '', branch: '', cluster: '',
            pickResult: null, image: null, hasCamerRollPermission: null
        }
    }

    componentDidMount() {
        this._requestCameraRollPermission()
    }

    _requestCameraRollPermission = async() => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        this.setState({ hasCamerRollPermission: status === 'granted' })
    }

    _pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3]
        })
        
        this.setState({ pickResult: result })
    }
    
    _handleImagePicked = async() => {
        const pickerResult = this.state.pickResult

        if(!pickerResult.cancelled) {
            await this._uploadImage(pickerResult.uri)
            .then(() => {
                this._submitCluster()
            })
            .catch(error => {
                Toast.show({
                text: error,
                buttonText: 'OK',
                duration: 3000,
                type: 'danger',
                position: 'top'
                })
            })
        }
    }

    _uploadImage = async(uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()
        const ref = STORAGE.ref().child("bg_pics/"+this.state.imgId)

        return ref.put(blob)
    }
    
    _submitCluster = () => {
        const { imgId, root, branch, cluster } = this.state
        const img = STORAGE.ref("bg_pics/"+imgId)

        img.getDownloadURL().then(url => {
            FIRELUST.child(root.toUpperCase()).child(branch.toUpperCase())
                .push({
                    bgimg: url,
                    cluster: cluster.toUpperCase()
                })
                .then(() => {
                    this.setState({ root: '', branch: '', cluster: '' })

                    Toast.show({
                        text: 'Successfully Submitted!',
                        buttonText: 'OK',
                        duration: 3000,
                        type: 'success',
                        position: 'top'
                    })
                })
        })
    }

    _onPressSubmit = () => {
        const { root, branch, cluster, pickResult } = this.state

        if(root === '' || branch === '' || cluster === '' || pickResult === null) {
            Toast.show({
                text: 'Please fill out the fields!',
                buttonText: 'OK',
                duration: 3000,
                type: 'danger',
                position: 'top'
            })
        } else {
            this._handleImagePicked()
        }
    }

    componentWillUnmount() {
        Toast.toastInstance = null
        ActionSheet.actionSheetInstance = null
    }

    render() {
        return(
            <Root>
                <Container>
                    <Header style={Style.bgWhite} noShadow>
                        <Left style={{ flex: 1 }}>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name={back} size={26} style={Style.black} />
                            </Button>
                        </Left>
                        <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Title style={Style.black}>Add Cluster</Title>
                        </Body>
                        <Right style={{ flex: 1 }}>
                            <Button transparent>
                                <Ionicons name={more} size={26} style={Style.black} />
                            </Button>
                        </Right>
                    </Header>
                    <Bar />
                    <Animated.ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                            { useNativeDriver: true }
                        )}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={style.scrollView} >
                        <View style={style.scrollPage}>
                            <Animated.View style={[{flex: 1, backgroundColor: '#fff'}, transitionAnimation(0)]}>
                                <List
                                    style={style.list}
                                    dataArray={warnings}
                                    renderRow={item => {
                                        return(
                                            <ListItem icon style={style.listItem}>
                                                <Left>
                                                    <Ionicons name={alert} color={item.color} size={35} />
                                                </Left>
                                                <Body style={{ borderBottomWidth: 0 }}>
                                                    <Text style={style.listTxt}>{item.text}</Text>
                                                </Body>
                                            </ListItem>
                                        )
                                    }}>
                                </List>
                            </Animated.View>
                        </View>
                        <View style={style.scrollPage}>
                            <Animated.View style={[style.screen, transitionAnimation(1)]}>
                                <Content style={style.inputView} showsVerticalScrollIndicator={false}>
                                    <KeyboardAvoidingView behavior="padding" enabled>
                                        <Image resizeMode="contain" source={require('../../../assets/root.jpg')} style={style.rootImg} />
                                        <Text style={style.text}>First, tell us what is the original field of your cluster</Text>
                                        <TextInput autoCapitalize='words' value={this.state.root} style={style.input} 
                                            onChangeText={root => this.setState({root})} />
                                    </KeyboardAvoidingView>
                                </Content>
                            </Animated.View>
                        </View>
                        <View style={style.scrollPage}>
                            <Animated.View style={[style.screen, transitionAnimation(2)]}>
                                <Content style={style.inputView} showsVerticalScrollIndicator={false}>
                                    <KeyboardAvoidingView behavior="padding" enabled>
                                        <Image resizeMode="contain" source={require('../../../assets/branch.jpg')} style={style.rootImg} />
                                        <Text style={style.text}>Tell us the descendent of the original field that your cluster belongs to</Text>
                                        <TextInput autoCapitalize='words' value={this.state.branch} style={style.input}
                                            onChangeText={branch => this.setState({branch})} />
                                    </KeyboardAvoidingView>
                                </Content>
                            </Animated.View>
                        </View>
                        <View style={style.scrollPage}>
                            <Animated.View style={[style.screen, transitionAnimation(3)]}>
                                <Content style={style.inputView} showsVerticalScrollIndicator={false}>
                                    <KeyboardAvoidingView behavior="padding" enabled>
                                        <Image resizeMode="contain" source={require('../../../assets/tree.jpg')} style={style.rootImg} />
                                        <Text style={style.text}>What will be the name of your cluster and choose an image</Text>
                                        <TextInput autoCapitalize='words' value={this.state.cluster} style={style.input}
                                            onChangeText={cluster => this.setState({cluster})} />
                                        <Button transparent style={style.camBtn}
                                            onPress={this._pickImage}>
                                            <Ionicons name={camera} size={45} color='#455a64' />
                                        </Button>
                                        <Button rounded dark style={style.subBtn}
                                            onPress={this._onPressSubmit}>
                                            <Text>Submit Cluster</Text>
                                        </Button>
                                    </KeyboardAvoidingView>
                                </Content>
                            </Animated.View>
                        </View>
                    </Animated.ScrollView>
                </Container>
            </Root>
        )
    }
}

const style = StyleSheet.create({
    scrollView: {
        flexDirection: 'row',
    },
    scrollPage: {
        width: SCREEN_WIDTH,
    },
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    inputView: {
        marginTop: 20,
        width: SCREEN_WIDTH / 1.2
    },
    rootImg: {
        width: SCREEN_WIDTH / 2,
        height: SCREEN_HEIGHT / 4,
        alignSelf: 'center'
    },
    text: {
        marginTop: 10,
        fontSize: 19,
        textAlign: 'center'
    },
    input: {
        marginTop: 20,
        backgroundColor: '#eceff1',
        borderRadius: 50,
        paddingLeft: 25,
        padding: 15,
        fontSize: 16
    },
    list: {
        marginTop: 25
    },
    listItem: {
        marginTop: 10,
        marginBottom: 10
    },
    listTxt: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 15
    },
    camBtn: {
        marginTop: 15,
        alignSelf: 'center',
        height: 50
    },
    subBtn: {
        marginTop: 20,
        alignSelf: 'center'
    }
})