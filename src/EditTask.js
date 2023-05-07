import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Stack, Link } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiColorInput } from 'mui-color-input'
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import Service from './Service';
import { ReloadCalendarContext, EditModalContext } from './App';

export default function EditTask({calendar}) {
  const { reloadCalendar, setReloadCalendar } = useContext(ReloadCalendarContext)
  const { editModalOpen, setEditModalOpen, editTask, setEditTask } = useContext(EditModalContext)


  function handleSubmit(event) {
      event.preventDefault();
      // console.log(title, priority, description) 
        Service.editTask(calendar.id, editTask).then(data => {
        setReloadCalendar(!reloadCalendar)
      })
      handleClose()
  }

  const handleClose = () => {
    setEditModalOpen(false)
  };

// https://www.copycat.dev/blog/material-ui-form/

  return (
    <div>
      <Dialog open={editModalOpen} onClose={handleClose}>

        <DialogContent>

          <h2>Edit Task: {editTask.title}</h2>

          <form onSubmit={handleSubmit} action={<Link to="/login" />}>

              <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                  <TextField
                      type="text"
                      variant='outlined'
                      color='secondary'
                      label="Title"
                      onChange={e => setEditTask({...editTask, title: e.target.value})}
                      value={editTask.title}
                      fullWidth
                      required
                  />
                  <TextField
                      type="text"
                      variant='outlined'
                      color='secondary'
                      label="Priority"
                      onChange={e => setEditTask({...editTask, priority: e.target.value})}
                      value={editTask.priority}
                      fullWidth
                      required
                  />
              </Stack>

              <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Description"
                  onChange={e => setEditTask({...editTask, description: e.target.value})}
                  value={editTask.description}
                  fullWidth
                  required
                  multiline
                  sx={{mb: 4}}
              />

              <Stack spacing={2} direction="row">
                <DatePicker 
                  label="Start Date"
                  value={dayjs(editTask.start_date)}
                  onChange={(newValue) => setEditTask({...editTask, start_date: newValue})}
                />
                <DatePicker 
                  label="End Date"
                  value={dayjs(editTask.end_date)}
                  onChange={(newValue) => setEditTask({...editTask, end_date: newValue})}
                />
                <DatePicker 
                  label="Completion Goal Date"
                  value={dayjs(editTask.goalEndDate)}
                  onChange={(newValue) => setEditTask({...editTask, goalEndDate: newValue})}
                />
              </Stack>

              <br/>
              <br/>

              <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Estimated Time (in hours)"
                  onChange={e => setEditTask({...editTask, estimated_time: e.target.value})}
                  value={editTask.estimated_time}
                  required
                  sx={{mb: 4}}
              />

              <MuiColorInput value={editTask.color} onChange={(newColor) => setEditTask({...editTask, color: newColor})} />

              <br/>

              <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
                <div style={{textAlign: "left"}}>
                  <Button color = "secondary" onClick={() => Service.deleteTask(calendar.id, editTask.id).then(setReloadCalendar(!reloadCalendar)).then(handleClose())}>Delete Task</Button>
                </div>
                <div style={{textAlign:"right"}}>
                  <Button color = "primary" type="submit">Submit</Button>
                  <Button color = "secondary" onClick={handleClose}>Cancel</Button>
                </div>
              </div>

          </form>  
        </DialogContent>
      </Dialog>
    </div>
  );
}
