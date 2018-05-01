import { Dimensions } from 'react-native'
export const MAR_TOP = Dimensions.get('window').height / 11

export default {
    strix: {
        fontSize: 70,
        fontFamily: 'pacifico',
        textAlign: 'center',
        marginTop: MAR_TOP
    },
    item: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fafafacc'
    },
    input: {
        marginLeft: 10
    },
    inputIcon: {
        marginLeft: 15
    },
    btn: {
        marginTop: 40,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    txtLogin: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20
    }
}