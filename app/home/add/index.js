import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Content,
    Text,
    Left,
    Right,
    Body,
    Title,
    Button,
    Item,
    Input,
    Label,
    Toast,
    ActionSheet,
    Root
} from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Ionicons } from '@expo/vector-icons'
import { alert, more } from '../../partials/icons'
import Bar from '../../partials/bar'
import Style from '../../style'
import firebaseService from '../../service/firebase'

export default class Add extends Component {
    constructor(props) {
        super(props)

        this.state = { root: '', branch: '', cluster: '' }
    }

    _submitCluster = async() => {
        const { root, branch, cluster } = this.state

        if(root !== '' || branch !== '' || cluster !== '') {
            await firebaseService.database().ref('clusters').child(root.toUpperCase()).child(branch.toUpperCase())
                .push({ cluster: cluster.toUpperCase() })
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
        } else {
            Toast.show({
                text: 'Please fill out the fields!',
                buttonText: 'OK',
                duration: 3000,
                type: 'danger',
                position: 'top'
            })
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
                    <Header style={[Style.header, Style.bgGrey]}>
                        <Left style={{ flex: 1 }}>
                            <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={26} style={Style.white} />
                            </Button>
                        </Left>
                        <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Title style={Style.white}>Add Cluster</Title>
                        </Body>
                        <Right style={{ flex: 1 }}>
                            <Button transparent>
                                <Ionicons name='ios-more' size={26} style={Style.white} />
                            </Button>
                        </Right>
                    </Header>
                    <Bar />
                    <Grid style={Style.bgDgrey}>
                        <Row size={20} style={[Style.myCard, {marginTop: 10}]}>
                            <Col>
                                <Row>
                                    <Col size={10}>
                                        <Ionicons name={alert} color="red" size={35} />
                                    </Col>
                                    <Col size={90}>
                                        <Text style={[Style.white, { margin: 10, marginTop: 5 }]}>Make sure the cluster doesn't exist yet</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={10}>
                                        <Ionicons name={alert} color="orange" size={35} />
                                    </Col>
                                    <Col size={90}>
                                        <Text style={[Style.white, { margin: 10, marginTop: 5 }]}>Desired cluster should be relatble to the system</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row size={80} style={[Style.myCard, {marginBottom: 10}]}>
                            <Col>
                                <Content>
                                    <Item stackedLabel style={{ marginLeft: 0 }}>
                                        <Label style={Style.white}>Root</Label>
                                        <Input autoCapitalize='words' value={this.state.root} style={Style.white} 
                                            onChangeText={root => this.setState({root})} />
                                    </Item>
                                    <Item stackedLabel style={{ marginLeft: 0 }}>
                                        <Label style={Style.white}>Branch</Label>
                                        <Input autoCapitalize='words' value={this.state.branch} style={Style.white}
                                            onChangeText={branch => this.setState({branch})} />
                                    </Item>
                                    <Item stackedLabel style={{ marginLeft: 0 }}>
                                        <Label style={Style.white}>Cluster</Label>
                                        <Input autoCapitalize='words' value={this.state.cluster} style={Style.white}
                                            onChangeText={cluster => this.setState({cluster})} />
                                    </Item>
                                    <Button rounded style={[Style.bgBlue, {alignSelf: 'center', marginTop: 30}]}
                                        onPress={this._submitCluster.bind(this)}>
                                        <Text>Submit Cluster</Text>
                                    </Button>
                                </Content>
                            </Col>
                        </Row>
                    </Grid>
                </Container>
            </Root>
        )
    }
}