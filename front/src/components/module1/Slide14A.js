import React, {Component} from "react";
import Slide13T from "./Slide13T";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import QuizTemplate from "../templates/QuizTemplate";
import BackpackProblem from "../templates/BackpackProblem";
import { Progress } from "antd";

class Slide14A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide13T mainArea={this.mainArea}></Slide13T>
        this.next = null
        this.state = {
            backpackCurrentWeight: 0
        }
    }

    render(){
        return(
            <div>
                <h1>Moduł 1 Slajd 4</h1>
                <h2>Pamiętaj, aby nie przekroczyć 100. O to chodzi w problemie plecakowym</h2>
                <Progress type="circle" percent={this.state.backpackCurrentWeight} format={backpackCapacity => `${backpackCapacity}/100`} />
                <BackpackProblem parent={this}></BackpackProblem>
                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide14A;