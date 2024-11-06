import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DraggableItem } from "./DraggableItem";

export default function DraggableColorBox({
  color,
  name,
  handleRemoveColor,
  id
}) {
  function animateLayoutChanges(args) {
    const { isSorting, wasSorting } = args;

    if (isSorting || wasSorting) {
      return defaultAnimateLayoutChanges(args);
    }

    return true;
  }
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ animateLayoutChanges, id: id });
  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  function handleDelete() {
    handleRemoveColor(name);
  }
  return (
    <DraggableItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={sortableStyle}
      color={color}
      name={name}
      withOpacity={isDragging}
      handleDelete={handleDelete}
    />
  );
}
