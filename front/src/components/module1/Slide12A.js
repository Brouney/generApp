import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import BackpackProblem from "../templates/BackpackProblem";
import { Progress } from "antd";
import Description12 from "./Description12";
import Description13 from "./Description13";

class Slide12A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description12 mainArea={this.mainArea}></Description12>;
        this.next = <Description13 mainArea={this.mainArea}></Description13>;
        this.title = 'Tradycyjne metody poszukiwania - metody enumeratywne (przeglądowe)'
        this.state = {
            backpackCurrentWeight: 0,
            backpackCurrentValues:0,
        }
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>
                <h2>Pamiętaj, aby nie przekroczyć wagi 100 - kółko z kolorem niebieskim, jednocześnie z największą liczbą wartości - kółko fioletowe.</h2>
                <Progress type="circle" percent={this.state.backpackCurrentWeight} format={backpackCapacity => `${backpackCapacity}/100`} />
                <Progress type="circle" strokeColor={"purple"} percent={this.state.backpackCurrentValues} format={backpackCapacity => `${backpackCapacity}/100`} />
                <BackpackProblem parent={this}></BackpackProblem>

                <NavigationButtons
                    mainArea={this.mainArea}
                    prev={this.prev}
                    next={this.next}
                    currentSlideCounter={4}
                    slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                    hiddenStartStopButton={true}
                    current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide12A;