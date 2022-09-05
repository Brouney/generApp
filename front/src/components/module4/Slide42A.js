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
        this.title = 'Krzyżowanie proste (dwupunktowe)'

        this.navigationButtons = React.createRef()

        this.state = {
            crossLeft: 3,
            crossRight: 5,
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
        value = isNaN(value) ? this.state.crossRight-1 : value > 10 ? 0 : value < this.state.crossRight ? value : this.state.crossRight-1;
        this.setState({crossLeft: value});
    }

    changeValueInComponentRight = (evt) => {
        let value = evt.target.value;
        value = isNaN(value) ? this.state.crossLeft+1 : value > 10 ? 5 : value > this.state.crossLeft ? value : this.state.crossLeft+1;
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
                • Losowo wybieramy 2  miejsca krzyżowania. Dla ciągów k-pozycyjnych mamy k-1 możliwości
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
                        {this.coralTD(0)}
                        {this.coralTD(1)}
                         {this.coralTD(0)}
                         {this.coralTD(1)}
                         {this.coralTD(0)}
                         {this.coralTD(0)}
                         {this.coralTD(1)}
                         {this.coralTD(0)}
                         {this.coralTD(1)}
                         {this.coralTD(0)}
                    </tr>
                    <tr >
                        <td style={{fontSize:"50px"}}>A`1=</td>
                         {this.state.crossLeft >= 1 || 1 >= this.state.crossRight ? this.blueVioletTD(1) : this.coralTD(0) }
                         {this.state.crossLeft >= 2 || 2 >= this.state.crossRight ? this.blueVioletTD(0) : this.coralTD(1) }
                         {this.state.crossLeft >= 3 || 3 >= this.state.crossRight ? this.blueVioletTD(0) : this.coralTD(0) }
                         {this.state.crossLeft >= 4 || 4 >= this.state.crossRight ? this.blueVioletTD(1) : this.coralTD(1) }
                         {this.state.crossLeft >= 5 || 5 >= this.state.crossRight ? this.blueVioletTD(1) : this.coralTD(0) }

                         {this.state.crossLeft >= 6  || 6 >= this.state.crossRight ? this.blueVioletTD(0) : this.coralTD(0) }
                         {this.state.crossLeft >= 7 || 7 >= this.state.crossRight ? this.blueVioletTD(0) : this.coralTD(1) }
                         {this.state.crossLeft >= 8 || 8 >= this.state.crossRight ? this.blueVioletTD(0) : this.coralTD(0) }
                         {this.state.crossLeft >= 9 || 9 >= this.state.crossRight ? this.blueVioletTD(1) : this.coralTD(1) }
                         {this.state.crossLeft >= 10 || 10 >= this.state.crossRight ? this.blueVioletTD(1) : this.coralTD(0) }
                        
                    </tr>
                    <tr>
                        <td style={{fontSize:"50px"}}>A`2=  </td> 
                        {this.state.crossLeft >= 1 || 1 >= this.state.crossRight? this.coralTD(0) : this.blueVioletTD(1) }
                        {this.state.crossLeft >= 2 || 2 >= this.state.crossRight? this.coralTD(1) : this.blueVioletTD(0) }
                        {this.state.crossLeft >= 3 || 3 >= this.state.crossRight? this.coralTD(0) : this.blueVioletTD(0) }
                        {this.state.crossLeft >= 4 || 4 >= this.state.crossRight? this.coralTD(1) : this.blueVioletTD(1) }
                        {this.state.crossLeft >= 5 || 5 >= this.state.crossRight? this.coralTD(0) : this.blueVioletTD(1) }

                        {this.state.crossLeft >= 6 || 6 >= this.state.crossRight? this.coralTD(0) : this.blueVioletTD(0) }
                        {this.state.crossLeft >= 7 || 7 >= this.state.crossRight? this.coralTD(1) : this.blueVioletTD(0) }
                        {this.state.crossLeft >= 8 || 8 >= this.state.crossRight? this.coralTD(0) : this.blueVioletTD(0) }
                        {this.state.crossLeft >= 9 || 9 >= this.state.crossRight? this.coralTD(1) : this.blueVioletTD(1) }
                        {this.state.crossLeft >= 10 || 10 >= this.state.crossRight? this.coralTD(0) : this.blueVioletTD(1)  }
                         
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