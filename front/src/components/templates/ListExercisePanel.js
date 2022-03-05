import React, {Component} from "react";
import InListButton from "./InListButton";
import Slide_1_T from "../module0/Slide_1_T";

class ListExercisePanel extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
    }
    render(){
        this.firstknowledge = <Slide_1_T></Slide_1_T>
        return(
        <div className='ListExercisePanel col-3' >
            listExercisePanel
            <InListButton list={this} mainArea={this.mainArea} text="jeden" knowledgePanel={this.firstknowledge}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text="dwa" ></InListButton>
            
        /</div>)
    }

}

export default ListExercisePanel;