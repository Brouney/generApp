import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide46A from "./Slide46A";
import Slide44A from "./Slide44A";
import { Button } from "antd";

class Slide45A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide44A mainArea={this.mainArea}></Slide44A>;
        this.next = <Slide46A prev={<Slide45A></Slide45A>} mainArea={this.mainArea}></Slide46A>
        this.title = 'Operacje rekonfiguracji Partially Matched Crossover'
        this.state = {
            A: [],
            B:[],
            B_p:[],
            A_p:[],
            B_change: []
        }
        this.quizTemplate = React.createRef()
    }
    renderAB = (array) => {
        return array.map((obj, index) => {
            const { value, Color} = obj //destructuring
            return(
                index == 3?
                <td style={{backgroundColor: Color, textAlign: "center"}}>
                    {<h3 style={{  fontSize:"50px"}}>{"| "+ value+"⁣ "}</h3>}
                </td>
                
                :
                index == 5?
                <td style={{backgroundColor: Color, textAlign: "center"}}>
                    <h3 style={{ fontSize:"50px"}}>{"⁣ "+value+ " |"}</h3>
                </td>
                :
                <td style={{backgroundColor: Color, textAlign: "center"}}>
                    <h3 style={{ fontSize:"50px"}}>{ "⁣ "+String(value) +" ⁣"}</h3> 
                </td>
                //tu jest ogólnie niewidzialny semarator zeby byly ladne spacje 
            )
            
        })

    }

    randomAB = () => {
        let imput_val_A = [1,2,3,4,5,6,7,8,9,10]
        let imput_val_B = [1,2,3,4,5,6,7,8,9,10]
        let empty_A = [0,0,0,0,0,0,0,0,0,0]
        let empty_B = [0,0,0,0,0,0,0,0,0,0]
        for(let i = 0; i< 10; i++){
            let rand_val = imput_val_A[Math.floor(Math.random() * (10-i))] ;
            empty_A[i] = {value: rand_val, Color: "red"}
            imput_val_A = imput_val_A.filter(function(val){return val !== rand_val})
            rand_val = imput_val_B[Math.floor(Math.random() * (10-i))];
            empty_B[i] = {value: rand_val, Color: "blue"}
            imput_val_B = imput_val_B.filter(function(val){return val !== rand_val})
        }
        this.setState({
            A: empty_A,
            B: empty_B
        })

    }
    generateB2 = () => {

        let A3 = {value:this.state.A[3].value, Color:"magenta"}
        let B3 = {value:this.state.B[3].value, Color:"magenta"}
        let A4 = {value:this.state.A[4].value, Color:"coral"}
        let B4 = {value:this.state.B[4].value, Color:"coral"}
        let A5 = {value:this.state.A[5].value, Color:"darkcyan"}
        let B5 = {value:this.state.B[5].value, Color:"darkcyan"}
        let temp_table = []
        for(let i = 0; i<10;i++){
            if(this.state.B[i].value === A3.value ){ temp_table.push(A3)}
            else if(this.state.B[i].value === A4.value ){ temp_table.push(A4)}  
            else if(this.state.B[i].value === A5.value ){ temp_table.push(A5)}
            else if(this.state.B[i].value === B3.value ){ temp_table.push(B3)}
            else if(this.state.B[i].value === B4.value ){ temp_table.push(B4)}  
            else if(this.state.B[i].value === B5.value ){ temp_table.push(B5)}
            else{
                temp_table.push(this.state.B[i])
            }
        }
           
        this.setState({
            B_change: temp_table
        })


       
        
    }

    generateA_B_P = () => {

        let A3 = {value:this.state.A[3].value, Color:"magenta"}
        let B3 = {value:this.state.B[3].value, Color:"magenta"}
        let A4 = {value:this.state.A[4].value, Color:"coral"}
        let B4 = {value:this.state.B[4].value, Color:"coral"}
        let A5 = {value:this.state.A[5].value, Color:"darkcyan"}
        let B5 = {value:this.state.B[5].value, Color:"darkcyan"}
        let temp_table = []
        for(let i = 0; i<10;i++){
            if(this.state.B[i].value === A3.value ){ temp_table.push(B3)}
            else if(this.state.B[i].value === A4.value ){ temp_table.push(B4)}  
            else if(this.state.B[i].value === A5.value ){ temp_table.push(B5)}
            else if(this.state.B[i].value === B3.value ){ temp_table.push(A3)}
            else if(this.state.B[i].value === B4.value ){ temp_table.push(A4)}  
            else if(this.state.B[i].value === B5.value ){ temp_table.push(A5)}
            else{
                temp_table.push(this.state.B[i])
            }
        }
           
        this.setState({
            A_p: temp_table
        })

        
        temp_table = []
        for(let i = 0; i<10;i++){
            if(this.state.A[i].value === A3.value ){ temp_table.push(B3)}
            else if(this.state.A[i].value === A4.value ){ temp_table.push(B4)}  
            else if(this.state.A[i].value === A5.value ){ temp_table.push(B5)}
            else if(this.state.A[i].value === B3.value ){ temp_table.push(A3)}
            else if(this.state.A[i].value === B4.value ){ temp_table.push(A4)}  
            else if(this.state.A[i].value === B5.value ){ temp_table.push(A5)}
            else{
                temp_table.push(this.state.A[i])
            }
        }
        
        
        this.setState({
            B_p: temp_table
        })


    }


    render(){
        
        return(
        <div>
            <h1>{this.title}</h1>
            <div>
                <div>
                    <Button type="primary" onClick={this.randomAB}>Wylosuj A oraz B</Button>
                </div>
                <div>
                    <Button type="primary" onClick={this.generateB2}>Kolejność genów w B od 2-go punktu podziału:</Button>
                </div>
                <div>
                    <Button type="primary" onClick={this.generateA_B_P}>Uzupełnij A' B'</Button>
                </div>
                <br></br>
                <div>
                    <tr>
                        <td style={{ fontSize:"50px"}}>A = </td>
                        {this.renderAB(this.state.A)}
                    </tr>
                    <br></br>
                    <tr>
                    <td style={{ fontSize:"50px"}}>B = </td>
                    {this.renderAB(this.state.B)}
                    </tr>
                    <br></br>
                </div>
                <div>
                    <tr>
                    <td style={{ fontSize:"50px"}}>CHANGE = </td>
                    {this.renderAB(this.state.B_change)}
                    </tr>
                    <br></br>
                </div>
                <div>
                    <tr>
                    <td style={{ fontSize:"50px"}}>A' = </td>
                    {this.renderAB(this.state.A_p)}
                    </tr>
                    <br></br>
                </div>
                <div>
                    <tr>
                    <td style={{ fontSize:"50px"}}>B' = </td>
                    {this.renderAB(this.state.B_p)}
                    </tr>
                </div>
            </div>  

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={5} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide45A;