import React, {Component} from "react";
import {Marker} from "react-leaflet";
import {Icon} from "leaflet";
import mergeImages from 'merge-images';
import {DivIcon} from "leaflet/dist/leaflet-src.esm";


class Vehicle extends Component {
    render() {
        let busIcon = new DivIcon({
            className: "my-custom-pin",
            html:
                `<div style="position: relative;text-align: center;width:30px;height:30px;">
                    <img src="/bus_icon.svg"style="width:100%;transform-origin: 50% 62%;transform: rotate(${this.props.heading}deg"/>
                    <div style=" position: absolute;top: 40%;left: 50%;transform: translate(-50%, 30%);">${this.props.line}</div>
                 </div>`
        })
        let lat = this.props.pos[0] / 3600000;
        let lng = this.props.pos[1] / 3600000;
        if (!isNaN(lat) && !isNaN(lng))
            return (
                <Marker
                    key={this.props.id}
                    position={[lat, lng]}
                    icon={busIcon}
                    onClick={(e)=>this.props.onClick(this.props.id,e)}
                />
            );
        else
            return null;
    }
}

export default Vehicle;