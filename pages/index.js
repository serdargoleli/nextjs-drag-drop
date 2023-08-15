import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
  },
];

const DndExample = () => {
  const [stores, setStores] = useState(DATA);
  const [isBrowser, setIsBrowser] = useState(false);
  const [selectedStore, setSelectedStore] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  const moveItem = (
    sourceList,
    destinationList,
    sourceIndex,
    destinationIndex
  ) => {
    const sourceClone = Array.from(sourceList);
    const destClone = Array.from(destinationList);
    const [movedItem] = sourceClone.splice(sourceIndex, 1);
    destClone.splice(destinationIndex, 0, movedItem);

    return [sourceClone, destClone];
  };
  const onDragEnd = async (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "ITEM") {
      if (
        source.droppableId === "droppable" &&
        destination.droppableId === "selectedStore"
      ) {
        const [updatedStores, updatedSelectedStore] = moveItem(
          stores,
          selectedStore,
          source.index,
          destination.index
        );
        setStores(updatedStores);
        setSelectedStore(updatedSelectedStore);
      } else if (
        source.droppableId === "selectedStore" &&
        destination.droppableId === "selectedStore"
      ) {
        const updatedSelectedStore = Array.from(selectedStore);
        const [movedItem] = updatedSelectedStore.splice(source.index, 1);
        updatedSelectedStore.splice(destination.index, 0, movedItem);
        setSelectedStore(updatedSelectedStore);
      } else if (
        source.droppableId === "selectedStore" &&
        destination.droppableId === "droppable"
      ) {
        const [updatedSelectedStore, updatedStores] = moveItem(
          selectedStore,
          stores,
          source.index,
          destination.index
        );
        setSelectedStore(updatedSelectedStore);
        setStores(updatedStores);
      }
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="bg-gray-500 text-white p-3 m-6">
          {isBrowser ? (
            <Droppable droppableId="droppable" type="ITEM">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {stores?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : null}
        </div>
        <div>
          {isBrowser && (
            <div
              className="target-div border border-solid m-6 bg-gray-200 border-gray-100 p-5"
              id="test"
            >
              <Droppable droppableId="selectedStore" type="ITEM">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {selectedStore.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DndExample;
