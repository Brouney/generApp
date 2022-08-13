import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import ParameterComponent23A from "./ParameterComponent23A";
import Description23 from "./Description23";
import Description24 from "./Description24";

const SLIDE23A_INITIAL_GENOTYPE = ["001", "0001", "00001"]

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
                <ParameterComponent23A Umax={7} bity={3} passXkodToParent={this.buildIndividualGenotype} listIndex={0}/>,
                <ParameterComponent23A Umax={15} bity={4} passXkodToParent={this.buildIndividualGenotype} listIndex={1}/>,
                <ParameterComponent23A Umax={31} bity={5} passXkodToParent={this.buildIndividualGenotype} listIndex={2}/>,
            ],
            individualWholeGenotype: SLIDE23A_INITIAL_GENOTYPE
        }
    }

    buildIndividualGenotype = (listIndex, xKod) => {
        let tmpParams = [...this.state.individualWholeGenotype]
        tmpParams[listIndex] = xKod

        console.log(tmpParams)

        this.setState(prevState => ({
            individualWholeGenotype: tmpParams
        }))
    }

    onClickAddParameter = () => {
        this.setState(prevState => ({
            parameters: [...prevState.parameters, <ParameterComponent23A Umax={15} bity={4} passXkodToParent={this.buildIndividualGenotype} listIndex={prevState.parameters.length}/>],
            individualWholeGenotype: [...prevState.individualWholeGenotype, "0001"]
        }))
    }

    onClickDeleteParameter = () => {
        if (this.state.parameters.length == 1) {
            return
        }

        var parametersAfterDeletion = [...this.state.parameters];
        var lastElement = parametersAfterDeletion.length-1
        parametersAfterDeletion.splice(parametersAfterDeletion[lastElement], 1);

        var individualWholeGenotypeAfterDeletion = [...this.state.individualWholeGenotype];
        individualWholeGenotypeAfterDeletion.pop()

        this.setState({
            parameters: parametersAfterDeletion,
            individualWholeGenotype: individualWholeGenotypeAfterDeletion,
        });
    }

    render() {

        return(
            <div>
                <h1>{this.title}</h1>
                <div>
                    <button ref={ref => this.addParameter = ref} type="submit" className="btn btn-success col-2 m-1" onClick={this.onClickAddParameter}>Dodaj parametr</button>
                    <button ref={ref => this.deleteParameter = ref} type="submit" className="btn btn-warning col-2 m-1" onClick={this.onClickDeleteParameter}>Usuń parametr</button>
                </div><br></br>

                <div><h3>Genotyp osobnika <h2><span style={{color: "lightgreen"}}>{this.state.individualWholeGenotype}</span></h2></h3></div><br></br>

                <div className="col-10" style={{textAlign:"center"}}><h3>CECHY</h3></div>
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