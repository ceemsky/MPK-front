import React, {Component} from "react";
import {Marker} from "react-leaflet";
import {Icon} from "leaflet";
import mergeImages from 'merge-images';

let busIcon = new Icon ({
    iconUrl: '/bus_icon.svg',
    iconSize: [25, 25]
})

class Vehicle extends Component {
    componentDidMount() {
        // mergeImages([
        //     {src:'/bus_icon.svg',x:0,y:0},
        //     {src:'/direction_icon.svg',x:-50,y:0},
        //
        // ])
        //     .then(b64 => document.querySelector('img').src = b64);
//https://github.com/bbecquet/Leaflet.RotatedMarker

    }

    render() {
        let lat = this.props.pos[0] / 3600000;
        let lng = this.props.pos[1] / 3600000;
        if (!isNaN(lat) && !isNaN(lng))
            return (
                <Marker
                    key={this.props.id}
                    position={[lat, lng]}
                    icon={busIcon}
                />
            );
        else
            return null;
    }
}

export default Vehicle;