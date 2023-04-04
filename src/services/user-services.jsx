import React from 'react'
// using context
import {useAuth} from '../hooks/useAuth'
import {useNavigate } from "react-router-dom";

const apiUrl = 'https://www.yyy.dsgaff.com/'
// const apiUrl = 'http://127.0.0.1:8000/'

export function LogoutFromError () {
    // useStates for context
    const {authData, setAuth} =useAuth()
    const navigate = useNavigate();

    const navigateMyProfile = () => {           
        navigate('myprofile/');   
        setAuth(null)       
            };
    navigateMyProfile()

    
}

//login function
export function auth(credentials) {
    return fetch(`${apiUrl}api/v1/auth/jwt/create/`, {
    // return fetch('http://127.0.0.1:8000/api/v1/auth/jwt/create/', {        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log("custom err: " + e)
    })
}

    // http://127.0.0.1:8000/api/v1/results/results/
  // function for fetching profiles
  export function fetch_results(acc_token, appDate, username) {

    // const {authData, setAuth} =useAuth()
    if (appDate === "") {
        var reportDate = ""
    } else {
        reportDate= "reportDate"
    }

    if (username === "" ) {
        var usernameVar = ""
    } else {
        usernameVar = "username"
    }



    return fetch(`${apiUrl}api/v1/results/admin/results/?${reportDate}=${appDate}&${usernameVar}=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc_token}`
        },
        // because we cannot add body to GET
        // body: JSON.stringify(player)
    }
    ).then(resp => resp.json())
    .catch( e => {
        // setAuth(null)
        console.log(e)
        LogoutFromError()
    })
} 

export function fetch_settlements(acc_token,username) {

    if (username === "" ) {
        var usernameVar = ""
    } else {
        usernameVar = "username"
    }


    return fetch(`${apiUrl}api/v1/settlement/admin/player/?${usernameVar}=${username}`, {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc_token}`
        },
        // because we cannot add body to GET
        // body: JSON.stringify(player)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
} 

export function fetch_Reports(acc_token) {


    return fetch(`${apiUrl}api/v1/results/reports`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc_token}`
        },
        // because we cannot add body to GET
        // body: JSON.stringify(player)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
} 

export function fetch_User_List(acc_token) {


    return fetch(`${apiUrl}api/v1/users/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc_token}`
        },
        // because we cannot add body to GET
        // body: JSON.stringify(player)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
} 

export function fetch_Club_List(acc_token,appDate) {

    if (appDate === "") {
        var reportDate = ""
    } else {
        reportDate= "reportDate"
    }



    return fetch(`${apiUrl}api/v1/results/admin/club/results/?${reportDate}=${appDate}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc_token}`
        },
        // because we cannot add body to GET
        // body: JSON.stringify(player)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
} 