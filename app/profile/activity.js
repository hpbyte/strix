import React, { Component } from 'react';
import { Content, Text, Card, CardItem, View } from 'native-base';
import { 
    LineChart, YAxis, Grid, ProgressCircle, PieChart
} from 'react-native-svg-charts'
import firebaseService from '../service/firebase'

const FIREUSER = firebaseService.database().ref('users')

export default class Activity extends Component {
    constructor(props) {
        super(props)

        this.state = { points: 0, uId: firebaseService.auth().currentUser.uid }
    }

    componentDidMount() {
        this._getUserPoints()
    }

    _getUserPoints = async() => {
        await FIREUSER.child(this.state.uId).once('value', (snapshot) => {
            this.setState({ points: snapshot.val().points })
        })
    }

    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data2 = [ 50, 10, 40, 95 ]
        const contentInset = { top: 20, bottom: 20 }

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data2
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        return(
            <Content padder>
                <Card>
                    <CardItem header bordered> 
                        <Text>Points + Status</Text>
                    </CardItem>
                    <CardItem> 
                        <Text style={{ fontSize: 21, color: '#d32f2f' }}>{this.state.points} XP</Text>
                    </CardItem>
                    <ProgressCircle
                        style={{ height: 100, marginBottom: 15 }}
                        progress={ this.state.points / 2000 }
                        progressColor={'#2a4ff0'}
                    />
                </Card>
                <Card>
                    <CardItem header bordered>
                        <Text>Achievement Track</Text>
                    </CardItem>
                    <View style={{ height: 250, flexDirection: 'row', margin: 10 }}>
                        <YAxis
                            data={ data }
                            contentInset={ contentInset }
                            svg={{
                                fill: '#000',
                                fontSize: 10,
                            }}
                            numberOfTicks={ 16 }
                            formatLabel={ value => `${value}` }
                        />
                        <LineChart
                            style={{ flex: 1, marginLeft: 16 }}
                            data={ data }
                            svg={{ stroke: '#2a4ff0' }}
                            contentInset={ contentInset }
                        >
                            <Grid/>
                        </LineChart>
                    </View>
                </Card>
                <Card>
                    <CardItem header bordered>
                        <Text>By Cluster</Text>
                    </CardItem>
                    <PieChart
                        style={{ height: 200, margin: 15 }}
                        data={ pieData }
                    />
                </Card>
            </Content>
        )
    }
}