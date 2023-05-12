import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { EditModalContext } from "./App";
import React, { useContext } from "react";
import {  IconButton, Stack, Typography } from "@mui/material";
import {  Edit, EventBusy, EventNote } from "@mui/icons-material";
import AddTask from "./AddTask";

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
        {events.length > 0 ? <EventNote></EventNote> : <EventBusy></EventBusy>}
      </IconButton>

      <Dialog open={open} onClose={handleClose}>

      <h2>Events Today: {day.format('MM/DD/YYYY')}</h2>

        {events.map((e, i) => {
            return(
                <div key={i} padding="10" style={{paddingTop:"8px"}}>

                  <Stack direction={"row"}>
                    <IconButton
                      onClick={() => {
                          setEditTask(e)
                          console.log(e)
                          setEditModalOpen(true)
                      }}
                      style={{color:e.color}}
                    >
                    <Edit></Edit>
                    </IconButton>
                        
                    <Stack>
                    <Typography fontSize="large">{e.title}</Typography>
                    <Typography fontSize="medium">{e.description}</Typography>
                    <Typography fontSize="medium">{e.start_date}</Typography>
                    <Typography fontSize="medium">{e.estimated_time}</Typography>
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
