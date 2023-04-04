import './App.css'
import Navbar from './components/Navbar/Navbar'

// react
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// context
import {AuthenticationProvider} from './hooks/useAuth'

import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import LoginFront from './LoginComponent/LoginFront';

// // components
// import Navbar from './components/Navbar/Navbar';

// // react
// import {BrowserRouter, Routes, Route} from 'react-router-dom'

// // context
// import {AuthenticationProvider} from './hooks/useAuth'


// // pages

// import LandingPage from './pages/LandingPage/LandingPage.jsx';



function App() {

  // we check auth data from local storage and put it as an object to user
  const user = JSON.parse(localStorage.getItem('smc-user') )

  return (
    <BrowserRouter>
    {/* // we give user, user is sendingg to Authentication provider, and then is set as authDate (useState) */}
    <AuthenticationProvider user = {user}>  {/* everything below are children */}
      <> 
        
        <Navbar/>

        <Routes> 
          <Route path='/' element={<LandingPage/>} />  
          <Route path='login/' element={<LoginFront/>} />


        </Routes>

        {/* <Footer/> */}
      </>
    </AuthenticationProvider>
  </BrowserRouter>
)
}

export default App
