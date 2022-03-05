import React, {Component} from "react";
import Module_0_Slide_2_Q from "./Module_0_Slide_2_Q";
import NavigationButtons from "../templates/NavigationButtons";

class Module_0_Slide_3_A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Module_0_Slide_2_Q mainArea={this.mainArea}></Module_0_Slide_2_Q>;
        this.next = null   
        
    }
    render(){
        return(
        <div>M03A
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next}></NavigationButtons>
        </div>
        )
    }

}

export default Module_0_Slide_3_A;