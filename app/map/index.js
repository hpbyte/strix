import React, { Component } from 'react';
import { Platform } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo'

export default class Map extends Component {
    state = {
        location: null,
        error: null
    }

    componentWillMount() {
        if(Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                error: 'This will not work on Android emulator'
            })
        } else {
            this._getLocation()
        }
    }

    _getLocation = async() => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)

        if(status !== 'granted') {
            this.setState({
                error: 'Please give location permission'
            })
        }

        let location = await Location.getCurrentPositionAsync({})
        this.setState({ location })
    }

    render() {
        let mylocation = 'Waiting ...'
        const { location, error } = this.state
        if(error) {
            alert(error)
        } else if(location) {
            mylocation = JSON.stringify(location)
            alert(mylocation)
        }

        return(
            <MapView
                style={{ flex: 1 }}
                provider="google"
                showsMyLocationButton={true}
                showsUserLocation={true}
                showsCompass={true}
            />
        )
    }
}