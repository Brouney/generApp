import { Button } from 'antd';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const itemsFromBackend = [
    {id:'1', content:'first task1', type:1},
    {id:'2', content:'seccond task1', type:1},
    {id:'3', content:'seccond task1', type:1},
    {id:'4', content:'seccond task2', type:2},
    {id:'5', content:'seccond task2', type:2},
    {id:'6', content:'seccond task2', type:2}

];

const columnsFromBackend = {
    
        ["11"]:{
            name:'Cechy',
            items: itemsFromBackend
        },
        ["12"]: {
            name:'AG',
            items: []
        },
        ["13"]: {
            name:'Tradycyjne',
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

const checkValues = (columns) => {
    let inpropervalue = false
    for (const e in [...columns['12'].items]) {
         if(columns['12'].items[e].type !== 1){
            inpropervalue = true
         }
    }
    for (const e in [...columns['13'].items]) {
        if(columns['12'].items[e].type !== 2){
           inpropervalue = true
        }
   }
   console.log(inpropervalue)
    
}
function AGvsTraditional14(){
    const [columns, setColumns] = useState(columnsFromBackend);
    
    return(
        <div>
            <div>
                {/* <Button onSubmit={checkValues(columns)} >
                    Sprawdź
                </Button> */}
            </div>
            <div style={{display:'flex', justifyContent: 'center'}}>
                
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id,column]) => {
                        
                        return(
                            <div style={{ justifyContent: "center", height: "100%" }}>
                                <h2>{column.name}</h2>
                                <div style={{margin:5}}>
                                    <Droppable droppableId={id} key={id} >
                                        {(provided, snapshot) => {
                                            return(
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                        padding: 4,
                                                        width: 250,
                                                        minHeight: 500
                                                    
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
export default AGvsTraditional14