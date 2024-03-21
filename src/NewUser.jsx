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
import { isExists } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export default function NewUser() {
    const data=useSelector(store=>store)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userExists,setUserExists]=useState(false)
    const [passwordIsNotIdentical,setPasswordIsNotIdentical]=useState(false)
    const [showPassword1,setShowPassword1]=useState(false)
    const [showPassword2,setShowPassword2]=useState(false)
    

    const back=()=>{
      history.back()
  }

    const setNewUser = (e) => {
        e.preventDefault()
        
        setUserExists(false)
        setPasswordIsNotIdentical(false)
        if(data.users.filter(use=>use.userName==user).length!==0){
            setUserExists(true)
        }
        else if(password!=newPassword){
            setPasswordIsNotIdentical(true)
        }
        else{
            const action={type:"NEWUSER",user:{
                displayed:false,
                userName:user,
                password:password,
                mycart:[],
                details:{
                    private:{
                        firstName:sessionStorage.getItem("firstName"),
                        lastName:sessionStorage.getItem("lastName"),
                        phoneNumber:sessionStorage.getItem("phoneNumber"),
                        email:sessionStorage.getItem("email"),
                        gender:sessionStorage.getItem("gender"),
                        birthday:sessionStorage.getItem("birthday"),
                    },
                    payment:{
                        cardNumber:sessionStorage.getItem("cardNumber"),
                        expiryMonth:sessionStorage.getItem("expiryMonth"),
                        expiryYear:sessionStorage.getItem("expiryYear"),
                        cvv:sessionStorage.getItem("cvv")
                    },
                    delivary:{
                        city:sessionStorage.getItem("city"),
                        street:sessionStorage.getItem("street"),
                        houseNumber:sessionStorage.getItem("houseNumber"),
                        isPrivate:sessionStorage.getItem("isPrivate"),
                        entry:sessionStorage.getItem("entery"),
                        floor:sessionStorage.getItem("floor"),
                        apartment:sessionStorage.getItem("apartmentNumber")
                    }
                    
                    },
                    purchases:[]
                }
            }
            dispatch(action)
            sessionStorage.clear()
            navigate("/login")
        }
    }
  return (
    <div className='login'>
      <IconButton onClick={back}>
            <ArrowBackIcon sx={{color:"white"}}/>
        </IconButton>
        <h1 style={{color:"white",marginLeft:150,marginTop:30,textAlign:"center"}}>Sign Up</h1>
        <Card sx={{width:500,marginLeft:60,marginRight:-10}}>
            <CardContent sx={{textAlign:"center",marginTop:5,marginBottom:-5,fontSize:20,fontWeight:"bold"}}>please choose an user name and a password</CardContent>
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },marginTop:10,marginBottom:10,marginLeft:12
            }}
            onSubmit={setNewUser}
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
              {userExists?<stan style={{color:"red"}}>*user already exists</stan>:null}
              {passwordIsNotIdentical?<stan style={{color:"red"}}>*password hasn't verified</stan>:null}
            <br />
            <button style={{ float: "right", backgroundColor: "teal",marginRight:35, marginBottom: 10, marginTop: 20, border: "3px solid darkgray" }} type="submit">save</button>
              </Box> 
       </Card>
    </div>
  )
}