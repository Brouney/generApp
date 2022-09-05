import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide44A from "./Slide44A";
import Slide42A from "./Slide42A";
import { Line } from "react-lineto";
import Draggable from "react-draggable";
var Latex = require('react-latex');

// TODO: align borders of parentsAndChildrenArea with color (canvas?)
// TODO: childrens Y, Z on line dynamically updated
// TODO: calculations of Y, Z position

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
        this.title = 'Krzyżowanie uśredniające (wariant podstawowy)'

        this.parentX1ref = React.createRef();
        this.parentX2ref = React.createRef();

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
            linePosition: {
              x0: 0,
              y0: 0,
              x1: 300,
              y1: 300,
            },

            parentsAndChildrenAreaDiv: {
                x: null,
                y: null
            }
        }
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

        // if (x > SLIDE43A_parentsAndChildrenArea_WIDTH) { x = SLIDE43A_parentsAndChildrenArea_WIDTH }
        // if (x < 0) { x = 0 }
        // if (y > SLIDE43A_parentsAndChildrenArea_HEIGHT) { y = SLIDE43A_parentsAndChildrenArea_HEIGHT }
        // if (y < 0) { y = 0 }

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

    onControlledDragMidpoint = (e, position) => {

        this.setState((state) => {
            console.log(state);

            const newRPositionX = state.parentPositionX2.x + position.deltaX;
            const newRPositionY = state.parentPositionX2.y + position.deltaY;
            const newLPositionX = state.parentPositionX1.x + position.deltaX;
            const newLPositionY = state.parentPositionX1.y + position.deltaY;

            console.log(state.parentPositionX2.x, position.deltaX);
            console.log(newRPositionX, newRPositionY, newLPositionX, newLPositionY);

            return {
                parentPositionX2: {
                    x: newRPositionX,
                    y: newRPositionY
                },
                parentPositionX1: {
                    x: newLPositionX,
                    y: newLPositionY
                }
            };
        });
    }

    getHalfwayPoint = () => {
        let newX = (this.state.parentPositionX2.x + this.state.parentPositionX1.x) / 2;
        let newY = (this.state.parentPositionX2.y + this.state.parentPositionX1.y) / 2;

        return {
            x: newX,
            y: newY
        };
    }
    
    render(){
        const {
            parentPositionX1,
            parentPositionX2,
            linePosition
        } = this.state;

        var parentX1 = <Draggable
            position={parentPositionX1}
            onDrag={this.onDragParentX1}
            bounds={{left: 0, top: 0, right: SLIDE43A_parentsOffsetX, bottom: SLIDE43A_parentsOffsetY}}
            ref = {this.parentX1ref}
        >
            <h3><span style={{color: "yellow"}}><Latex>{"${X^1}$"}</Latex> = ({parentPositionX1.x}, {parentPositionX1.y})</span></h3>
        </Draggable>

        var parentX2 = <Draggable
            position={parentPositionX2}
            onDrag={this.onDragParentX2}
            bounds={{left: 0, top: 0, right: SLIDE43A_parentsOffsetX, bottom: SLIDE43A_parentsOffsetY}}
            ref = {this.parentX2ref}
        >
            <h3><span style={{color: "yellow"}}><Latex>{"${X^2}$"}</Latex> = ({parentPositionX2.x}, {parentPositionX2.y})</span></h3>
        </Draggable>
        
        return(
        <div>
            <h1>{this.title}</h1>

            <div className="row">
                <div className="col-5">
                    <h5>
                        Krzyżowanie uśredniające dąży do znalezienia "środka ciężkości" wartości cechy między cechami rodziców. Znajduje zastosowanie w kodowaniu rzeczywistoliczbowym.<br></br><br></br>
                        Metody losowe są bliższe algorytmom genetycznym z uwagi na błądzenie przypadkowe w przestrzeni rozwiązań.<br></br><br></br>
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
                    className="col-7"
                    id="parentsAndChildrenArea"
                    style={{
                        backgroundColor: "#767676",
                        // height: SLIDE43A_parentsAndChildrenArea_HEIGHT,
                        // width: SLIDE43A_parentsAndChildrenArea_WIDTH,
                    }}>
                        {parentX1}
                        {parentX2}

                        {parentPositionX1.isDragged && parentPositionX2.isDragged ?
                        <Line
                            className="line"
                            x0={linePosition.x0 + 30}
                            y0={linePosition.y0 + 30}
                            x1={linePosition.x1 + 25}
                            y1={linePosition.y1 + 60}
                        />
                        : <p></p>}
                </div>
            </div>
            
        

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={3} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                            current={this} />
        </div>
                            )
    }

}

export default Slide43A;