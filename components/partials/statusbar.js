import React from 'react';
import { StatusBar } from 'react-native'

export default class Bar extends React.Component {
    render() {
        return(
            <StatusBar
                backgroundColor='#000'
                barStyle='light-content' />
        )
    }
}