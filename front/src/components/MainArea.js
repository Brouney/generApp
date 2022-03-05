import React, {Component} from "react";
import ListExercisePanel from './templates/ListExercisePanel'
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
            
            <ListExercisePanel mainArea={this}> </ListExercisePanel>
            {this.state.knowledgePanel}
            
        </div>)
    }

}

export default MainArea;