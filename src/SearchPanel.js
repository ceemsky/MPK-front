import React, {Component} from 'react';


class SearchPanel extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <input
                id={"search"}
                placeholder={"Nazwa przystanku"}
                />
        );
    }
}


export default SearchPanel;