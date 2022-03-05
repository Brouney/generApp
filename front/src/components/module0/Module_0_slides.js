import React, {Component} from "react";
import Module_0_Slide_1_T from "./Module_0_Slide_1_T";
import Module_0_Slide_2_Q from "./Module_0_Slide_2_Q";
import Module_0_Slide_3_A from "./Module_0_Slide_3_A";

class Module_0_slides extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.Slide1=<Module_0_Slide_1_T mainArea={this.mainArea} ></Module_0_Slide_1_T>   
        this.Slide2=<Module_0_Slide_2_Q prev={this.Slide1} mainArea={this.mainArea}></Module_0_Slide_2_Q>
        this.Slide3=<Module_0_Slide_3_A prev={this.Slide2} mainArea={this.mainArea}></Module_0_Slide_3_A>

    }
    render(){
        return(
        <div></div>
        )
    }

}

export default Module_0_slides;