import { Routes, Route, useParams } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import generatePalette from "./chromaColorHelper";

function App() {
  function findPalette(id) {
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  }
  function DisplayPalette() {
    let { id } = useParams();
    return <Palette palette={generatePalette(findPalette(id))} />;
  }
  return (
    <Routes>
      <Route path="/" element={<h1>Palette List goes here</h1>} />
      <Route path="/palette/:id" element={<DisplayPalette />} />
    </Routes>
  );
}

export default App;
