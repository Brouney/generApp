import React, {Component} from "react";
import InListButton from "./InListButton";
import Slide11T from "../module1/Slide11T";
import Slide21Q from "../module2/Slide21Q";

// TODO: increase below globals whenever you add new slides to module
export let MODULE_1_SLIDES_COUNT = 3;
export let MODULE_2_SLIDES_COUNT = 1;

class ListExercisePanel extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
    }
    render(){
        this.module1 = <Slide11T mainArea={this.mainArea}></Slide11T>
        this.module2 = <Slide21Q mainArea={this.mainArea}></Slide21Q>

        return(
        <div className='ListExercisePanel col-3' align="center">

            <InListButton list={this} mainArea={this.mainArea} text="Moduł 1" knowledgePanel={this.module1}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text="Moduł 2" knowledgePanel={this.module2}></InListButton>
            
        </div>)
    }

}

export default ListExercisePanel;