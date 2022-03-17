import React, {Component} from "react";
import Slide12A from "./Slide12A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import QuizTemplate from "../templates/QuizTemplate";
import BackpackProblem from "../templates/BackpackProblem";
import { Progress } from "antd";

class Slide14A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide12A mainArea={this.mainArea}></Slide12A>;
        this.next = null   
        this.quizTemplate = React.createRef()
        this.state = {
            percent: 0
        }
    }
    


    render(){
        return(
        <div>
            <h1>Moduł 1 Slajd 4</h1>
            
            <Progress type="circle" percent={this.state.percent} format={percent => `${percent}/100`} />
            <BackpackProblem parent={this}></BackpackProblem>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide14A;