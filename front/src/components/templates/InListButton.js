// import { Button } from "antd";
import React, {Component} from "react";

class InListButton extends Component {

    constructor(props){
        super(props)
        this.listExercisePanel   = props.listExercisePanel ? props.listExercisePanel : '';
        this.mainArea            = props.mainArea ? props.mainArea : '';
        this.text                = props.text ? props.text.split('\n').map(str => <p style={{margin: 5, fontSize: 19, padding: 5, fontWeight: 700}}>{str}</p>) : '';
        this.knowledgePanel      = props.knowledgePanel ? props.knowledgePanel : null;
    }

    updateMainAreaKnowledgePanel =() => {
        this.mainArea.setState({knowledgePanel: this.knowledgePanel})
    }
   
    render(){
        return(
            <div className='InListButton'>
                <button type="submit" className="btn btn-info m-3" onClick={this.updateMainAreaKnowledgePanel}>{this.text}</button>
            </div>)
    }
}

export default InListButton;