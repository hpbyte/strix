import React from 'react';
import { StackNavigator } from 'react-navigation'
import Booster from './booster'
import QRScanner from './qrscanner'

const BoostStack = StackNavigator(
    {
        Booster: { screen: Booster },
        QRScanner: { screen: QRScanner }
    },
    {
        initialRouteName: 'Booster',
        headerMode: 'none',
        mode: 'modal'
    }
)

export default BoostStack