import React, { useContext, useState } from "react"
import {Button, Grid, Tooltip } from "@mui/material"
import dayjs from "dayjs"
import isBetween from 'dayjs/plugin/isBetween'
import { EditModalContext } from "./App"

dayjs.extend(isBetween)

export default function Day(props){

    const { editModalOpen, setEditModalOpen, editTask, setEditTask } = useContext(EditModalContext)
    const [isVacationDay, setIsVacationDay] = useState(props.day==="0"? true: false)

    function handleClickVacation(){
        setIsVacationDay(!isVacationDay)
    }

    return(
        // Each day is a grid item surrounded by a border
        <Grid item xs = {1} style={{textAlign:"left", border:"solid", backgroundColor: isVacationDay? "gray" : "white"}}>

            {/* This displays the current day of the month */}
            {props.day === "0" ? <br></br> : <Button 
                onClick={handleClickVacation}
                style={{fontSize:"small", textAlign:"left", padding:"1px"}}
                >
                {props.day.date()}
            </Button>}

            {/* Create a line for each task */}
            {isVacationDay ? <br></br> : props.tasks.map((t, i)=> 

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