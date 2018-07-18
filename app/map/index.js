import React, { Component } from 'react';
import { Platform } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo'
  
export default class Map extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            error: null,
            lati: 0,
            longi: 0
        }
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
        this.setState({ 
            lati: location.coords.latitude,
            longi: location.coords.longitude
        })
    }

    render() {
        const { error, lati, longi } = this.state
        if(error) {
            alert(error)
        }
        return(
            <MapView
                style={{ flex: 1 }}
                provider="google"
                showsMyLocationButton={true}
                showsUserLocation={true}
                showsCompass={true}
                showsScale={true}
                showsIndoors={true}
                loadingEnabled={true}
                loadingIndicatorColor='#000'
                region={{
                    latitude: lati,
                    longitude: longi,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker coordinate={{latitude: 45.524548, longitude: -122.6749817}} />
            </MapView>
        )
    }
}