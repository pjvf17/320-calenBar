import React, { useContext } from "react"
import {Button, Grid, Tooltip, Typography } from "@mui/material"
import dayjs from "dayjs"
import isBetween from 'dayjs/plugin/isBetween'
import { EditModalContext } from "./App"

const weekDayStyles = {
    height: "6em",
    textAlign: "left",
    borderTop: "1px solid #9F9F9F",
    borderLeft: "1px solid #9F9F9F",
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

    return(
        // Each day is a grid item surrounded by a border
        <Grid item xs = {1} sx={ ( (count++) % 7) === 0 ? weekendDayStyles : weekDayStyles }>

            {/* This displays the current day of the month */}
            <Typography variant="dayNumber">{props.day==="0"? <br></br> : props.day.date()}</Typography>

            {/* Create a line for each task */}
            {props.tasks.map((t, i)=> 

            {
                {/* A new djs object */}
                let d = dayjs(props.day) 

                {/* Figure out whether or not to show the badge (start of week, start of month, or start of task) */}
                let showBage = props.day !== "0" && (d.day() === "0" || d.date() === 1 || d.isSame(t.start_date, 'day') || props.dayOfWeek === 0)
                
                {/* If tasks is today, draw visible line, otherwise make it invisible */}
                if(d.isBetween(t.start_date, t.end_date, "day", "[]")){

                    let color = showBage ? t.color : "white"

                    return (
                        <div key={i} onClick={() => {
                            setEditTask(t)
                            console.log(t)
                            setEditModalOpen(true)
                        }}>
                            {/* button looked better than most things I tested */}
                            <Button style={{color: color, fontSize: "small"}} >{t.title}</Button>
                            {/* Fancy tooltip that appears when you hover */}
                            <Tooltip title={t.description}>
                                <hr style={{border: "4px solid " + t.color, padding:"0px"}}></hr>
                            </Tooltip>
                        </div>
                    )
                }
                else {
                    {/* This is the invisible line to make it all line up */}
                    return(
                        <div key={i}>
                            <Button style={{color: "white" , fontSize:"small"}}>test</Button>
                            <hr style={{border: "4px solid white", padding:"0px"}}></hr>
                        </div>
                    )
                }
            })}

        </Grid>
    )

}