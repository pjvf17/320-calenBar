import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Fragment, useState } from 'react'
import { Grid, Badge, Button } from '@mui/material'
import Task from './Task'

dayjs.extend(isBetween)
let djs = dayjs()
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"]

function Calender(){


    let [year, setYear] = useState(djs.year())
    let [month, setMonth] = useState(djs.month())
    let [days, setDays] = useState(daysOfMonth())

    let task1 = {
        startDate: "2023-2-2",
        endDate: "2023-2-21",
        color: "blue",
        description: "first"
    }
    let task2 = {
        startDate: "2023-2-10",
        endDate: "2023-2-21",
        color: "green",
        description: "second"
    }
    let task3 = {
        startDate: "2023-2-21",
        endDate: "2023-2-24",
        color: "red",
        description: "third"
    }
    let task4 = {
        startDate: "2023-2-24",
        endDate: "2023-3-12",
        color: "orange",
        description: "fourth"
    }
    let task5 = {
        startDate: "2023-2-22",
        endDate: "2023-3-17",
        color: "cyan",
        description: "fifth"
    }
    

    let [tasks, setTasks] = useState([task1, task2, task3, task4])

    //change year and months
    function nextYear(){
        year = year + 1 //needed to do this funky formatting to avoid race conditions for some reason
        setYear(year)
        setDays(daysOfMonth())
    }
    function nextMonth(){
        month = month + 1 < 12? month + 1 : 0
        setMonth(month)
        setDays(daysOfMonth())
    }
    function prevYear(e){
        year = year - 1
        setYear(year )
        setDays(daysOfMonth())
    }
    function prevMonth(){
        month = month - 1 > -1? month - 1 : 11
        setMonth(month)
        setDays(daysOfMonth())
    }

    //probably overcomplicated function to create an array of all days of the month
    function daysOfMonth(){
    
        //get first and last of month
        let firstOfMonth = djs.year(year).month(month).startOf('month')
        let lastOfMonth = djs.year(year).month(month).endOf('month')
        let newDays = [] //all new days
        let leftInWeek = 0 //current week, used to count number of pad days

        //pad week at start of month with placeholder zeroes
        for (let i = 0; i < firstOfMonth.day(); ++i){
            leftInWeek++
            newDays.push(0)
        }
        //loop over all days
        for(let i = firstOfMonth.date(); i <= lastOfMonth.date(); i++){
            leftInWeek++
            //if saturday, make new week
            if(firstOfMonth.date(i).day() == 6){
                leftInWeek = 0
            }
            newDays.push(firstOfMonth.date(i))
        }
        //pad end of last week with placeholder zeroes
        if(leftInWeek > 0){
            for (let i = leftInWeek; i < 7; i++){
                newDays.push(0)
            }
        }

        return newDays
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

            {/* create grid of days */}
            <Grid  container columns={7} padding={15}  paddingTop={0}>

                {/*Make labels at top of month*/}
                {dayNames.map((d, i) => (
                    <Grid item key={i} xs={1}>{d}</Grid>
                ))}

                {/*Draw days*/}
                {days.map((d, i) => (
                    <Grid item key={i} style = {{borderStyle:"solid", borderWidth:"2px", textAlign:"left"}} xs={1}>

                        {/*Day of month number*/}
                        <div>{d == 0? "" : d.date()}</div>

                        {
                        /*Draw task if today is between start and end date of the task*/
                        tasks.map((task, j) => {

                            {/* Get today in correct dayjs format */}
                            let today = d !== 0 ? year.toString() + "-" + month.toString() + "-" + d.date() : "0"
                            {/* Whether or not to show the badge with description on a given task day */}
                            let invis = task.startDate !== today && d !== 0 && d.date() !== 1 && i % 7 !== 0

                            {/* If today is between start and end date, draw visible task. Otherwise, make invisible */}
                            if(dayjs(today).isBetween(task.startDate, task.endDate,"day" ,"[]")){
                                return(
                                    <Fragment key={j}>    
                                        <Badge badgeContent={task.description} color="success" invisible={invis}></Badge>
                                        <Task color={task.color} description={task.description}></Task>
                                    </Fragment>
                                    )
                            }
                            else{  {/* This is the invisible stuff that makes it all line up */}
                                return(
                                    <Fragment key={j}>    
                                        <Badge invisible></Badge>
                                        <Task color="white"></Task>
                                    </Fragment>
                                    )
                            }
                            
                        })
                        }

                    </Grid>
                ))}
            </Grid>

        </div>
    )

}


export default Calender