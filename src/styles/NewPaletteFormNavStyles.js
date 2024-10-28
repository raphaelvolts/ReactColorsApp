import sizes from "./sizes";
export default {
  appBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "2.5rem",
    [sizes.down("xs")]: {
      paddingRight: "0.5rem"
    }
  },
  buttonContainer: {
    marginRight: "1rem",
    [sizes.down("xs")]: {
      width: "50%",
      marginRight: "0.2rem"
    }
  },
  button: {
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      fontSize: "0.5rem",
      margin: "0 0.2rem",
      padding: "0.3rem"
    }
  }
};
