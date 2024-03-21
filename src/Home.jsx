import React, { useState,useEffect } from 'react';
import OptionBar from './OptionBar';
import { useDispatch } from 'react-redux';
import './MyStyle.moudle.css';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import CopyrightIcon from '@mui/icons-material/Copyright';


export default function Home() {
const dispatch = useDispatch();
const navigate=useNavigate()
const [isHovered, setIsHovered] = useState(false);
const [button1Visible, setButton1Visible] = useState(false);
const [button2Visible, setButton2Visible] = useState(false);
const [button3Visible, setButton3Visible] = useState(false);
const [button4Visible, setButton4Visible] = useState(false);
const [headlineVisible, setHeadlineVisible] = useState(false);
const [userIndex,setUserIndex]=useState(0)
const data = useSelector(store=>store)


  
const getUser = () => {
  if (data.users && data.users.length > 0) {
    setUserIndex(data.users.indexOf(data.users.find(use => use.displayed ==true)))
    
  }
};

useEffect(() => {
  getUser();
}, [data.users]); // Add data.users to the dependency array

useEffect(() => {
  setButton1Visible(false)
  setButton2Visible(false)
  setButton3Visible(false)
  setButton4Visible(false)
  // Delay the visibility of Button 1
  const timeoutId1 = setTimeout(() => {
    setButton1Visible(true);
  },300);
  

  // Delay the visibility of Button 2 after Button 1
  const timeoutId2 = setTimeout(() => {
    setButton2Visible(true);
  },700);
    const timeoutId3 = setTimeout(() => {
      setHeadlineVisible(true);
    },100);
    const timeoutId4 = setTimeout(() => {
      setButton4Visible(true);
    },1000);

  return () => {
    clearTimeout(timeoutId1);
    clearTimeout(timeoutId2);
    clearTimeout(timeoutId3);
    clearTimeout(timeoutId4);
    setButton1Visible(false);
      setButton2Visible(false);
      setButton3Visible(false);
      setButton4Visible(false);
  };
}, []);

const productNavigate=()=>{
  navigate("/home/products")
}
const customersNavigate=()=>{
  navigate("/home/customers")
}
const purchasesNavigate=()=>{
  navigate("/home/purchases")
}
return (
  <div className='home'>
    <OptionBar userIndex={userIndex}/>
    <div>
    <CSSTransition
        in={headlineVisible}
        timeout={500}
        classNames="animated-button-slide"
        appear
      >
        <div className='heading-1' style={{color:"white",fontSize:50,marginTop:20,textAlign:"center"}}>choose Service to Displays</div>
      </CSSTransition>
      <CSSTransition
        in={button1Visible}
        timeout={500}
        classNames="animated-button-slide"
        appear
      >
        <button  style={{backgroundColor:'#004d40',fontSize:25,color:'white',fontWeight:"bold",marginTop:100,marginLeft:200,height:60,borderRadius:15,border:"3px solid gray",width:1000}}
          className={`animated-button-slide${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={productNavigate}
        >
          Products
        </button>
      </CSSTransition>

      <CSSTransition
        in={button2Visible}
        timeout={500}
        classNames="animated-button-slide"
        appear
      >
        <button style={{backgroundColor:'#00796b',fontSize:25,color:'white',fontWeight:"bold",marginTop:40,height:60,borderRadius:15,border:"3px solid gray",marginLeft:200,width:1000}}
          className={`animated-button-slide${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={customersNavigate}
        >
          Customers
        </button>
      </CSSTransition>
      <CSSTransition
        in={button4Visible}
        timeout={500}
        classNames="animated-button-slide"
        appear
      >
        <button style={{backgroundColor:'#009688',fontSize:25,color:'white',fontWeight:"bold",marginTop:40,height:60,borderRadius:15,border:"3px solid gray",marginLeft:200,width:1000}}
          className={`animated-button-slide${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={purchasesNavigate}
        >
          Purchases
        </button>
      </CSSTransition>
    </div>
    <footer
        style={{
          backgroundColor: '#004d40',
          color:"white",
          width: '100%',
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
);
}

