import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";

const FermenterSaveDialog = ({ btnText, title, message, callback, fermenterid, id }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const no = () => {
    setOpen(false);
  };

  const yes = () => {
    setOpen(false);
    callback(fermenterid, id);
  };

  return (
    <>
      {btnText ? (
        <Button color="secondary" onClick={handleClickOpen} variant="contained" size="small" startIcon={<SaveIcon />}>
          {btnText}
        </Button>
      ) : (
        <IconButton aria-label="save"  onClick={handleClickOpen}>
          <SaveIcon />
        </IconButton>
      )}

      <Dialog open={open} onClose={no} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={no} color="secondary" autoFocus variant="contained">
            No
          </Button>
          <Button onClick={yes} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FermenterSaveDialog;
