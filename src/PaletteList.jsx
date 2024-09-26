import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import "./PaletteList.css";

export default function PaletteList({ palettes }) {
  let links = palettes.map((palette) => {
    return <MiniPalette key={palette.id} palette={palette} />;
  });

  return (
    <div className="PaletteList">
      <h1>React Color Palettes List</h1>
      {links}
    </div>
  );
}
