import React, {Component} from 'react';
import {DivIcon} from "leaflet/dist/leaflet-src.esm";
import {Marker} from "react-leaflet";
//http://91.223.13.70/internetservice/geoserviceDispatcher/services/stopinfo/stops      =>500
class Stop extends Component{
    constructor(props) {
        super(props);
        this.state={
            lat:null,
            lng:null,
            name:null,
            type:"bus"
        }
    }
    componentDidMount() {
        this.setState({
            lat:this.props.lat,
            lng:this.props.lng,
            name:this.props.name,
        })
    }
    render(){
        let stopIcon = new DivIcon({
            className: "stop-pin",
            html:
                `<div style="position: relative;text-align: center;width:15px;height:15px;">
                    <img src="/stop-icon.svg"style="width:100%; rotation: 180deg"/>                    
                 </div>`
        })
        return(
            <Marker
                key={this.props.id}
                position={[this.props.lat, this.props.lng]}
                icon={stopIcon}
            />
        )
    }
}
export default Stop;