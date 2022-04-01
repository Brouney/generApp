import NavigationButtons from "./NavigationButtons";


class NavigationButtonsAllDisabled extends NavigationButtons {

    constructor(props){
        super(props);
    }

    handleStartStopClick = () => {
        if (this.props.onStartStop) {
            this.props.onStartStop(this.simulationIsRunning) // DO NOT CHANGE THIS LINE - calling parent animation start/stop handler
            
        }


        if (this.simulationIsRunning) {
            this.disableAllButtons();
            
        }
        else {
            this.enableAllButtons()
            
        }
    }

}

export default NavigationButtonsAllDisabled