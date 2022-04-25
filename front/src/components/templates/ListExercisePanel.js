import React, {Component} from "react";
import InListButton from "./InListButton";
import Slide11T from "../module1/Slide11T";
import Slide110A from "../module1/Slide110A";
import Slide21Q from "../module2/Slide21Q";
import Slide31A from "../module3/Slide31A";
import Slide41A from "../module4/Slide41A";
import Slide51A from "../module5/Slide51A";

// TODO: increase below globals whenever you add new slides to module
export let MODULE_1_SLIDES_COUNT = 13;
export let MODULE_2_SLIDES_COUNT = 10;
export let MODULE_3_SLIDES_COUNT = 10;
export let MODULE_4_SLIDES_COUNT = 10;
export let MODULE_5_SLIDES_COUNT = 10;

class ListExercisePanel extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
    }
    render(){
        this.module1 = <Slide11T mainArea={this.mainArea}></Slide11T>
        this.module2 = <Slide21Q mainArea={this.mainArea}></Slide21Q>
        this.module3 = <Slide31A mainArea={this.mainArea}></Slide31A> // TODO: proper slides to initialize module
        this.module4 = <Slide41A mainArea={this.mainArea}></Slide41A>
        this.module5 = <Slide51A mainArea={this.mainArea}></Slide51A>

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