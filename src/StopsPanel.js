import React, {Component} from "react";
import StopInfo from "./StopInfo";

class StopsPanel extends Component {
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
                <div className={"stops-box"}>
                    <h2>Przystanki {this.props.name}</h2>
                    {this.state.stops.map(stop=>
                        <StopInfo stop={stop}/>)}
                </div>
        )
    }
}

export default StopsPanel;