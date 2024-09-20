import { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const { colors, emoji, id, paletteName } = palette;
  const colorBox = colors[level].map((color, i) => {
    return <ColorBox key={color.id} background={color} />;
  });
  function handleLevel(newLevel) {
    setLevel(newLevel);
  }
  return (
    <div className="Palette">
      <Navbar level={level} handleLevel={handleLevel} />
      <div className="Palette-colors">{colorBox}</div>
    </div>
  );
}
