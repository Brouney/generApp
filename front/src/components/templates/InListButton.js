// import { Button } from "antd";
import React, {Component} from "react";

class InListButton extends Component {

    constructor(props){
        super(props)
        this.listExercisePanel = props.listExercisePanel?props.listExercisePanel:'';
        this.mainArea = props.mainArea?props.mainArea:'';
        this.text = props.text?props.text:'';
        this.knowledgePanel = props.knowledgePanel?props.knowledgePanel:null;
    }

    onClickMethod =() => {
        this.panel.setState({})
    }
   
    render(){
        return(
            <div className='InListButton'>
                

                <button type="submit" className="btn btn-primary col-3" onClick={console.log("XD")}>{this.text}</button>
            </div>)
    }

}

export default InListButton;