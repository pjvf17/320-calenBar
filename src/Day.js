import React, { useContext } from "react"
import { Badge, Grid } from "@mui/material"
import dayjs from "dayjs"
import isBetween from 'dayjs/plugin/isBetween'
import { EditModalContext } from "./App"

dayjs.extend(isBetween)

export default function Day(props){
    const { editModalOpen, setEditModalOpen, editTask, setEditTask } = useContext(EditModalContext)

    return(
        // Each day is a grid item surrounded by a border
        <Grid item xs = {1} style={{textAlign:"left", border:"solid"}}>

            {/* This displays the current day of the month */}
            {props.day==="0"? <br></br> : props.day.date()}

            {/* Create a line for each task */}
            {props.tasks.map((t, i)=> 

            {
                {/* A new djs object */}
                let d = dayjs(props.day) 
                {/* Figure out whether or not to show the badge (start of week, start of month, or start of task) */}
                let showBage = props.day !== "0" && (d.day() === "0" || d.date() === 1 || d.isSame(t.start_date, 'day') || props.dayOfWeek === 0)

                {/* If tasks is today, draw visible line, otherwise make it invisible */}
                if(d.isBetween(t.start_date, t.end_date, "day", "[]")){
                    return (
                        <div key={i} onClick={() => {
                            setEditTask(t)
                            console.log(t)
                            setEditModalOpen(true)
                        }}>
                            <Badge badgeContent={t.title} color="success" invisible={!showBage}></Badge>
                            <hr style={{border: "4px solid " + t.color, padding:"0px"}}></hr>
                        </div>
                    )
                }
                else {
                    {/* This is the invisible line to make it all line up */}
                    return(
                        <div key={i}>
                            <Badge invisible></Badge>
                            <hr style={{border: "4px solid white", padding:"0px"}}></hr>
                        </div>
                    )
                }
            })}

        </Grid>
    )

}