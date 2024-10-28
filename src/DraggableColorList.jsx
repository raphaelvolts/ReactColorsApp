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
import { createUseStyles } from "react-jss";
import DraggableColorBox from "./DraggableColorBox";
import { DraggableItem } from "./DraggableItem";
import DraggableColorListStyles from "./styles/DraggableColorListStyles";

const style = createUseStyles(DraggableColorListStyles);

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
  const classes = style();
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
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleRemoveColor = (name) => {
    /* e.stopPropagation(); */
    removeColor(name);
    setActiveId(null);
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
        <div className={classes.colorGrid}>
          {items.map((color) => (
            <DraggableColorBox
              key={color.name}
              id={color.name}
              color={color.color}
              name={color.name}
              handleRemoveColor={handleRemoveColor}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay
        adjustScale
        style={{ transformOrigin: "0 0" /* , height: "20%", width: "15%"  */ }}
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
            /* style={{ height: "20%", width: "25%", visibility: "visible" }} */
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
