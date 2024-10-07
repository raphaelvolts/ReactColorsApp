import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import styles from "./styles/PaletteStyle";

const singleColorPaletteStyles = createUseStyles(styles);

function getAllShades(allColors, displayColor) {
  let shades = [];
  for (let key in allColors) {
    shades = shades.concat(
      allColors[key].filter((color) => color.id === displayColor)
    );
  }
  return shades.slice(1);
}

export default function SingleColorPalette({
  palette,
  colorId,
  format,
  handleFormat,
  snackbarStatus,
  handleSnackbar
}) {
  const navigate = useNavigate();
  function navigateBack() {
    navigate("..", { relative: "path" });
  }
  const { colors, paletteName, emoji } = palette;
  const classes = singleColorPaletteStyles();
  const shades = getAllShades(colors, colorId);
  const shadeBoxes = shades.map((shade, i) => (
    <ColorBox key={`${colorId} - ${i}`} background={shade} format={format} />
  ));

  return (
    <div className={classes.palette}>
      <Navbar
        level={false}
        format={format}
        handleFormat={handleFormat}
        snackbarStatus={snackbarStatus}
        handleSnackbar={handleSnackbar}
        showLink={false}
      />
      <div className={classes.colors}>
        {shadeBoxes}
        <div className={classes.buttonContainer} onClick={navigateBack}>
          <button className={classes.button}>Back</button>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
