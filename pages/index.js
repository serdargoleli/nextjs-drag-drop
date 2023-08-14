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

const dnd = () => {
  const [stores, setStores] = useState(DATA);
  const [isBrowser, setIsBrowser] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  /*
  ** 
  hatasının çözümü içi
     react-beautiful-dndA setup problem was encountered.> Invariant failed: Draggable[id: 25daffdc-aae0-4d73-bd31-43f73101e7c0]: Unable to find drag handle
***
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);
  useEffect(() => {
    console.log(selectedStore);
  }, [selectedStore]);

  const onDragEnd = async (results) => {
    /* destination -> hedef index  */
    /* source->  taşınan item ilk index */
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    const selectStore = stores[source.index].id;
    setSelectedStore(selectStore);

    if (type === "ITEM") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }

    const newStores = [...stores];

    setStores(newStores);
  };

  const yy = () => {
    console.log("asdasd");
    if (selectedStore !== null) {
      // Mağazayı hedefe taşıma işlemini burada yapabilirsiniz
      const newStores = [...stores];

      const targetIndex = newStores.findIndex(
        (store) => store.id === selectedStore
      );

      // Yapılacak taşıma işlemini burada gerçekleştirin

      setSelectedStore(null); // Seçilen mağazayı sıfırla
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          {isBrowser ? (
            <Droppable droppableId="droppable" type="ITEM">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {stores.map((item, index) => (
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
        <div
          className="w-6/12 border border-dashed border-gray-300 h-44"
          onDrop={yy}
        >
          {selectedStore !== null ? (
            <div>Taşımak istediğiniz mağazayı buraya sürükleyip bırakın.</div>
          ) : (
            <div>Bir mağaza seçip buraya sürükleyin.</div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default dnd;
