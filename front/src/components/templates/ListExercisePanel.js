import React, {Component} from "react";
import InListButton from "./InListButton";
import Slide41A from "../module4/Slide41A";
import Slide51A from "../module5/Slide51A";
import Description11 from "../module1/Description11";
import Description20 from "../module2/Description20";
import Description31 from "../module3/Description31";

// TODO: increase below globals whenever you add new slides to module
export let MODULE_1_SLIDES_COUNT = 12;
export let MODULE_2_SLIDES_COUNT = 14;
export let MODULE_3_SLIDES_COUNT = 8;
export let MODULE_4_SLIDES_COUNT = 6;
export let MODULE_5_SLIDES_COUNT = 1;

class ListExercisePanel extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
    }
    render(){
        this.module1 = <Description11 mainArea={this.mainArea}></Description11>
        this.module2 = <Description20 mainArea={this.mainArea}></Description20>
        this.module3 = <Description31 mainArea={this.mainArea}></Description31>
        this.module4 = <Slide41A mainArea={this.mainArea}></Slide41A>
        this.module5 = <Slide51A mainArea={this.mainArea}></Slide51A>

        return(
        <div className='ListExercisePanel col-3' align="center">

            <InListButton list={this} mainArea={this.mainArea} text={'Algorytmy genetyczne\njako metoda optymalizacji'} knowledgePanel={this.module1}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text={'Podstawy matematyczne\nalgorytmów genetycznych'} knowledgePanel={this.module2}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text="Operatory selekcji" knowledgePanel={this.module3}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text="Metody krzyżowania" knowledgePanel={this.module4}></InListButton>
            <InListButton list={this} mainArea={this.mainArea} text={'Strojenie\noperatorów\ngenetycznych'} knowledgePanel={this.module5}></InListButton>
            
        </div>)
    }

}

export default ListExercisePanel;