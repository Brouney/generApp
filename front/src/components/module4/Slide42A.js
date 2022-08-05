import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide43A from "./Slide43A";
import Slide41A from "./Slide41A";

class Slide42A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide41A mainArea={this.mainArea}></Slide41A>;
        this.next = <Slide43A prev={<Slide42A></Slide42A>} mainArea={this.mainArea}></Slide43A>
        this.title = 'Krzyżowanie proste (dwupunktowe) - Piotr'

        this.navigationButtons = React.createRef()

        this.state = {
            crossLeft: 3,
            crossRight: 6,
        }
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.navigationButtons.current.enableAllButtons()
            
        }
        else {

        }
        
    }

    changeValueInComponentLeft = (evt) => {
        let value = evt.target.value;
        value = isNaN(value) ? 3 : value > 10 ? 0 : value;
        this.setState({crossLeft: value});
    }

    changeValueInComponentRight = (evt) => {
        let value = evt.target.value;
        value = isNaN(value) ? 6 : value > 10 ? 5 : value;
        this.setState({crossRight: value});
    }

    blueVioletTD = (value) =>{
        return <td style={{fontSize:"50px", color:"blueviolet"}}>{value}</td>
    }

    coralTD = (value) =>{
        return <td style={{fontSize:"50px", color:"coral"}}>{value}</td>
    }

    render(){
        
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
                <input style={{background:"black",fontSize:"30px" } } type={"text"} size={"50"} className="input_Slide41A" value={this.state.crossLeft} onChange={evt =>this.changeValueInComponentLeft(evt)} ></input>
                <input style={{background:"black",fontSize:"30px" } } type={"text"} size={"50"} className="input_Slide41A" value={this.state.crossRight} onChange={evt =>this.changeValueInComponentRight(evt)} ></input>
                <table  >
                    <tr >
                        <td style={{fontSize:"50px"}}>A1 =</td> 
                        {this.blueVioletTD(1)}
                        {this.blueVioletTD(0)}
                        {this.blueVioletTD(0)}
                        {this.blueVioletTD(1)}
                        {this.blueVioletTD(1)}
                        {this.blueVioletTD(0)}
                        {this.blueVioletTD(0)}
                        {this.blueVioletTD(0)}
                        {this.blueVioletTD(1)}
                        {this.blueVioletTD(1)}
                    </tr>
                    <tr>
                        <td style={{fontSize:"50px"}}>A2 =  </td> 
                        <td style={{fontSize:"50px", color:"coral"}}>0</td>
                         <td style={{fontSize:"50px", color:"coral"}}>1</td>
                         <td style={{fontSize:"50px", color:"coral"}}>0</td>
                         <td style={{fontSize:"50px", color:"coral"}}>1</td>
                         <td style={{fontSize:"50px", color:"coral"}}>0</td>
                         <td style={{fontSize:"50px", color:"coral"}}>0</td>
                         <td style={{fontSize:"50px", color:"coral"}}>1</td>
                         <td style={{fontSize:"50px", color:"coral"}}>0</td>
                         <td style={{fontSize:"50px", color:"coral"}}>1</td>
                         <td style={{fontSize:"50px", color:"coral"}}>0</td>
                    </tr>
                    <tr >
                        <td style={{fontSize:"50px"}}>A`1=</td>
                         {this.state.crossLeft >= 1?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                         {this.state.crossLeft >= 2?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>1</td> }
                         {this.state.crossLeft >= 3?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                         {this.state.crossLeft >= 4?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>1</td> }
                         {this.state.crossLeft >= 5?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }

                         {this.state.crossLeft >= 6?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                         {this.state.crossLeft >= 7?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>1</td> }
                         {this.state.crossLeft >= 8?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                         {this.state.crossLeft >= 9?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>1</td> }
                         {this.state.crossLeft >= 10?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                        
                    </tr>
                    <tr>
                        <td style={{fontSize:"50px"}}>A`2=  </td> 
                        {this.state.crossLeft >= 1?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }
                        {this.state.crossLeft >= 2?<td style={{fontSize:"50px", color:"coral"}}>1</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.crossLeft >= 3?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.crossLeft >= 4?<td style={{fontSize:"50px", color:"coral"}}>1</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }
                        {this.state.crossLeft >= 5?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }

                        {this.state.crossLeft >= 6?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.crossLeft >= 7?<td style={{fontSize:"50px", color:"coral"}}>1</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.crossLeft >= 8?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.crossLeft >= 9?<td style={{fontSize:"50px", color:"coral"}}>1</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }
                        {this.state.crossLeft >= 10?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }
                         
                    </tr>
                </table>

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide42A;