import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import generatePalette from "./chromaColorHelper";

function App() {
  const [format, setFormat] = useState("hex");
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  function handleSnackbar() {
    setSnackbarStatus(false);
  }
  function handleFormat(format) {
    setFormat(format);
    setSnackbarStatus(true);
  }
  function findPalette(id) {
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  }
  function displayPalette() {
    let params = useParams();
    if (params.id) {
      let { id } = params;
      return (
        <Palette
          palette={generatePalette(findPalette(id))}
          format={format}
          handleFormat={handleFormat}
          snackbarStatus={snackbarStatus}
          handleSnackbar={handleSnackbar}
        />
      );
    } else {
      let { paletteId, colorId } = params;
      return (
        <SingleColorPalette
          palette={generatePalette(findPalette(paletteId))}
          colorId={colorId}
          format={format}
          handleFormat={handleFormat}
          snackbarStatus={snackbarStatus}
          handleSnackbar={handleSnackbar}
        />
      );
    }
  }
  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={seedColors} />} />
      <Route path="/palette/:id" Component={displayPalette} />
      <Route path="/palette/:paletteId/:colorId" Component={displayPalette} />
    </Routes>
  );
}

export default App;
