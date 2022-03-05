import React, {Component} from "react";
import Login from "../login/login";
import MainArea from "./MainArea";
import '../css/App.css';

class StartArea extends Component {

    constructor(props){
        super(props)
        this.state = {
            token : undefined
        }
        this.userLogin = React.createRef();
    }

    render(){
        return (
        <div className='startArea'>
            {this.state.token === undefined
                ? <Login userLogin={this.userLogin} area={this}></Login>
                : <MainArea></MainArea>
            }
        </div>)
        
    }

}

export default StartArea;