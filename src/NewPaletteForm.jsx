import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { Main, DrawerHeader } from "./NewPaletteFormMainNDrawer";
import DraggableColorList from "./DraggableColorList";
import NewPaletteFormNav from "./NewPaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import { createUseStyles } from "react-jss";
import { DRAWER_WIDTH } from "./constants";
import seedColors from "./seedColors";
import styles from "./styles/NewPaletteFormStyles";

const drawerWidth = DRAWER_WIDTH;

const styling = createUseStyles(styles);

export default function NewPaletteForm({ addPalette, palettes }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);

  const classes = styling();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function addNewColor(newColor) {
    setColors((oc) => [...oc, newColor]);
  }

  function handlePalette(paletteName, emoji) {
    const palette = {
      paletteName: paletteName,
      emoji: emoji,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    };
    addPalette(palette);
  }

  function removeColor(colorName) {
    setColors((oc) => oc.filter((color) => color.name !== colorName));
  }

  function handleSort(colors) {
    setColors([...colors]);
  }

  function clearPalette() {
    setColors([]);
  }

  function addRandomColor() {
    const allColors = seedColors.map((palette) => palette.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
    }
    setColors((oc) => [...oc, randomColor]);
  }

  let isPaletteFull = colors.length >= 20;

  return (
    <Box sx={{ display: "flex" }}>
      <NewPaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handlePalette={handlePalette}
        palettes={palettes}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: "end" }}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ width: "100%" }} />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Fill Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="error"
              onClick={clearPalette}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={isPaletteFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          handleSort={handleSort}
        />
      </Main>
    </Box>
  );
}
