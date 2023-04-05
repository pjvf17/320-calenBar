import { Grid } from "@mui/material"
import Day from "./Day"

export default function Week(props){


    return (
        // A week is a grid in and of itself
        <Grid container columns={7}>
            {/* Display each of the days */}
            {props.days.map((d, i) => {
                {/* console.log(props.tasks) */}
                return(
                    <Day key={i} day={d} tasks = {props.tasks} dayOfWeek = {i}></Day>
                )
            })}
        </Grid>
    )

}