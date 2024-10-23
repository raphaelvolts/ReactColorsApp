export default {
  root: {
    backgroundColor: "navy",
    display: "flex",
    minHeight: "100%",
    height: "inherit",
    flex: "auto",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    boxSizing: "border-box",
    overflow: "scroll"
  },
  container: {
    display: "flex",
    width: "50%",
    /* height: "fit-content", */
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    justifyItems: "stretch",
    flexDirection: "column",
    flexWrap: "wrap"
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
    marginBottom: "30px"
  }
};
