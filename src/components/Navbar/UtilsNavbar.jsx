// mui
import { AppBar, styled, Toolbar, Typography, Box, InputBase, Badge, Avatar, Menu, MenuItem,Button }  from '@mui/material'

// using context
import {useAuth} from '../../hooks/useAuth'

import { useNavigate } from 'react-router-dom';




export const UserBoxFullScreen = styled(Box)(({ theme}) => ({
    display: "none",
    gap: "20px",
    alignItems:"center",
    padding: "5px",
    //backgroundColor: "white",
    // over sm show, under hide
    [theme.breakpoints.up("md")] : {
        display: "flex"
    }
}))

export const UserBoxMobile = styled(Box)(({ theme}) => ({
    display: "flex",
    padding: "5px",
    gap: "20px",
    alignItems:"center",
    [theme.breakpoints.up("md")] : {
        display: "none"
    }
    //backgroundColor: "white",
}))

export function LoginMenu() {
    // useStates for context
    const {authData, setAuth} =useAuth()
    // navigate
    const navigate = useNavigate();

    const navigateMyProfile = () => {           
        navigate('myprofile/');   
        // setOpen(false)       
                };

    return (
        <Typography 
            variant='span'
        // onClick= {e=> setOpen(true)} // open menu when clicked
        >            
            {!authData ? 
                <Button 
                    variant="contained"
                    style={{
                        borderRadius:80,
                        fontSize:15,
                        fontWeight:600,
                        fontFamily:'Work Sans',
                        color:"#FFFFFF",
                        textTransform:"none"
                    }}
                    onClick={()=> navigateMyProfile()}
                >
                    chuj
                </Button> 
                :
                // <p>{authData.email}</p>
                <Button 
                    variant="contained"
                    style={{
                        borderRadius:80,
                        fontSize:15,
                        fontWeight:600,
                        fontFamily:'Work Sans',
                        color:"#FFFFFF",
                        textTransform:"none"
                    }}
                    onClick={()=> navigateMyProfile()}
                >
                    My Profile
                </Button>
            }
        </Typography>
    )
}

