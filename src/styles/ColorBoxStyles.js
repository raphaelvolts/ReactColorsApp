import chroma from "chroma-js";
import sizes from "./sizes";

export default {
  ColorBox: {
    width: "20%",
    height: (props) => (props.showLink ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-6px",
    "&:hover $button": {
      opacity: 1
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: (props) => (props.showLink ? "20%" : "50%")
    },
    [sizes.down("md")]: {
      width: "50%",
      height: (props) => (props.showLink ? "10%" : "50%")
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: (props) => (props.showLink ? "5%" : "50%")
    }
  },
  button: {
    width: "100px",
    height: "30px",
    fontSize: "1rem",
    lineHeight: "30px",
    color: (props) =>
      chroma(props.background.hex).luminance() <= 0.08
        ? "white"
        : "rgba(0, 0, 0, 0.6)",
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
    opacity: "0"
  },
  seeMore: {
    background: "rgba(255, 255, 255, 0.1)",
    color: (props) =>
      chroma(props.background.hex).luminance() <= 0.08
        ? "white"
        : "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    lineHeight: "30px",
    width: "60px",
    height: "30px",
    border: "none",
    position: "absolute",
    right: "1px",
    bottom: "1px"
  },
  copyText: {
    color: (props) =>
      chroma(props.background.hex).luminance() <= 0.08
        ? "white"
        : "rgba(0, 0, 0, 0.6)"
  },
  colorName: {
    color: (props) =>
      chroma(props.background.hex).luminance() <= 0.08
        ? "white"
        : "rgba(0, 0, 0, 0.6)"
  },
  boxContainer: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "black",
    padding: "10px",
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0"
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)"
  },
  showOverlay: {
    opacity: "1",
    zIndex: "10",
    position: "absolute",
    transform: "scale(50)"
  },
  copyMsg: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    color: "white",
    transform: "scale(0.1)",
    opacity: "0",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      textAlign: "center",
      background: "rgba(255, 255, 255, 0.1)",
      width: "100%",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase"
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100"
    }
  },
  showMsg: {
    opacity: "1",
    zIndex: "20",
    transform: "scale(1)",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s"
  }
};
