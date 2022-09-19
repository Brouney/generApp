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
                 <h3>
                    Optymalizacja polega na takim doborze przedmiotów, żeby wartość plecaka była jak największa,
                    a waga nie przekraczała zadanej wagi maksymalnej <b>(100)</b> - kółko z kolorem niebieskim, jednocześnie z największą wartością - kółko fioletowe.
                </h3>

                <div className="row">
                    <div className="col-4">
                        <Progress width={150} className="m-3" type="circle" percent={this.state.backpackCurrentWeight} format={backpackCapacity => `Waga ${backpackCapacity}/100`} />
                        <Progress width={150} className="m-3" type="circle" strokeColor={"purple"} percent={this.state.backpackCurrentValues} format={backpackCapacity => `Wartość ${backpackCapacity}/100`} />
                    </div>
                    <div className="col-8">
                        <BackpackProblem parent={this}></BackpackProblem>
                    </div>
                </div>

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