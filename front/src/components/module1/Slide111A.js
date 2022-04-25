import React, {Component} from "react";
import Slide110A from "./Slide110A";
import Slide112A from "./Slide112A";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import ParameterComponent111A from "./ParameterComponent111A";
var Latex = require('react-latex');

class Slide111A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide110A mainArea={this.mainArea}></Slide110A>
        this.next = <Slide112A prev={<Slide111A></Slide111A>} mainArea={this.mainArea}></Slide112A>
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

                <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={11} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                                current={this}
                ></NavigationButtons>
            </div>
        )
    }

}

export default Slide111A;