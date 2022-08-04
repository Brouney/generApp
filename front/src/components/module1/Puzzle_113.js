import { Button } from 'antd';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// TODO 
// ladniejsze cssy 
const itemsFromBackend = [
    {id:'1', content:'chromosom', type:1},
    {id:'2', content:'ciąg kodowy', type:1},
    {id:'3', content:'gen', type:2},
    {id:'4', content:'detektor, cecha, znak', type:2},
    {id:'5', content:'allel', type:3},
    {id:'6', content:'wariant cechy', type:3},
    {id:'7', content:'locus', type:4},
    {id:'8', content:'pozycja', type:4},
    {id:'9', content:'genotyp', type:5},
    {id:'10', content:'struktura', type:5},
    {id:'11', content:'fenotyp', type:6},
    {id:'12', content:'zbiór parametrów', type:6},
    {id:'13', content:'epistaza', type:7},
    {id:'14', content:'nieliniowość', type:7}

];

const columnsFromBackend = {
    
        ["111"]:{
            name:'Definicje Biologiczne',
            items: itemsFromBackend
        },
        ["112"]: {
            name:'Połączenie 1',
            items: []
        },
        ["113"]: {
            name:'Połączenie 2',
            items: []
        },
        ["114"]: {
            name:'Połączenie 3',
            items: []
        },
        ["115"]: {
            name:'Połączenie 4',
            items: []
        },
        ["116"]: {
            name:'Połączenie 5',
            items: []
        },
        ["117"]: {
            name:'Połączenie 6',
            items: []
        },
        ["118"]: {
            name:'Połączenie 7',
            items: []
        }
    };

const onDragEnd = (result, columns, setColumns) =>{
    if(!result.destination) return; //to jest po to, aby jak sie przesunie obok, to nic nie robilo
    const {source, destination} = result;
    if(source.droppableId !== destination.droppableId){//na przestrzeni dwoch elementow
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items]; //usuwamy jeden element 
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed); //dodajemy w 2 kolumnie
        if (destItems.length > 2){
            return
        }
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            },
        })
    }else{ //to jest na przestrzeni jednego
        const column = columns[source.droppableId];
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
    }
}

let inpropervalue = false

const checkValues = (columns) => {
    inpropervalue = false
    
    if(columns['112'].items.length !== 2 || columns['113'].items.length !== 2|| columns['114'].items.length !== 2
    || columns['115'].items.length !== 2|| columns['116'].items.length !== 2|| columns['117'].items.length !== 2
    || columns['118'].items.length !== 2){
        inpropervalue = true
        return
    }
    for(let i in columns){
        if(i == 111) continue;
        if(columns[i].items.length === 2)
         if( columns[i].items[0].type !== columns[i].items[1].type){
            inpropervalue = true
        }
    }

    
}
function Puzzle_113(){
    const [columns, setColumns] = useState(columnsFromBackend);
    return(
        <div>
            <div>
                { inpropervalue ?
                <Button type="primary" danger onSubmit={checkValues(columns) }style={{marginLeft:"35%"}} >
                Dopasuj poprawnie
                </Button>:
                <Button type="primary"  onSubmit={checkValues(columns)} style={{marginLeft:"35%"}} >
                    Wszystko poprawnie dopasowane
                </Button> 
            }
            </div>
            <div style={{display:'flex', justifyContent: 'center'}}>
                
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id,column]) => {
                        
                        return(
                            <div style={{ justifyContent: "center", height: "100%" }}>
                                 {column.name == 'Definicje Biologiczne' ?
                                <h2 style={{textAlign:"center", marginLeft:400}}>{column.name}</h2>:
                                <h2 style={{textAlign:"center"}}>{column.name}</h2>
                                }

                                <div style={{margin:5}}>
                                    <Droppable droppableId={id} key={id} >
                                        {(provided, snapshot) => {
                                            return(
                                                column.name == 'Definicje Biologiczne' ?
                                                <div 
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                        padding: 4,
                                                        width: 250,
                                                        minHeight: 150,
                                                        marginLeft:400
                                                    }}
                                                >
                                                    
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                            >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                    userSelect: "none",
                                                                    padding: 16,
                                                                    margin: "0 0 8px 0",
                                                                    minHeight: "50px",
                                                                    backgroundColor: snapshot.isDragging
                                                                        ? "#263B4A"
                                                                        : "#456C86",
                                                                    color: "white",
                                                                    ...provided.draggableProps.style
                                                                    }}
                                                                >
                                                                    {item.content}
                                                                </div>
                                                                );
                                                            }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                                :
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                        padding: 4,
                                                        width: 250,
                                                        minHeight: 150
                                                    
                                                    }}
                                                >
                                                    
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                            >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                    userSelect: "none",
                                                                    padding: 16,
                                                                    margin: "0 0 8px 0",
                                                                    minHeight: "50px",
                                                                    backgroundColor: snapshot.isDragging
                                                                        ? "#263B4A"
                                                                        : "#456C86",
                                                                    color: "white",
                                                                    ...provided.draggableProps.style
                                                                    }}
                                                                >
                                                                    {item.content}
                                                                </div>
                                                                );
                                                            }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>

            </div>
        </div>
    );


}
export default Puzzle_113