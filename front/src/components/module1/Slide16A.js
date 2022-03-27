import React, {Component} from "react";
import Slide15A from "./Slide15A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import { Wheel } from 'react-custom-roulette'

const data = [
    { option: '0', style: { backgroundColor: 'red', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '2' },
  ]
class Slide16A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide15A mainArea={this.mainArea}></Slide15A>
        this.next = null
        this.title = 'Elementarny algorytm genetyczny - ruletka'
        this.state = {
            start_spin: false,
            wal_win:0, 
        }
        this.navigationButtons = React.createRef()
        this.wheel = React.createRef()
    }


    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.navigationButtons.current.enableNavigationButtons()
            this.setState({start_spin:false})
            
        }
        else {
            const newPrizeNumber = Math.floor(Math.random() * data.length)
            console.log(newPrizeNumber)
            this.setState({wal_win: newPrizeNumber})
            this.setState({start_spin:true})
        }
        
    }
    
    render() {
 
        return(
        <div>
            <h1>{this.title}</h1>
            <div>
            <Wheel
                mustStartSpinning={this.state.start_spin}
                prizeNumber={this.state.wal_win}
                data={data}
                backgroundColors={['#3e3e3e', '#df3428']}
                textColors={['#ffffff']}
                onStopSpinning={() => {
                    this.handleStartStop(true)
                }}
                />
                
            </div>

            <NavigationButtons 
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={5}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide16A;