import * as React from 'react';
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
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'

// ... (Previous imports remain the same)

export default function PaymentDetails(props) {

  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryMonth, setExpiryMonth] = React.useState('Expiry Month');
  const [expiryYear, setExpiryYear] = React.useState('Expiry Year');
  const [cvv, setCVV] = React.useState('');
  const [anyEmapty,setAnyEmpty]=useState(false)
  const [cardNumberError, setCardNumberError] = React.useState(false);
  const [cvvError, setCVVError] = React.useState(false);
  const data=useSelector(store=>store)
  const dispatch=useDispatch()

  React.useEffect(()=>{
    setDefualt()
  },[props.userIndex])
  const setDefualt=()=>{
    setCardNumber(data.users[props.userIndex].details.payment.cardNumber)
        setCVV(data.users[props.userIndex].details.payment.cvv)
        setExpiryMonth(data.users[props.userIndex].details.payment.expiryMonth)
        setExpiryYear(data.users[props.userIndex].details.payment.expiryYear)
  }



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
        const action={type:"UPDATEPAYMENT",
    dat:{
        cardNumber:cardNumber,
        expiryMonth:expiryMonth,
        expiryYear:expiryYear,
        cvv:cvv
    },userIndex:props.userIndex}
    dispatch(action)
    }

  };
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
    <div >
        <Accordion sx={{ width: 1000 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: 'bold' }}>Payment Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                onSubmit={changePaymentDetails}
              >
                <hr />
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
                <button style={{ marginBottom:10,float: "right", marginTop: 40, backgroundColor: "teal", border: "3px solid darkgray" }} type="submit">save</button>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>

        )
        }
