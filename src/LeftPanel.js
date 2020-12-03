import React, {Component} from "react";
import StopsPanel from "./StopsPanel";
import FilterPanel from "./FilterPanel";
import {Map} from "react-leaflet";
import SearchPanel from "./SearchPanel";
import {Tabs,Tab, TabList, TabPanel} from "react-tabs";

class LeftPanel extends Component{
    constructor(props) {
        super(props);
    }
    render() {
            return (
                <div className={"left-panel"}>
                    <Tabs>
                        <TabList>
                            <Tab>Przystanki</Tab>
                            <Tab>Filtrowanie linii</Tab>
                            <Tab>Wyszukaj przystanek</Tab>
                        </TabList>
                        <TabPanel>
                            <StopsPanel
                                name={this.props.activeVehicleName}
                                activeStops={this.props.activeStops}/>
                        </TabPanel>
                        <TabPanel>
                            <FilterPanel
                                vehicles={this.props.vehicles}
                                onClick={this.props.handleFilterClick}/>
                        </TabPanel>
                        <TabPanel>
                            {/*<SearchPanel/>*/}
                        </TabPanel>
                    </Tabs>
                </div>
            );
        }
    }

    export
    default
    LeftPanel;