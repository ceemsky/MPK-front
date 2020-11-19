import React, {Component} from "react";
import './App.css';

class StopInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dot: null
        }
    }

    componentDidMount() {
        if (this.props.stop.status === "DEPARTED")
            this.setState({
                dot: "red-dot"
            })
        if (this.props.stop.status === "PREDICTED")
            this.setState({
                dot: "green-dot"
            })
        if (this.props.stop.status === "STOPPING")
            this.setState({
                dot: "blue-dot"
            })
    }

    render() {
        return (
            <p>
                <span>{this.props.stop.actualTime}</span>
                <span className={this.state.dot}></span>
                <span>{this.props.stop.stop.name}</span>
            </p>
        )
    }
}

export default StopInfo