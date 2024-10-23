import { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import generatePalette from "./chromaColorHelper";

function App() {
  const navigate = useNavigate();
  const [format, setFormat] = useState("hex");
  const savedPalettes = JSON.parse(localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  useEffect(() => {
    localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  function handleSnackbar() {
    setSnackbarStatus(false);
  }
  function handleFormat(format) {
    setFormat(format);
    setSnackbarStatus(true);
  }
  function findPalette(id) {
    return palettes.find((palette) => {
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
  function addPalette(newPalette) {
    setPalettes((op) => [...op, newPalette]);
    navigate("/");
  }
  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={palettes} />} />
      <Route
        path="/palette/new"
        element={<NewPaletteForm addPalette={addPalette} palettes={palettes} />}
      />
      <Route path="/palette/:id" Component={displayPalette} />
      <Route path="/palette/:paletteId/:colorId" Component={displayPalette} />
    </Routes>
  );
}

export default App;
