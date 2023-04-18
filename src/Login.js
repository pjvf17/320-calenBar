import { useState } from "react"
import { TextField, Stack, Button } from "@mui/material"
import Service from "./Service"
import { Link } from "react-router-dom"


export default function Login(){

    let [userName, setUserName] = useState("")
    let [password, setPassword] = useState("")
    let [errorMsg, setErrorMsg] = useState("")

    function attemptLogin(){
        let user = {userName, password}
        Service.loginUser(user)
        setErrorMsg("YOU FOOL. YOU REALLY THINK YOU CAN LOGIN TO THE APP IN THIS ECONOMY")
    }

    return (
        <div style={{textAlign:"center"}}>

            <h2>Login to calenBar</h2>

            <div>
            <TextField
                id="username-input"
                label="Username"
                type="username"
                autoComplete="current-username"
                variant="standard"
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
            </div>
            <div>
            <TextField
                id="password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                value={userName}
                onChange={e=>setUserName(e.target.value)}
            />
            </div>

            <div>
            <Button onClick={attemptLogin}>Login</Button>
            </div>

            <div style={{color:"red"}}>{errorMsg}</div>

            <div>
            <Link to={"/register"}>Don't have an account? Register here</Link>
            </div>

            <div style={{paddingTop:"5px"}}>
            <Link to={"/"}>Return to Home</Link>
            </div>

        </div>
    )

}