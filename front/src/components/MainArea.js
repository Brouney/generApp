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
            <div className="row">
                    <ListExercisePanel mainArea={this}> </ListExercisePanel>
                    
                    <div className='knowledgePanel col-3'>
                        knowledgePanel
                        {this.state.knowledgePanel}
                    </div>
            </div>

            
        </div>)
    }

}

export default MainArea;