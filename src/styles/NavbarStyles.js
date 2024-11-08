export default {
  Navbar: {
    display: "flex",
    height: "6dvh",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "black"
    }
  },
  slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent"
    },
    "& .rc-slider-rail": {
      height: "8px"
    },
    "& .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:focus, .rc-slider-handle:focus-visible, .rc-slider-handle-click-focused:focus, .rc-slider-handle:active, .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging":
      {
        backgroundColor: "green",
        outline: "none",
        border: "2px solid green",
        boxShadow: "none",
        width: "13px",
        height: "13px",
        marginTop: "-3px"
      }
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem"
  }
};
