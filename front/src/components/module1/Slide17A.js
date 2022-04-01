import React, { Component } from "react";
import { MODULE_1_SLIDES_COUNT } from "../templates/ListExercisePanel";
import NavigationButtons from "../templates/NavigationButtons";
import Slide16A from "./Slide16A";


class Slide17A extends Component {

    constructor(props){
        super(props);
        this.mainArea = props.mainArea
        this.prev = <Slide16A mainArea={this.mainArea}></Slide16A>
        this.next = null
        this.title = 'Krzyżowanie proste (jednopunktowe) '
        this.navigationButtons = React.createRef()
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.navigationButtons.current.enableAllButtons()
            
        }
        else {

        }
        
    }
    render() {
        return(
            <div>
                <h1>{this.title}</h1>
                <h2>
                    • Losowo wybieramy z populacji parę osobników do krzyżowania
                </h2>
                <h2>
                    • Losowo wybieramy miejsce krzyżowania. Dla ciągów k-pozycyjnych mamy k-1 możliwości
                </h2>
                <h2>
                    • Jeśli miejsce krzyżowania to n, wymieniamy miejscami bity od pozycji n+1 do końca ciągu
                </h2>
                <NavigationButtons
                    ref={this.navigationButtons}
                    mainArea={this.mainArea} 
                    prev={this.prev} 
                    next={this.next} 
                    currentSlideCounter={7} 
                    slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                    current={this}
                    onStartStop={this.handleStartStop}
                ></NavigationButtons>
            </div>
        )
    }
}

export default Slide17A

