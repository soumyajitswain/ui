import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';

const AnyReactComponent = (props) => {
  const { color, name, id } = props;
  return (
    <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer'}}
      title={name}
    />
  );
};
//npm install --save google-map-react
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 12.9716,
      lng: 77.5946
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDIY_Zqs4Ah3h7yR7L_-vpZDIxUct40sJg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom} 
        >
          <Marker lat={11.090} lng={71.456} text="My Marker" />
          <AnyReactComponent
            lat={12.9716}
            lng={71.5946}
            text="My Marker"
          />
          <AnyReactComponent
            lat={12.9896}
            lng={77.7127}
            text="Charging Station" 
          />

        </GoogleMapReact>
      </div>
    );
  }

}


export default SimpleMap;