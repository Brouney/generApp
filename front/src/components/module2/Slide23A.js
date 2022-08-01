import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import ParameterComponent111A from "../module1/ParameterComponent111A";
import Description23 from "./Description23";
import Description24 from "./Description24";
var Latex = require('react-latex');

class Slide23A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Description23 mainArea={this.mainArea}></Description23>
        this.next = <Description24 prev={<Slide23A></Slide23A>} mainArea={this.mainArea}></Description24>
        this.title = 'Standardowe kodowanie dowolnej liczby na N bitach'

        this.addParameter = React.createRef();
        this.deleteParameter = React.createRef();

        this.state = {
            parameters: [
                <ParameterComponent111A Umax={7} bity={3}/>,
                <ParameterComponent111A Umax={15} bity={4}/>,
                <ParameterComponent111A Umax={31} bity={5}/>,
            ]
        }
    }

    onClickAddParameter = () => {
        this.setState(prevState => ({
            parameters: [...prevState.parameters, <ParameterComponent111A Umax={15} bity={4}/>]
        }))
    }

    onClickDeleteParameter = () => {
        var parametersAfterDeletion = [...this.state.parameters];
        var lastElement = parametersAfterDeletion.length-1

        parametersAfterDeletion.splice(parametersAfterDeletion[lastElement], 1);
        this.setState({parameters: parametersAfterDeletion});
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>
                <div className="row">
                    <div className="col-3">
                    <h4>
                        {/* <Latex>{"${\\left\\{\\begin{matrix}  \\end{matrix}\\right.}$"}</Latex> */}
                        <div style={{margin: "20px"}}><Latex>{"$${x = \\frac{u - U_{min}}{U_{max} - U_{min}}(2^l - 1)}$$"}</Latex><br></br></div>
                        <div style={{margin: "20px"}}><Latex>{"${u = U_{min} + \\frac{U_{max} - U_{min}}{2^l - 1}x}$"}</Latex></div>
                        <div style={{margin: "20px"}}><Latex>{"${U_{min} \\le u \\le U_{max}}$"}</Latex></div>
                        <div style={{margin: "20px"}}>gdzie: <br></br></div>
                        <div style={{margin: "2px"}}><Latex>{"${x}$"}</Latex> - zakodowana postać liczby,</div>
                        <div style={{margin: "2px"}}><Latex>{"${u}$"}</Latex> - kodowana liczba,</div>
                        <div style={{margin: "2px"}}><Latex>{"${l}$"}</Latex> - liczba bitów</div>
                    </h4>
                    </div>
                    <div className="col">
                    <button ref={ref => this.addParameter = ref} type="submit" className="btn btn-success col-2 m-1" onClick={this.onClickAddParameter}>Dodaj parametr</button>
                    <button ref={ref => this.deleteParameter = ref} type="submit" className="btn btn-warning col-2 m-1" onClick={this.onClickDeleteParameter}>Usuń parametr</button>
                    </div>
                </div>

                <div className="col-8" style={{textAlign:"center"}}><h3>PARAMETRY</h3></div>
                <ol>
                    {this.state.parameters.map(component => component)}
                </ol>

                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={8} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide23A;