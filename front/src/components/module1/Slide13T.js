import React, {Component} from "react";
import Slide12A from "./Slide12A";
import Slide14A from "./Slide14A";
import SimulatedAnnealing13 from "./SimulatedAnnealing13";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'

class Slide13T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide12A mainArea={this.mainArea}></Slide12A>
        this.next = <Slide14A prev={<Slide13T></Slide13T>} mainArea={this.mainArea}></Slide14A>
        this.title = 'Tradycyjne metody poszukiwania - metody losowe'

        this.navigationButtons = React.createRef();
        this.simulatedAnnealing13 = React.createRef();
    }

    y = 0;
	direction = '^';

	setup = (p5, parentRef) => {
		p5.createCanvas(200, 200).parent(parentRef);
	};

	draw = (p5) => {
		p5.background(0);
		p5.fill(255, this.y * 1.3, 0);
		p5.ellipse(p5.width / 2, this.y, 50);
		if (this.y > p5.height) this.direction = '';
		if (this.y < 0) {
			this.direction = '^';
		}
		if (this.direction === '^') this.y += 8;
		else this.y -= 4;
	};

    mouseClicked = (p5) => {
    }


    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.simulatedAnnealing13.current.ballTemperature.maxFound = true
            this.navigationButtons.current.enableNavigationButtons()
        }
        else {
            this.simulatedAnnealing13.current.ballTemperature.maxFound = false
        }
        
    }
    
    render() {
        return(
        <div>
            <h1>{this.title}</h1>

            <SimulatedAnnealing13 ref={this.simulatedAnnealing13} onStartStop={this.handleStartStop}/>

            <NavigationButtons 
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={3}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide13T;