import {Popup} from "react-leaflet";
import React, {Component} from "react";
import StopInfo from "./StopInfo";

class StopsPopup extends Component {
    constructor(props) {
        super(props);
        this.state={
            stops:[]
        }
    }
    componentDidMount() {
        try{
            this.setState({stops:this.props.activeStops.old.concat(this.props.activeStops.actual).filter(item=>item!=null)},()=>console.log(this.state.stops,'stops'));
        }
        catch(e){
            console.log("Active stops not loaded into popup: "+e.toString());
            this.setState({stops:[]})
        }
    }

    render() {
        return (
            <Popup
                position={[this.props.pos[0] / 3600000,
                    this.props.pos[1] / 3600000]}
                onClose={this.props.onClose}
            >
                <div>
                    <h2>{this.props.name}</h2>
                    {this.state.stops.map(stop=>
                        <StopInfo stop={stop}/>)}
                </div>
            </Popup>)
    }
}

export default StopsPopup;