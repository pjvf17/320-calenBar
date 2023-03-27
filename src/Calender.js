import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Fragment, useState } from 'react'
import { Grid, Badge, Button } from '@mui/material'
import Task from './Task'
import Week from './Week'

dayjs.extend(isBetween)
let djs = dayjs()
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"]

function Calender(){


    let [year, setYear] = useState(djs.year())
    let [month, setMonth] = useState(djs.month())

    let task1 = {
        startDate: "2023-3-2",
        endDate: "2023-3-21",
        color: "blue",
        description: "first"
    }
    let task2 = {
        startDate: "2023-3-10",
        endDate: "2023-3-21",
        color: "green",
        description: "second"
    }
    let task3 = {
        startDate: "2023-3-21",
        endDate: "2023-3-24",
        color: "red",
        description: "third"
    }
    let task4 = {
        startDate: "2023-3-24",
        endDate: "2023-4-12",
        color: "orange",
        description: "fourth"
    }
    let task5 = {
        startDate: "2023-3-22",
        endDate: "2023-4-17",
        color: "cyan",
        description: "fifth"
    }
    

    let [tasks, setTasks] = useState([task1, task2, task3, task4, task5])

    // daysOfMonth gets both the days and the tasks on a given month
    let stuff = daysOfMonth()
    let [tasksInWeeks, setTasksInWeeks] = useState(stuff.tasksInWeeks) //2D array where each subarray contains the tasks of the corresponding week
    let [days, setDays] = useState(stuff.newDays) //2D array of days

    daysOfMonth()

    //change year and months
    function nextYear(){
        year = year + 1 //needed to do this funky formatting to avoid race conditions for some reason
        setYear(year)
        let stuff = daysOfMonth()
        setTasksInWeeks(stuff.tasksInWeeks)
        setDays(stuff.newDays)
    }
    function nextMonth(){
        month = month + 1 < 12? month + 1 : 0
        setMonth(month)
        let stuff = daysOfMonth()
        setTasksInWeeks(stuff.tasksInWeeks)
        setDays(stuff.newDays)
    }
    function prevYear(e){
        year = year - 1
        setYear(year)
        let stuff = daysOfMonth()
        setTasksInWeeks(stuff.tasksInWeeks)
        setDays(stuff.newDays)
    }
    function prevMonth(){
        month = month - 1 > -1? month - 1 : 11
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
            if(firstOfMonth.date(i).day() == 6){
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
            <button onClick={e => prevYear(e)}>prev year</button>
            <Fragment>{year}</Fragment>
            <button onClick={nextYear}>next year</button>

            <div></div>

            <button onClick={prevMonth}>prev month</button>
            <Fragment>{months[month]}</Fragment>
            <button onClick={nextMonth}>next month</button>

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