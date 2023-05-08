import { useState } from "react"
import { TextField, Stack, Button } from "@mui/material"
import Service from "./Service"
import { Link } from "react-router-dom"


export default function Login(){

    let [userName, setUserName] = useState("")
    let [password, setPassword] = useState("")
    let [errorMsg, setErrorMsg] = useState("")

    function attemptLogin(){
        let user = {username: userName, password: password}
        Service.loginUser(user)
        .then(res => {
            if(res['status'] === 200){
                window.location.href = "/"
            }
            else{
                setErrorMsg("Invalid username or password")
            }
            return res
        })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("token", data["token"]);
            return data;
        })

    }

    return (
        <div className="login" style={{textAlign:"center"}}>

            <h2>Login to calenBar</h2>

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

            <div className="Login">
            <Button type='submit' color='primary' variant='contained' fullWidth onClick={attemptLogin}>Login</Button>
            </div>

            <div className="Lerror">
                {/* <div className="error"> */}
                    <div style={{color:"red"}}>{errorMsg}</div>
                {/* </div> */}
            </div>
            <div className="haveaccount2">
            <Link to={"/register"}>Don't have an account? Register here</Link>
            </div>

            <div className="return2" style={{paddingTop:"5px"}}>
            <Link to={"/"}>Return to Home</Link>
            </div>

        </div>
    )

}