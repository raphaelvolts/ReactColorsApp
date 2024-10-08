import { Link, useNavigate } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { createUseStyles } from "react-jss";
import styles from "./styles/PaletteListStyles";

const listPageStyles = createUseStyles(styles);

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
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>{links}</div>
      </div>
    </div>
  );
}
