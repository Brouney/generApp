import React, {Component} from "react";
import InListButton from "./InListButton";
import Slide11T from "../module1/Slide11T";
import Slide110A from "../module2/Slide22A";
import Slide21Q from "../module2/Slide21Q";
import Slide31A from "../module3/Slide31A";
import Slide41A from "../module4/Slide41A";
import Slide51A from "../module5/Slide51A";
import Description11 from "../module1/Description11";
import Description21 from "../module2/Description21";
import Description20 from "../module2/Description20";
import Description31 from "../module3/Description31";
import Description41 from "../module4/Description41";

// TODO: increase below globals whenever you add new slides to module
export let MODULE_1_SLIDES_COUNT = 14;
export let MODULE_2_SLIDES_COUNT = 16;
export let MODULE_3_SLIDES_COUNT = 8;
export let MODULE_4_SLIDES_COUNT = 10;
export let MODULE_5_SLIDES_COUNT = 10;

class ListExercisePanel extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
    }
    render(){
        this.module1 = <Description11 mainArea={this.mainArea}></Description11>
        this.module2 = <Description20 mainArea={this.mainArea}></Description20>
        this.module3 = <Description31 mainArea={this.mainArea}></Description31> // TODO: proper slides to initialize module
        this.module4 = <Description41 mainArea={this.mainArea}></Description41>
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