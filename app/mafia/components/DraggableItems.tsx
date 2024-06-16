import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

const ITEM_TYPE = "ITEM";

interface Item {
  id: string;
  [key: string]: any;
}

interface DraggableItemsProps {
  items: Item[];
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  renderItem: (item: Item, index: number) => React.ReactNode;
}

const DraggableItems: React.FC<DraggableItemsProps> = ({
  items,
  moveItem,
  renderItem,
}) => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="flex flex-col">
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
            renderItem={renderItem}
          />
        ))}
      </div>
    </DndProvider>
  );
};

interface DraggableItemProps {
  item: Item;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  renderItem: (item: Item, index: number) => React.ReactNode;
}
const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  index,
  moveItem,
  renderItem,
}) => {
  const dragRef = React.useRef<HTMLDivElement>(null);
  const dropRef = React.useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(draggedItem: { id: string; index: number }) {
      if (draggedItem.id !== item.id) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(dragRef);
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "scale(1.05)" : "none",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <div className="cursor-move flex items-center my-2">
        <div ref={dragRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        {renderItem(item, index)}
      </div>
    </div>
  );
};

export default DraggableItems;
