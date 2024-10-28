import sizes from "./sizes";
export default {
  root: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
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
  draggableDiv: {
    width: "100%",
    height: "100%",
    [sizes.down("md")]: {
      display: "inline-block",
      width: "90%",
      height: "100%",
      zIndex: "5"
    },
    [sizes.down("sm")]: {
      width: "70%"
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
};
