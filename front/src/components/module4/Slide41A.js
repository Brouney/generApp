import React, { Component } from "react";
import { MODULE_4_SLIDES_COUNT } from "../templates/ListExercisePanel";
import NavigationButtons from "../templates/NavigationButtons";
import Slide42A from "./Slide42A";
import Slide43A from "./Slide43A";



class Slide41A extends Component {

    constructor(props){
        super(props);
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide42A prev={<Slide41A></Slide41A>} next={<Slide43A></Slide43A>} mainArea={this.mainArea}></Slide42A>;
        this.title = 'Krzyżowanie proste (jednopunktowe)'
        this.navigationButtons = React.createRef()

        this.state = {
            cross: 3
        }
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            this.navigationButtons.current.enableAllButtons()
            
        }
        else {

        }
        
    }

    changeValueInComponent = (evt) => {
        let value = evt.target.value;
        value = isNaN(value) ? 6 : value > 10 ? 0 : value;
        this.setState({cross: value});
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
                <input style={{background:"black",fontSize:"30px" } } type={"text"} size={"50"} className="input_Slide41A" value={this.state.cross} onChange={evt =>this.changeValueInComponent(evt)} ></input>
                <table  >
                    <tr >
                        <td style={{fontSize:"50px"}}>A1 =</td> 
                        <td style={{fontSize:"50px", color:"blueviolet"}}>1</td> 
                         <td style={{fontSize:"50px", color:"blueviolet"}}>0</td>
                         <td style={{fontSize:"50px", color:"blueviolet"}}>0</td>
                         <td style={{fontSize:"50px", color:"blueviolet"}}>1</td>
                         <td style={{fontSize:"50px", color:"blueviolet"}}>1</td>
                         <td style={{fontSize:"50px", color:"blueviolet"}}>0</td>
                         <td style={{fontSize:"50px", color:"blueviolet"}}>0</td>
                         <td style={{fontSize:"50px", color:"blueviolet"}}>0</td>
                         <td style={{fontSize:"50px", color:"blueviolet"}}>1</td>
                         <td style={{fontSize:"50px", color:"blueviolet"}}>1</td>
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
                         {this.state.cross >= 1?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                         {this.state.cross >= 2?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>1</td> }
                         {this.state.cross >= 3?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                         {this.state.cross >= 4?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>1</td> }
                         {this.state.cross >= 5?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }

                         {this.state.cross >= 6?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                         {this.state.cross >= 7?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>1</td> }
                         {this.state.cross >= 8?<td style={{fontSize:"50px", color:"blueviolet"}}>0</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                         {this.state.cross >= 9?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>1</td> }
                         {this.state.cross >= 10?<td style={{fontSize:"50px", color:"blueviolet"}}>1</td>:<td style={{fontSize:"50px", color:"coral"}}>0</td> }
                        
                    </tr>
                    <tr>
                        <td style={{fontSize:"50px"}}>A`2=  </td> 
                        {this.state.cross >= 1?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }
                        {this.state.cross >= 2?<td style={{fontSize:"50px", color:"coral"}}>1</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.cross >= 3?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.cross >= 4?<td style={{fontSize:"50px", color:"coral"}}>1</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }
                        {this.state.cross >= 5?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }

                        {this.state.cross >= 6?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.cross >= 7?<td style={{fontSize:"50px", color:"coral"}}>1</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.cross >= 8?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>0</td> }
                        {this.state.cross >= 9?<td style={{fontSize:"50px", color:"coral"}}>1</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }
                        {this.state.cross >= 10?<td style={{fontSize:"50px", color:"coral"}}>0</td>:<td style={{fontSize:"50px", color:"blueviolet"}}>1</td> }
                         
                    </tr>
                </table>
                <NavigationButtons
                    ref={this.navigationButtons}
                    mainArea={this.mainArea} 
                    prev={this.prev} 
                    next={this.next} 
                    currentSlideCounter={1} 
                    slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                    current={this}
                    onStartStop={this.handleStartStop}
                ></NavigationButtons>
            </div>
        )
    }
}

export default Slide41A

