import zIndex from "@mui/material/styles/zIndex";

export default {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    height: "200px",
    cursor: "pointer",
    "&:hover $deleteIcon": {
      opacity: 1,
      transform: "scale(1.25)"
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
  },
  deleteIcon: {
    /* width: "30px",
    height: "30px", */
    backgroundColor: "rgba(255,255,255, 0.6)",
    position: "absolute",
    right: "20px",
    top: "5px",
    opacity: 0,
    zIndex: 10
  }
};
