import { useState, useEffect, useRef, forwardRef } from "react";
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  Outlet
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import generatePalette from "./chromaColorHelper";

function App() {
  const nodeRef = useRef(Array.from({ length: 4 }));
  const locater = location.pathname.split("/");
  console.log(locater.length, locater);
  let passRef = nodeRef[0];
  if (locater.length >= 3) {
    if (locater.length > 3) passRef = nodeRef[3];
    else if (locater[2] === "new") passRef = nodeRef[1];
    else passRef = nodeRef[2];
  }
  const navigate = useNavigate();
  const [format, setFormat] = useState("hex");
  const savedPalettes = JSON.parse(localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  useEffect(() => {
    localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  useEffect(() => {
    if (locater.length >= 3) {
      if (locater.length > 3) passRef = nodeRef[3];
      else if (locater[2] === "new") passRef = nodeRef[1];
      else passRef = nodeRef[2];
    }
  }, [location.pathname]);

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
  function DisplayPalette() {
    let params = useParams();
    console.log(location.pathname);
    console.log(nodeRef);
    if (params.id) {
      let { id } = params;
      return (
        <div
          ref={nodeRef[2]}
          /* className="fade" */
          style={{ width: "100%", height: "100%" }}
        >
          <Palette
            palette={generatePalette(findPalette(id))}
            format={format}
            handleFormat={handleFormat}
            snackbarStatus={snackbarStatus}
            handleSnackbar={handleSnackbar}
          />
        </div>
      );
    } else {
      let { paletteId, colorId } = params;
      return (
        <div
          ref={nodeRef[3]}
          /* className="fade" */
          style={{ width: "100%", height: "100%" }}
        >
          <SingleColorPalette
            palette={generatePalette(findPalette(paletteId))}
            colorId={colorId}
            format={format}
            handleFormat={handleFormat}
            snackbarStatus={snackbarStatus}
            handleSnackbar={handleSnackbar}
          />
        </div>
      );
    }
  }
  function addPalette(newPalette) {
    setPalettes((op) => [...op, newPalette]);
    navigate("/");
  }
  function removePalette(paletteId) {
    setPalettes((op) => op.filter((palette) => palette.id !== paletteId));
  }
  return (
    <Routes>
      <Route
        element={
          <TransitionGroup style={{ width: "100%", height: "100%" }}>
            <CSSTransition
              classNames="fade"
              timeout={5000}
              key={location.pathname}
              nodeRef={passRef}
            >
              {/*  <div
                ref={passRef}
                
                style={{ width: "100%", height: "100%" }}
              > */}
              <Outlet />
              {/* </div> */}
            </CSSTransition>
          </TransitionGroup>
        }
      >
        <Route
          path="/"
          element={
            <div
              ref={nodeRef[0]}
              /* className="fade" */
              style={{ width: "100%", height: "100%" }}
            >
              <PaletteList palettes={palettes} removePalette={removePalette} />
            </div>
          }
        />
        <Route
          path="/palette/new"
          element={
            <div
              ref={nodeRef[1]}
              /* className="fade" */
              style={{ width: "100%", height: "100%" }}
            >
              <NewPaletteForm addPalette={addPalette} palettes={palettes} />
            </div>
          }
        />
        <Route path="/palette/:id" element={<DisplayPalette />} />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<DisplayPalette />}
        />
      </Route>
    </Routes>
  );
}

export default App;
