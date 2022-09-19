import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import 'antd/dist/antd.css';
import Slide11T from "./Slide11T";
import Slide12A from "./Slide12A";
import Description11 from "./Description11";
import Description13 from "./Description13";
import { Progress } from "antd";

const SLIDE12_MIN_WEIGHT = 0;
const SLIDE12_MAX_WEIGHT = 100;

class Description12 extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide11T prev={<Description11></Description11>} next={<Description12></Description12>} mainArea={this.mainArea}></Slide11T>;
        this.next = <Slide12A prev={<Description12></Description12>} next={<Description13></Description13>} mainArea={this.mainArea}></Slide12A>
        this.title = 'Metody przeglądowe poszukiwania rozwiązań - problem plecakowy'

        this.navigationButtons = React.createRef();
        this.state = {
            percent: SLIDE12_MIN_WEIGHT
        };
    }

    tick() {
        this.setState(state => ({
          percent: (Math.floor(Math.random() * 2) == 0) ? state.percent + 15 : state.percent - 20
        }));

        if (this.state.percent < SLIDE12_MIN_WEIGHT) {
            this.setState(state => ({
                percent: SLIDE12_MIN_WEIGHT
            }));
        }
        if (this.state.percent > SLIDE12_MAX_WEIGHT) {
            this.setState(state => ({
                percent: SLIDE12_MAX_WEIGHT
            }));
        }
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    

    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <h3>Następna interakcja dotyczy problemu plecakowego.</h3>
            <h3>W skrócie: jest to maksymalizacyjny problem wyboru przedmiotów o określonej pojemności w taki sposób, aby ich sumaryczna wartość była jak największa jednocześnie nie przekraczając wagi 100.</h3>
            <h3>Zadaniem użytkownika jest dobranie takiej ilości elementów do plecaka, aby suma wartości była jak największa.</h3>
            <h3>Obok nazwy przedmiotu zamieszczono jego wagę oraz wartość oddzieloną pionową kreską.</h3>
            <h3>Wkładanie lub wyjmowanie przedmiotów na bieżąco aktualizuje obecną wagę plecaka </h3>
            <Progress type="circle" percent={this.state.percent} format={percent => `${percent}/100`} />
            <h3>oraz wartości</h3>
            <Progress type="circle" strokeColor={"purple"} percent={this.state.percent} format={backpackCapacity => `${backpackCapacity}/100`} />
            <NavigationButtons
                ref={this.navigationButtons}
                mainArea={this.mainArea}
                prev={this.prev}
                next={this.next}
                currentSlideCounter={3}
                slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                onStartStop={this.handleStartStop}
                hiddenStartStopButton={true}
            ></NavigationButtons>

        </div>
        )
    }

}

export default Description12