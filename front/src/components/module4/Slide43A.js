import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import MySlider from "../common/MySlider";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide44A from "./Slide44A";
import Slide42A from "./Slide42A";
import { Line } from "react-lineto";
import Draggable from "react-draggable";
var Latex = require('react-latex');

// TODO alternatywny switch na dwie zmienne losowe

const SLIDE43A_parentsAndChildrenArea_HEIGHT = 500
const SLIDE43A_parentsAndChildrenArea_WIDTH = 500
const SLIDE43A_parentsOffsetX = SLIDE43A_parentsAndChildrenArea_WIDTH - 100
const SLIDE43A_parentsOffsetY = SLIDE43A_parentsAndChildrenArea_HEIGHT - 100

class Slide43A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide42A mainArea={this.mainArea}></Slide42A>;
        this.next = <Slide44A prev={<Slide43A></Slide43A>} mainArea={this.mainArea}></Slide44A>
        this.title = 'Krzyżowanie uśredniające (wariant podstawowy i alternatywny)'

        this.parentX1ref = React.createRef();
        this.parentX2ref = React.createRef();
        this.childY = React.createRef();
        this.childZ = React.createRef();
        this.sliderPsiVariable = React.createRef();
        this.drawPsiValueButton = React.createRef();

        this.state = {

            parentPositionX1: {
              x: 0,
              y: 0,
              isDragged: false
            },
            parentPositionX2: {
              x: 300,
              y: 300,
              isDragged: false
            },

            childPositionY: {
                x: 100,
                y: 100,
            },
            childPositionZ: {
                x: 200,
                y: 200,
            },


            linePosition: {
              x0: 30,
              y0: 30,
              x1: 330,
              y1: 330,
            },

            parentsAndChildrenAreaDiv: {
                x: null,
                y: null
            },

            sliderPsiVariableValue: 0.6
        }
    }
    
    onChangeSliderPsiVariable = (v) => {
        this.setState({
            sliderPsiVariableValue: v,
        });

        this.calculateChildrenPosition(v)
    }

    drawPsiValue = () => {
        var newPsi = Math.random()
        this.setState({
            sliderPsiVariableValue: newPsi,
        });

        this.sliderPsiVariable.current.state.inputValue = newPsi

        this.calculateChildrenPosition(newPsi)
    }

    calculateChildrenPosition = (psiValue) => {
        const {
            parentPositionX1,
            parentPositionX2
        } = this.state;

        var newY_x = (parentPositionX1.x + psiValue * (parentPositionX2.x - parentPositionX1.x)).toFixed(2)
        var newY_y = (parentPositionX1.y + psiValue * (parentPositionX2.y - parentPositionX1.y)).toFixed(2)

        var newZ_x = (parentPositionX2.x - psiValue * (parentPositionX2.x - parentPositionX1.x)).toFixed(2)
        var newZ_y = (parentPositionX2.y - psiValue * (parentPositionX2.y - parentPositionX1.y)).toFixed(2)

        this.setState({
            childPositionY: {
                x: newY_x,
                y: newY_y,
            },
            childPositionZ: {
                x: newZ_x,
                y: newZ_y,
            },
        });
    }

    onDragParentX1 = (e, position) => {
        var newAreaX = this.state.parentsAndChildrenAreaDiv.x
        var newAreaY = this.state.parentsAndChildrenAreaDiv.y
        
        if (newAreaX == null && newAreaY == null) {
            var domElem = e.target
            var animationDivId = "parentsAndChildrenArea"
    
            while (domElem && domElem.parentNode) {
                domElem = domElem.parentNode;
    
                if (domElem.id && domElem.id == animationDivId) {
                    break
                }
            }

            newAreaX = domElem.getBoundingClientRect().left
            newAreaY = domElem.getBoundingClientRect().top
        }

        const { x, y } = position;

        var newLinePosX0 = x + newAreaX
        var newLinePosY0 = y + newAreaY

        this.setState(prevState => {
            return {
                parentPositionX1: {
                    x: x,
                    y: y,
                    isDragged: true
                },
                linePosition: {
                    x0: newLinePosX0,
                    y0: newLinePosY0,
                    x1: prevState.linePosition.x1,
                    y1: prevState.linePosition.y1
                },
                parentsAndChildrenAreaDiv: {
                    x: newAreaX,
                    y: newAreaY,
                }
            }
        });

        this.calculateChildrenPosition(this.state.sliderPsiVariableValue)
    };

    onDragParentX2 = (e, position) => {
        var newAreaX = this.state.parentsAndChildrenAreaDiv.x
        var newAreaY = this.state.parentsAndChildrenAreaDiv.y
        
        if (newAreaX == null && newAreaY == null) {
            var domElem = e.target
            var animationDivId = "parentsAndChildrenArea"
    
            while (domElem && domElem.parentNode) {
                domElem = domElem.parentNode;
    
                if (domElem.id && domElem.id == animationDivId) {
                    break
                }
            }

            newAreaX = domElem.getBoundingClientRect().left
            newAreaY = domElem.getBoundingClientRect().top
        }

        var { x, y } = position;
        var newLinePosX1 = x + newAreaX
        var newLinePosY1 = y + newAreaY

        this.setState(prevState => {
            return {
                parentPositionX2: {
                    x: x,
                    y: y,
                    isDragged: true
                },
                linePosition: {
                    x0: prevState.linePosition.x0,
                    y0: prevState.linePosition.y0,
                    x1: newLinePosX1,
                    y1: newLinePosY1
                },
                parentsAndChildrenAreaDiv: {
                    x: newAreaX,
                    y: newAreaY,
                }
            }
        });

        this.calculateChildrenPosition(this.state.sliderPsiVariableValue)
    };

    updateParentsAndChildrenAreaDiv = (e, position) => {
        var animationDivId = "parentsAndChildrenArea"
        var domElem = document.getElementById(animationDivId);

        if (domElem != null) {
            var newAreaX = domElem.getBoundingClientRect().left
            var newAreaY = domElem.getBoundingClientRect().top

            this.setState(prevState => {
                return {
                    parentPositionX1: {
                        x: prevState.parentPositionX1.x,
                        y: prevState.parentPositionX1.y,
                        isDragged: false
                    },
                    parentPositionX2: {
                        x: prevState.parentPositionX2.x,
                        y: prevState.parentPositionX2.y,
                        isDragged: false
                    },
                    parentsAndChildrenAreaDiv: {
                        x: newAreaX,
                        y: newAreaY,
                    }
                }
            });
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateParentsAndChildrenAreaDiv);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateParentsAndChildrenAreaDiv);
    }
    
    render(){
        const {
            parentPositionX1,
            parentPositionX2,
            childPositionY,
            childPositionZ,
            linePosition
        } = this.state;

        var parentX1 = <Draggable
            position={parentPositionX1}
            onDrag={this.onDragParentX1}
            bounds={{left: 0, top: 0, right: SLIDE43A_parentsOffsetX, bottom: SLIDE43A_parentsOffsetY}}
            ref = {this.parentX1ref}
        >
            <h4><span style={{color: "yellow", position: "absolute", cursor: "pointer"}}>
                <Latex>{"${X^1}$"}</Latex> = ({parentPositionX1.x}, {parentPositionX1.y})
            </span></h4>
        </Draggable>

        var parentX2 = <Draggable
            position={parentPositionX2}
            onDrag={this.onDragParentX2}
            bounds={{left: 0, top: 0, right: SLIDE43A_parentsOffsetX, bottom: SLIDE43A_parentsOffsetY}}
            ref = {this.parentX2ref}
        >
            <h4><span style={{color: "yellow", position: "absolute", cursor: "pointer"}}>
                <Latex>{"${X^2}$"}</Latex> = ({parentPositionX2.x}, {parentPositionX2.y})
            </span></h4>
        </Draggable>


        var childY = <Draggable
            position={childPositionY}
            bounds={{left: 0, top: 0, right: SLIDE43A_parentsOffsetX, bottom: SLIDE43A_parentsOffsetY}}
            ref = {this.childY}
        >
            <h5><span style={{color: "cyan", position: "absolute"}}><Latex>{"${Y}$"}</Latex> = ({childPositionY.x}, {childPositionY.y})</span></h5>
        </Draggable>

        var childZ = <Draggable
            position={childPositionZ}
            bounds={{left: 0, top: 0, right: SLIDE43A_parentsOffsetX, bottom: SLIDE43A_parentsOffsetY}}
            ref = {this.childZ}
        >
            <h5><span style={{color: "cyan", position: "absolute"}}><Latex>{"${Z}$"}</Latex> = ({childPositionZ.x}, {childPositionZ.y})</span></h5>
        </Draggable>

        var connectingLine = <Line
            style={{color: "lime", position: "absolute"}}
            className="line"
            x0={linePosition.x0 + 30}
            y0={linePosition.y0 + 30}
            x1={linePosition.x1 + 30}
            y1={linePosition.y1 + 30}
        />
        
        return(
        <div>
            <h1>{this.title}</h1>

            <div className="row">
                <div className="col-6">
                    <h5>
                        Krzyżowanie uśredniające dąży do znalezienia "środka ciężkości" wartości cechy między cechami rodziców. Znajduje zastosowanie w kodowaniu rzeczywistoliczbowym.<br></br><br></br>
                        <ul>
                            <li>Rodzice: <span style={{color: "yellow"}}><Latex>{"${X^1}$"}</Latex>, <Latex>{"${X^2}$"}</Latex></span></li>
                            <li>Dzieci <span style={{color: "cyan"}}><Latex>{"${Y, Z}$"}</Latex></span><br></br></li><br></br>

                                <span style={{color: "cyan"}}><Latex>{"${Y }$"}</Latex></span>
                                <span style={{color: "yellow"}}><Latex>{"${ = X^1 + }$"}</Latex></span>
                                <Latex>{"${\\Psi_{U(0,1)}}$"}</Latex>
                                <span style={{color: "yellow"}}><Latex>{"${(X^2 - X^1)}$"}</Latex></span><br></br>
                                
                                <span style={{color: "cyan"}}><Latex>{"${Z }$"}</Latex></span>
                                <span style={{color: "yellow"}}><Latex>{"${= X^2 + X^1 - }$"}</Latex></span>
                                <span style={{color: "cyan"}}><Latex>{"${Y}$"}</Latex></span>
                                <span style={{color: "yellow"}}><Latex>{"${ = X^2 - }$"}</Latex></span>
                                <Latex>{"${\\Psi_{U(0,1)}}$"}</Latex>
                                <span style={{color: "yellow"}}><Latex>{"${(X^2 - X^1)}$"}</Latex></span>
                        </ul>

                        Właściwości:
                        <ul>
                            <li>operator nieobciążony (każdy punkt pomiędzy<span style={{color: "yellow"}}><Latex>{"${X^1}$"}</Latex></span> a <span style={{color: "yellow"}}><Latex>{"${X^2}$"}</Latex></span> ma takie samo prawdopodobieństwo wystąpienia u potomka - dzięki zmiennej losowej <Latex>{"${\\Psi_{U(0,1)}}$"}</Latex> o rozkładzie jednostajnym)</li>
                            <li>dla dowolnego zbioru wypukłego rodziców, dziecko należy do tego zbioru</li>
                            <li>odległość między potomkami mniejsza, niż między rodzicami</li>
                        </ul>
                    </h5>
                </div>


                <div
                    className="col-5"
                    id="parentsAndChildrenArea"
                    style={{
                        backgroundColor: "#454545",
                        height: SLIDE43A_parentsAndChildrenArea_HEIGHT,
                        // width: SLIDE43A_parentsAndChildrenArea_WIDTH,
                    }}>
                        {parentX1}
                        {childY}
                        {childZ}
                        {parentX2}

                        {parentPositionX1.isDragged && parentPositionX2.isDragged
                            ? connectingLine
                            : <p></p>
                        }
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <h5>
                        Przeciąganie rodziców <span style={{color: "yellow"}}><Latex>{"${X^1}$"}</Latex>, <Latex>{"${X^2}$"}</Latex></span> za pomocą myszki aktualizuje wartości cech (położenie) dzieci <span style={{color: "cyan"}}><Latex>{"${Y, Z}$"}</Latex></span><br></br>
                        Można również zmieniać suwakiem wartość zmiennej <Latex>{"${\\Psi_{U(0,1)}}$"}</Latex> lub wylosować ją przez kliknięcie przycisku.
                    </h5>
                </div>
                <div className="col-6">
                    <MySlider
                        min={0}
                        max={1}
                        defaultValue={0.6}
                        sliderSize={1}
                        step={0.001}
                        ref={this.sliderPsiVariable}
                        text={<h5><Latex>{"Zmienna ${\\Psi_{U(0,1)}}$"}</Latex></h5>}
                        passValueToParent={this.onChangeSliderPsiVariable}>
                    </MySlider>

                    <button
                        ref={ref => this.drawPsiValueButton = ref}
                        type="submit"
                        className="btn btn-success m-1"
                        onClick={this.drawPsiValue}><b>LOSUJ</b>
                    </button>
                </div>
            </div>
            
        

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                            current={this} />
        </div>
                            )
    }

}

export default Slide43A;