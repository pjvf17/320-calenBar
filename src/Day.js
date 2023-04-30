import React, { useContext } from "react"
import {Button, Grid, Tooltip, Typography } from "@mui/material"
import dayjs from "dayjs"
import isBetween from 'dayjs/plugin/isBetween'
import { EditModalContext } from "./App"

const weekDayStyles = {
    height: "8em",
    textAlign: "left",
    borderTop: "1px solid #9F9F9F",
    borderLeft: "1px solid #9F9F9F",
    margin: "0px",
}

const weekendDayStyles = {
    height: "6em",
    textAlign: "left",
    borderTop: "1px solid #9F9F9F",
}

let count = -1;

dayjs.extend(isBetween)

export default function Day(props){

    const { editModalOpen, setEditModalOpen, editTask, setEditTask } = useContext(EditModalContext)

    // function to get thickness of all tasks on the current day
    function getThickness(){
        //need sum for getting relative weight
        let sum = 0;
        //queue datastructure
        let thickness = [];
        // loop over all tasks in week
        for(let i = 0; i < props.tasks.length; i++){
            let task = props.tasks[i];
            let start = dayjs(task.start_date);
            let end = dayjs(task.end_date);
            let today = dayjs(props.day);
            let timeToComplete = props.tasks[i].estimated_time
            // if task is on the current day
            if(today.isBetween(start, end, "day", "[]") && props.day != 0){
                let daysRemaining = end.diff(today, 'day');
                // make the value according the the following algorithm
                let value = timeToComplete/(daysRemaining+1);
                // add thickness to the queue
                thickness.push(value);
                sum += value;
            }
        }
        let pixel_space = 100;
        thickness = thickness.map((t)=>Math.floor((t/sum)*pixel_space));
        // fill missing pixels in pixel space (simply give it to the top task)
        let remainder = pixel_space - thickness.reduce((sum, t)=>sum+t, 0);
        if(remainder > 0){
            thickness[0] += remainder;
        }
        return thickness;
    }
    let thickness = getThickness();
    return(
        // Each day is a grid item surrounded by a border
        <Grid item xs = {1} sx={ ( (count++) % 7) === 0 ? weekendDayStyles : weekDayStyles }>

            {/* This displays the current day of the month */}
            <Typography variant="dayNumber" style={{padding:"0px", margin: "0px"}}>{props.day==="0"? <br></br> : props.day.date()}</Typography>

            {/* Create a line for each task */}
            {props.tasks.map((t, i)=> 

            {
                {/* A new djs object */}
                let d = dayjs(props.day) 

                {/* Figure out whether or not to show the badge (start of week, start of month, or start of task) */}
                let showBage = props.day !== "0" && (d.day() === "0" || d.date() === 1 || d.isSame(t.start_date, 'day') || props.dayOfWeek === 0)
                {/* figure out whether or not to show end indicator (end of task) */}
                let showEnd = props.day !== "0" && d.isSame(t.end_date, 'day');
                {/* If tasks is today, draw visible line, otherwise make it invisible */}
                if(d.isBetween(t.start_date, t.end_date, "day", "[]")){

                    let color = showBage ? "black" : "transparent"
                    let fill = showEnd ? "black": "transparent"

                    return (
                        <div key={i} onClick={() => {
                            setEditTask(t)
                            console.log(t)
                            setEditModalOpen(true)
                        }}>
                            {/* button looked better than most things I tested */}
                            <Button style={{color: color, fontSize: "small", zIndex: 1, position: "absolute"}} >{t.title}</Button>
                            {/* Fancy tooltip that appears when you hover */}
                            <Tooltip title={t.description}>
                                {/* line thickness determined by getThickness function (zindex used to accomodate badge) */}
                                <div style={{height: thickness.shift() + "px", background: t.color, padding:"0px", margin: "0px", zIndex: 0}}>
                                    {/* Due indicator */}
                                    <div style={{height: "100%", width: "4%", background: fill, padding:"0px", marginRight: "0px", marginLeft: "auto"}}></div>
                                </div>
                            </Tooltip>
                        </div>
                    )
                }
            })}

        </Grid>
    )

}