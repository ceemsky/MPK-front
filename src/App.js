import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import './App.css';

import Vehicle from "./Vehicle";
import StopsPopup from "./StopsPopup";

const vehiclesUrl = '/geoserviceDispatcher/services/vehicleinfo/vehicles';
const tripStopsUrl = '/services/tripInfo/tripPassages?tripId=';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastUpdate: null,
            vehicles: [],
            activeVehicle: null,
            activeStops: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleClick(id, e) {
        this.setState(state => ({
            activeVehicle: this.state.vehicles.find(vehicle => vehicle.id == id)
        }))
        await fetch(tripStopsUrl + this.state.activeVehicle.tripId)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    activeStops: data.actual==[]?[]:data
                });
            });
        try {
            console.log(this.state.activeStops.old[0].stop.name)
        }
        catch (e){}
    }
    handleClose(e){
        this.setState({
            activeVehicle: null,
            activeTripStops: null
        })
    }

    componentDidMount() {
        fetch(vehiclesUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    lastUpdate: data.lastUpdate,
                    vehicles: data.vehicles.filter(vehicle => !vehicle.isDeleted)
                });
            });
    }

    render() {
        return (
            <Map center={[50.049683, 19.944544]} zoom={13}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {this.state.vehicles.map(vehicle =>
                    <Vehicle
                        id={vehicle.id}
                        pos={[vehicle.latitude, vehicle.longitude]}
                        heading={vehicle.heading}
                        line={vehicle.name.substring(0, 3)}
                        onClick={this.handleClick}
                    />
                )}
                {this.state.activeVehicle && (<StopsPopup
                    pos={[this.state.activeVehicle.latitude,this.state.activeVehicle.longitude]}
                    onClose={this.handleClose}
                    name={this.state.activeVehicle.name}
                    activeStops={this.state.activeStops}/>)}

            </Map>
        );

    }
}

export default App;
