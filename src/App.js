import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import './App.css';
import * as vehiclesData from './data/vehicles.json'

export default function App() {
    return <Map center={[50.049683, 19.944544]} zoom={13}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {vehiclesData.vehicles.map(vehicle => (
            <Marker
                key={vehicle.id}
                position={[
                    vehicle.latitude/3600000,
                    vehicle.longitude/3600000
                ]}
            />

        ))}
    </Map>;


}
