import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Progress, message } from 'antd'

const itemsFromBackend = [
    {id:'1', content:'Woda 15|10', weight: 15, value: 10},
    {id:'2', content:'Sok 20|15', weight: 20, value: 15},
    {id:'3', content:'Książka 30|25', weight: 30, value: 25},
    {id:'4', content:'Batonik 10|5', weight: 10, value: 5},
    {id:'5', content:'Piórnik 15|10', weight: 15, value: 10},
    {id:'6', content:'Teczka 20|15', weight: 20, value: 15},
    {id:'7', content:'Długopis 5|4', weight: 5, value: 4},
    {id:'8', content:'Piłka 40|35', weight: 40, value: 35}
];

const columnsFromBackend = {
    ["11"]:{
        name:'Przedmioty',
        items: itemsFromBackend
    },
    ["12"]: {
        name:'Plecak',
        items: []
    }
};

const setBackpackCurrentWeight = (columns, parentObj) => {
    let weightsInBackpackSum = 0

    for (const e in [...columns['12'].items]) {
            weightsInBackpackSum += columns['12'].items[e].weight
    }
    let valuesInBackpackSum = 0
    for (const e in [...columns['12'].items]) {
        valuesInBackpackSum += columns['12'].items[e].value;
    }
    parentObj.parent.setState({backpackCurrentWeight: weightsInBackpackSum, backpackCurrentValues: valuesInBackpackSum})
}

const onDragEnd = (result, columns, setColumns, parentObj) => {
    if (!result.destination) {  //to jest po to, aby jak sie przesunie obok, to nic nie robilo
        return
    }

    const {source, destination} = result

    if (source.droppableId !== destination.droppableId) { //na przestrzeni dwoch elementow
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items]; //usuwamy jeden element 
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed); //dodajemy w 2 kolumnie
        let weightsInBackpackSum = 0
        if(destination.droppableId === "12"){
            console.log(destItems)
            for (const e in [...destItems]) {
                    weightsInBackpackSum += destItems[e].weight
            }
        }
        if(weightsInBackpackSum<=100){
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
        }
    }
    else { //to jest na przestrzeni jednego
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

    let weightsInBackpackSum = 0;
    for (const e in [...columns['12'].items]) {
        weightsInBackpackSum += columns['12'].items[e].weight;
    }
    let valuesInBackpackSum = 0
    for (const e in [...columns['12'].items]) {
        valuesInBackpackSum += columns['12'].items[e].value;
    }
    parentObj.parent.setState({backpackCurrentWeight: weightsInBackpackSum, backpackCurrentValues: valuesInBackpackSum})
}


function BackpackProblem(parent) {
    const [columns, setColumns] = useState(columnsFromBackend)
    const parentObj = parent
    useEffect(() => {       
        setBackpackCurrentWeight(columns, parentObj)
    }); 
    return (
        <div style={{display:'flex', justifyContent: 'center'}}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns, parentObj)}>
                {Object.entries(columns).map(([id,column]) => {
                    
                    return (
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
                                                    minHeight: 500,
                                                    bottom: 20
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
    );
}

export default BackpackProblem