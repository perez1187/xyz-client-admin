import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

// mui
import {Button, Menu, MenuItem }  from '@mui/material'

// local
// import Navigation from './Navigation';

// // utils
import {UserBoxFullScreen, UserBoxMobile, LoginMenu} from './UtilsNavbar.jsx'

function UserBoxNavbarLogout() {

    // 👇️ navigate to /
    const navigate = useNavigate();

    const navigateLogin = () => {           
        navigate('login/');
        setOpen(false)          
            }; 
     

    // menu mobile
    const [open, setOpen] = useState(false)
  return (
    <>
        <UserBoxFullScreen>
            <div style={{
                display:"flex"
            }}>
                <div style={{
                    padding:"5px", 
                    display:"flex", 
                    
                }}>
                    {/* <Navigation></Navigation> */}

                                        {/* <Navigation></Navigation> */}
                    <Button 
                        variant="contained" 
                        size="medium"
                        onClick={()=>navigateLogin()}
                        style={{
                            borderRadius:80,
                            fontSize:15,
                            fontWeight:600,
                            fontFamily:'Work Sans',
                            color:"#FFFFFF",
                            textTransform:"none"
                        }}
                    >                
                            Login            
                    </Button> 
                </div>
                <div style={{
                    padding:"5px"
                }}>
                </div>
            </div>
        </UserBoxFullScreen>
        
        <UserBoxMobile onClick= {e=> setOpen(true)}> 

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
            >
                Menu
            </Button>
            </UserBoxMobile>
      

        {/* Autocomplete for searching menu */}
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open} //open is depending on state open
            onClose= {(e)=>setOpen(false)} // when you clck somewhere, when close
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
        >            

            <MenuItem onClick={()=> navigateLogin()} >Login</MenuItem>

        </Menu>
        

    </>
  )
}

export default UserBoxNavbarLogout