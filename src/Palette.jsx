import { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { createUseStyles } from "react-jss";
import styles from "./styles/PaletteStyle";

const paletteStyles = createUseStyles(styles);
export default function Palette({
  palette,
  format,
  handleFormat,
  snackbarStatus,
  handleSnackbar
}) {
  const [level, setLevel] = useState(500);
  const classes = paletteStyles();
  const { colors, emoji, id, paletteName } = palette;
  const colorBox = colors[level].map((color, i) => {
    return (
      <ColorBox
        key={color.id}
        background={color}
        format={format}
        paletteId={id}
        showLink
      />
    );
  });
  function handleLevel(newLevel) {
    setLevel(newLevel);
  }

  return (
    <div className={classes.palette}>
      <Navbar
        level={level}
        handleLevel={handleLevel}
        handleFormat={handleFormat}
        format={format}
        snackbarStatus={snackbarStatus}
        handleSnackbar={handleSnackbar}
      />
      <div className={classes.colors}>{colorBox}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
