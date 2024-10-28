import sizes from "./sizes";
export default {
  palette: {
    height: "100%",
    display: "flex",
    flex: "auto",
    flexDirection: "column"
  },
  colors: {
    height: "90%"
  },
  buttonContainer: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-6px",
    backgroundColor: "black",
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
  },
  button: {
    width: "100px",
    height: "30px",
    fontSize: "1rem",
    lineHeight: "30px",
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    outline: "none",
    border: "none",
    background: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    opacity: "1"
  },
  PaletteFooter: {
    height: "5dvh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "500"
  },
  footerEmoji: {
    fontFamily: "NOTO COLOR EMOJI",
    fontSize: "1.5rem",
    margin: "0 1rem"
  }
};
