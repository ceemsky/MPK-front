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
        console.log(this.props.stops);
        if(this.props.name!=null)
        return (
                <div className={"stops-box"}>
                    <h2>Przystanki {this.props.name}</h2>
                    {this.props.stops && this.props.stops.map(stop=>
                        <StopInfo stop={stop}/>)}
                </div>
        )
        else
            return(
                <div className={"stops-box"}>
                    <h2>Przystanki {this.props.name}</h2>
                    <h4>Nie wybrano autobusu</h4>
                </div>
            )
    }
}

export default StopsPanel;