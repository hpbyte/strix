import React from 'react';
import { StatusBar, Platform } from 'react-native';

export default Bar = () => {
    if(Platform.OS === 'android') {
        return(
            <StatusBar
                backgroundColor="#000"
                barStyle="light-content"
            />
        )
    } else {
        return null
    }
}