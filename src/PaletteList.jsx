import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import { blue, red } from "@mui/material/colors";
import { createUseStyles } from "react-jss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";

const listPageStyles = createUseStyles(styles);

export default function PaletteList({ palettes, removePalette }) {
  const paletteRefs = useRef([]);
  const [dialog, setDialog] = useState({
    dialogOpen: false,
    deleteID: "",
    paletteName: ""
  });
  const { dialogOpen, deleteID, paletteName } = dialog;
  function handleDialogOpen(id, name) {
    setDialog({ dialogOpen: true, deleteID: id, paletteName: name });
  }
  function handleDialogClose() {
    setDialog({
      dialogOpen: false,
      deleteID: "",
      paletteName: ""
    });
  }

  function handleRemovePalette() {
    removePalette(deleteID);
    handleDialogClose();
  }

  const classes = listPageStyles();
  const navigate = useNavigate();
  function goToPalette(id) {
    navigate(`/palette/${id}`);
  }
  let links = palettes.map((palette, i) => {
    return (
      <CSSTransition
        key={palette.id}
        nodeRef={paletteRefs.current[i]}
        timeout={500}
        classNames="fade"
      >
        <MiniPalette
          key={palette.id}
          palette={palette}
          ref={paletteRefs.current[i]}
          handleDialogOpen={handleDialogOpen}
          navigation={goToPalette}
        />
      </CSSTransition>
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Color Palettes</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>{links}</TransitionGroup>
      </div>
      <Dialog open={dialog.dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete {paletteName}?</DialogTitle>
        <List>
          <ListItem disableGutters>
            <ListItemButton onClick={handleRemovePalette}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                  <DeleteForeverIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={handleDialogClose}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
