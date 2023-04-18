import { Fragment, createContext, useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import AddTask from "./AddTask";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarPicker from "./CalendarPicker";
import EditTask from "./EditTask";
import { ReloadCalendarContext, EditModalContext } from "./App";
import { Link } from "react-router-dom";



export default function CalendarPage(){

    let [calendar, setCalendar] = useState({ tasks: [] });
    let [reloadCalendar, setReloadCalendar] = useState(false);
    let [editModalOpen, setEditModalOpen] = useState(false);
    let [editTask, setEditTask] = useState({});

    return(
        <ReloadCalendarContext.Provider
            value={{ reloadCalendar, setReloadCalendar }}
         >
        <EditModalContext.Provider
            value={{ editModalOpen, setEditModalOpen, editTask, setEditTask }}
        >
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Link to={"/login"} style={{paddingRight:"10px"}}>Login</Link>
            <Link to={"/register"}>Register</Link>

            <CalendarPicker
                calendar={calendar}
                setCalendar={setCalendar}
            ></CalendarPicker>
            
            <AddTask calendar={calendar}></AddTask>
            <EditTask calendar={calendar}></EditTask>
            <Calendar tasks={calendar.tasks}></Calendar>

        </LocalizationProvider>
        </EditModalContext.Provider>
        </ReloadCalendarContext.Provider>
    )
}