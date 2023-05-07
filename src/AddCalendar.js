import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Link } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiColorInput } from "mui-color-input";
import dayjs, { Dayjs } from "dayjs";
import React, { useState, useContext } from "react";
import Service from "./Service";
import { ReloadCalendarContext } from "./App";

export default function AddCalendar({ calendar }) {
  const [title, setTitle] = useState("");


  function handleSubmit(event) {
    event.preventDefault();
    // console.log(title, priority, description)
    let calendar = {
      title
    };
    Service.addCalendar(calendar)
    handleClose();
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
