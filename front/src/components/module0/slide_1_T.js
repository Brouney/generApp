import React, {Component} from "react";
import Slide_2_Q from "./Slide_2_Q";

class Slide_1_T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        
    }
    next = <Slide_2_Q prev={this}></Slide_2_Q>
    render(){
        return(
        <div>
            <h1>T1</h1>
        </div>
        )
    }

}

export default Slide_1_T;