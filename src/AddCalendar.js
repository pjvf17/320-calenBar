import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Link } from "@mui/material";
import React, { useState } from "react";
import Service from "./Service";

export default function AddCalendar({ calendar }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")


  function handleSubmit(event) {
    event.preventDefault();
    // console.log(title, priority, description)
    let calendar = {
      title,
      description
    };
    Service.addCalendar(calendar)
    handleClose();
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDescription("")
    setTitle("");
    setOpen(false);
  };

  // https://www.copycat.dev/blog/material-ui-form/

  return (
    <div>

      <Button variant="contained" style={{fontSize:"small"}} onClick={handleClickOpen}>Add Calendar</Button>

      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Add Task</DialogTitle> */}
        <DialogContent>
          <h2>Add Calendar: {title}</h2>
          <form onSubmit={handleSubmit} action={<Link to="/login" />}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                fullWidth
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                fullWidth
                required
              />
            <div style={{ textAlign: "right" }}>
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
