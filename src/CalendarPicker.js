import { useState, useEffect, useContext } from "react"
import { ReloadCalendarContext } from "./App"
import service from "./Service"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"


export default function CalendarPicker(props){
    const { reloadCalendar } = useContext(ReloadCalendarContext)

    let [calendars, setCalendars] = useState([])
    // service.getCalendars().then(data => setCalendars(data))

    let navigate = useNavigate()

    useEffect(() => {
        // Update the document title using the browser API
        service.getCalendars()
        .then(data=> {
            if (data['detail'] === "Invalid token."){
                return navigate("/login")
            }
            console.log(data)
            setCalendars(data)
            if (data.length > 0){
                const current = data.find(cal => cal.id === props.calendar.id)
                if (!current){
                    props.setCalendar(data[0])
                } 
                else {
                    props.setCalendar(current)
                }
            }

        })
      }, [reloadCalendar]);
    
    function handleClick(cal){
        props.setCalendar(cal)
    }


    return (
        <div>

        {calendars.map((cal, i) => {
            const isCurrent = cal.id === props.calendar.id
            const color = isCurrent? "green" : "red"
            return(
                <Button variant="contained" style={{backgroundColor: "white", color: color, paddingTop:"7px", marginRight:"8px"}} key={i} onClick={e => handleClick(cal)}>{cal.title}</Button>
            )
        })}

        </div>
    )

}