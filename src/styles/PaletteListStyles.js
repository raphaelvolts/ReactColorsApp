export default {
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
    alignItems: "baseline",
    color: "white",
    "& a": {
      color: "white"
    }
  },
  palettes: {
    width: "100%",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gap: "5%",
    marginTop: "30px"
  }
};
