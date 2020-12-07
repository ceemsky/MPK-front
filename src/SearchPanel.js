import React, {Component} from 'react';


class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state={
            isInput:false,
            filteredStops:[]
        }
    }
    componentDidMount() {
        this.setState({
            filteredStops:this.props.stops.filter((v,i,a)=>a.findIndex(t=>(t.stop_name === v.stop_name))===i)
        });
    }

    render() {
        return (
            <div>
                <input
                    id={"search"}
                    placeholder={"Nazwa przystanku"}
                    onChange={()=>document.getElementById("search").value?this.setState({isInput:true}):this.setState({isInput:false})}
                    type={"text"}
                />
                <table>
                    <tbody>
                    {this.state.isInput&&this.state.filteredStops.filter(stop=>stop.stop_name.toLowerCase().includes(document.getElementById("search").value.toLowerCase())).map(stop=>
                        <tr onClick={(e)=>this.props.handleZoom(stop.stop_lat,stop.stop_lon,e)}>{stop.stop_name}</tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default SearchPanel;