import ColorBox from "./ColorBox";
import "./Palette.css";

export default function Palette({ colors, emoji, id, paletteName }) {
  const colorBox = colors.map((color, i) => {
    return <ColorBox key={`c-${i}`} background={color} />;
  });
  return (
    <div className="Palette">
      <div className="Palette-colors">{colorBox}</div>
    </div>
  );
}
