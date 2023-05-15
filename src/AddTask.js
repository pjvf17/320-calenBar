import {
  Stack,
  Link,
  Switch,
  Dialog,
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { MuiColorInput } from "mui-color-input";
import dayjs, { Dayjs } from "dayjs";
import React, { useState, useContext } from "react";
import Service from "./Service";
import { ReloadCalendarContext } from "./App";

export default function AddTask({ calendar, event, defaultDay }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(defaultDay === undefined? dayjs() : dayjs(defaultDay));
  const [endDate, setEndDate] = useState(dayjs().add(1, "d"));
  const [goalEndDate, setGoalEndDate] = useState(dayjs().add(1, "d"));
  const [estimateTime, setEstimateTime] = useState(1);
  const [color, setColor] = React.useState("#0096FF");
  const [matchGoalToReal, setMatchGoalToReal] = useState(true)
  const [isEvent, setIsEvent] = useState(event);
  const [eventDuration, setEventDuration] = useState(-1);

  const { reloadCalendar, setReloadCalendar } = useContext(
    ReloadCalendarContext
  );

  function handleSubmit(event) {
    event.preventDefault();
    let task = {
      title: title,
      priority: priority,
      description: description,
      start_date: startDate,
      end_date: endDate,
      estimated_time: estimateTime,
      is_event: isEvent,
      event_duration: eventDuration,
      color,
      goalEndDate
    };
    Service.addTask(calendar.id, task).then((data) => {
      setReloadCalendar(!reloadCalendar);
    });
    handleClose();
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle("");
    setPriority("");
    setDescription("");
    setStartDate(defaultDay === undefined? dayjs() : defaultDay);
    setEndDate(dayjs().add(1, "d"));
    setGoalEndDate(dayjs().add(1, "d"));
    setMatchGoalToReal(true)
    setEstimateTime(1);
    setColor("#0096FF");
    setOpen(false);
    setIsEvent(event);
    setEventDuration(1);
  };

  // https://www.copycat.dev/blog/material-ui-form/

  return (
    <div>
    
      <Button
        variant="contained"
        style={{ fontSize: "large", justifyContent:"center", borderRadius: "20px", 
                 backgroundColor: "#1976d2", textTransform: "capitalize", 
                 fontFamily: "Merriweather", width: "11.5em", left: "-10px" }}
        onClick={handleClickOpen}
      >
        Add {event? "Event" : "Task"} To {defaultDay === undefined? calendar.title : defaultDay.format('MM/DD/YYYY')}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

          {isEvent? <h2>Add Event: {title}</h2> : <h2>Add Task: {title}</h2>}

          <form onSubmit={handleSubmit} action={<Link to="/login" />}>

            <FormControlLabel
                label="One Time Event"
                control={<Checkbox
                  checked={isEvent}
                  onChange={() => setIsEvent(!isEvent)}
                  size="small"
                ></Checkbox>}
              />  

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
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
                multiline
                sx={{ mb: 4 }}
              />
            </Stack>


              {isEvent ?
              <div>
                <Stack spacing={2} direction="row">
                    <DateTimePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                    />
                    <TextField
                      id="outlined-number"
                      label="Duration (in hours)"
                      type="number"
                      inputProps={{ min: 0 }} 
                      onChange={(newValue) => setEventDuration(newValue)}
                      required
                    />
                </Stack>
              </div>
              : <div>
                <Stack spacing={2} direction="row">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => {setEndDate(newValue); 
                                          if(matchGoalToReal){setGoalEndDate(newValue)}}}
                  />
                  </Stack>
                  <br/>
                  <Stack spacing={2} direction="row">
                    <DatePicker
                        label="Goal End Date"
                        value={goalEndDate}
                        onChange={(newValue) => {setGoalEndDate(newValue); 
                                                  setMatchGoalToReal(false)}}
                      />
                    <FormControlLabel
                        label="Match Goal to Real End Date"
                        control={<Checkbox
                          checked={matchGoalToReal}
                          onChange={() => {if(!matchGoalToReal){setGoalEndDate(endDate);} 
                                            setMatchGoalToReal(!matchGoalToReal);}}
                          size="small"
                        ></Checkbox>}
                      />  

                  </Stack>
              </div>
              }


            <br />
            <br></br>

            <Stack direction={"row"} spacing={2}>
              {(!isEvent) && 
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Estimated Time (in hours)"
                onChange={(e) => setEstimateTime(e.target.value)}
                value={estimateTime}
                required
                sx={{ mb: 4 }}
              />
              }

              <MuiColorInput
                label={"color"}
                value={color}
                onChange={(newColor) => setColor(newColor)}
              />
            </Stack>

            <br />

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
