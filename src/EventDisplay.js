import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { EditModalContext } from "./App";
import React, { useContext } from "react";
import { Icon, IconButton, Stack, Typography } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Edit } from "@mui/icons-material";

export default function EventDisplay({ events, day }) {


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

      <IconButton onClick={handleClickOpen}>
        <AssignmentIcon color="secondary"></AssignmentIcon>
      </IconButton>

      <Dialog open={open} onClose={handleClose}>

      <h2>Events Today: {day.format('MM/DD/YYYY')}</h2>


        {events.map((e, i) => {
            return(
                <div key={i} padding="10">

                  <Stack direction={"row"}>
                    <IconButton
                      onClick={() => {
                          setEditTask(e)
                          console.log(e)
                          setEditModalOpen(true)
                      }}
                    >
                    <Edit></Edit>
                    </IconButton>
                        
                    <Typography style={{paddingTop:"3px"}} key={i} fontSize="large">{e.title} (more info here, time, etc.)</Typography>
                  </Stack>
                </div>
                
            )
        })}

        <Button color="secondary" onClick={handleClose}>
            Close
        </Button>
        
      </Dialog>
    </div>
  );
}
