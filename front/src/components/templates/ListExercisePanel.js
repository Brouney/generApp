import React, {Component} from "react";
import InListButton from "./InListButton";
import Slide11T from "../module1/Slide11T";
import Slide13T from "../module1/Slide13T";
import Slide21Q from "../module2/Slide21Q";

// TODO: increase below globals whenever you add new slides to module
export let MODULE_1_SLIDES_COUNT = 6;
export let MODULE_2_SLIDES_COUNT = 1;
export let MODULE_3_SLIDES_COUNT = 1;
export let MODULE_4_SLIDES_COUNT = 1;
export let MODULE_5_SLIDES_COUNT = 1;

class ListExercisePanel extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
    }
    render(){
        this.module1 = <Slide11T mainArea={this.mainArea}></Slide11T>
        this.module2 = <Slide21Q mainArea={this.mainArea}></Slide21Q>
        this.module3 = <Slide21Q mainArea={this.mainArea}></Slide21Q> // TODO: proper slides to initialize module
        this.module4 = <Slide21Q mainArea={this.mainArea}></Slide21Q>
        this.module5 = <Slide21Q mainArea={this.mainArea}></Slide21Q>

        return(
        <div className='ListExercisePanel col-3' align="center">

            <InListButton list={this} mainArea={this.mainArea} text={'Algorytmy genetyczne\njako metoda optymalizacji'} knowledgePanel={this.module1}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text={'Podstawy matematyczne\nalgorytmów genetycznych'} knowledgePanel={this.module2}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text="Operatory selekcji" knowledgePanel={this.module3}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text="Metody krzyżowania i mutacji" knowledgePanel={this.module4}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text="Techniki zabezpieczające" knowledgePanel={this.module5}></InListButton>
            
        </div>)
    }

}

export default ListExercisePanel;