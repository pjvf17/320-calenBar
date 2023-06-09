import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Link, Popover, Container } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useContext } from "react";
import Service from "./Service";
import { ReloadCalendarContext, EditModalContext } from "./App";
import { DateTimePicker } from "@mui/x-date-pickers";
import ColorPalettePicker from "./ColorPalettePicker";

export default function EditTask({ calendar }) {
  const { reloadCalendar, setReloadCalendar } = useContext(
    ReloadCalendarContext
  );
  const { editModalOpen, setEditModalOpen, editTask, setEditTask } =
    useContext(EditModalContext);

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(title, priority, description)
    Service.editTask(calendar.id, editTask).then((data) => {
      setReloadCalendar(!reloadCalendar);
    });
    handleClose();
  }

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const colorPopoverHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const colorPopoverHandleClose = () => {
    setAnchorEl(null);
  };

  const colorPopoverOpen = Boolean(anchorEl);
  const colorPopoverId = editModalOpen ? "simple-popover" : undefined;

  // https://www.copycat.dev/blog/material-ui-form/

  return (
    <div>
      <Dialog open={editModalOpen} onClose={handleClose}>
        <DialogContent>
          <h2>
            Edit {editTask.is_event ? "Event" : "Task"}: {editTask.title}
          </h2>

          <form onSubmit={handleSubmit} action={<Link to="/login" />}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Title"
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
                value={editTask.title}
                fullWidth
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Description"
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
                value={editTask.description}
                fullWidth
                required
                multiline
                sx={{ mb: 4 }}
              />
            </Stack>

            <Stack spacing={2} direction="row">
              {editTask.is_event ? (
                <DateTimePicker
                  label="Start Date"
                  value={dayjs(editTask.start_date)}
                  onChange={(newValue) =>
                    setEditTask({ ...editTask, start_date: newValue })
                  }
                ></DateTimePicker>
              ) : (
                <DatePicker
                  label="Start Date"
                  value={dayjs(editTask.start_date)}
                  onChange={(newValue) =>
                    setEditTask({ ...editTask, start_date: newValue })
                  }
                />
              )}

              {editTask.is_event ? (
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Duration"
                  onChange={(e) =>
                    setEditTask({ ...editTask, event_duration: e.target.value })
                  }
                  value={editTask.event_duration}
                  required
                  sx={{ mb: 4 }}
                />
              ) : (
                <Stack spacing={2}>
                  <DatePicker
                    label="Real End Date"
                    value={dayjs(editTask.end_date)}
                    onChange={(newValue) =>
                      setEditTask({ ...editTask, end_date: newValue })
                    }
                  />
                  <DatePicker
                    label="Goal End Date"
                    value={dayjs(editTask.goal_end_date)}
                    onChange={(newValue) =>
                      setEditTask({ ...editTask, goal_end_date: newValue })
                    }
                  />
                </Stack>
              )}
            </Stack>

            <br />
            <br />

            <Stack direction={"row"} spacing={2}>
              {!editTask.is_event && (
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Estimated Time (in hours)"
                  onChange={(e) =>
                    setEditTask({ ...editTask, estimated_time: e.target.value })
                  }
                  value={editTask.estimated_time}
                  required
                  sx={{ mb: 4 }}
                />
              )}

              <Button
                variant="outlined"
                onClick={colorPopoverHandleClick}
                style={{
                  fontSize: "Medium",
                  justifyContent: "center",
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  backgroundColor: editTask.color,
                  color: "white",
                  fontFamily: "Merriweather",
                  width: "11.5em",
                  textAlign: "center",
                  left: "-2px",
                  marginLeft: "5em",
                  height: "3.25em",
                }}
              >
                Color Palette
              </Button>
              <Popover
                id={colorPopoverId}
                open={colorPopoverOpen}
                anchorEl={anchorEl}
                onClose={colorPopoverHandleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Container>
                  <ColorPalettePicker
                    onChange={(e) => setEditTask({ ...editTask, color: e })}
                  />
                </Container>
              </Popover>
            </Stack>

            <br />

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <Button
                  color="secondary"
                  onClick={() =>
                    Service.deleteTask(calendar.id, editTask.id)
                      .then(setReloadCalendar(!reloadCalendar))
                      .then(handleClose())
                  }
                >
                  Delete {editTask.is_event ? "Event" : "Task"}
                </Button>
              </div>
              <div style={{ textAlign: "right" }}>
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
