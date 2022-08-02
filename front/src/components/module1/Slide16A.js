import React, {Component} from "react";
import NavigationButtonsAllDisabled from "../templates/NavigationButtonsAllDisabled";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import { Wheel } from 'react-custom-roulette'
import Description16 from "./Description16";

const data = [
    { option: '0', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '0', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '0', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '0', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '0', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'crimson', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'DarkBlue', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'DarkBlue', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'DarkBlue', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'DarkGreen', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'DarkGreen', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'DarkGreen', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'DarkGreen', textColor: 'white' } },
    { option: '5', style: { backgroundColor: 'DarkOrchid', textColor: 'white' } },
    { option: '5', style: { backgroundColor: 'DarkOrchid', textColor: 'white' } },
    { option: '5', style: { backgroundColor: 'DarkOrchid', textColor: 'white' } },
    { option: '6', style: { backgroundColor: 'DarkSlateBlue', textColor: 'white' } },
    { option: '6', style: { backgroundColor: 'DarkSlateBlue', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'OrangeRed', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'OrangeRed', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'OrangeRed', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'OrangeRed', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'OrangeRed', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'OrangeRed', textColor: 'white' } },
]


class Slide16A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description16 mainArea={this.mainArea}></Description16>;
        this.next = null;
        this.title = 'Podstawowe operacje algorytmów - selekcja (ruletkowa)'
        this.state = {
            start_spin: false,
            wal_win:0,
            przystosowanie:[140,56,28,84,112,82,55,168],
            procent:[20,8.3,4,12,16,11.7,7.8,24 ],
            obliczony_element: -1
        }
        this.navigationButtons = React.createRef()
        this.wheel = React.createRef()
    }


    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.navigationButtons.current.enableAllButtons()
            this.setState({start_spin:false})
           this.setState({obliczony_element:this.state.wal_win})
           console.log(this.state.obliczony_element)
            // tmp_przystosowanie[this.state.obliczony_element] = this.state.wal_win
            // this.setState({przystosowanie: tmp_przystosowanie})
            // if(this.state.obliczony_element > 1){
            //     let suma = this.state.przystosowanie.reduce((partialSum, a) => partialSum + a, 0)
            //     let procenty = [0,0,0]
            //     for (var i = 0; i < 3; i++) {
            //         procenty[i] = (this.state.przystosowanie[i]/suma)*100
            //      }
            //     this.setState({procent: procenty})
            // }
            // this.setState({obliczony_element: this.state.obliczony_element+1})
            
        }
        else {
            this.navigationButtons.current.disableAllButtons()
            this.setState({obliczony_element: -1})
            // if(this.state.obliczony_element > 2){
            //     this.setState({obliczony_element: 0})
            //     this.setState({przystosowanie: [0,0,0]})
            //     this.setState({procent: [0,0,0]})
            // }
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
            <div style={{float:"left"}}>
            <Wheel
                mustStartSpinning={this.state.start_spin}
                prizeNumber={this.state.wal_win}
                data={data}
                radiusLineWidth={0}
                backgroundColors={['#3e3e3e', '#df3428']}
                textColors={['#ffffff']}
                onStopSpinning={() => {
                    this.handleStartStop(true)
                }}
                />
                
            </div>
            <div>
                <table style={{textAlign:"center"}} class="styled-table" >
                    <tr>
                        <td>Obiekt</td> <td>Przystosowanie</td> <td>%</td>
                    </tr>
                    {
                        this.state.obliczony_element>-1 && this.state.obliczony_element<5 ? 
                        <tr style={{backgroundColor:'red'}}>
                            <td>Obiekt 0  </td> <td>{this.state.przystosowanie[0]}</td> <td>{this.state.procent[0]}</td>
                        </tr>:
                        <tr style={{}}>
                        <td>Obiekt 0  </td> <td>{this.state.przystosowanie[0]}</td> <td>{this.state.procent[0]}</td>
                        </tr>
                    }
                    {this.state.obliczony_element>=5 && this.state.obliczony_element<7 ? 
                    <tr style={{backgroundColor:'red'}}>
                    <td>Obiekt 1  </td> <td>{this.state.przystosowanie[1]}</td> <td>{this.state.procent[1]}</td>
                    </tr>:
                    <tr>
                        <td>Obiekt 1  </td> <td>{this.state.przystosowanie[1]}</td> <td>{this.state.procent[1]}</td>
                    </tr>}

                    {this.state.obliczony_element>=7 && this.state.obliczony_element<8 ?
                    <tr style={{backgroundColor:'red'}}>
                    <td>Obiekt 2  </td> <td>{this.state.przystosowanie[2]}</td> <td>{this.state.procent[2]}</td>
                    </tr>:
                    <tr>
                        <td>Obiekt 2  </td> <td>{this.state.przystosowanie[2]}</td> <td>{this.state.procent[2]}</td>
                    </tr>}

                    {this.state.obliczony_element>=8 && this.state.obliczony_element<11 ?
                    <tr style={{backgroundColor:'red'}}>
                    <td>Obiekt 3  </td> <td>{this.state.przystosowanie[3]}</td> <td>{this.state.procent[3]}</td>
                    </tr>:
                    <tr>
                        <td>Obiekt 3  </td> <td>{this.state.przystosowanie[3]}</td> <td>{this.state.procent[3]}</td>
                    </tr>}

                    {this.state.obliczony_element>=11 && this.state.obliczony_element<15 ?
                    <tr style={{backgroundColor:'red'}}>
                    <td>Obiekt 4  </td> <td>{this.state.przystosowanie[4]}</td> <td>{this.state.procent[4]}</td>
                    </tr>:
                    <tr>
                        <td>Obiekt 4  </td> <td>{this.state.przystosowanie[4]}</td> <td>{this.state.procent[4]}</td>
                    </tr>}

                    {this.state.obliczony_element>=15 && this.state.obliczony_element<18 ?
                    <tr style={{backgroundColor:'red'}}>
                    <td>Obiekt 5  </td> <td>{this.state.przystosowanie[5]}</td> <td>{this.state.procent[5]}</td>
                    </tr>:
                    <tr>
                        <td>Obiekt 5  </td> <td>{this.state.przystosowanie[5]}</td> <td>{this.state.procent[5]}</td>
                    </tr>}

                    {this.state.obliczony_element>=18 && this.state.obliczony_element<20 ?
                    <tr style={{backgroundColor:'red'}}>
                    <td>Obiekt 6  </td> <td>{this.state.przystosowanie[6]}</td> <td>{this.state.procent[6]}</td>
                    </tr>:
                    <tr>
                        <td>Obiekt 6 </td> <td>{this.state.przystosowanie[6]}</td> <td>{this.state.procent[6]}</td>
                    </tr>}

                    {this.state.obliczony_element>=20 && this.state.obliczony_element<25 ?
                    <tr style={{backgroundColor:'red'}}>
                    <td>Obiekt 7  </td> <td>{this.state.przystosowanie[7]}</td> <td>{this.state.procent[7]}</td>
                    </tr>:
                    <tr>
                        <td>Obiekt 7  </td> <td>{this.state.przystosowanie[7]}</td> <td>{this.state.procent[7]}</td>
                    </tr>}
                </table>
            </div>
            <NavigationButtonsAllDisabled 
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={12}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={() => {this.handleStartStop(false)}}
            ></NavigationButtonsAllDisabled>
        </div>
        )
    }

}

export default Slide16A;