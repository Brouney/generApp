import React, {Component} from "react";

var RED_BOOTSTRAP = "#d9534f"
var GREEN_BOOTSTRAP = "#5cb85c"
var PAUSE_ICON = "&#x23f8;"
var PLAY_ICON = "&#x23f5;"

class NavigationButtons extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = props.prev;
        this.next = props.next;

        this.currentSlideCounter = props.currentSlideCounter;
        this.slidesInModuleCounter = props.slidesInModuleCounter;

        this.simulationIsRunning = false;

        this.hiddenStartStopButton = props.hiddenStartStopButton ? props.hiddenStartStopButton : false
    }

    enableNavigationButtons() {
        this.simulationIsRunning = false;
        this.previousButton.disabled = ""
        this.nextButton.disabled = ""
        this.startStopButton.innerHTML = PLAY_ICON
        this.startStopButton.style.backgroundColor = GREEN_BOOTSTRAP
    }

    disableNavigationButtons() {
        this.simulationIsRunning = true;
        this.previousButton.disabled = "disabled"
        this.nextButton.disabled = "disabled"
        this.startStopButton.innerHTML = PAUSE_ICON
        this.startStopButton.style.backgroundColor = RED_BOOTSTRAP
        this.startStopButton.disabled = ""
    }

    enableAllButtons() {
        this.simulationIsRunning = false;
        this.previousButton.disabled = ""
        this.nextButton.disabled = ""
        this.startStopButton.innerHTML = PLAY_ICON
        this.startStopButton.style.backgroundColor = GREEN_BOOTSTRAP
        this.startStopButton.disabled = ""
    }

    enableStartStopButton(){
        this.startStopButton.disabled = ""
    }

    disableAllButtons() {
        this.simulationIsRunning = true;
        this.previousButton.disabled = "disabled"
        this.nextButton.disabled = "disabled"
        this.startStopButton.innerHTML = PAUSE_ICON
        this.startStopButton.style.backgroundColor = RED_BOOTSTRAP
        this.startStopButton.disabled = "disabled"
    }
    
    disableStartStopButton(){
        this.startStopButton.disabled = "disabled"
    }

    switchToPreviousSlide = () => {
        if (this.prev != null) {
            this.mainArea.setState({knowledgePanel: this.prev})
        }
    }

    switchToNextSlide = () => {
        if (this.next != null) {
            this.mainArea.setState({knowledgePanel: this.next})
        }
    }

    handleStartStopClick = () => {
        if (this.props.onStartStop) {
            this.props.onStartStop(this.simulationIsRunning) // DO NOT CHANGE THIS LINE - calling parent animation start/stop handler
        }


        if (this.simulationIsRunning) {
            this.enableNavigationButtons();

        }
        else {
            this.disableNavigationButtons()
        }
    }

    render() {
        return(
        <div className="navbar fixed-bottom">
            {this.prev
            ?   <button ref={ref => this.previousButton = ref} type="submit" className="btn btn-primary col-2" onClick={this.switchToPreviousSlide}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg></button>
            :   <button ref={ref => this.previousButton = ref} type="submit" className="btn btn-primary col-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg></button>}
             
            {this.hiddenStartStopButton
            ?   <button disabled ref={ref => this.startStopButton = ref} type="submit" className="btn btn-success col-2" onClick={this.handleStartStopClick}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg></button>
            :  <button ref={ref => this.startStopButton = ref} type="submit" className="btn btn-success col-2" onClick={this.handleStartStopClick}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg></button>} 

             {this.next
            ?   <button ref={ref => this.nextButton = ref} type="submit" className="btn btn-primary col-2" onClick={this.switchToNextSlide}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg></button>
            :   <button ref={ref => this.nextButton = ref} type="submit" className="btn btn-primary col-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg></button>}

            <h4>Slajd: {this.currentSlideCounter} / {this.slidesInModuleCounter}</h4>
        </div>
        )
    }

}

export default NavigationButtons;