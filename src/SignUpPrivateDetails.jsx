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
export default function SignUpPrivateDetails() {
    const [visibleClicked, setVisibleClicked] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const data=useSelector(store=>store)
    const [privateName, setPrivateName] = useState(sessionStorage.getItem("firstName"));
    const [lastName, setLastName] = useState(sessionStorage.getItem("lastName"));
    const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem("phoneNumber"));
    const [email, setEmail] = useState(sessionStorage.getItem("email"));
    const [gender, setGender] =useState(sessionStorage.getItem("gender"));
    const [birthDate, setBirthDate] = useState(sessionStorage.getItem("birthday"));
  
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneProblem,setPhoneProblem]=useState(false);
    const [emailProblem,setEmailProblem]=useState(false);
    const [anyEmpty,setAnyEmpty]=useState(false);
    const navigate=useNavigate()
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
          if (finalFormat.substring(0,2)!="05"||finalFormat.length!=11) {
            setPhoneError(true);
          } else {
            setPhoneError(false);
            
          }
        
          };
          const back=()=>{
            sessionStorage.clear()
            history.back()
        }
        
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
            else{
                sessionStorage.setItem("firstName",privateName)
                sessionStorage.setItem("lastName",lastName)
                sessionStorage.setItem("phoneNumber",phoneNumber)
                sessionStorage.setItem("email",email)
                sessionStorage.setItem("gender",gender)
                sessionStorage.setItem("birthday",birthDate)
                navigate("/signup-payment-details")
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
    <div className='login'>
      <IconButton onClick={back}>
            <ArrowBackIcon sx={{color:"white"}}/>
        </IconButton>
        <h1 style={{color:"white",marginLeft:150,marginTop:30,textAlign:"center"}}>Sign Up</h1>
        <Card sx={{marginLeft:20,marginRight:-10}}>
            <CardContent sx={{textAlign:"center",marginTop:5,marginBottom:-5,fontSize:20,fontWeight:"bold"}}>please insert your private details</CardContent>
        <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '30ch' },marginTop:10,marginBottom:10,marginLeft:10
                }}
                onSubmit={changePrivateDetails}
              >
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
                sx={{color:"white"}}
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
                /> <br />
                {phoneError?<stan style={{color:"red"}}>*Phone Number is not Correct</stan>:null} <br />
                {emailError?<stan style={{color:"red"}}>*Email is not Correct</stan>:null} <br />
                {anyEmpty?<stan style={{color:"red"}}>*All fields must be filled</stan>:null}
       <br />
       <button style={{ float: "right",marginRight:35, backgroundColor: "teal", marginBottom: 10, border: "3px solid darkgray" }} type="submit">Next</button>
              
       </Box>
       </Card>
    </div>
  )
}
