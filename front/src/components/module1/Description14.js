import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide13T from "./Slide13T";
import Slide14A from "./Slide14A";
import Description13 from "./Description13";
import { Button } from 'antd';

class Description14 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide13T prev={<Description13></Description13>} next={<Description14></Description14>} mainArea={this.mainArea}></Slide13T>;
        this.next = <Slide14A prev={<Description14></Description14>} next={<Description14></Description14>} mainArea={this.mainArea}></Slide14A>
        this.title = 'Różnice między algorytmami genetycznymi i metodami tradycyjnymi - puzzle'

        this.navigationButtons = React.createRef();
    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h3>Dopasuj cechy do odpowiedniej rubryki - Algorytmy genetyczne lub metody tradycyjne.</h3>
            <h3>W momencie, gdy wszystkie cechy zostaną odpowiednio umieszczone, <br></br><br></br>wtedy czerwony przycisk <Button type="primary" danger >Dopasuj poprawnie</Button><br></br><br></br>
zmienia swój kolor na niebieski. <Button type="primary" >Wszystko poprawnie dopasowane</Button></h3>

            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={7}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Description14