import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide14A from "./Slide14A";
import Slide15A from "./Slide15A";
import Description16 from "./Description16";
import Description14 from "./Description14";
var Latex = require('react-latex');


class Description15_SmallIndividual extends Component {
    render() {
        
        return (
            <svg width="40" height="40" style={{margin: 5}}>
                <rect width="40" height="40" style={{fill:'rgb(230,230,230)', strokeWidth: 6, stroke: 'rgb(0,0,0)'}} />
                <text x="15" y="25" fill="black">{this.props.number}</text>
            </svg>
        )
    }
}

class Description15 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide14A prev={<Description14></Description14>} next={<Description15></Description15>} mainArea={this.mainArea}></Slide14A>;
        this.next = <Slide15A prev={<Description15></Description15>} next={<Description16></Description16>} mainArea={this.mainArea}></Slide15A>
        this.title = 'Elementarny algorytm genetyczny - animacja'

        this.navigationButtons = React.createRef();
    }

    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>

            <h5>
            Na kolejnym slajdzie przedstawiono animowany schemat podstawowego algorytmu genetycznego.<br></br><br></br>
            Cechy populacji początkowej:<br></br><br></br>
            <Description15_SmallIndividual number={1}/>
            <Description15_SmallIndividual number={2}/>
            <Description15_SmallIndividual number={3}/>
            <Description15_SmallIndividual number={4}/>
            <Description15_SmallIndividual number={5}/>
            <Description15_SmallIndividual number={6}/>
            <ul>
                <li>6 osobników (oznaczonych przez liczby wpisane w kwadraty)</li>
                <li>zadane prawdopodobieństwo krzyżowania <Latex>{"${p_k}$"}</Latex></li>
                <li>zadane prawdopodobieństwo mutacji <Latex>{"${p_m}$"}</Latex></li>
            </ul>

            Animacja trwa w nieskończoność. Można wstrzymać ewolucję populacji przyciskiem spacji lub klikając przycisk pauzy.<br></br><br></br>
            Jeśli dochodzi do krzyżowania osobników, sąsiednie kwadraty stykają się ze sobą, tworząc potomków z nowymi numerami.<br></br><br></br>
            Jeśli dochodzi do mutacji osobnika, przejawia się ona przez zmianę koloru numeru w danym kwadracie.<br></br><br></br>
            Zielony, zaokrąglony prostokąt przesuwa się po schemacie blokowym i pokazuje, który w danej chwili trwa etap algorytmu genetycznego.<br></br><br></br>

            </h5>

            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={9}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description15