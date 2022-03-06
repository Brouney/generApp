import React, {Component} from "react";
import Module_X_Slide_Y_Q from "./Module_X_Slide_Y_Q";
import NavigationButtons from "../templates/NavigationButtons";

class Module_X_Slide_Z_T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Module_X_Slide_Y_Q prev={<Module_X_Slide_Z_T></Module_X_Slide_Z_T>} mainArea={this.mainArea}></Module_X_Slide_Y_Q>
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

export default Module_X_Slide_Z_T;