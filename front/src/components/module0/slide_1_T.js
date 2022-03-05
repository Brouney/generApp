import React, {Component} from "react";


class slide_1_T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        
    }
    next = <slide_2_Q prev={this}></slide_2_Q>
    render(){
        return(
        <div></div>
        )
    }

}

export default slide_1_T;