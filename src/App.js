import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import './App.css';
import * as vehiclesData from './data/vehicles.json'
import {Icon} from "leaflet";

const busIcon = new Icon({
    iconUrl:'/vehicleIcon.svg',
    iconSize:[25,25]
})

export default function App() {
    const [activeVehicle, setActiveVehicle] = React.useState(null);
    return <Map center={[50.049683, 19.944544]} zoom={13}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {vehiclesData.vehicles.map(vehicle => (
            <Marker
                key={vehicle.id}
                position={[
                    vehicle.latitude / 3600000,
                    vehicle.longitude / 3600000
                ]}
                onClick={() => {
                    setActiveVehicle(vehicle);
                }}
                icon = {busIcon}
            />
        ))}
        {activeVehicle && (
            <Popup
                position={[
                    activeVehicle.latitude / 3600000,
                    activeVehicle.longitude / 3600000
                ]}
                onClose={()=>{
                    setActiveVehicle(null);
                }}
            >
                <div>
                    <h4>{activeVehicle.name}</h4>
                    <p>{activeVehicle.category}</p>
                </div>
            </Popup>
        )}
    </Map>;


}
