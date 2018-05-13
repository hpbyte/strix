import React from 'react';
import { StackNavigator } from 'react-navigation'
import Result from './result'
import Info from '../info/info'
import Booster from './booster'
import Chat from '../chat/chat'
import QRScanner from './qrscanner'

const BoostStack = StackNavigator(
    {
        Result: { screen: Result },
        Info: { screen: Info },
        Chat: { screen: Chat },
        Booster: { screen: Booster },
        QRScanner: { screen: QRScanner },
    },
    {
        initialRouteName: 'Booster',
        headerMode: 'none',
        mode: 'modal'
    }
)

export default BoostStack