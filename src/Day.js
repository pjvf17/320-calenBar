import React, { useContext } from "react"
import {Button, Grid, Stack, Tooltip, Typography, darken, Box } from "@mui/material"
import dayjs from "dayjs"
import isBetween from 'dayjs/plugin/isBetween'
import { EditModalContext } from "./App"
import EventDisplay from "./EventDisplay"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'

const weekDayStyles = {
    // height: "6em",
    textAlign: "left",
    borderTop: "1px solid #9F9F9F",
    borderLeft: "1px solid #9F9F9F",
    
}

const weekendDayStyles = {
    // height: "6em",
    textAlign: "left",
    borderTop: "1px solid #9F9F9F",
}


const handleVerticalBorders = (num) => {
    if (num === 0) {
        return {
            textAlign: "left",
            borderTop: "1px solid #9F9F9F",
        }
    } else {
        return {
            textAlign: "left",
            borderTop: "1px solid #9F9F9F",
            borderLeft: "1px solid #9F9F9F",
        }
    }
}

dayjs.extend(isBetween)

export default function Day(props){

    // function to get thickness of top numStacks tasks on the current day
    // numStacks accepts any positive integer
    // min accepts any positive integer <= pixelSpace/numStacks
    function getThickness(min, numStacks, pixelSpace){
        //queue datastructure
        let thickness = [];
        // loop over all tasks in week
        for(const task of props.tasks){
            if(task.is_event){
                continue
            }
            // grab important variables
            let start = dayjs(task.start_date);
            let end = dayjs(task.end_date);
            let today = dayjs(props.day);
            let timeToComplete = task.estimated_time
            // if task is on the current day
            if(today.isBetween(start, end, "day", "[]") && props.day !== 0){
                let daysRemaining = end.diff(today, 'day');
                // make the value according the the following algorithm
                let value = timeToComplete/(daysRemaining+1);
                // add thickness to the queue
                thickness.push(value);
            }
        }
        // find top numStacks
        let top = [...thickness].sort((a, b) => b - a).slice(0, numStacks);
        // zero out any thickness not in top numStacks
        thickness = thickness.map((t)=> (top.includes(t))? t : 0);
        let sum = thickness.reduce((sum, t) => sum + t, 0);
        // find pixel value thickness
        thickness = thickness.map((t)=>(Math.floor((t/sum)*pixelSpace)));
        // any thickness not zeroed out and less than min set to 20
        thickness = thickness.map((t)=>t < min && t > 0 ? min : t);
        //find remainder for fixing
        let remainder = pixelSpace - thickness.reduce((sum, t)=>sum+t, 0) - 1;
        if(thickness.every((t)=>t===0)){
            return [0];
        }
        let i = 0;
        while(remainder > 0){
            if(thickness[i] > 0){
                thickness[i] += 1;
                remainder -= 1;
            }
            if(i >= thickness.length) i = -1;
            i++;
        }
        i = 0;
        while(remainder < 0){
            if(thickness[i] > 0){
                thickness[i] -= 1;
                remainder += 1;
            }
            if(i >= thickness.length) i = -1;
            i++;
        }
        return thickness;
    }

    function getPriorityList(){
        let priority = []
        for(const task of props.tasks){
            if(task.is_event){
                continue
            }
            // grab important variables
            let start = dayjs(task.start_date);
            let end = dayjs(task.end_date);
            let today = dayjs(props.day);
            let timeToComplete = task.estimated_time
            // if task is on the current day
            if(today.isBetween(start, end, "day", "[]") && props.day !== 0){
                let daysRemaining = end.diff(today, 'day');
                // make the value according the the following algorithm
                let value = timeToComplete/(daysRemaining+1);
                // add thickness to the queue
                priority.push({title:task.title, value: value});
            }
        }
        priority.sort((a, b) => b.value - a.value);
        priority = priority.map((t) => t.title);
        return priority;
    }
    function formatPrioList(priority){
        let string = "";
        for(let i = 1; i <= priority.length; i++){
            string += i + ": " + priority[i-1] + "\n";
        }
        return string;
    }

    function getEvents(){
        let newEvents = []
        for(const task of props.tasks){
            if(task.is_event && dayjs(props.day).isSame(task.start_date, "day")){
                newEvents.push(task)
            }
        }
       return newEvents
    }

    function getNumTasks(){
        let num = 0
        for(const task of props.tasks){
            if(!task.is_event){
                num++
            }
        }
        return num
    }

    function getNumTasksToday(){
        let num = 0
        let d = dayjs(props.day) 
        for(const task of props.tasks){
            if(!task.is_event && d.isBetween(task.start_date, task.end_date, "day", "[]")){
                num++
            }
        }
        return num
    }

    let numTasks = getNumTasks();
    let taskToday = getNumTasksToday();
    let thickness = [];
    let events = [];
    let prioString = "";
    if(props.tasks.length > 0){
        thickness = getThickness(15, 5, 100);
        events = getEvents();
        prioString = formatPrioList(getPriorityList());
    }


    const { editModalOpen, setEditModalOpen, editTask, setEditTask } = useContext(EditModalContext);
    return(
        // Each day is a grid item surrounded by a border

        <Grid item xs = {1} sx={ handleVerticalBorders(props.dayOfWeek) } position={"relative"}>
            {taskToday > 0 ? 
                (
                <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>{prioString}</div>}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant="dayNumber" paddingTop={1}>{props.day==="0"? <br></br> : props.day.date()}</Typography>
                        {props.day !== "0"? <EventDisplay events={events} day={dayjs(props.day)} calendar={props.calendar}></EventDisplay> : <br></br>}
                    </Box>
                </Tooltip>) : 
                (
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant="dayNumber" paddingTop={1}>{props.day==="0"? <br></br> : props.day.date()}</Typography>
                    {props.day !== "0"? <EventDisplay events={events} day={dayjs(props.day)} calendar={props.calendar}></EventDisplay> : <br></br>}
                </Box>)  
            }
            
            {/* This displays the current day of the month */}


            <div>
            {/* Create a line for each task */}
            {props.tasks.map((t, i)=> 

            {
                /* A new djs object */
                let d = dayjs(props.day) 

                /* Figure out whether or not to show the badge (start of week, start of month, or start of task) */
                let showBage = props.day !== "0" && thickness[0] > 0 && (d.day() === "0" || d.date() === 1 || d.isSame(t.start_date, 'day') || d.isSame(t.end_date, 'day') || props.dayOfWeek === 0)
                /* figure out whether or not to show end indicator (end of task) */
                let showEnd = props.day !== "0" && thickness[0] && d.isSame(t.end_date, 'day');
                /* figure out whether or not to show start indicator (end of task) */
                let showStart = props.day !== "0" && thickness[0] && d.isSame(t.start_date, 'day');
                /* figure out whether or not to show start indicator (end of task) */
                let showAfterGoal = props.day !== "0" && thickness[0] && d.isBetween(t.end_date, t.goal_end_date, "day", "[)");
                /* If tasks is today, draw visible line, otherwise make it invisible */
                if(!t.is_event && d.isBetween(t.start_date, t.end_date, "day", "[]")){

                    let primary = showBage ? t.color : "transparent"
                    let borderColor = showBage ?  darken(t.color, 0.3) : "transparent"
                    let textColor = showBage ? "black" : "transparent"
                    let endFill = showEnd ? "black": "transparent"
                    let startFill = showStart ? "black": "transparent"

                    return (
                        <div key={i} onClick={() => {
                            setEditTask(t)
                            console.log(t)
                            setEditModalOpen(true)
                        }}>
                            {/* Fancy tooltip that appears when you hover */}
                            <Tooltip title={t.description}>
                                {/* line thickness determined by getThickness function (zindex used to accomodate badge) */}
                                <div style={{height: thickness.shift() + "px", background: t.color, position: "relative"}}>
                                    {/* button looked better than most things I tested */}
                                    <Button style={{color: textColor, background: primary, border: "3px solid " + borderColor, fontSize: "40%", fontWeight: "bold", textAlign: "center", height: "13px", width: "50%", bottom: "0px", left:"25%", position: "absolute"}}>{t.title}</Button>
                                    {/* Due indicator */}
                                    <div>
                                        <div style={{width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderRight: "7px solid " + endFill, right: "4%", top: "10%", position: "absolute"}}></div>
                                        <div style={{background: endFill, height: "100%", width: "4%", right: "0px", position: "absolute"}}></div>
                                    </div>
                                    {/* Start indicator */}
                                    <div>
                                        <div style={{background: startFill, height: "100%", width: "4%", left: "0px", position: "absolute"}}></div>
                                        <div style={{width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid " + startFill, left: "4%", top: "10%", position: "absolute"}}></div>
                                    </div>
                                    {/* After goal indicator */}
                                    <div>
                                        {showAfterGoal? <Tooltip style = {{position: "absolute"}}title = "PAST GOAL DATE"><WarningRoundedIcon fontSize = "inherit"/></Tooltip> : ""}
                                    </div>
                                </div>
                            </Tooltip>

                        </div>
                    )
                }
            })}


        {numTasks < 1? <br></br> : ""}
        {numTasks < 1? <br></br> : ""}
        {numTasks < 1? <br></br> : ""}
        {numTasks < 1? <br></br> : ""}

        </div>


        </Grid>
)

}