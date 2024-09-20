import { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const { colors, emoji, id, paletteName } = palette;
  const colorBox = colors[level].map((color, i) => {
    return <ColorBox key={color.id} background={color} format={format} />;
  });
  function handleLevel(newLevel) {
    setLevel(newLevel);
  }
  function handleFormat(format) {
    setFormat(format);
  }
  return (
    <div className="Palette">
      <Navbar
        level={level}
        handleLevel={handleLevel}
        handleFormat={handleFormat}
        format={format}
      />
      <div className="Palette-colors">{colorBox}</div>
    </div>
  );
}
