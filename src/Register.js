import { useState } from "react"
import { TextField, Stack, Button, FormControlLabel } from "@mui/material"
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
        let user = {'username': userName, 'password': password}
        Service.registerUser(user)
        .then(res => {
            if(res['status'] === 201){
                window.location.href = "/login"
            }
            else{
                setErrorMsg("Username already exists")
            }
        }
        )
    }


    return(
    <div className="authentication" style={{textAlign:"center"}}>

        <h2 className="registerTitle">Create an Account</h2>

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

        {/* <div style={{color: "red"}}>{password === confirmPassword? <br></br> : "Password does not match"}</div> */}

        <div className="Register">
            <Button type='submit' color='primary' variant='contained' fullWidth onClick={attemptRegister}>Register</Button>
        </div>

        <div style={{color:"red"}}>{errorMsg}</div>
        {/* <FormControlLabel>
            control={
                <Check
            }
        </FormControlLabel> */}

        <div className="haveaccount">
        <Link to={"/login"}>Already have an account? Login here</Link>
        </div>
        <div className="return">
            <Link to={"/"}>
                <Button type='submit' color='primary' variant='contained' fullWidth>Return Home</Button>
            </Link>
        </div>
    </div>
    )

}