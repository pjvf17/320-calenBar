import { useContext, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar';
import AddTask from './AddTask'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CalendarPicker from './CalendarPicker';
import service from './Service'
import { Fragment, useState } from 'react'

// const cors = require("cors");
// app.use(cors());

export const ReloadCalendarContext = createContext({reloadCalendar: false, setReloadCalendar: () => {}})

function App() {
  let [calendar, setCalendar] = useState({tasks: []})
  let [reloadCalendar, setReloadCalendar] = useState(false)

  return (
    <ReloadCalendarContext.Provider value={{reloadCalendar, setReloadCalendar}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>    
      <div className="App">
        <AddTask calendar={calendar}></AddTask>
        <CalendarPicker setCalendar={setCalendar}></CalendarPicker>
        <Calendar tasks={calendar.tasks}></Calendar>
      </div>
      </LocalizationProvider>
    </ReloadCalendarContext.Provider>
  );
}

export default App;
