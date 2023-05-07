import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Week from './Week'

const gridLayout = {
    borderRadius: "40px",
    boxShadow: "11px 12px 13px 12px rgb(207, 207, 207)",
}

const gridWeekDays = {
    borderTop: "1px solid #9F9F9F",
    borderLeft: "1px solid #9F9F9F",
    padding: "0.5em",
}

const gridWeekendDays = {
    borderTop: "1px solid #9F9F9F",
    padding: "0.5em",
}

dayjs.extend(isBetween)
let djs = dayjs()
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function Calendar(props){

    let [year, setYear] = useState(djs.year())
    let [month, setMonth] = useState(djs.month())

    let tasks = props.tasks

    console.log(tasks)

    // daysOfMonth gets both the days and the tasks on a given month
    let stuff = daysOfMonth()
    // console.log(stuff.tasksInWeeks)
    let [tasksInWeeks, setTasksInWeeks] = useState(stuff.tasksInWeeks) //2D array where each subarray contains the tasks of the corresponding week
    let [days, setDays] = useState(stuff.newDays) //2D array of days
    // console.log(days, tasksInWeeks)


    //change year and months
    function nextYear(){
        year = year + 1 //needed to do this funky formatting to avoid race conditions for some reason
        setYear(year)
        let stuff = daysOfMonth()
        setTasksInWeeks(stuff.tasksInWeeks)
        setDays(stuff.newDays)
    }
    function nextMonth(){
        month = month < 11? month + 1 : 0
        setMonth(month)
        let stuff = daysOfMonth()
        setTasksInWeeks(stuff.tasksInWeeks)
        setDays(stuff.newDays)
    }
    function prevYear(){
        year = year - 1
        setYear(year)
        let stuff = daysOfMonth()
        setTasksInWeeks(stuff.tasksInWeeks)
        setDays(stuff.newDays)
    }
    function prevMonth(){
        month = month > 0? month - 1 : 11
        setMonth(month)
        let stuff = daysOfMonth()
        setTasksInWeeks(stuff.tasksInWeeks)
        setDays(stuff.newDays)
    }

    //probably overcomplicated function to create an array of all days of the month
    function daysOfMonth(){

        //get first and last of month
        let firstOfMonth = djs.year(year).month(month).startOf('month')
        let lastOfMonth = djs.year(year).month(month).endOf('month')
        let newDays = [] //all new days
        let week = [] //current week
        let tasksInWeeks = [] //tasks in the current week

        //loop over all days
        for(let i = firstOfMonth.date(); i <= lastOfMonth.date(); i++){
            week.push(firstOfMonth.date(i))
            //If saturday, push to newDays array and reset the current week
            if(firstOfMonth.date(i).day() === 6){
                newDays.push(week)
                tasksInWeeks.push(tasksInWeek(week)) //Get tasks for this week
                week = []
            }
        }
        //pad end of last week with placeholder zeroes
        if(week.length > 0){
            tasksInWeeks.push(tasksInWeek(week)) //Get tasks for this week
            for (let i = week.length; i < 7; i++){
                week.push("0")
            }
            newDays.push(week)
        }
        //pad beginning of first week first week
        if(newDays[0].length < 7){
            week = newDays[0]
            for(let i = week.length; i < 7; i++){
                week.unshift("0")
            }
        }

        return { //return both in an object
            newDays: newDays,
            tasksInWeeks: tasksInWeeks
        }
    }

    //This finds the all the tasks that are in a given week
    function tasksInWeek(week){
        let tasksThisWeek = []
        let startOfWeek = dayjs(week[0])
        let endOfWeek = dayjs(week[week.length-1])
        for(const task of tasks){
            let startDay = dayjs(task.start_date)
            let endDay = dayjs(task.end_date)
            console.log(startDay.isBetween(startOfWeek, endOfWeek, "day", "[]"))
            //start date is between first and last day of week, OR
            //end date is between first and last day of week, OR
            //first day of week is between first and last day of a task
            if(startDay.isBetween(startOfWeek, endOfWeek, "day", "[]") || 
                    endDay.isBetween(startOfWeek, endOfWeek, "day", "[]") || 
                    startOfWeek.isBetween(startDay, endDay, "day", "[]")){
                        tasksThisWeek.push(task)
                    }
        }
        return tasksThisWeek
    }
    

    return (
        <Box>
        
            {/* display current year and month, with buttons
                currently this can only show one month at a time */}
            <Box flex-direction="row">
                <Button onClick={prevYear}>prev year</Button>
                <Button onClick={nextYear}>next year</Button>

                <Button onClick={prevMonth}>prev month</Button>
                <Button onClick={nextMonth}>next month</Button>
            </Box>


            {/* MAIN CALENDAR VIEW */}
            <Grid container columns={1} direction="column" display={"inline-flex"} justifyContent={"center"}
                  maxWidth={"90%"}>
                <Grid item container sx={ gridLayout }>
                    <Grid item container>
                        <Typography variant="yearMonth" sx={{ padding: "0.5em" }}>{year + " " + months[month]}</Typography>
                    </Grid>
                    { /* DAYS OF THE WEEK HERE */ }
                    <Grid item container columns={7}>

                            {/*Make labels at top of month*/}
                            {dayNames.map((d, i) => (
                                <Grid item key={i} xs={1} 
                                    sx={ d === ("Sunday") ? gridWeekendDays : gridWeekDays }>
                                    <Typography variant="weekDay">{d}</Typography>
                                </Grid>
                            ))}
                    </Grid>

                    {/* CALENDAR GRID HERE */}
                    <Grid item container columns={1}>
                    {/* Create each week element */}
                            {days.map((w, i) => (
                                <Grid item key={i} xs={1}>
                                    {/* {console.log(tasksInWeeks[i])} */}
                                    <Week days = {w} tasks={stuff.tasksInWeeks[i]}></Week>
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )

}


export default Calendar