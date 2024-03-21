import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useLocation } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useSelector,useDispatch} from 'react-redux'

export default function Login() {

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [showPassword,setShowPassword]=useState(false)
    const [showErrorPassword,setShowErrorPassword]=useState(false)

    const navigate=useNavigate()
    const data = useSelector(store=>store)
    const dispatch=useDispatch()
    const back=()=>{
        navigate("/")
    }

const enter=(e)=>{
    e.preventDefault()
    setShowErrorPassword(false)
    data.users.forEach(user=>user.displayed=false)
    const myUser=data.users.find(user=>user.userName==username&&user.password==password)
    if(myUser==undefined){
        setShowErrorPassword(true)
    }
    else{
        const index=data.users.indexOf(myUser)
        const action={
            type:"LOGIN",
            userIndex:index
        }
        dispatch(action)
        navigate("/home")
    }
    
}

  return (
    <div className='login'>
        <IconButton onClick={back}>
            <ArrowBackIcon sx={{color:"white"}}/>
        </IconButton>
        <h1 style={{color:"white",marginLeft:150,marginTop:100,textAlign:"center"}}>Log In</h1>
        <form onSubmit={enter} style={{fontSize:20,color:"white",textAlign:"center",marginLeft:150,marginTop:100}}>
           username: <br /> <input onChange={e=>setUsername(e.target.value)} style={{height:30,color:"white",color:"white",fontSize:20,width:300,backgroundColor:"#004d40",boxShadow:" 1px 1px 1px 0 lightgray inset"}} type="text" /> <br />
           password: <br /> <input  onChange={e=>setPassword(e.target.value)}style={{height:30,color:"white",fontSize:20,width:300,backgroundColor:"#004d40",boxShadow:" 1px 1px 1px 0 lightgray inset"}} type={showPassword?"text":"password"} />
           <IconButton sx={{marginRight:-5}} onClick={()=>setShowPassword(!showPassword)}>
            {showPassword?<VisibilityOffIcon sx={{color:"white"}}/>:<VisibilityIcon sx={{color:"white"}}/>}
           </IconButton>
       <br /> <Link to="/forgot-password"style={{marginTop:200,fontSize:15}}>I forgot my password</Link><br /><br />
       <button type='submit' style={{width:300,borderRadius:0,border:"2px solid white",backgroundColor:"teal",marginLeft:4}}>enter</button>
        </form><br />
        {showErrorPassword?<stan style={{color:"red",marginLeft:590}}>incorrect username or password</stan>:null}
    </div>
  )
}
