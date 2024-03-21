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



export default function ForgotPassword() {
    const data = useSelector(store=>store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user,setUser]=useState('')
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorUser,setErrorUser]=useState(false)
    const [passwordIsNotIdentical,setPasswordIsNotIdentical]=useState(false)
    const [showPassword1,setShowPassword1]=useState(false)
    const [showPassword2,setShowPassword2]=useState(false)
    
    const back=()=>{
      history.back()
  }

    const change = (e) => {
        e.preventDefault()
        setErrorUser(false)
        setPasswordIsNotIdentical(false)
        const myuser = data.users.filter(use=>use.userName==user)
        if(myuser.length===0){
            setErrorUser(true)
        }
        else if(password!=newPassword){
            setPasswordIsNotIdentical(true)
        }
        else{
            const index = data.users.indexOf(data.users.find(use=>use.userName==user))
            const action={type:"CHANGEPASSWORD",userIndex:index,password:password}
            dispatch(action)
            navigate("/login")
        }
        
    }


  return (
    <div className='login'>
      <IconButton onClick={back}>
            <ArrowBackIcon sx={{color:"white"}}/>
        </IconButton>
        <h1 style={{color:"white",marginLeft:150,marginTop:-10,textAlign:"center"}}>change password</h1>
        <Card sx={{marginLeft:50,marginRight:-10,width:600}}>
            <CardContent sx={{textAlign:"center",marginTop:5,marginBottom:-5,fontSize:20,fontWeight:"bold"}}>
                <Typography>
                please enter your user name, your new password and a verification to the new password
                </Typography>
                
                </CardContent>
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },marginTop:10,marginBottom:10,marginLeft:20
            }}
            onSubmit={change }
          >
            <TextField
            required
              id="userName"
              placeholder="user name"
              variant="outlined"
              helperText="user name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            /> <br />
            <TextField
            required
              id="password"
              type={showPassword1?"text":"password"}
              placeholder="new password"
              variant="outlined"
              helperText="new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton sx={{marginTop:2}} onClick={()=>setShowPassword1(!showPassword1)}>
            {showPassword1?<VisibilityOffIcon />:<VisibilityIcon />} 
            </IconButton>
            <br />
            <TextField
            required
            type={showPassword2?"text":"password"}
              id="newPassword"
              placeholder="verify password"
              variant="outlined"
              helperText="verify password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              
            />
            <IconButton sx={{marginTop:2}} onClick={()=>setShowPassword2(!showPassword2)}>
            {showPassword2?<VisibilityOffIcon />:<VisibilityIcon />}
            </IconButton>
            <br />
            {errorUser?<stan style={{color:"red"}}>*incorrect user name</stan>:null} <br />
            {passwordIsNotIdentical?<stan style={{color:"red"}}>*password hasn't verified</stan>:null}
<button style={{ float: "right", backgroundColor: "teal",marginRight:35, marginBottom: 10, marginTop: 20, border: "3px solid darkgray" }} type="submit">Save</button>
              </Box>
       </Card><br /><br />
    </div>
  )
}