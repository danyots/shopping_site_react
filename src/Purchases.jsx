import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import OptionBar from './OptionBar'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EuroIcon from '@mui/icons-material/Euro';
import IconButton from '@mui/material/IconButton';
import './MyStyle.moudle.css';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Purchases() {
  const [userIndex,setUserIndex]=useState(0)
  const [arePurchases,setArePurchases]=useState(true)
  const data = useSelector(store=>store)


  
  const getUser = () => {
    if (data.users && data.users.length > 0) {
      setUserIndex(data.users.indexOf(data.users.find(use => use.displayed ==true)))
      
    }
  };

  useEffect(() => {
    getUser();
  }, [data.users]); // Add data.users to the dependency array

  const purchasesExist=()=>{
    if(data.users[userIndex]?.purchases.length===0){
      setArePurchases(false)
    }
    else{
      setArePurchases(true)
    }
  }
  useEffect(()=>{
    purchasesExist()
  },[data.users[userIndex]?.purchases])
  return (
    <div className='purchases'>
      <OptionBar userIndex={userIndex}/>
      <h1 style={{textAlign:"center"}}>My Purchases</h1>
      <hr />
      {data.users[userIndex].purchases.map(purchase=>
      <Accordion sx={{marginTop:2,backgroundColor:"lightyellow"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontWeight:"bold"}}>purchased on {purchase.orderTime.date} at  {purchase.orderTime.time}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table style={{border:"1px solid black",marginLeft:10}}>
        <tr>
            <td style={{fontWeight:"bold"}}>items</td>
            <td style={{fontWeight:"bold"}}>price</td>
        </tr>
        
        {purchase.products.map(prod=><tr>
            <td style={{verticalAlign:"middle",display:"inline-flex"}}>
                <img src={prod.img} style={{height:30,width:30}}/><div style={{marginTop:3,marginLeft:5,marginRight:5}}>{prod.name}{" X "}{prod.amount }{prod.type=="vegetables"||prod.type=="fruits"||prod.type=="meat"?" Kg":" uts."}</div>
            </td>
            <td style={{color:"green"}}>
            {(Number(prod.price)*Number(prod.amount)).toFixed(2)}
            <EuroIcon sx={{ fontSize: 15, transform: "translateY(10%)", color: "green" }} />
            </td>
       </tr>)}
       <tr style={{fontWeight:"bold"}}>
        Total Price: <stan style={{color:"green"}}>{purchase.totalPrice}<EuroIcon sx={{ fontSize: 15, transform: "translateY(10%)", color: "green" }} /></stan>
       </tr>
      </table> <br />
      order arrival:<stan style={{fontWeight:"bold"}}>{" "+purchase.arrivalTime.slice(8,10)+"/"+purchase.arrivalTime.slice(5,7)+"/"+purchase.arrivalTime.slice(0,4)}</stan> at <stan style={{fontWeight:"bold"}}>{purchase.arrivalTime.slice(11,16)}</stan>
          </Typography>
        </AccordionDetails>
      </Accordion>)}
      {arePurchases?null:<stan style={{marginLeft:500,fontSize:30}}>No Purchases Yet</stan>}
      <div style={{height:60}}></div>
      <footer
        style={{
          backgroundColor: '#004d40',
          width: '1520px',
          color:"white",
          marginLeft:-32,
          position: 'fixed',
          bottom: 0,
          textAlign: 'left',
          paddingBottom: 20,
        }}
      >
        <CopyrightIcon />
        <span style={{ fontWeight: 'bold' }}>Copyrights</span> All Rights Reserved
      </footer>
    </div>
  )
}
