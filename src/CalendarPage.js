import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import AddTask from "./AddTask";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarPicker from "./CalendarPicker";
import EditTask from "./EditTask";
import { ReloadCalendarContext, EditModalContext } from "./App";
import { Link } from "react-router-dom";
import AddCalendar from "./AddCalendar";
import { AppBar, Stack } from "@mui/material";
import ResponsiveAppBar from "./AppBar";



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

            <ResponsiveAppBar 
                calendar={calendar}
                setCalendar={setCalendar}
            ></ResponsiveAppBar>
{/* 
            <Link to={"/login"} style={{paddingRight:"10px"}}>Login</Link>
            <Link to={"/register"}>Register</Link>

            <Stack direction={"row"} justifyContent={"center"}>
                <CalendarPicker
                    calendar={calendar}
                    setCalendar={setCalendar}
                ></CalendarPicker>
                <AddCalendar></AddCalendar>
            </Stack> */}

            <div style={{marginTop:"60px"}}>
                <AddTask calendar={calendar}></AddTask>
                <EditTask calendar={calendar}></EditTask>
                <Calendar tasks={calendar.tasks}></Calendar>
            </div>
                

        </LocalizationProvider>
        </EditModalContext.Provider>
        </ReloadCalendarContext.Provider>
    )
}