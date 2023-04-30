import React, { useContext } from "react"
import {Button, Grid, Tooltip, Typography } from "@mui/material"
import dayjs from "dayjs"
import isBetween from 'dayjs/plugin/isBetween'
import { EditModalContext } from "./App"
import {darken} from "@mui/material";

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
    function getThickness(min=20){
        //queue datastructure
        let thickness = [];
        // loop over all tasks in week
        for(let i = 0; i < props.tasks.length; i++){
            // grab important variables
            let task = props.tasks[i];
            let start = dayjs(task.start_date);
            let end = dayjs(task.end_date);
            let today = dayjs(props.day);
            let timeToComplete = props.tasks[i].estimated_time
            // if task is on the current day
            if(today.isBetween(start, end, "day", "[]") && props.day !== 0){
                let daysRemaining = end.diff(today, 'day');
                // make the value according the the following algorithm
                let value = timeToComplete/(daysRemaining+1);
                // add thickness to the queue
                thickness.push(value);
            }
        }
        // find top 5
        let top = [...thickness].sort((a, b) => b - a).slice(0, 5);
        // zero out any thickness not in top 5
        thickness = thickness.map((t)=> (top.includes(t))? t : 0);
        let pixel_space = 100;
        let sum = thickness.reduce((sum, t) => sum + t, 0);
        // find pixel value thickness
        thickness = thickness.map((t)=>(Math.floor((t/sum)*pixel_space)));
        // any thickness not zeroed out and less than min set to 20
        thickness = thickness.map((t)=>t<min && t > 0 ? min : t);
        //find remainder for fixing
        let remainder = pixel_space - thickness.reduce((sum, t)=>sum+t, 0);
        let i = 0
        if(thickness.every((t)=>t===0)){
            return null;
        }
        while(remainder > 0){
            if(thickness[i] > 0){
                thickness[i] += 1;
                remainder -= 1;
            }
            if(i === thickness.length) i = -1;
            i++;
        }
        while(remainder < 0){
            if(thickness[i] > 0 && thickness[i] > min){
                thickness[i] -= 1;
                remainder += 1;
            }
            if(i === thickness.length) i = -1;
            i++;
        }
        return thickness;
    }
    let thickness = getThickness(15);
    console.log(thickness);
    return(
        // Each day is a grid item surrounded by a border
        <Grid item xs = {1} sx={ ( (count++) % 7) === 0 ? weekendDayStyles : weekDayStyles }>

            {/* This displays the current day of the month */}
            <Typography variant="dayNumber" style={{padding:"0px", margin: "0px"}}>{props.day==="0"? <br></br> : props.day.date()}</Typography>

            {/* Create a line for each task */}
            {props.tasks.map((t, i)=> 

            {
                /* A new djs object */
                let d = dayjs(props.day) 

                /* Figure out whether or not to show the badge (start of week, start of month, or start of task) */
                let showBage = props.day !== "0" && (d.day() === "0" || d.date() === 1 || d.isSame(t.start_date, 'day') || props.dayOfWeek === 0)
                /* figure out whether or not to show end indicator (end of task) */
                let showEnd = props.day !== "0" && d.isSame(t.end_date, 'day');
                /* figure out whether or not to show start indicator (end of task) */
                let showStart = props.day !== "0" && d.isSame(t.start_date, 'day');
                /* If tasks is today, draw visible line, otherwise make it invisible */
                if(d.isBetween(t.start_date, t.end_date, "day", "[]")){

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
                                    <Button style={{color: textColor, background: primary, border: "3px solid " + borderColor, fontSize: "60%", fontWeight: "bold", textAlign: "center", height: "20%", width: "50%", bottom: "0px", left:"25%", position: "absolute"}}>{t.title}</Button>
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
                                </div>
                            </Tooltip>
                        </div>
                    )
                }
            })}

        </Grid>
    )

}