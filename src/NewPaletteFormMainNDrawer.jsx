import { styled, useTheme } from "@mui/material/styles";
import { DRAWER_WIDTH } from "./constants";

const drawerWidth = DRAWER_WIDTH;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme }) => ({
  flexGrow: 1,
  height: "calc(100vh - 64px)",
  width: "100vw",
  padding: 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: "calc(100vw - 400px)",
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
      }
    }
  ]
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));
