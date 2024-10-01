import { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";

export default function Palette({
  palette,
  format,
  handleFormat,
  snackbarStatus,
  handleSnackbar
}) {
  const [level, setLevel] = useState(500);

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
    <div className="Palette">
      <Navbar
        level={level}
        handleLevel={handleLevel}
        handleFormat={handleFormat}
        format={format}
        snackbarStatus={snackbarStatus}
        handleSnackbar={handleSnackbar}
      />
      <div className="Palette-colors">{colorBox}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
