import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const finalSpaceCharacters = [
  {
    id: '1',
    name: 'Lubie placki',
    // thumb: '/images/gary.png'
  },
  {
    id: '2',
    name: 'Jem pierogi',
    // thumb: '/images/cato.png'
  },
  {
    id: '3',
    name: 'Miala 18 lat',
    // thumb: '/images/kvn.png'
  },
  {
    id: '4',
    name: 'Tam za rogiem stoi anioł z makarena',
    // thumb: '/images/mooncake.png'
  },
  {
    id: '5',
    name: 'Piwo moje paliwo',
    // thumb: '/images/quinn.png'
  }
]

function DnDReact() {
  const [elementsInList, updateElements] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(elementsInList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateElements(items);
  }

  return (
    <div className="DnDReact">
      <header className="App-header">
        <h1>Pogrupuj w odpowiedniej kolejności</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="elementsInList">
            {(provided) => (
              <ul className="elementsInList" {...provided.droppableProps} ref={provided.innerRef}>
                {elementsInList.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="elementsInList-thumb">
                            
                          </div>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      
    </div>
  );
}

export default DnDReact;
