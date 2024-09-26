import { Routes, Route, useParams } from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import seedColors from "./seedColors";
import generatePalette from "./chromaColorHelper";

function App() {
  function findPalette(id) {
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  }
  function displayPalette() {
    let { id } = useParams();
    return <Palette palette={generatePalette(findPalette(id))} />;
  }
  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={seedColors} />} />
      <Route path="/palette/:id" Component={displayPalette} />
    </Routes>
  );
}

export default App;
