import React, { Component } from 'react';
import { Content, Text, Card, CardItem, View } from 'native-base';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'

export default class Activity extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const contentInset = { top: 20, bottom: 20 }
        return(
            <Card>
                <View style={{ height: 200, flexDirection: 'row', margin: 5 }}>
                    <YAxis
                        data={ data }
                        contentInset={ contentInset }
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={ 10 }
                        formatLabel={ value => `${value}ÂºC` }
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={ data }
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={ contentInset }
                    >
                        <Grid/>
                    </LineChart>
                </View>
            </Card>
        )
    }
}