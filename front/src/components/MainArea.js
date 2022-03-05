import React, {Component} from "react";
import ListExercisePanel from './templates/ListExercisePanel'
import Module_0_slides from "./module0/Module_0_slides";
class MainArea extends Component {

    constructor(props){
        super(props)

        this.state = {
            knowledgePanel:<knowledgePanel></knowledgePanel>
        }
    }
    render(){
        return(
        <div className='mainArea'>
            <Module_0_slides mainArea={this}></Module_0_slides>
            <div className="row">
                    <ListExercisePanel mainArea={this}> </ListExercisePanel>

                    <div className='knowledgePanel col-3'>
                        {this.state.knowledgePanel}
                    </div>
            </div>

            
        </div>)
    }

}

export default MainArea;