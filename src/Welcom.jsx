import React from 'react'
import './MyStyle.moudle.css';
import { useNavigate} from 'react-router-dom';

export default function Welcome() {
    const navigate=useNavigate()
    const toLogin=()=>{
        navigate("/login")
    }
    const toSignup=()=>{
        navigate("/signup-private-details")
    }
  return (
    <div className='welcome'>
        <div style={{marginTop:300,marginLeft:670}}>
        <button onClick={toLogin} style={{borderRadius:0,backgroundColor:"#004d40",border:"3px solid white",fontSize:20}}>login</button><br /><br />
        <button onClick={toSignup} style={{borderRadius:0,backgroundColor:"transparent",border:"3px solid white",color:"white",fontSize:17}}>sign up</button>
        </div>
    </div>
  )
}
