import { useNavigate } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { createUseStyles } from "react-jss";
import "./PaletteList.css";

const listPageStyles = createUseStyles({
  root: {
    backgroundColor: "navy",
    display: "flex",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    width: "50%",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white"
  },
  palettes: {
    width: "100%",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gap: "5%",
    marginTop: "30px"
  }
});

export default function PaletteList({ palettes }) {
  const classes = listPageStyles();
  const navigate = useNavigate();
  function goToPalette(id) {
    navigate(`/palette/${id}`);
  }
  let links = palettes.map((palette) => {
    return (
      <MiniPalette
        key={palette.id}
        palette={palette}
        navigation={goToPalette}
      />
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Color Palettes</h1>
        </nav>
        <div className={classes.palettes}>{links}</div>
      </div>
    </div>
  );
}
