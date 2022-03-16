import React, {Component} from "react";
import Slide11T from "./Slide11T";
import Slide13T from "./Slide13T";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_1_SLIDES_COUNT } from '../templates/ListExercisePanel'
import MySlider from "../common/MySlider";
import 'antd/dist/antd.css';
import DnDReact from "../common/DnDReact";
import DnDReactLikeKanban from "../common/DnDReactLikeKanban";

class Slide12A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide11T mainArea={this.mainArea}></Slide11T>;
        this.next = <Slide13T prev={<Slide12A></Slide12A>} mainArea={this.mainArea}></Slide13T>        
        
        this.onChangePopulationSizeSlider = this.onChangePopulationSizeSlider.bind(this);
        this.populationSizeSlider = React.createRef();

        this.onChangeSlider2 = this.onChangeSlider2.bind(this);
        this.slider2 = React.createRef(); 

        this.onChangeSlider3 = this.onChangeSlider3.bind(this);
        this.slider3 = React.createRef(); 
    }

    state = {
        populationSizeSliderValue: 0,
        slider2Value: 0.1,
        slider3Value: 25,
    };

    onChangePopulationSizeSlider(v) {
        this.setState({
            populationSizeSliderValue: v,
          });
    }

    onChangeSlider2(v) {
        this.setState({
            slider2Value: v,
          });
    }

    onChangeSlider3(v) {
        this.setState({
            slider3: v,
          });
    }


    render(){

        return(
        <div>
            <h1>Moduł 1 Slajd 2</h1>
            <MySlider min={0} max={100} sliderSize={4} step={1} ref={this.populationSizeSlider} text={"Rozmiar populacji"} passValueToParent={this.onChangePopulationSizeSlider}></MySlider>
            <MySlider min={0.1} max={1} sliderSize={4} step={0.1} ref={this.slider2} text={"Prawdopodobieństwo"} passValueToParent={this.onChangeSlider2}></MySlider>
            <MySlider min={25} max={75} sliderSize={4} step={5} ref={this.slider3} text={"Inna wielkość"} passValueToParent={this.onChangeSlider3}></MySlider>

            <DnDReactLikeKanban></DnDReactLikeKanban>
            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={2} slidesInModuleCounter={MODULE_1_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>)
    }
}


export default Slide12A;