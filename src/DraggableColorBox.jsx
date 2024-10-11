import { createUseStyles } from "react-jss";

const style = createUseStyles({
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer"
  }
});

export default function DraggableColorBox({ color }) {
  const classes = style();
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {color}
    </div>
  );
}
