import { createUseStyles } from "react-jss";

const myStyles = createUseStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer"
    }
  },
  color: {
    backgroundColor: "gray"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },
  emoji: {
    fontFamily: "NOTO COLOR EMOJI",
    fontSize: "1.5rem",
    marginLeft: "0.5rem"
  }
});

export default function MiniPalette({ palette }) {
  const { paletteName, id, emoji, colors } = palette;
  const classes = myStyles();
  return (
    <div className={classes.root}>
      <div className={classes.colors}></div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}
