import { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const { colors, emoji, id, paletteName } = palette;
  const colorBox = colors[level].map((color, i) => {
    return <ColorBox key={color.id} background={color} format={format} />;
  });
  function handleLevel(newLevel) {
    setLevel(newLevel);
  }
  function handleFormat(format) {
    setFormat(format);
    setSnackbarStatus(true);
  }
  function handleSnackbar() {
    setSnackbarStatus(false);
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
      <footer className="Palette-footer">
        {paletteName}
        <span className="Palette-footer-emoji">{emoji}</span>
      </footer>
    </div>
  );
}
