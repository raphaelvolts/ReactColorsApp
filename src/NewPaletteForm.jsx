import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { Chrome } from "@uiw/react-color";
import chroma from "chroma-js";
import { hexToHsva, hsvaToHex, hsvaToHexa } from "@uiw/color-convert";
import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
          }),
          marginLeft: 0
        }
      }
    ]
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default function NewPaletteForm() {
  /* const theme = useTheme(); */
  const [open, setOpen] = useState(true);
  const [chromeColor, setChromeColor] = useState({
    currentColor: "#123488",
    colors: []
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleColor(newColor) {
    setChromeColor((cc) => ({ ...cc, currentColor: newColor.hsva }));
  }
  function addNewColor() {
    setChromeColor((oc) => ({ ...oc, colors: [...oc.colors, pickedColor] }));
  }
  const pickedColor =
    typeof chromeColor.currentColor !== "object"
      ? chromeColor.currentColor
      : hsvaToHex(chromeColor.currentColor);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2
              },
              open && { display: "none" }
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Create Your Palette</Typography>
        <div>
          <Button variant="contained" color="error">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
            Random Color
          </Button>
        </div>
        <Chrome
          color={chromeColor.currentColor}
          style={{
            float: "left"
          }}
          inputType="hexa"
          placement={false}
          onChange={handleColor}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: pickedColor,
            color:
              chroma(pickedColor).luminance() >= 0.8
                ? "rgba(0,0,0,0.6)"
                : "#fff"
          }}
          onClick={addNewColor}
        >
          Add Color
        </Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {chromeColor.colors.map((color, i) => (
          <DraggableColorBox key={`${color}-i`} color={color} />
        ))}
      </Main>
    </Box>
  );
}
