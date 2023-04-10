import { useContext, createContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./Calendar";
import AddTask from "./AddTask";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarPicker from "./CalendarPicker";
import service from "./Service";
import { Fragment, useState } from "react";
import EditTask from "./EditTask";

// const cors = require("cors");
// app.use(cors());

export const ReloadCalendarContext = createContext({
  reloadCalendar: false,
  setReloadCalendar: () => {},
});

export const EditModalContext = createContext({
  editModalOpen: false,
  setEditModalOpen: () => {},
  editTask: {},
  setEditTask: () => {},
});

function App() {
  let [calendar, setCalendar] = useState({ tasks: [] });
  let [reloadCalendar, setReloadCalendar] = useState(false);
  let [editModalOpen, setEditModalOpen] = useState(false);
  let [editTask, setEditTask] = useState({});

  return (
    <ReloadCalendarContext.Provider
      value={{ reloadCalendar, setReloadCalendar }}
    >
    <EditModalContext.Provider
      value={{ editModalOpen, setEditModalOpen, editTask, setEditTask }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <AddTask calendar={calendar}></AddTask>
          <EditTask calendar={calendar}></EditTask>
          <CalendarPicker
            calendar={calendar}
            setCalendar={setCalendar}
          ></CalendarPicker>
          <Calendar tasks={calendar.tasks}></Calendar>
        </div>
      </LocalizationProvider>
    </EditModalContext.Provider>
    </ReloadCalendarContext.Provider>
  );
}

export default App;
