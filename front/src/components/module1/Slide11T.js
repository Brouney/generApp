import React, {Component} from "react";
import Slide12A from "./Slide12A";
import NavigationButtons from "../templates/NavigationButtons";
import Slide13T from "./Slide13T";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import {Progress} from 'antd';
import 'antd/dist/antd.css';

class Slide11T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide12A prev={<Slide11T></Slide11T>} next={<Slide13T></Slide13T>} mainArea={this.mainArea}></Slide12A>
        this.timerId = null;

        this.incrementProgressBar = this.incrementProgressBar.bind(this);

        this.state = {
            percent : 0
        }
    }

    incrementProgressBar() {
        this.setState(prevState => {
            return {
                percent: prevState.percent + 10
            }
        });
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            clearInterval(this.timerId);
        }
        else {
            this.timerId = setInterval(() => {
                this.incrementProgressBar()
            }, 1000);
        }
    }
    

    render(){
        
        return(
        <div>
            <h1>Moduł 1 Slajd 1</h1>
            <NavigationButtons
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={1}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>
            {<Progress type="circle" percent={this.state.percent} format={percent => `${percent} czas`} />}
        </div>
        )
    }

}

export default Slide11T;