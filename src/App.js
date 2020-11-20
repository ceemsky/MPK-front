import React, {Component} from 'react';
import ReactDOM from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import './App.css';

import Vehicle from "./Vehicle";
import StopsPopup from "./StopsPopup";
import StopsPanel from "./StopsPanel";
import FilterPanel from "./FilterPanel";

const vehiclesUrl = '/geoserviceDispatcher/services/vehicleinfo/vehicles';
const tripStopsUrl = '/services/tripInfo/tripPassages?tripId=';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastUpdate: null,
            vehicles: [],
            activeVehicle: null,
            activeStops: [],
            activeLines:[]
        }
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
    }

    async handleIconClick(id, e) {
        this.setState(state => ({activeVehicle:null}));
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
    }
    handleFilterClick(id,line,e){
        if (document.getElementById(id).checked)
        {
            this.state.activeLines.push(line);
        } else {
            this.state.activeLines.pop(line);
        }
        console.log(this.state.activeLines);
        this.render();
    }
    componentDidMount() {
        this.fetcher=setInterval(()=>
        fetch(vehiclesUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    lastUpdate: data.lastUpdate,
                    vehicles: data.vehicles.filter(vehicle => !vehicle.isDeleted)
                });
            }),1000);
    }
    render() {
        let filteredVehicles= this.state.vehicles.filter(vehicle=>this.state.activeLines.includes(vehicle.name.substring(0,3)))
        console.log(filteredVehicles);
        return (
            <Map center={[50.049683, 19.944544]} zoom={13} id={"map"} >
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredVehicles.map(vehicle =>
                    <Vehicle
                        id={vehicle.id}
                        pos={[vehicle.latitude, vehicle.longitude]}
                        heading={vehicle.heading}
                        line={vehicle.name.substring(0, 3)}
                        onClick={this.handleIconClick}
                    />
                )}
                <div className={"left-panel"}>
                    {this.state.activeVehicle && (<StopsPanel
                        name={this.state.activeVehicle.name}
                        activeStops={this.state.activeStops}/>)}
                    <FilterPanel vehicles ={this.state.vehicles} onClick={this.handleFilterClick}></FilterPanel>
                </div>
            </Map>
        );

    }
}

export default App;
