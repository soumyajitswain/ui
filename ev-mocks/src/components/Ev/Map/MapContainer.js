import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, IMapProps } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
  };
//Display the complete information for the 
//npm install --save google-maps-react
//https://github.com/googlemap-react/googlemap-react
//https://github.com/google-map-react/google-map-react
//https://github.com/fullstackreact/google-maps-react

//https://tomchentw.github.io/react-google-maps/
const MapContainer = props => {
    console.log(this.props)
    if(!this.props.google) {
      return null;
    }
    return (
        <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
};

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDIY_Zqs4Ah3h7yR7L_-vpZDIxUct40sJg')
})(MapContainer)