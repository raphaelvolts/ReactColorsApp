import { useState } from "react";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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
      <Slider
        defaultValue={level}
        value={level}
        min={100}
        max={900}
        step={100}
        dots={true}
        onChange={handleLevel}
      />
      <div className="Palette-colors">{colorBox}</div>
    </div>
  );
}
