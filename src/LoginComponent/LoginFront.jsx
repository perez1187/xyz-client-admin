import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

//MUI
import { InputAdornment, TextField, Button, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

// local
import { auth } from '../services/user-services'

// using context
import {useAuth} from '../hooks/useAuth'

// css
import './LoginFront.css'

// this function is called on loginf page

function LoginFront() {

    const navigate = useNavigate();
    // const navigateForgotPasswordPage = () => {
    //     navigate('forgot-password/'); 
    // }

        // useStates for login
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [loginNotSuccess, setLoginNotSuccess]= useState(false)

        const [customErrMes, setCustomErrMes] = useState('')
    
        // useStates for context
        const {authData, setAuth} =useAuth()
           
        // function for login
        const handleSubmit = async e => {
            e.preventDefault() // we are not going to refresh the page
          
            // we can use shortcur if key and value is the same{username,  password}
            const data = await auth( {'username':username, 'password': password}) 
            // console.log(data)

            if (data == null) {
                // console.log ("wszedlem")
                setLoginNotSuccess(true)  
                setCustomErrMes(customErrMes => "server error") 
                return
            }
            
            // 👇️ navigate to /
            const navigateHome = async () => {           
                navigate('/');          
                        };
                
    
          // we get back email and token from api in data
          // and if we have data.emai (login succes) we set as context and move to landing page
          // varables for loggind
          try {
            if (data.refresh) {
                if (data.email == 'This field may not be blank.') {
                    // console.log("chujjjj nie pusty")
                } else if (data.password == 'This field may not be blank.'){
                    
                }

                else {
                    await setAuth(data)
                    await navigateHome() 
                }

            }

            } catch (e) {
            console.log('Error')
            
            
            // tutaj dac use state
            }
            setLoginNotSuccess(true)  
            setCustomErrMes(customErrMes => data.detail)         
          
        }
  return (
    <div style={{
        backgroundColor: "white", 
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center',
        padding:"5px"
    }}>
        
            {/* this below will show auth data form context */}
            {/* authData is user from App.jsx */}
            {/* if there are no authData, show login/pass form, if there are, show email*/}
        {!authData ? 
            <Box >  
                
                <form onSubmit={handleSubmit}>
                    <Box 
                        sx = {{
                            display: "flex",
                            alignItems:"center",
                            padding:"10px"

                        }}> 
                        <TextField
                            id="input-with-icon-textfield"
                            label="Login"
                            variant="standard" 
                                                            
                            
                            onChange={ e => setUsername(e.target.value)}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircleIcon />
                                </InputAdornment>
                            ),
                            }}
                            
                        />
                    </Box>
                    <Box                         
                        sx = {{
                            display: "flex",
                            alignItems:"center",
                            padding:"10px"

                        }}>  
                        <TextField
                            id="input-password"
                            label="Password"
                            onChange={ e => setPassword(e.target.value)}
                            type="password"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <LockIcon />
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />
                    </Box>
                    
                    <Box
                        sx = {{
                            display: "flex",
                            alignItems:"center",
                            padding:"10px"

                        }}>
                        <div> 
                            <Button variant="outlined" type='submit'>Login</Button>
                        </div>      
                        <div >
                            {/* <p className='forgotPassword' onClick={() => navigateForgotPasswordPage()}> Forgot Password </p> */}
                            {/* <Link to={"/forgot-password/"} className='forgotPassword' >Forgot password</Link> */}
                        </div>
                        
                        {loginNotSuccess &&
                        <p style={{
                            color: "red"
                        }} > {customErrMes}</p>
                    }
                    </Box>
                </form>
            </Box>

            :

        <p style={{
            color:"black"
        }}>
           You are login as: {authData.email}
        </p>   
        }

    </div>
  )
}

export default LoginFront