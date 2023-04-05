import logo from './logo.svg';
import './App.css';
import Calender from './Calender';
import AddTask from './AddTask'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CalenderPicker from './CalenderPicker';
import service from './Service'
import { Fragment, useState } from 'react'

// const cors = require("cors");
// app.use(cors());


function App() {

  let [calender, setCalender] = useState({})

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>    
    <div className="App">
      <AddTask></AddTask>
      <CalenderPicker setCalender={setCalender}></CalenderPicker>
      <Calender tasks={calender.tasks}></Calender>
    </div>
  </LocalizationProvider>
  );
}

export default App;
