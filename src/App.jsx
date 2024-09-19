import Palette from "./Palette";
import seedColors from "./seedColors";
import generatePalette from "./chromaColorHelper";

function App() {
  console.log(generatePalette(seedColors[4]));
  return <Palette palette={generatePalette(seedColors[4])} />;
}

export default App;
