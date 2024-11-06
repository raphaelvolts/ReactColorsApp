import { forwardRef } from "react";
import { createUseStyles } from "react-jss";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles/DraggableItemStyles";

const styleSheet = createUseStyles(styles);

export const DraggableItem = forwardRef(function DraggableItem(
  { id, color, name, handleDelete, style, withOpacity, isDragging, ...props },
  ref
) {
  const classes = styleSheet({ isDragging, withOpacity, color });

  return (
    <div className={classes.root} style={{ ...style, backgroundColor: color }}>
      <div ref={ref} {...props} className={classes.draggableDiv}></div>
      <div className={classes.boxContainer}>
        <span>{name}</span>
        <DeleteIcon
          role="button"
          className={classes.deleteIcon}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
});
