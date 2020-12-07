import React, {Component} from 'react';
import ReactDOM from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import './App.css';
import {Cookies, useCookies, withCookies} from "react-cookie";
import Vehicle from "./Vehicle";
import Stop from "./Stop";
import StopsPanel from "./StopsPanel";
import FilterPanel from "./FilterPanel";
import LeftPanel from "./LeftPanel";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {instanceOf} from "prop-types";
import CookieConsent from "react-cookie-consent";
import SearchPanel from "./SearchPanel";

const vehiclesUrl = '/geoserviceDispatcher/services/vehicleinfo/vehicles';
const tripStopsUrl = '/services/tripInfo/tripPassages?tripId=';

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies)
    };
    constructor(props) {
        super(props);
        this.state = {
            lastUpdate: null,
            vehicles: [],
            activeVehicle: null,
            activeStops: [],
            activeLines: [],
            stops: []
        }
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleStopZoom = this.handleStopZoom.bind(this);
        this.fetcher = setInterval(() =>
            fetch(vehiclesUrl)
                .then((response) => response.json())
                .then(data => {
                    this.setState({
                        lastUpdate: data.lastUpdate,
                        vehicles: data.vehicles.filter(vehicle => !vehicle.isDeleted)
                    });
                }), 1000);
    }

    handleCookie() {
        const {cookies} = this.props;
        if (cookies.get("CookieConsent")) {
            cookies.set("activeLines", this.state.activeLines, {path: "/"}); // setting the cookie
            this.setState({user: cookies.get("activeLines")});
        }
    }

    async handleIconClick(id, e) {
        this.setState(state => ({activeVehicle: null}));
        this.setState(state => ({
            activeVehicle: this.state.vehicles.find(vehicle => vehicle.id == id)
        }))
        await fetch(tripStopsUrl + this.state.activeVehicle.tripId)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    activeStops: data.actual == [] ? [] : data
                });
            });
    }

    handleFilterClick(id, line, e) {
        if (document.getElementById(id).checked) {
            this.state.activeLines.push(line);
        } else {
            this.state.activeLines.pop(line);
        }
        this.handleCookie();
        this.render();
    }

    handleStopZoom(lat,lng,e) {
        console.log("zoom handler");
        this.map.flyTo([lat,lng],17);
    }

    componentDidMount() {
        const stops = require('./data/stops.json');
        const {cookies} = this.props;
        this.setState({
            stops: stops.stops,
            activeLines: this.props.cookies.get("activeLines") ? this.props.cookies.get("activeLines") : [],
        });
        this.map = this.mapInstance.leafletElement;
    }

    render() {
        let filteredVehicles = this.state.vehicles.filter(vehicle => this.state.activeLines.includes(vehicle.name.substring(0, 3)))
        return (
            <Map center={[50.049683, 19.944544]} zoom={13} id={"map"} ref={e => { this.mapInstance = e }}>
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
                {this.state.stops.map(stop=>
                <Stop
                    lat={stop.stop_lat}
                    lng={stop.stop_lon}
                    name={stop.stop_name}
                    />
                )}

                <div className={"left-panel"}>
                    <Tabs>
                        <TabList>
                            <Tab>Przystanki</Tab>
                            <Tab>Filtrowanie linii</Tab>
                            <Tab>Wyszukaj przystanek</Tab>
                        </TabList>
                        <TabPanel>
                            <StopsPanel
                                name={this.state.activeVehicle ? this.state.activeVehicle.name : null}
                                activeStops={this.state.activeStops}/>
                        </TabPanel>
                        <TabPanel>
                            <FilterPanel vehicles={this.state.vehicles} onClick={this.handleFilterClick}
                                         activeLines={this.state.activeLines}
                            ></FilterPanel>
                        </TabPanel>
                        <TabPanel>
                            <SearchPanel stops={this.state.stops}
                            handleZoom={this.handleStopZoom}
                            />
                        </TabPanel>
                    </Tabs>
                </div>
                <CookieConsent
                    buttonText={"Spoko byczq"}
                >Ta strona używa ciasteczek</CookieConsent>
            </Map>
        );

    }

}

export default withCookies(App);
