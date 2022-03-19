import React, {Component} from "react";
import Slide12A from "./Slide12A";
import Slide13T from "./Slide13T";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import  PlotlyChart3d from "../common/PlotlyChart3d";

class Slide11T extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = null;
        this.next = <Slide12A prev={<Slide11T></Slide11T>} next={<Slide13T></Slide13T>} mainArea={this.mainArea}></Slide12A>
        this.timerId = null;
        this.title = 'Tradycyjne metody poszukiwania - metody analityczne'

        this.plotlyChart3d = React.createRef();

        this.incrementProgressBar = this.incrementProgressBar.bind(this);

        this.state = {
            percent: 0
        }
    }

    incrementProgressBar() {
        this.setState(prevState => {
            return {
                percent: prevState.percent + 10
            }
        });
    }

    handleStartStop = (simulationStopped) => { // name = (param) => 
        if (simulationStopped) {
            clearInterval(this.timerId);
        }
        else {
            this.timerId = setInterval(() => {
                this.plotlyChart3d.current.moveSquareOnChartTowardsExtremum()
            }, 300);
        }
    }

    onClickGenerate = () => {
        this.plotlyChart3d.current.generateData()
    };
    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>

            <div className="row">
                <div className='col-2'>
                    <button type="submit" className="btn btn-success" onClick={this.onClickGenerate}>Losuj funkcję 3D</button>
                </div>

                <div className='col-10'>
                    <PlotlyChart3d ref={this.plotlyChart3d} title='Poszukiwanie ekstremum globalnego funkcji'/>
                </div>
            </div>


            <NavigationButtons
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={1}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
            ></NavigationButtons>

            {/* <Progress type="circle" percent={this.state.percent} format={percent => `${percent} czas`} /> */}
        </div>
        )
    }

}

export default Slide11T;