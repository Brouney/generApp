import React, {Component} from "react";
import Slide11T from "./Slide11T";
import Slide13T from "./Slide13T";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import BackpackProblem from "../templates/BackpackProblem";
import { Progress } from "antd";

class Slide12A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide11T mainArea={this.mainArea}></Slide11T>
        this.next = <Slide13T prev={<Slide12A></Slide12A>} mainArea={this.mainArea}></Slide13T>
        this.title = 'Tradycyjne metody poszukiwania - metody enumeratywne (przeglądowe)'
        this.state = {
            backpackCurrentWeight: 0
        }
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>
                <h2>Pamiętaj, aby nie przekroczyć 100. O to chodzi w problemie plecakowym</h2>
                <Progress type="circle" percent={this.state.backpackCurrentWeight} format={backpackCapacity => `${backpackCapacity}/100`} />
                <BackpackProblem parent={this}></BackpackProblem>
                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide12A;