import React, {Component} from "react";

class FilterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: []
        }
    }

    componentDidMount() {
        this.setState({lines: [100, 101, 102, 103, 105, 106, 107, 109, 110, 111, 112, 113, 114, 116, 117, 120, 122, 123, 124, 125, 127, 128, 129, 130, 131, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 149, 151, 152, 155, 156, 158, 159, 160, 161, 162, 163, 164, 165, 168, 169, 171, 172, 173, 174, 175, 176, 178, 179, 181, 182, 183, 184, 189, 192, 193, 194, 201, 202, 203, 204, 207, 208, 209, 210, 211, 212, 213, 214, 215, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 232, 233, 234, 235, 237, 238, 239, 240, 242, 243, 244, 245, 247, 248, 249, 250, 252, 253, 254, 255, 257, 258, 259, 260, 262, 263, 264, 265, 267, 268, 269, 270, 271, 273, 274, 275, 277, 278, 280, 283, 285, 287, 297, 301, 304, 405, 413, 422, 424, 451, 469, 475, 501, 502, 503, 511, 537, 572, 578, 601, 605, 608, 610, 637, 642, 662, 664, 669, 902, 904, 910, 917, 937]})
    }

    render() {
        return (
            <div>
                <h2>Filtrowanie linii</h2>
                <div className={"filter-box"}>
                    {this.state.lines.map(line =>
                        <div>
                            <input
                                type={"checkbox"}
                                id={"filter_"+line}
                                onClick={(e)=>this.props.onClick("filter_"+line,line.toString(),e)}
                                checked={this.props.activeLines.includes(line.toString())}
                                />
                            <label>{line}</label>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default FilterPanel;