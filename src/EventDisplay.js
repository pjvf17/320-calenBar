import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { EditModalContext } from "./App";
import React, { useContext } from "react";
import {  IconButton, Stack, Typography, lighten, darken } from "@mui/material";
import {  Edit, EventBusy, EventNote } from "@mui/icons-material";
import AddTask from "./AddTask";
import dayjs from "dayjs";

export default function EventDisplay({ events, day, calendar }) {


    const { editModalOpen, setEditModalOpen, editTask, setEditTask } = useContext(EditModalContext);


  function handleSubmit(event) {
    handleClose();
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <IconButton onClick={handleClickOpen} color={events.length > 0? "secondary": "gray"}>
        {events.length > 0 ? <EventNote></EventNote> : <EventBusy style={{opacity: 0.5}}></EventBusy>}
      </IconButton>

      <Dialog open={open} onClose={handleClose}>

      <h2>Events On {day.format('MMM D, YYYY')}</h2>

        {events.map((e, i) => {
            return(
                <div key={i} padding="10" style={{paddingTop:"8px", background: lighten(e.color, 0.7)}}>

                  <Stack direction={"row"}>
                    <IconButton
                      onClick={() => {
                          setEditTask(e)
                          console.log(e)
                          setEditModalOpen(true)
                      }}
                      style={{color: darken(e.color, 0.3)}}
                    >
                    <Edit></Edit>
                    </IconButton>
                        
                    <Stack>
                    <Typography fontSize="large">{e.title}</Typography>
                    <Typography fontSize="medium">{e.description}</Typography>
                    <Typography fontSize="medium">{dayjs(e.start_date).format("h:mm A")} to {dayjs(e.start_date).add(e.event_duration, "h").format("h:mm A")}</Typography>
                    <Typography fontSize="medium">{e.event_duration + " hours long"}</Typography>
                    </Stack>

                  </Stack>

                </div>

                
                
            )
        })}

        <Stack textAlign={"center"} paddingTop={"20px"}>
          <AddTask calendar={calendar} event={true} defaultDay={day}></AddTask>

          <Button color="secondary" onClick={handleClose}>
              Close
          </Button>
        </Stack>
        
      </Dialog>
    </div>
  );
}
