import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { useNavigate } from "react-router-dom";
import "./SingleColorPalette.css";

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
  const shades = getAllShades(colors, colorId);
  const shadeBoxes = shades.map((shade, i) => (
    <ColorBox key={`${colorId} - ${i}`} background={shade} format={format} />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={false}
        format={format}
        handleFormat={handleFormat}
        snackbarStatus={snackbarStatus}
        handleSnackbar={handleSnackbar}
        showLink={false}
      />
      <div className="Palette-colors">
        {shadeBoxes}
        <div className="button-container" onClick={navigateBack}>
          <button className="button-container button">Back</button>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
