import React, { Component } from 'react';
import { Content, Text, Card, CardItem } from 'native-base';

const arr = [
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side",
    "hello from the other side"
]

export default class Activity extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Card
                dataArray={arr}
                renderRow={a => 
                    <CardItem>    
                        <Text>{a}</Text>
                    </CardItem>    
                }>
            </Card>
        )
    }
}