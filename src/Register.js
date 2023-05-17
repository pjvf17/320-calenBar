import { useState } from "react"
import { TextField, Stack, FormControlLabel } from "@mui/material"
import Service from "./Service"
import { Link, useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Register(){

    let [userName, setUserName] = useState("")
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [errorMsg, setErrorMsg] = useState("")

    let navigate = useNavigate()

    function attemptRegister(){
        if(password !== confirmPassword){
            setErrorMsg("Password does not match")
            return
        }
        let user = {'username': userName, 'password': password}
        Service.registerUser(user)
        .then(res => {
            if(res['status'] === 201){
                navigate("/login")
            }
            else{
                setErrorMsg("Username already exists")
            }
        }
        )
    }


    return(
    <Box className="authentication" rowGap={"5px"} display="flex" flexDirection={"column"} justifyContent={"flex-start"} 
    alignItems={"center"} margin={"0 auto"} position={"relative"} top={"1.5em"} boxSizing={"border-box"} height={"40em"}>
        <Box paddingTop={"30px"}>
            <Typography className="registerTitle" variant={"h3"} fontFamily={"Merriweather"}>Create an Account</Typography>
        </Box>

        <Box paddingTop={"120px"}>
            <TextField
                id="username-input"
                label="Username"
                type="username"
                autoComplete="current-username"
                fontFamily={"Merriweather"}
                variant="standard"
                inputProps={{
                    style: {fontFamily: "Merriweather"}
                }}
                InputLabelProps={{
                    style: {fontFamily: "Merriweather"}
                }}
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
                fontFamily={"Merriweather"}
                variant="standard"
                inputProps={{
                    style: {fontFamily: "Merriweather"}
                }}
                InputLabelProps={{
                    style: {fontFamily: "Merriweather"}
                }}
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
        </Box>
        <Box>
            <TextField
                id="confirm-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                fontFamily={"Merriweather"}
                variant="standard"
                inputProps={{
                    style: {fontFamily: "Merriweather"}
                }}
                InputLabelProps={{
                    style: {fontFamily: "Merriweather"}
                }}
                value={confirmPassword}
                onChange={e=>{setConfirmPassword(e.target.value)}}
            />
        </Box>

        {/* <div style={{color: "red"}}>{password === confirmPassword? <br></br> : "Password does not match"}</div> */}

        <Box className="Register" paddingTop={"30px"}>
            <Button sx={{width: "200px", fontFamily: "Merriweather" }} type='submit' color='primary' variant='contained' onClick={attemptRegister}>Register</Button>
        </Box>

        <Box className="Lerror">
            <Box style={{color:"red"}}>{errorMsg}</Box>
        </Box>
        {/* <FormControlLabel>
            control={
                <Check
            }
        </FormControlLabel> */}

        <Box className="haveaccount">
            <Link to={"/login"}>Already have an account? Login here</Link>
        </Box>
    </Box>
    )

}