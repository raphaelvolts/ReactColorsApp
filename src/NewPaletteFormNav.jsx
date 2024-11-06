import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { AppBar } from "./AppBar";
import { createUseStyles } from "react-jss";
import PaletteMetaForm from "./PaletteMetaForm";
import NewPaletteFormNavStyles from "./styles/NewPaletteFormNavStyles";

const styles = createUseStyles(NewPaletteFormNavStyles);

export default function NewPaletteFormNav({
  open,
  handleDrawerOpen,
  palettes,
  handlePalette
}) {
  const classes = styles();
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
        className={classes.appBar}
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
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            onClick={handleBack}
            className={classes.button}
            color="error"
          >
            Go Back
          </Button>
          <PaletteMetaForm
            classes={classes.button}
            palettes={palettes}
            handlePalette={handlePalette}
          />
        </div>
      </AppBar>
    </>
  );
}
