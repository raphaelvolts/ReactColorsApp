import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { Main, DrawerHeader } from "./NewPaletteFormMainNDrawer";
import { TextField } from "@mui/material";
import { Chrome } from "@uiw/react-color";
import chroma from "chroma-js";
import { hexToHsva, hsvaToHex, hsvaToHexa } from "@uiw/color-convert";
import DraggableColorList from "./DraggableColorList";
import NewPaletteFormNav from "./NewPaletteFormNav";

const drawerWidth = 400;

export default function NewPaletteForm({ addPalette, palettes }) {
  /* const theme = useTheme(); */
  const [open, setOpen] = useState(true);
  const [chromeColor, setChromeColor] = useState({
    currentColor: "#123488",
    colorName: "",
    isError: false,
    error: {
      isEmpty: false,
      notUniqueColorName: false,
      notUniqueColor: false
    },
    colors: palettes[0].colors
  });

  const errorMsgs = {
    isEmpty: "Name is required",
    notUniqueColorName: "Color Name needs to be unique",
    notUniqueColor: "Color needs to be unique"
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleColor(newColor) {
    setChromeColor((cc) => ({ ...cc, currentColor: newColor.hsva }));
  }

  function checkUnique(value) {
    return chromeColor.colors.every(
      ({ name }) => name.toLowerCase() !== value.toLowerCase()
    );
  }

  function handleNoName() {
    setChromeColor((oc) => ({
      ...oc,
      isError: true,
      error: { ...oc.error, isEmpty: true }
    }));
  }

  function handleNotUniqueName() {
    setChromeColor((oc) => ({
      ...oc,
      isError: true,
      error: { ...oc.error, notUniqueColorName: true }
    }));
  }

  function handleNotUniqueColor() {
    setChromeColor((oc) => ({
      ...oc,
      isError: true,
      error: { ...oc.error, notUniqueColor: true }
    }));
  }

  function handleForm(e) {
    setChromeColor((oc) => ({ ...oc, colorName: e.target.value }));
    if (e.target.validity.valid) {
      if (!checkUnique(e.target.value, e.target.name)) {
        handleNotUniqueName();
      } else {
        setChromeColor((oc) => ({
          ...oc,
          isError: false,
          error: { ...oc.error, notUniqueColorName: false }
        }));
      }
    } else handleNoName();
  }

  function addNewColor(e) {
    e.preventDefault();
    if (chromeColor.colorName !== "") {
      if (checkUnique(chromeColor.colorName)) {
        const checkUniqueColor = chromeColor.colors.every(
          ({ color }) => color !== pickedColor
        );
        if (checkUniqueColor) {
          const color = {
            name: chromeColor.colorName,
            color: pickedColor
          };
          setChromeColor((oc) => ({
            ...oc,
            colorName: "",
            colors: [...oc.colors, color],
            isError: false
          }));
        } else handleNotUniqueColor();
      } else handleNotUniqueName();
    } else handleNoName();
  }

  function handlePalette(paletteName) {
    if (paletteName !== "") {
      const palette = {
        paletteName: paletteName,
        id: paletteName.toLowerCase().replace(/ /g, "-"),
        colors: chromeColor.colors
      };
      addPalette(palette);
    }
  }

  function removeColor(colorName) {
    setChromeColor((occ) => ({
      ...occ,
      colors: occ.colors.filter((color) => color.name !== colorName)
    }));
  }

  function handleSort(colors) {
    setChromeColor((occ) => ({ ...occ, colors: [...colors] }));
  }

  function clearPalette() {
    setChromeColor((occ) => ({ ...occ, colors: [] }));
  }

  function addRandomColor() {
    const allColors = palettes.map((palette) => palette.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[rand];
    setChromeColor((occ) => ({ ...occ, colors: [...occ.colors, randomColor] }));
  }

  let helperText = "";

  const pickedColor =
    typeof chromeColor.currentColor !== "object"
      ? chromeColor.currentColor
      : hsvaToHex(chromeColor.currentColor);
  if (chromeColor.isError) {
    for (let key in chromeColor.error) {
      if (chromeColor.error[key]) {
        helperText = errorMsgs[key];
      }
    }
  }

  let isPaletteFull = chromeColor.colors.length >= 20;

  return (
    <Box sx={{ display: "flex" }}>
      <NewPaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handlePalette={handlePalette}
        palettes={palettes}
        drawerWidth={drawerWidth}
      />
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
          <Button variant="contained" color="error" onClick={clearPalette}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addRandomColor}
            disabled={isPaletteFull}
          >
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
        <Box component="form" onSubmit={addNewColor} noValidate>
          <TextField
            value={chromeColor.colorName}
            onChange={handleForm}
            name="colorName"
            required
            error={chromeColor.isError}
            helperText={helperText}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={isPaletteFull}
            sx={{
              backgroundColor: isPaletteFull ? "grey" : pickedColor,
              color: isPaletteFull
                ? "rgba(0,0,0,0.6)"
                : chroma(pickedColor).luminance() >= 0.8
                ? "rgba(0,0,0,0.6)"
                : "#fff"
            }}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={chromeColor.colors}
          removeColor={removeColor}
          handleSort={handleSort}
        />
      </Main>
    </Box>
  );
}
