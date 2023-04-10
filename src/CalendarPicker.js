import { useState, useEffect, useContext } from "react"
import { ReloadCalendarContext } from "./App"
import service from "./Service"
import { Button } from "@mui/material"


export default function CalendarPicker(props){
    const { reloadCalendar } = useContext(ReloadCalendarContext)

    let [calendars, setCalendars] = useState([])
    // service.getCalendars().then(data => setCalendars(data))

    useEffect(() => {
        // Update the document title using the browser API
        service.getCalendars().then(data=>setCalendars(data))
      }, [reloadCalendar]);
    
    function handleClick(cal){
        props.setCalendar(cal)
    }

    return (
        <div>

        {calendars.map((cal, i) => {
            return(
                <Button key={i} onClick={e => handleClick(cal)}>{cal.title}</Button>
            )
        })}

        </div>
    )

}