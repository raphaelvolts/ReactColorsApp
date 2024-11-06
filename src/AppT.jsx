import { useState, useEffect, useRef, createRef } from "react";
import {
  useParams,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import generatePalette from "./chromaColorHelper";
import Page from "./TransitionWrapper";

function App() {
  const [format, setFormat] = useState("hex");
  const savedPalettes = JSON.parse(localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  const routes = [
    {
      path: "/",
      element: (
        <PaletteList
          key={location.key}
          palettes={palettes}
          removePalette={removePalette}
        />
      ),
      nodeRef: useRef()
    },
    {
      path: "/palette/new",
      element: (
        <NewPaletteForm
          key={location.key}
          addPalette={addPalette}
          palettes={palettes}
        />
      ),
      nodeRef: useRef()
    },
    { path: "/palette/:id", element: <DisplayPalette />, nodeRef: useRef() },
    {
      path: "/palette/:paletteId/:colorId",
      element: <DisplayPalette />,
      nodeRef: useRef()
    }
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Page routes={routes} />,
      children: routes.map((route) => ({
        index: route.path === "/",
        path: route.path === "/" ? undefined : route.path,
        element: route.element
      }))
    }
  ]);

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
  function DisplayPalette() {
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
    /* replace("/"); */
  }
  function removePalette(paletteId) {
    setPalettes((op) => op.filter((palette) => palette.id !== paletteId));
  }

  return <RouterProvider router={router} />;
}

export default App;

/* const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          element={
            <TransitionGroup style={{ width: "100vw" }}>
              <CSSTransition
                classNames="fade"
                timeout={1000}
                key={location.pathname}
                nodeRef={nodeRef}
              >
                <Outlet context={nodeRef} viewTransition />
              </CSSTransition>
            </TransitionGroup>
          }
        >
          <Route
            path="/"
            element={
              <PaletteList
                key={location.key}
                palettes={palettes}
                removePalette={removePalette}
              />
            }
          />
          <Route
            path="/palette/new"
            element={
              <NewPaletteForm
                key={location.key}
                addPalette={addPalette}
                action={() => redirect("/")}
                palettes={palettes}
              />
            }
          />
          <Route path="/palette/:id" Component={displayPalette} />
          <Route
            path="/palette/:paletteId/:colorId"
            Component={displayPalette}
          />
        </Route>
      </>
    ) */

{
  /* const routes = [
  { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
  { path: '/about', name: 'About', element: <About />, nodeRef: createRef() },
  {
    path: '/contact',
    name: 'Contact',
    element: <Contact />,
    nodeRef: createRef(),
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
])

function Example() {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}
  return (
    <>
      <Navbar bg="light">
        <Nav className="mx-auto">
          {routes.map((route) => (
            <Nav.Link
              key={route.path}
              as={NavLink}
              to={route.path}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              {route.name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
      <Container className="container">
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className="page">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<RouterProvider router={router} />) */
}
