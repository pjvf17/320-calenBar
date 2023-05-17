import { useState } from "react"
import { TextField, Stack } from "@mui/material"
import Service from "./Service"
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
        <Box className="login" rowGap={"5px"} display="flex" flexDirection={"column"} justifyContent={"flex-start"} 
        alignItems={"center"} margin={"0 auto"} position={"relative"} top={"1.5em"} boxSizing={"border-box"} height={"40em"}>
            <Box paddingTop={"30px"}>
                <Typography className="loginTitle" variant={"h3"} fontFamily={"Merriweather"}>Login to calenBar</Typography>
            </Box>
            <Box paddingTop={"120px"}>
                <TextField
                    id="username-input"
                    label="Username"
                    type="username"
                    autoComplete="current-username"
                    variant="standard"
                    value={userName}
                    onChange={e=>setUserName(e.target.value)}
                />
            </Box>
            <Box>
                <TextField
                    id="password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    fontFamily="Merriweather"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
            </Box>

            <Box className="Login" paddingTop={"30px"}>
                <Button sx={{width: "200px", fontFamily: "Merriweather" }} type='submit' color='primary' variant='contained' onClick={attemptLogin}>Login</Button>
            </Box>

            <Box className="Lerror">
                {/* <div className="error"> */}
                    <Box style={{color:"red"}}>{errorMsg}</Box>
                {/* </div> */}
            </Box>
            <Box className="haveaccount2">
                <Link to={"/register"}>Don't have an account? Register here</Link>
            </Box>
        </Box>
    )

}