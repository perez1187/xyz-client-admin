import React, {useEffect, useState} from 'react'

import {useAuth} from '../hooks/useAuth'

import {fetch_results, fetch_User_List, fetch_settlements, fetch_Reports, fetch_Club_List} from '../services/user-services'
import { headOfResults, showPlayerResults, showSettlement, headOfSettlement,ClubResults } from './handlers'

import './LandingPage.css'

import {useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function LandingPage() {

  const navigate = useNavigate();

  // var uniqueTags = []; // for unique players
  
  const {authData, setAuth} =useAuth()

  const [results, setResults] = useState([]) // object from api with results
  const [settl, setSettl] = useState([]) // object from api with settlements
  const [reports, setReports] = useState([]) // object from api with list of reports
  const [userList, setUserList] = useState([]) // object from api with list of reports
  const [clubList, setClubList] = useState([]) // object from api with list of reports  

  const [can, setCan] = useState(false) // boolen -> can show results
  const [can2, setCan2] = useState(false) // bool -> can show settlements
  const [can3, setCan3] = useState(false) // bool -> can show reports
  const [can4, setCan4] = useState(false) // bool -> can user list
  const [can5, setCan5] = useState(false) // bool -> can show club list

  const [sumProfit, setSumProfit]= useState(0) // sum player profit
  const [sumProfitAdj, setSumProfitAdj]= useState(0) // sum player profit
  const [sumRake, setSumRake]= useState(0) // sum player rake
  const [sumRb, setSumRb]= useState(0) // sum player rb
  const [sumRbAdj, setSumRbAdj]= useState(0) // sum player rb action
  const [sumTotal, setSumTotal]= useState(0) // sum player earnings
  const [sumSetl, setSumSetl]= useState(0) // sum player setl
  const [forSetl, setForSetl]= useState(0) // set for settlement
  
  const [sumAgentRB, setSumAgentRB]= useState(0) // sum agent rb
  const [sumAgentRBADJ, setSumAgentRBADJ]= useState(0) // sum agent rb adjustment
  const [sumAgentEarn, setSumAgentEarn]= useState(0) // sum agent rb adjustment

  // if filter on reports, change to false and dont show sum all resuts minus setlement
  const [showForSetl, setShowForSetl] = useState(true) 

  const [sRepDate, setSRepDate] = useState('') // set report date for filtering
  const [sPlayerUsername, setSPlayerUsername] = useState('') // set player username for filtering 


  var acc_token = "" 
  if (authData) {
    var acc_token = authData.access
  } else {
    
  }

  async function fetch_all_club_results( ) {
    const data = await fetch_Club_List(acc_token, sRepDate)

    if (data == null ){

      navigate('login/');   
      setAuth(null)      
    }

    setClubList(data)
    setCan5(true)
    // console.log(data)
  }

  async function fetch_all_user_list(){
    const data = await fetch_User_List(acc_token)

    if (data == null ){

      navigate('login/');   
      setAuth(null)      
    }

    setUserList(data)
    setCan4(true)

  }
  

  // function fetch all loggin player results
  // put resutls to state results
  // change "can display" to true
  // calculate sum of difrent results like rake, profit etc
  // and put every score to difrent state
  async function fetch_all_results() {
    const data = await fetch_results(acc_token,sRepDate, sPlayerUsername)

    if (data == null ){

      navigate('login/');   
      setAuth(null)      
    }

    setResults(data)
    // console.log(data)
    setCan(true)

    // sum profit rake and all other results
    data.Results.map(
      (element) => {
        
        setSumProfit(sumProfit => sumProfit + element.total_profit)
        setSumRake(sumRake => sumRake +element.total_rb)
        setSumProfitAdj(sumProfitAdj => sumProfitAdj + (element.total_profit * element.avg_adj))
        setSumRb(sumRb => sumRb + (element.total_rb * element.avg_rb))
        setSumRbAdj(sumRbAdj => sumRbAdj + (element.total_rb * element.avg_rb * element.avg_adj))
        setSumTotal(sumTotal => 
          sumTotal + (
            element.total_profit -
            (element.total_profit * element.avg_adj) +
            (element.total_rb * element.avg_rb) -
            (element.total_rb * element.avg_rb * element.avg_adj)
            )
          )
        setSumAgentRB(sumAgentRB => sumAgentRB + (element.total_rb * element.avg_club_rb)) 
        setSumAgentRBADJ(sumAgentRBADJ => sumAgentRBADJ + (Math.round((element.total_rb * element.avg_club_rb * element.avg_club_adj *100))/100))
        setSumAgentEarn(sumAgentEarn => sumAgentEarn + (
          element.total_rb * element.avg_club_rb - 
          element.total_rb * element.avg_rb +
          element.total_rb * element.avg_rb * element.avg_adj -
          Math.round(
            (element.total_rb * element.avg_club_rb * element.avg_club_adj *100))/100
        ))
      }
    )

    return  }

  // function fetch all loggin player setlements
  // put settlements to settl state
  // change "can display" to true
  // sum all settlements and put to state sumSetl
  async function fetch_all_settlements(){
    const dattt = await fetch_settlements(acc_token,sPlayerUsername)
    if (dattt == null ){
      navigate('login/');   
      setAuth(null)     
    }


    setSettl(dattt)
    setCan2(true)

    dattt.map(
      (element) => {
        setSumSetl(sumSetl => sumSetl + Number(element.transactionUSD))
      }
    )

    return dattt
  }  

  async function fetchAllReports() {
    const data = await fetch_Reports(acc_token)
    // console.log(data)
    if (data == null ){

      navigate('login/');   
      setAuth(null)     
    }
    setReports(data)
    setCan3(true)
    return
  }

  // this use efect works every time player filter reports
  // use efect resets states and fetch data
  useEffect(()=> {
      setSumProfit(0)
      setSumRake(0)
      setSumSetl(0)
      setSumProfitAdj(0)
      setSumRb(0)
      setSumRbAdj(0)
      setSumTotal(0)
      setForSetl(0)

      setSumAgentRB(0)
      setSumAgentRBADJ(0)
      setSumAgentEarn(0)

      fetch_all_results()
      fetch_all_settlements()
      fetchAllReports()
      fetch_all_user_list()
      fetch_all_club_results()


      // FindUniquePlayers()
      // console.log("resr" + results)     
              
      },[sRepDate,sPlayerUsername])
  
  // use efect for setting "for settlement" state
  useEffect(()=>{
    setForSetl(0)
    
    setForSetl(forSetl => forSetl +(sumSetl + sumTotal))

  },[sumSetl,sumTotal])

  // use efect if filter with reports is set, than we hide "for settlements"
  useEffect(()=>{
    if (sRepDate == "") {
      setShowForSetl(true)
    } else {
      setShowForSetl(false)
    }
  },[sRepDate])

  // function for setting state for drop menu with report dates
  const handleChange3 = (event: SelectChangeEvent) => {
    setSRepDate(event.target.value);
  };  

  const handleChange2 = (event: SelectChangeEvent) => {
    setSPlayerUsername(event.target.value);
  }; 



  return (
    <>
    { can & can2 & can3 & can4 &can5? 
   
   <div>
      {authData ? 
      <> 
      <div className='dropMenu'>      
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Dates</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={sRepDate}
                label="Age"
                onChange={handleChange3}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {reports.map((element) => (
                  <MenuItem key={element.id} value={element.date}>
                    {element.date}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div> 
        <div className='dropMenu'>      
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Players</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={sPlayerUsername}
                label="Age"
                onChange={handleChange2}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {userList.map((element) => (
                  <MenuItem value={element.username}>
                    {element.username}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div>   

     <div className='componentResults' >
      <div className='compResultsOne'>

          <div>
          {headOfResults(sumProfit, sumRake, sumProfitAdj, sumRb, sumRbAdj, sumTotal, sumAgentRB,sumAgentRBADJ,sumAgentEarn)}  
            {
              can ?
              <>
                {showPlayerResults(results)}
              </>
              :
              <div> false</div> 
          }
          </div>
          
      </div>
      <div className='compResultsTwo'>

        {headOfSettlement(sumSetl, forSetl,showForSetl)}
          
          {
            can2 & true ?
            <>
              {showSettlement(settl)}
              {ClubResults(clubList)}
            </>
            :
            <div> nothing </div>
          }



      </div>
     </div>
     </>
     :
     <>
      <div className='resHead'>The private site of fishing hunters enthusiasts </div> 
     </>
        }
   </div>
  
  :
  <div> Dowdnloading data</div>
  
  }
   </>
   
    
  )
}

export default LandingPage