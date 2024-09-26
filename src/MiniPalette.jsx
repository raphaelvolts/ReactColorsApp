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
    backgroundColor: "gray",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    paddingBottom: "20px",
    fontSize: "1rem",
    position: "relative"
  },
  emoji: {
    fontFamily: "NOTO COLOR EMOJI",
    fontSize: "1.5rem",
    marginLeft: "0.5rem"
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    marginBottom: "-3.5px",
    position: "relative",
    backgroundColor: (color) => color
  }
});

const MiniColorDiv = ({ color }) => {
  const classes = myStyles(color);
  return <div className={classes.miniColor}></div>;
};

export default function MiniPalette({ palette, navigation }) {
  const { paletteName, id, emoji, colors } = palette;
  const classes = myStyles();
  function handleClick() {
    navigation(id);
  }
  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.color}>
        {colors.map((color) => (
          <MiniColorDiv color={color.color} key={color.name} />
        ))}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}
