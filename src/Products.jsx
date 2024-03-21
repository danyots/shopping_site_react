import React from 'react';
import ProductLine from './ProductLine';
import OptionBar from './OptionBar';
import MyCart from './MyCart';
import CopyrightIcon from '@mui/icons-material/Copyright';
import {useSelector} from 'react-redux'
import { useState } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import AddProduct from './AddProduct';
import './MyStyle.moudle.css';
import { useEffect } from 'react';



export default function Products() {
  const data = useSelector(store=>store)

  const [open,setOpen]=useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [search,setSearch]=useState()
  const [userIndex,setUserIndex]=useState(0)


  
  const getUser = () => {
    if (data.users && data.users.length > 0) {
      setUserIndex(data.users.indexOf(data.users.find(use => use.displayed ==true)))
      
    }
  };

  useEffect(() => {
    getUser();
  }, [data.users]); // Add data.users to the dependency array





  const toclose=()=>{
    setOpen(false)
  }
  const changeSearch = (str)=>{
    setSearch(str)
    
  }
  
  return (
    <div className='products'>
      <div style={{ marginBottom: 10 }}>
        <OptionBar  userIndex={userIndex} search={changeSearch}/>

      </div>
      <div style={{display:"inline-flex"}} >
        <div style={{ width: '100%' }}>
          <ProductLine userIndex={userIndex} search={search} products={data.products.vegetables} type={"vegetables"} color={"darkgreen"} image={"https://img.freepik.com/free-vector/green-abstract-halftone-background_1409-898.jpg"}/>
          <ProductLine userIndex={userIndex} search={search} products={data.products.fruits} type={"fruits"} color={"orange"} image={"https://wallpapers.com/images/featured/solid-orange-background-azi8jy6mnqetkjo0.jpg"}/>
          <ProductLine userIndex={userIndex} search={search} products={data.products.diaries} type={"dairy products"} color={"teal"} image={"https://img.freepik.com/free-vector/gradient-emerald-background_23-2150260699.jpg"}/>
          <ProductLine userIndex={userIndex} search={search} products={data.products.meat} type={"meat"} color={"salmon"} image={"https://as1.ftcdn.net/v2/jpg/01/18/35/10/1000_F_118351002_AswiAihXDKnMJZ783Z1oF0gBL2JNHiSH.jpg"}/>
          <ProductLine userIndex={userIndex} search={search} products={data.products.housekeepers} type={"housekeeping products"} color={"purple"}image={"https://png.pngtree.com/thumb_back/fh260/background/20210427/pngtree-vector-crystal-purple-background-image_653523.jpg "}/>
        </div>
        
        <div >
          <MyCart userIndex={userIndex} />
          <br />
          <button className={`animated-button ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
       onClick={()=>setOpen(true)} style={{float:"right",display:'inline-flex',width:320,borderRadius:15,marginTop:-10,backgroundColor:"teal",border:"3px solid darkgray"}}>
        <AddIcon sx={{fontSize:25,marginLeft:3,color:"white"}} /> <stan style={{fontSize:20,color:"white"}}>Add product to Store</stan>
      </button>
        </div>
      </div>
      <AddProduct userIndex={userIndex} toclose={toclose} open={open}/>
      <footer
        style={{
          backgroundColor: '#004d40',
          width: '1520px',
          color:"white",
          marginLeft:-32,
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
