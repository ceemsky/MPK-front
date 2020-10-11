import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import './App.css';

import Vehicle from "./Vehicle";


const dataUrl = '/geoserviceDispatcher/services/vehicleinfo/vehicles';

class App extends Component {
    state = {
        lastUpdate: null,
        vehicles: []
    }
    render() {
        fetch(dataUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    lastUpdate: data.lastUpdate,
                    vehicles: data.vehicles.filter(vehicle => !vehicle.isDeleted)
                });
            });

        return (
            <Map center={[50.049683, 19.944544]} zoom={13}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {this.state.vehicles.map(vehicle =>
                    <Vehicle id={vehicle.id} pos={[vehicle.latitude, vehicle.longitude]} heading={vehicle.heading}/>
                )}

            </Map>
        );

    }
}

export default App;
