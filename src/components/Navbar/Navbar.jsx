import React from 'react'

// using context
import {useAuth} from '../../hooks/useAuth'



// mui
import { AppBar, styled, Toolbar} from '@mui/material'
import UserBoxNavbarLogout from './UserBoxNavbarLogout'
import UserBoxNavbarLogin from './UserBoxNavbarLogin'

// components
// import LogoNavbar from './LogoNavbar';
// import UserBoxNavbar from './UserBoxNavbar';

// our own toolbar
const StyledToolbar = styled(Toolbar) ({
    display: "flex",
    justifyContent:"space-between",
    backgroundColor:"#020717",
    margin:"0",
    padding:"0"
})

function Navbar() {

    const {authData} =useAuth()
 
  return (
    <>
      <AppBar
          position='sticky' //it can be stick
      >
        {/* instead of toolbar we use Styledtoolbar that we overwrite toolbar */}
        <StyledToolbar>


            {!authData ? 
                <UserBoxNavbarLogout />
                // <h1>when you are logout</h1>
                :
                <UserBoxNavbarLogin />
                // <h1>login</h1>
            }

          {/* Logo component */}
          {/* <LogoNavbar /> */}

          {/* login/logout/user menu */}
          {/* <UserBoxNavbar />  */}
        </StyledToolbar>
      </AppBar>

      
    </>
  )
}

export default Navbar