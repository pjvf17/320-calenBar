import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Fragment, useState } from 'react'
import { Grid } from '@mui/material'
import Week from './Week'
import service from './Service'

dayjs.extend(isBetween)
let djs = dayjs()
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"]

function Calender(){


    let [year, setYear] = useState(djs.year())
    let [month, setMonth] = useState(djs.month())
    

    let [tasks, setTasks] = useState(service.getTasksByYearAndMonth(year, month))

    // daysOfMonth gets both the days and the tasks on a given month
    let stuff = daysOfMonth()
    let [tasksInWeeks, setTasksInWeeks] = useState(stuff.tasksInWeeks) //2D array where each subarray contains the tasks of the corresponding week
    let [days, setDays] = useState(stuff.newDays) //2D array of days

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
        for(const task of tasks){
            //start date is between first and last day of week, OR
            //end date is between first and last day of week, OR
            //first day of week is between first and last day of a task
            if(dayjs(task.startDate).isBetween(week[0], week[week.length-1], "day", "[]") || 
                    dayjs(task.endDate).isBetween(week[0], week[week.length-1], "day", "[]") || 
                    week[0].isBetween(task.startDate, task.endDate, "day", "[]")){
                        tasksThisWeek.push(task)
                    }
        }
        return tasksThisWeek
    }
    

    return(
        <div>
        
            {/* display current year and month, with buttons
                currently this can only show one month at a time */}
            <button onClick={prevYear}>prev year</button>
            <button onClick={nextYear}>next year</button>

            <button onClick={prevMonth}>prev month</button>
            <button onClick={nextMonth}>next month</button>

            <div>{year + " " + months[month]}</div>

            

            <Grid container columns={7} paddingTop={"10px"}>

                {/*Make labels at top of month*/}
                {dayNames.map((d, i) => (
                    <Grid item key={i} xs={1}>{d}</Grid>
                ))}

            </Grid>

            {/* CALENDAR GRID HERE */}
            <Grid container columns={1} padding={"25px"} paddingTop={"0px"}>

                {/* Create each week element */}
                {days.map((w, i) => (
                        <Grid item key={i} xs={1}>
                            <Week days = {w} tasks={tasksInWeeks[i]}></Week>
                        </Grid>
                ))}

            </Grid>

            
        </div>
    )

}


export default Calender