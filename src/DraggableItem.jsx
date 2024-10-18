import { forwardRef } from "react";
import { createUseStyles } from "react-jss";
import DeleteIcon from "@mui/icons-material/Delete";

const styleSheet = createUseStyles({
  root: {
    /*  width: (isDragging) => (isDragging ? "2%" : "20%"),
    height: (isDragging) => (isDragging ? "2%" : "25%"), */
    width: "100%",
    height: "100%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    opacity: (props) => (props.withOpacity ? "0.5" : "1"),
    marginBottom: "-6.8px",
    transformOrigin: "50% 50%",
    cursor: (props) => (props.isDragging ? "grabbing" : "grab"),
    transform: (props) => (props.isDragging ? "scale(1.05)" : "scale(1)"),
    transition: "all 0.2s ease-in-out",
    alignItems: "center",
    justifyContent: "center",
    "&:hover $deleteIcon": {
      color: "white",
      transform: "scale(1.5)",
      cursor: "pointer"
    }
  },
  boxContainer: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "rgba(0, 0, 0, 0.5)",
    padding: "10px",
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out"
  }
});

export const DraggableItem = forwardRef(function DraggableItem(
  { id, color, name, handleDelete, style, withOpacity, isDragging, ...props },
  ref
) {
  const classes = styleSheet({ isDragging, withOpacity });

  return (
    <div
      className={classes.root}
      style={{ ...style, backgroundColor: color }}
      ref={ref}
      {...props}
    >
      <div className={classes.boxContainer}>
        <span>{name}</span>

        <DeleteIcon
          role="button"
          className={classes.deleteIcon}
          onMouseDown={handleDelete}
        />
      </div>
    </div>
  );
});
