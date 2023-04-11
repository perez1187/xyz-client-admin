

// headline of results section
export     function headOfResults(sumProfit, sumRake, sumProfitAdj, sumRb, sumRbAdj, sumTotal, sumAgentRB,sumAgentRBADJ,sumAgentEarn) {
    return (
      <>
      <div className='nickres'>
      <div className='resHead'> 
          <div>Player:</div>
          <div> </div>
        </div>
        <div className='resHeadClub'> 
          <div>Nickname:</div>
          <div> </div>
        </div>
        <div className='resHeadClub'>Club : </div>
        <div className='resHeadMini'>  
          <div>profit:</div>
          <div> {Math.round(sumProfit*100)/100} $</div>
        </div>
        <div className='resHeadMini'>  
          <div>P/L action</div>
          <div> {Math.round(sumProfitAdj*100)/100} $</div>
        </div>
        <div className='resHeadMini'> 
          <div>rake:</div>
          <div> {Math.round(sumRake*100)/100} $</div>        
        </div>

        <div className='resHeadMini'> 
          <div>rb $</div>
          <div> {Math.round(sumRb*100)/100}$</div>        
        </div>
        <div className='resHeadMini'> 
          <div>rb action</div>
          <div> {Math.round(sumRbAdj*100)/100} $</div>        
        </div>
        <div className='resHeadMini'> 
          <div>rb %</div>
          <div> </div>        
        </div>
        <div className='resHeadMini'> 
          <div>adj %</div>
          <div> </div>        
        </div>
        <div className='resHeadMini'> 
          <div>sum</div>
          <div>{Math.round(sumTotal*100)/100} $ </div>        
        </div>
        <div className='resHeadMini'> 
          <div>agent rb </div>
          <div> </div>        
        </div>
        <div className='resHeadMini'> 
          <div>agent adj </div>
          <div> </div>        
        </div>
        <div className='resHeadMini'> 
          <div>agent rb $</div>
          <div> {Math.round(sumAgentRB*100)/100} $</div>        
        </div>
        <div className='resHeadMini'> 
          <div>agent adj</div>
          <div> {Math.round(sumAgentRBADJ*100)/100} $</div>        
        </div>
        <div className='resHeadMini'> 
          <div>agent earn</div>
          <div> {Math.round(sumAgentEarn*100)/100} $</div>        
        </div>
        </div>
        {/* {showPlayerResults(results)} */}
      </>
    )
  }

  // results section
  // totak_rb - this is total RAKE
export  function showPlayerResults (results) {

    return (
      
      results.Results.map(
            (element) => {
              return (
                <> 
                  <div className='nickres'> 
                   <div className='resTab'>{element.nickname__player__username} </div>
                    <div className='resTabClub'>{element.nickname__nickname} </div>
                    <div className='resTabClub'>{element.club__club} </div>
                    <div className='resTabMini'>{Math.round(element.total_profit *100)/100}$</div>
                    <div className='resTabMini'>{Math.round(element.total_profit * element.avg_adj*100)/100} $</div>
                    <div className='resTabMini'>{Math.round(element.total_rb*100)/100}$ </div>                    
                    <div className='resTabMini'>{Math.round(element.total_rb * element.avg_rb*100)/100} $</div>
                    <div className='resTabMini'>{Math.round(element.total_rb * element.avg_rb * element.avg_adj *100)/100} $</div>
                    <div className='resTabMini'>{Math.round(element.avg_rb * 100*100)/100} %</div>
                    <div className='resTabMini'>{element.avg_adj * 100} %</div>
                    <div className='resTabMini col' >{
                      Math.round(
                      (element.total_profit - 
                      (element.total_profit * element.avg_adj) +
                      (element.total_rb * element.avg_rb) -
                      (element.total_rb * element.avg_rb * element.avg_adj)
                      )*100
                      )/100
                      } $                    
                    </div>
                    <div className='resTabMini'>{element.avg_club_rb * 100} %</div>
                    <div className='resTabMini'>{element.avg_club_adj * 100} %</div>
                    <div className='resTabMini'>{Math.round(element.total_rb * element.avg_club_rb *100)/100} $</div>
                    <div className='resTabMini'>{Math.round((element.total_rb * element.avg_club_rb * element.avg_club_adj *100))/100}$</div>
                    <div className='resTabMini col' >{
                      Math.round(
                      (element.total_rb * element.avg_club_rb - 
                      element.total_rb * element.avg_rb +
                      element.total_rb * element.avg_rb * element.avg_adj -
                      Math.round(
                        (element.total_rb * element.avg_club_rb * element.avg_club_adj *100))/100
                      ) *100
                      ) /100
                        }$</div>
                  </div>
                  
                </>
              )
            }
          ))
  }  

  // settlement section
export     function showSettlement(settl) {
  return (
    settl.map(
      (element) => {
        return (
          <>
          <div className='nickres'>
            <div className='resTab'></div>
            <div className='resTab'>{element.player}</div>
            <div className='resTab'>{element.transactionUSD} $</div>
            <div className='resTab'>{element.date}</div>
            <div className='resTab'>{element.description}</div>
            </div>
          </>
        )
      }
    )
  )
}  

// headline of results section
export     function headOfSettlement(sumSetl, forSetl,showForSetl) {
  return (
    <>
      <div className='nickres'>
      <div className='resHead'>

          {
            showForSetl ? 
            <>
              <div>for settlement  </div>
              <div> {Math.round(forSetl * 100) / 100}$</div>
            </>
            :
            <></>  
        }
          {/* <div>for settlement  </div>
          <div> {forSetl}$</div> */}
        </div>
        <div className='resHead'>
          <div>Player:  </div>
          <div></div>
        </div>
        <div className='resHead'>
          <div>amount:  </div>
          <div>{Math.round(sumSetl*100)/100} $</div>
        </div>
        <div className='resHead'> 
          <div>date:  </div>
          <div></div>
        </div>
        <div className='resHead'>
          <div>description: </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export function ClubResults(clubRes) {

  return (
    <>
      <div className='nickres'>
        <div className='resTab'> </div>
        <div className='resTab'>CLUB</div>
        <div className='resTab'>PROFIT $</div>
        <div className='resTab'>RAKE $</div>
      </div>
    <>
    {clubRes.ClubResults.map(
      (element) => {
        return (
          <>
          <div className='nickres'>
            <div className='resTab'> </div>
            <div className='resTab'>{element.club__club}</div>
            <div className='resTab'>{element.total_profit} $</div>
            <div className='resTab'>{element.total_rb} $</div>
          </div>
          </>
        )
      }
    )}
    </>
    </>
  )
}