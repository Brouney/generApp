import React, {Component} from "react";
import InListButton from "./InListButton";


class ListExercisePanel extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
    }
    render(){
        return(<div className="row">
        <div className='ListExercisePanel col-3' >
            listExercisePanel
            <InListButton list={this} mainArea={this.mainArea} text="jeden"></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text="dwa"></InListButton>
            
            </div>
            <div className='knowledgePanel col-3'>
            knowledgePanel

        </div>
        </div>)
    }

}

export default ListExercisePanel;