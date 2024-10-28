import sizes from "./sizes";

export default {
  colorGrid: {
    display: "grid",
    gridTemplateColumns: `repeat(5, 1fr)`,
    gridTemplateRows: `repeat(4, 1fr)`,
    gridGap: 0,
    maxWidth: "100vw",
    width: "100%",
    height: "100%",
    margin: "0 0",
    [sizes.down("lg")]: {
      gridTemplateColumns: `repeat(4, 1fr)`,
      gridTemplateRows: `repeat(5, 1fr)`
    },
    [sizes.down("md")]: {
      gridTemplateColumns: `repeat(2, 1fr)`,
      gridTemplateRows: `repeat(10, 1fr)`
    },
    [sizes.down("sm")]: {
      gridTemplateColumns: `repeat(1, 1fr)`,
      gridTemplateRows: `repeat(20, 1fr)`
    }
  }
};
