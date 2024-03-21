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

export default function PrivateDetails(props) {
  const [val, setVal] = React.useState('');
  const [visibleClicked, setVisibleClicked] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const data=useSelector(store=>store)
  const [privateName, setPrivateName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [phoneError, setPhoneError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [phoneProblem,setPhoneProblem]=React.useState(false);
  const [emailProblem,setEmailProblem]=React.useState(false);
  const [anyEmpty,setAnyEmpty]=React.useState(false);
  const dispatch=useDispatch()
 
  React.useEffect(()=>{
    setDefualt()
  },[props.userIndex])
  const setDefualt=()=>{
    
    setPrivateName(data.users[props.userIndex].details.private.firstName)
    setLastName(data.users[props.userIndex].details.private.lastName)
    setPhoneNumber(data.users[props.userIndex].details.private.phoneNumber)
    setEmail(data.users[props.userIndex].details.private.email)
    setGender(data.users[props.userIndex].details.private.gender)
    setBirthDate(data.users[props.userIndex].details.private.birthday)
    setPassword(data.users[props.userIndex].password)
  }


  const handlePhoneChange = (e) => {
setPhoneError(false)

    const input = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

  // Insert a space after the third digit
  let formattedInput = input.replace(/^(\d{3})(\d{0,9})$/, '$1-$2');


    let finalFormat = formattedInput.substring(0,11)
    if(finalFormat.length==4){
        finalFormat=finalFormat.substring(0,3)
    }

    setPhoneNumber(finalFormat)

  // Set phone number and error state
  if (finalFormat.substring(0,2)!="05") {
    setPhoneError(true);
  } else {
    setPhoneError(false);
    
  }

  };

  const changePrivateDetails = (e) => {
    e.preventDefault()
    setPhoneProblem(false)
    setEmailProblem(false)
    setAnyEmpty(false)
    if(phoneError){
        setPhoneProblem(true)
    }
    else if(emailError){
        emailProblem(true)
    }
    else if(privateName==''||lastName==''||email==''||phoneNumber==''||password==''||gender==''||birthDate==''){
        setAnyEmpty(true)
    }
    else{
        const action={type:"UPDATEPRIVATE",dat:{
            firstName:privateName,
            lastName:lastName,
            phoneNumber:phoneNumber,
            email:email,
            gender:gender,
            birthday:birthDate
        },userIndex:props.userIndex}
        dispatch(action)
    }
  };
  const handleEmailChange=(e)=>{
    const email = e.target.value
    setEmail(email)
    if(!email.includes('@')){
        setEmailError(true)
    }
    else{
        setEmailError(false)
    }

  }


  return (
    <div >
        <Accordion sx={{ width: 1000 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 'bold' }}>Private Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                onSubmit={changePrivateDetails}
              >
                <hr />
                <TextField
                required
                  id="private-name"
                  label="Private Name"
                  placeholder="Private Name"
                  variant="standard"
                  helperText="Private Name"
                  value={privateName}
                  onChange={(e) => setPrivateName(e.target.value)}
                />
                <TextField
                required
                  id="last-name"
                  label="Last Name"
                  placeholder="Last Name"
                  variant="standard"
                  helperText="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                 <TextField
                 required
      type='tel'
      id="phone-num"
      label="Phone Number"
      placeholder="05X-XXXXXXX"
      variant="standard"
      helperText={phoneError ? "Invalid phone number format" : "Phone Number"}
      error={phoneError}
      value={phoneNumber}
      onChange={handlePhoneChange}
    />
                <TextField
                required
                  type='email'
                  id="gmail"
                  label="Email"
                  placeholder="Email"
                  variant="standard"
                  helperText={emailError ? "Invalid email format - must include @" : "Email"}
                  value={email}
                  error={emailError}
                  onChange={handleEmailChange}
                />
                <TextField
                required
                  id="gender"
                  select
                  label="Gender"
                  helperText="Gender"
                  variant="standard"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value={"select"} disabled>
                    {"Select Your Gender"}
                  </MenuItem>
                  <MenuItem value={"Male"}>{"Male"}</MenuItem>
                  <MenuItem value={"Female"}>{"Female"}</MenuItem>
                </TextField>
                <TextField
                required
                  type='date'
                  id="gmail"
                  variant="standard"
                  helperText="Birth Date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                <TextField
                required
            
                  type={visibleClicked ? 'text' : 'password'}
                  id="gmail"
                  label="Password"
                  placeholder="Password"
                  variant="standard"
                  helperText="Password"
                  value={password}
                  
                />
                <IconButton sx={{ marginTop: 2.5 }} onClick={() => setVisibleClicked(!visibleClicked)}>
                  {visibleClicked ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
                
                <br /><br /><br />
                {phoneError?<stan style={{color:"red"}}>*Phone Number is not Correct</stan>:null} <br />
                {emailError?<stan style={{color:"red"}}>*Email is not Correct</stan>:null} <br />
                {anyEmpty?<stan style={{color:"red"}}>*All fields must be filled</stan>:null}
                <button style={{ float: "right", backgroundColor: "teal", marginBottom: 10, border: "3px solid darkgray" }} type="submit">save</button>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>

        )
        }
