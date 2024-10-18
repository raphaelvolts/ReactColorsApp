import { useState, useEffect } from "react";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  rectIntersection,
  closestCorners
} from "@dnd-kit/core";
import {
  rectSwappingStrategy,
  rectSortingStrategy,
  SortableContext,
  arrayMove
} from "@dnd-kit/sortable";
import DraggableColorBox from "./DraggableColorBox";
import { DraggableItem } from "./DraggableItem";

export default function DraggableColorList({
  colors,
  removeColor,
  handleSort
}) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10
      }
    })
  );
  let timer = "";
  const items = colors;
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(
        items.find((item) => item.name === active.id)
      );
      const newIndex = items.indexOf(
        items.find((item) => item.name === over.id)
      );
      let newColors = arrayMove(items, oldIndex, newIndex);
      console.log(newColors, oldIndex, newIndex);
      clearTimeout(timer);
      handleSort(newColors);
      setActiveId(null);
    }
  };
  const handleDragMove = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(
        items.find((item) => item.name === active.id)
      );
      const newIndex = items.indexOf(
        items.find((item) => item.name === over.id)
      );
      /* timer = setTimeout(() => {
        let newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);
      }, 100);
 */
      timer = setTimeout(() => {
        let newColors = arrayMove(items, oldIndex, newIndex);

        handleSort(newColors);
      }, 250);
      /* handleSort(newColors); */
      console.log(over.id);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleRemoveColor = (name) => {
    setActiveId(null);
    removeColor(name);
  };
  /* function handleDragStart(event) {
    const { active } = event;

    setActiveId(active.id);
  } */
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
      style={{ height: "100%" }}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(5, 1fr)`,
            gridTemplateRows: `repeat(4, 1fr)`,
            gridGap: 0,
            maxWidth: "100vw",
            width: "100%",
            height: "100%",
            margin: "0 0"
          }}
        >
          {items.map((color) => (
            <DraggableColorBox
              key={color.name}
              id={color.name}
              color={color.color}
              name={color.name}
              removeColor={handleRemoveColor}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay
        adjustScale
        style={{ transformOrigin: "0 0", height: "103%", width: "63%" }}
        dropAnimation={{
          duration: 500,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)"
        }}
      >
        {activeId ? (
          <DraggableItem
            id={activeId}
            color={items.find((item) => item.name === activeId).color}
            name={items.find((item) => item.name === activeId).name}
            style={{ height: "20%", width: "25%", visibility: "visible" }}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
