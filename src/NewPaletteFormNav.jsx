import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppBar } from "./AppBar";

export default function NewPaletteFormNav({
  open,
  handleDrawerOpen,
  palettes,
  handlePalette
}) {
  const [newPalette, setNewPalette] = useState({
    paletteName: "",
    isError: false,
    error: { isEmpty: false, notUnique: false }
  });

  const navigate = useNavigate();
  function handleBack() {
    navigate("/", { relative: "path" });
  }

  function handleForm(e) {
    setNewPalette((op) => ({ ...op, paletteName: e.target.value }));
    if (e.target.validity.valid) {
      if (!checkUnique(e.target.value)) {
        handleNotUniqueName();
      } else {
        setNewPalette((op) => ({
          ...op,
          isColorError: false,
          error: { ...op.error, notUniqueColorName: false }
        }));
      }
    } else handleNoName();
  }
  function handleNoName() {
    setNewPalette((op) => ({
      ...op,
      isError: true,
      error: { ...op.error, isEmpty: true }
    }));
  }
  function checkUnique(value) {
    return palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    );
  }
  function handleNotUniqueName() {
    setNewPalette((op) => ({
      ...op,
      isError: true,
      error: { ...op.error, notUnique: true }
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (newPalette.paletteName !== "") {
      handlePalette(newPalette.paletteName);
    } else handleNoName();
  }

  const errorMsgs = {
    isEmpty: "Palette Name is required",
    notUnique: "Palette Name needs to be unique"
  };
  let helperText = "";
  if (newPalette.isError) {
    for (let key in newPalette.error) {
      if (newPalette.error[key]) {
        helperText = errorMsgs[key];
      }
    }
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
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
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              variant="standard"
              placeholder="Palette Name"
              value={newPalette.paletteName}
              onChange={handleForm}
              error={newPalette.isError}
              helperText={helperText}
              name="paletteName"
              required
            />
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ marginX: "5px" }}
              color="error"
            >
              Go Back
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Save Palette
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
