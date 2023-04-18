import { useState } from "react"
import { TextField, Stack, Button } from "@mui/material"
import Service from "./Service"
import { Link } from "react-router-dom"


export default function Register(){

    let [userName, setUserName] = useState("")
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [errorMsg, setErrorMsg] = useState("")

    function attemptRegister(){
        if(password !== confirmPassword){
            setErrorMsg("Password does not match")
            return
        }
        let user = {userName, password}
        Service.registerUser(user)
        setErrorMsg("WHO'S MORE FOOLISH, THE FOOL, OR THE FOOL WHO FOLLOWS HIM")
    }


    return(
    <div style={{textAlign:"center"}}>

        <h2>Create an Account</h2>

        <div>
        <TextField
            id="username-input"
            label="Username"
            type="username"
            autoComplete="current-username"
            variant="standard"
            value={userName}
            onChange={e=>setUserName(e.target.value)}
        />
        </div>
        <div>
        <TextField
            id="password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={password}
            onChange={e=>setPassword(e.target.value)}
        />
        </div>
        <div>
        <TextField
            id="confirm-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={confirmPassword}
            onChange={e=>{setConfirmPassword(e.target.value)}}
        />
        </div>

        <div style={{color: "red"}}>{password === confirmPassword? <br></br> : "Password does not match"}</div>

        <div>
        <Button onClick={attemptRegister}>Register</Button>
        </div>

        <div style={{color:"red"}}>{errorMsg}</div>

        <div paddingTop="10px">
        <Link to={"/login"}>Already have an account? Login here</Link>
        </div>
        <div style={{paddingTop:"5px"}}>
        <Link to={"/"}>Return to Home</Link>
        </div>
        

    </div>
    )

}