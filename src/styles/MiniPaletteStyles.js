export default {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    height: "200px",
    /* display: "flex",
    flexDirection: "column",
    flex: "auto", */
    "&:hover": {
      cursor: "pointer"
    }
  },
  color: {
    backgroundColor: "gray",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    flex: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    paddingBottom: "20px",
    fontSize: "1rem",
    position: "relative"
  },
  emoji: {
    fontFamily: "NOTO COLOR EMOJI",
    fontSize: "1.5rem",
    marginLeft: "0.5rem"
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    marginBottom: "-3.5px",
    position: "relative",
    backgroundColor: (color) => color
  }
};
