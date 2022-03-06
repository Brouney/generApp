import React, {Component} from "react";
import ListExercisePanel from './templates/ListExercisePanel'
import KnowledgePanel from './templates/KnowledgePanel'

class MainArea extends Component {

    constructor(props){
        super(props)

        this.state = {
            knowledgePanel: <KnowledgePanel></KnowledgePanel>
        }
    }
    render(){
        return(
        <div className='mainArea'>
            <div className="row">
                    <ListExercisePanel mainArea={this}> </ListExercisePanel>

                    <div className='KnowledgePanel col-9'>
                        {this.state.knowledgePanel}
                    </div>
            </div>
            
        </div>)
    }

}

export default MainArea;