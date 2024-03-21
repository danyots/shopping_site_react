import { useState,useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CopyrightIcon from '@mui/icons-material/Copyright';
import OptionBar from './OptionBar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, MenuItem } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useSelector,useDispatch} from 'react-redux'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




export default function SignUpPaymentDetails() {
    const navigate=useNavigate()
    const [cardNumber, setCardNumber] = useState(sessionStorage.getItem("cardNumber"));
    const [expiryMonth, setExpiryMonth] = useState(sessionStorage.getItem("expiryMonth"));
    const [expiryYear, setExpiryYear] = useState(sessionStorage.getItem("expiryYear"));
    const [cvv, setCVV] = useState(sessionStorage.getItem("cvv"));
    const [anyEmapty,setAnyEmpty]=useState(false)
    const [cardNumberError, setCardNumberError] =  useState(false);
    const [cvvError, setCVVError] = useState(false);
    const changePaymentDetails = (e) => {
        e.preventDefault()
        setCardNumberError(false)
        setCVVError(false)
        setAnyEmpty(false)
        if(expiryMonth==='Expiry Month'||expiryYear==='Expiry Year'){
            setAnyEmpty(true)
        }
        else if (cardNumber.length !== 19) {
            setCardNumberError(true);
          }
          else if (cvv.length !== 3) {
            setCVVError(true);
          }
        else{
            sessionStorage.setItem("cardNumber",cardNumber)
                sessionStorage.setItem("expiryMonth",expiryMonth)
                sessionStorage.setItem("expiryYear",expiryYear)
                sessionStorage.setItem("cvv",cvv)
                navigate("/signup-delivary-details")
        }
    
      };
      const back=()=>{
        history.back()
    }
      const handleCardNumberChange = (e) => {
        const input = e.target.value;
        // Remove non-digit characters
        const sanitizedInput = input.replace(/\D/g, '');
        // Format the input with spaces every 4 digits
        const formattedInput = sanitizedInput.replace(/(\d{4})/g, '$1 ').trim();
        // Limit to 16 digits
        const limitedInput = formattedInput.substring(0, 19);
        
        setCardNumber(limitedInput);
      };
      const handleCVVChange = (e) => {
          const input = e.target.value;
          // Remove non-digit characters
          const sanitizedInput = input.replace(/\D/g, '');
          // Limit to 3 digits
          const limitedInput = sanitizedInput.substring(0, 3);
          
          setCVV(limitedInput);
        };
  return (
    <div className='login'>
      <IconButton onClick={back}>
            <ArrowBackIcon sx={{color:"white"}}/>
        </IconButton>
        <h1 style={{color:"white",marginLeft:150,marginTop:30,textAlign:"center"}}>Sign Up</h1>
        <Card sx={{marginLeft:20,marginRight:-10}}>
            <CardContent sx={{textAlign:"center",marginTop:5,marginBottom:-5,fontSize:20,fontWeight:"bold"}}>please insert your payment details</CardContent>
            <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },marginTop:10,marginBottom:10,marginLeft:10
                }}
                onSubmit={changePaymentDetails}
              >
                
                <TextField
                required
                error={cardNumberError}
                  id="card-num"
                  label="Card Number"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  variant="outlined"
                  helperText="Card Number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
                <TextField
                required
                  select
                  defaultValue={'Expiry Month'}
                  variant="outlined"
                  helperText="  Expiry Month"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                >
                  <MenuItem value='Expiry Month' disabled>Expiry Month</MenuItem>
                  {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(month => <MenuItem value={month}>{month}</MenuItem>)}
                </TextField>
                <TextField
                required
                  select
                  defaultValue={'Expiry Year'}
                  variant="outlined"
                  helperText="  Expiry Year"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                >
                  <MenuItem value='Expiry Year' disabled>Expiry Year</MenuItem>
                  {['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'].map(month => <MenuItem value={month}>{month}</MenuItem>)}
                </TextField>
                <br />
                <TextField
                required
                error={cvvError}
                  id="cvv"
                  label="CVV"
                  placeholder="CVV"
                  variant="outlined"
                  helperText="CVV"
                  value={cvv}
                  onChange={handleCVVChange}
                />
                <br />
                {anyEmapty?<stan style={{color:"red"}}>*Some Fields are empty</stan>:null}
                <button style={{ marginBottom:10,float: "right", marginTop: 40, backgroundColor: "teal",marginRight:35, border: "3px solid darkgray" }} type="submit">Next</button>
              </Box>
       </Card>
    </div>
  )
}