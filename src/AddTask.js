import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Stack, Link } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiColorInput } from 'mui-color-input'
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useContext } from 'react';
import Service from './Service';
import { ReloadCalendarContext } from './App';

export default function AddTask({calendar}) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs().add(1, 'd'))
  const [estimateTime, setEstimateTime] = useState(1)
  const [color, setColor] = React.useState('#ffffff')

  const { reloadCalendar, setReloadCalendar } = useContext(ReloadCalendarContext)

  function handleSubmit(event) {
      event.preventDefault();
      // console.log(title, priority, description) 
      let task = {
        title: title,
        priority: priority,
        description: description,
        start_date: startDate,
        end_date: endDate,
        estimated_time: estimateTime,
        color
      }
      Service.addTask(calendar.id, task).then(data => {
        setReloadCalendar(!reloadCalendar)
      })
      handleClose()
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle('')
    setPriority('')
    setDescription('')
    setStartDate(dayjs())
    setEndDate(dayjs().add(1,'d'))
    setEstimateTime(1)
    setColor('#ffffff')
    setOpen(false);
  };

// https://www.copycat.dev/blog/material-ui-form/

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Add Task</DialogTitle> */}
        <DialogContent>
        <h2>Add Task</h2>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Title"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Priority"
                        onChange={e => setPriority(e.target.value)}
                        value={priority}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Description"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    fullWidth
                    required
                    multiline
                    sx={{mb: 4}}
                />
                <Stack spacing={2} direction="row">
                  <DatePicker 
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                  <DatePicker 
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </Stack>
                <br/>
                <br/>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Estimated Time (in hours)"
                    onChange={e => setEstimateTime(e.target.value)}
                    value={estimateTime}
                    required
                    sx={{mb: 4}}
                />
                <MuiColorInput value={color} onChange={(newColor) => setColor(newColor)} />
                <br/>
                <div style={{textAlign:"right"}}>
                  <Button color = "primary" type="submit">Submit</Button>
                  <Button color = "secondary" onClick={handleClose}>Cancel</Button>
                </div>
            </form>  
        </DialogContent>
      </Dialog>
    </div>
  );
}
