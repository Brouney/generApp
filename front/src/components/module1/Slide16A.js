import React, {Component} from "react";
import Slide15A from "./Slide15A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import { Wheel } from 'react-custom-roulette'

const data = [
    { option: '0', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '5', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '6', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '8', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '9', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '10', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '11', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '12', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '13', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '14', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '15', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '16', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '17', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '18', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '19', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '20', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '21', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '22', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '23', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '24', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '25', style: { backgroundColor: 'black', textColor: 'white' } },
]


class Slide16A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide15A mainArea={this.mainArea}></Slide15A>
        this.next = null
        this.title = 'Podstawowe operacje algorytmów - selekcja (ruletkowa)'
        this.state = {
            start_spin: false,
            wal_win:0,
            przystosowanie:[0,0,0],
            procent:[0,0,0],
            obliczony_element: 0
        }
        this.navigationButtons = React.createRef()
        this.wheel = React.createRef()
    }


    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.navigationButtons.current.enableNavigationButtons()
            this.navigationButtons.current.enableStartStopButton()
            this.setState({start_spin:false})
            let tmp_przystosowanie = this.state.przystosowanie
            tmp_przystosowanie[this.state.obliczony_element] = this.state.wal_win
            this.setState({przystosowanie: tmp_przystosowanie})
            if(this.state.obliczony_element > 1){
                let suma = this.state.przystosowanie.reduce((partialSum, a) => partialSum + a, 0)
                let procenty = [0,0,0]
                for (var i = 0; i < 3; i++) {
                    procenty[i] = (this.state.przystosowanie[i]/suma)*100
                 }
                this.setState({procent: procenty})
            }
            this.setState({obliczony_element: this.state.obliczony_element+1})
            
        }
        else {
            this.navigationButtons.current.disableAllButtons()
            if(this.state.obliczony_element > 2){
                this.setState({obliczony_element: 0})
                this.setState({przystosowanie: [0,0,0]})
                this.setState({procent: [0,0,0]})
            }
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
            <div>
                <table style={{textAlign:"center"}}>
                    <tr>
                        <td>Obiekt</td> <td>Przystosowanie</td> <td>%</td>
                    </tr>
                    <tr>
                        <td>Obiekt 1  </td> <td>{this.state.przystosowanie[0]}</td> <td>{this.state.procent[0]}</td>
                    </tr>
                    <tr>
                        <td>Obiekt 2  </td> <td>{this.state.przystosowanie[1]}</td> <td>{this.state.procent[1]}</td>
                    </tr>
                    <tr>
                        <td>Obiekt 3  </td> <td>{this.state.przystosowanie[2]}</td> <td>{this.state.procent[2]}</td>
                    </tr>
                </table>
            </div>
            <NavigationButtons 
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={6}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={() => {this.handleStartStop(false)}}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide16A;