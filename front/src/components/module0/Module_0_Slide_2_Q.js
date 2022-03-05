import React, {Component} from "react";
import Module_0_Slide_3_A from "./Module_0_Slide_3_A";
import NavigationButtons from "../templates/NavigationButtons";

class Module_0_Slide_2_Q extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = props.prev;
        this.next = <Module_0_Slide_3_A prev={this} mainArea={this.mainArea}></Module_0_Slide_3_A>        
        
    }
    render(){

        return(
        <div>M02Q
            
        <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next}></NavigationButtons>
        
        </div>)
    }

}

export default Module_0_Slide_2_Q;