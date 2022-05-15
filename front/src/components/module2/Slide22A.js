import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_2_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide21Q from "./Slide21Q";
import Slide23A from "./Slide23A";
import ParameterComponent22A from "../module1/ParameterComponent22A";
class Slide22A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide21Q mainArea={this.mainArea}></Slide21Q>;
        this.next = <Slide23A prev={<Slide22A></Slide22A>} mainArea={this.mainArea}></Slide23A>
        this.state = {
            level : 0,
            parameters : [
                <ParameterComponent22A main={this} level={0}></ParameterComponent22A>
            ],
            
        }
        
        this.quizTemplate = React.createRef()
    }
    onClickAddParameter = () => {
        this.setState(prevState => ({
            parameters: [...prevState.parameters, <ParameterComponent22A main={this} level={this.state.level + 1}/>],
            level: this.state.level + 1
        }))
    }

    onClickDeleteParameter = () => {
        var parametersAfterDeletion = [...this.state.parameters];
        var lastElement = parametersAfterDeletion.length-1

        parametersAfterDeletion.splice(parametersAfterDeletion[lastElement], 1);
        this.setState({parameters: parametersAfterDeletion,
                       level: this.state.level - 1
        });
    }
    render(){
        
        return(
        <div>
            <h1>Kryteria oceny algorytmu genetycznego</h1>
            <div className="col">
                    <button ref={ref => this.addParameter = ref} type="submit" className="btn btn-success col-2 m-1" onClick={this.onClickAddParameter}>Dodaj parametr</button>
                    <button ref={ref => this.deleteParameter = ref} type="submit" className="btn btn-warning col-2 m-1" onClick={this.onClickDeleteParameter}>Usuń parametr</button>
                    </div>
            <div className="col-8" style={{textAlign:"center"}}><h3>PARAMETRY</h3></div>
                <ol>
                    {this.state.parameters.map(component => component)}
                </ol>
            

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_2_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide22A;