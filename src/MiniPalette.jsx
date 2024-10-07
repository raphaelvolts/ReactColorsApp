import { createUseStyles } from "react-jss";
import styles from "./styles/MiniPaletteStyles";

const myStyles = createUseStyles(styles);

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
