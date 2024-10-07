import { createUseStyles } from "react-jss";
import styles from "./styles/PaletteStyle";

const footerStyles = createUseStyles(styles);

export default function PaletteFooter({ paletteName, emoji }) {
  const classes = footerStyles();
  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.footerEmoji}>{emoji}</span>
    </footer>
  );
}
