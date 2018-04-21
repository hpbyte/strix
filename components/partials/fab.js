import React, { Component } from 'react';
import { Button, Fab } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class FloatBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'false'
        };
    }
    render() {
        return (
            <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
                <Ionicons name="ios-add" size={25} />
                <Button style={{ backgroundColor: '#DD5144' }} >
                    <Ionicons name="ios-mail" color='#fff' size={30} />
                </Button>
            </Fab>
        );
    }
}