import { useState } from "react";
import { useContext, createContext } from "react";

// the video that I used https://www.udemy.com/course/react-django-full-stack-advance/learn/lecture/27057118#overview

const AuthenticationContext = createContext(null)

export const AuthenticationProvider = ( {user, children}) => {

    const [authData,setAuthData] = useState(user)

    // custom function, where we set data to local storage
    const setAuth = newUser => {
        if (newUser) {
            localStorage.setItem('smc-user', JSON.stringify(newUser))
            // console.log(newUser.email) 
        } else {
            localStorage.removeItem('smc-user') 
        }

        setAuthData(newUser)

    }

    return (
        <AuthenticationContext.Provider value={{authData,setAuth}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuth = () => useContext(AuthenticationContext)