import React, {Component} from "react";
import NavigationButtons from "../templates/NavigationButtons";
import { MODULE_4_SLIDES_COUNT } from '../templates/ListExercisePanel'
import Slide47A from "./Slide47A";
import Slide45A from "./Slide45A";
import { Button } from "antd";

class Slide46A extends Component {

    constructor(props){
        super(props)
        this.mainArea = props.mainArea
        this.prev = <Slide45A mainArea={this.mainArea}></Slide45A>;
        this.next = <Slide47A prev={<Slide46A></Slide46A>} mainArea={this.mainArea}></Slide47A>
        this.title = 'Operacje rekonfiguracji Order Crossover'

        this.state = {
            A: [],
            B:[],
            B_p:[],
            A_p:[],
            B2:[]
        }
        
    }
    
    renderNormal = (array) => {
        return array.map((obj, index) => {
            const { value, Color} = obj //destructuring
            return(
                <td>
                    <h3 style={{backgroundColor: Color, fontSize:"50px"}}>{value}</h3>
                </td>
                
            )
            
        })

    }

    renderAB = (array) => {
        return array.map((obj, index) => {
            const { value, Color} = obj //destructuring
            return(
                index == 3?
                <td >
                    <h3 style={{backgroundColor: Color, fontSize:"50px"}}>{"|"+ value}</h3>
                </td>
                :
                index == 5?
                <td>
                    <h3 style={{backgroundColor: Color, fontSize:"50px"}}>{value+ "|"}</h3>
                </td>
                :
                <td>
                    <h3 style={{backgroundColor: Color, fontSize:"50px"}}>{value}</h3>
                </td>
                
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
        let temp_table = []
        for(let i = 6; i<10;i++){
            temp_table.push(this.state.B[i])}
        for(let i = 0; i<6;i++){
            temp_table.push(this.state.B[i])}
        
        for(let i = 0; i<10;i++){
            if(temp_table[i].value === this.state.A[3].value || 
                temp_table[i].value === this.state.A[4].value ||
                temp_table[i].value === this.state.A[5].value){
                    temp_table[i] = {value: temp_table[i].value, Color: "red"}
                }
        }   
        this.setState({
            B2: temp_table
        })


       
        
    }

    generateA_P = () => {
        let temp_table = []
        for(let i = 6; i<10;i++){
            temp_table.push(this.state.B[i])}
        for(let i = 0; i<6;i++){
            temp_table.push(this.state.B[i])}

        let temp_table2 = []
        for(let i = 0; i<10;i++){
            if(temp_table[i].value === this.state.A[3].value || 
                temp_table[i].value === this.state.A[4].value ||
                temp_table[i].value === this.state.A[5].value){
                    continue;
                }
            temp_table2.push(temp_table[i])    
        }  
             
        console.log(temp_table2)
        let new_table = []
        for(let i = 4; i<7;i++){
            new_table.push(temp_table2[i])}
        for(let i = 3; i<6;i++){
            new_table.push(this.state.A[i])}   
        for(let i = 0; i<4;i++){
            new_table.push(temp_table2[i])}
        
        console.log(new_table)
        this.setState({
            A_p: new_table
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
                    <Button type="primary" onClick={this.generateA_P}>Uzupełnij A' od 2 punktu podziału</Button>
                </div>
                <div>
                    <tr>
                    {this.renderAB(this.state.A)}
                    </tr>
                    <tr>
                    {this.renderAB(this.state.B)}
                    </tr>
                </div>
                <div>
                    <tr>
                    {this.renderNormal(this.state.B2)}
                    </tr>
                </div>
                <div>
                    <tr>
                    {this.renderAB(this.state.A_p)}
                    </tr>
                </div>
            </div>

            <NavigationButtons mainArea={this.mainArea} prev={this.prev} next={this.next} currentSlideCounter={6} slidesInModuleCounter={MODULE_4_SLIDES_COUNT}
                               current={this}
            ></NavigationButtons>
        </div>
        )
    }

}

export default Slide46A;