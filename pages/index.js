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
    <div className="w-screen h-screen bg-[#0b0d10] flex justify-start items-start p-12 gap-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-1/3 bg-[#181920] text-white p-4 rounded-lg">
          {isBrowser ? (
            <Droppable droppableId="droppable" type="ITEM">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <h1 className="p-3 ttext-sm bg-gray-100 bg-opacity-10 rounded-lg mb-4">
                    TODO
                  </h1>
                  {stores?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={`p-5 bg-[#242831] rounded-lg mb-3 border border-solid border-transparent ${
                            snapshot.isDragging
                              ? "shadow-xl shadow-[#ffffff23] drop-shadow-md border-gray-100"
                              : ""
                          }`}
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
        <div className="w-1/3">
          {isBrowser && (
            <div
              className="target-div  bg-[#58585816] border border-dashed rounded-lg border-gray-600 p-4"
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
                            className="p-5 bg-[#272a32] text-white rounded-lg mb-3 border border-solid border-transparent "
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
