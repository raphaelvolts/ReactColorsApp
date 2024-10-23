import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppBar } from "./AppBar";
import PaletteMetaForm from "./PaletteMetaForm";

export default function NewPaletteFormNav({
  open,
  handleDrawerOpen,
  palettes,
  handlePalette
}) {
  const navigate = useNavigate();
  function handleBack() {
    navigate("/", { relative: "path" });
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        color="default"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "2.5rem"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 0.5
              },
              open && { display: "none" }
            ]}
          >
            <ControlPointIcon fontSize="large" color="action" />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create Your Palette
          </Typography>
        </Toolbar>
        <div>
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{ marginX: "5px" }}
            color="error"
          >
            Go Back
          </Button>
          <PaletteMetaForm palettes={palettes} handlePalette={handlePalette} />
        </div>
      </AppBar>
    </>
  );
}
