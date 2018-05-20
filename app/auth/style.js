import { Dimensions, Platform } from 'react-native'
export const MAR_TOP = Dimensions.get('window').height / 11

export default {
    verticalCenter: {
        justifyContent: 'center'
    },
    strix: {
        fontSize: 70,
        fontFamily: 'pacifico',
        alignSelf: 'center'
    },
    inputView: {
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 50
    },
    input: {
        fontSize: 16,
    },
    inputIcon: {
        alignSelf: 'center',
    },
    btn: {
        alignSelf: 'center'
    },
    txtLogin: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20
    },
    errorTxt: {
        color: 'red',
        marginLeft: 40,
        marginTop: 5
    }
}