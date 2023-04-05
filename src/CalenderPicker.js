import { useState, useEffect } from "react"
import service from "./Service"
import { Button } from "@mui/material"


export default function CalenderPicker(props){

    let [calendars, setCalenders] = useState([])
    // service.getCalenders().then(data => setCalenders(data))

    useEffect(() => {
        // Update the document title using the browser API
        service.getCalenders().then(data=>setCalenders(data))
      }, []);
    
    function handleClick(cal){
        props.setCalender(cal)
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