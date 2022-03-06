import React, {Component} from "react";


class KnowledgePanel extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
    }
    render(){
        return(
            <div className='KnowledgePanel'>
                <h1>Witamy w GenerApp!</h1>
            </div>)
    }
}

export default KnowledgePanel;