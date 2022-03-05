import React, {Component} from "react";
import Module_0_Slide_2_Q from "./Module_0_Slide_2_Q";
import NavigationButtons from "../templates/NavigationButtons";

class Module_0_Slide_1_T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Module_0_Slide_2_Q prev={<Module_0_Slide_1_T></Module_0_Slide_1_T>} mainArea={this.mainArea}></Module_0_Slide_2_Q>
    }
    
    render(){
        
        return(
        <div>
             <h1>T1</h1>
             <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next}></NavigationButtons>
        </div>
        )
    }

}

export default Module_0_Slide_1_T;