import { Platform } from 'react-native';

export default {
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 0
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 1.5,
    // elevation: 9
  },
  bgWhite: {
    backgroundColor: '#fff'
  },
  bgBlack: {
    backgroundColor: '#000'
  },
  bgBlue: {
    backgroundColor: '#2a4ff0'
  },
  bgRed: {
      backgroundColor: '#d32f2f'
  },
  bgDgrey: {
    backgroundColor: '#212121'
  },
  bgGrey: {
    backgroundColor: '#424242'
  },
  white: {
    color: '#fff'
  },
  black: {
    color: '#000'
  },
  blue: {
    color: '#2a4ff0'
  },
  red: {
    color: '#d32f2f'
  },
  title: {
    fontFamily: 'pacifico',
    fontSize: 32,
    color: '#000',
    paddingLeft: 0
  },
  leftBtn: {
    paddingLeft: 5,
    marginLeft: Platform.OS === 'ios' ? 5 : null
  },
  rightBtn: {
    paddingRight: 7,
    marginRight: 0
  },
  fab: {
    flex: 1,
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.1
  },
  flexCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  itemCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticalCenter: {
    alignItems: 'center'
  },
  myCard: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#424242',
    borderRadius: 10,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 }
  },
  listItem: {
    marginBottom: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#212121',
  },
  avater: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  pdlf: {
    paddingLeft: 15
  },
  camera: {
    alignSelf: 'center',
    marginTop: 5
  },
  iconBtn: {
    padding: 13,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    alignSelf: 'center',
  }
}
