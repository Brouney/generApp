import React, {Component} from "react";
var RED_BOOTSTRAP = "#d9534f"
var GREEN_BOOTSTRAP = "#5cb85c"
class QuizTemplate extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.slide = props.slide
        console.log(this)
        this.inproper1Answer = React.createRef();
        this.inproper2Answer = React.createRef();
        this.inproper3Answer = React.createRef();
        this.properAnswer = React.createRef();
        this.showAnswer = this.showAnswer.bind(this)
    }

    showAnswer(){
        console.log(this.inproper1Answer)
        this.inproper1Answer.current.style.backgroundColor = RED_BOOTSTRAP
        this.inproper2Answer.current.style.backgroundColor = RED_BOOTSTRAP
        this.inproper3Answer.current.style.backgroundColor = RED_BOOTSTRAP
        this.properAnswer.current.style.backgroundColor = GREEN_BOOTSTRAP
    }

    render(){
        return(
            <div className="quizTemplate items-center justify-center flex h-screen">
                <div className="bg-black text-purple-800 p-10 ">
                    <h2>
                        Pytanie
                    </h2>
                </div>
                <div className="quizbuttons">
                    <ul>
                    <button ref={this.inproper1Answer} onClick={this.showAnswer} className=" btn btn-primary p-4 " style={{margin: 20}}> odp1</button></ul>
                    <ul>
                    <button ref={this.inproper2Answer} onClick={this.showAnswer} className=" btn btn-primary p-4" style={{margin: 20}}> odp2 </button></ul>
                    <ul>
                    <button ref={this.inproper3Answer} onClick={this.showAnswer} className=" btn btn-primary p-4" style={{margin: 20}}>odp3</button></ul>
                    <ul>
                    <button ref={this.properAnswer } onClick={this.showAnswer} className=" btn btn-primary p-4" style={{margin: 20}}>odp4</button></ul>
                </div>
            </div>
            
        )
    }

}

export default QuizTemplate;