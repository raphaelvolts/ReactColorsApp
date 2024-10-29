import bg from "../assets/bg.svg";
import sizes from "./sizes";
export default {
  "@global": {
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out"
    }
  },
  root: {
    /* backgroundColor: "navy", */
    display: "flex",
    minHeight: "100%",
    height: "inherit",
    flex: "auto",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    boxSizing: "border-box",
    overflow: "scroll",
    /* background by svgbackgrounds.com */
    backgroundColor: "#394BAD",
    backgroundImage: `url(${bg})`
  },
  container: {
    display: "flex",
    width: "50%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    justifyItems: "stretch",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xl")]: {
      width: "80%"
    },
    [sizes.down("xs")]: {
      width: "75%"
    }
  },
  nav: {
    display: "flex",
    width: "100%",
    height: "20px",
    justifyContent: "space-between",
    alignItems: "baseline",
    color: "white",
    "& a": {
      color: "white"
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gap: "2.5rem",
    marginTop: "30px",
    marginBottom: "30px",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gap: "1.5rem"
    }
  }
};
