import React, { useRef,useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import OptionBar from './OptionBar';
import Fab from '@mui/material/Fab';
import './MyStyle.moudle.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';

export default function ProductLine(props) {
  const containerRef = useRef(null);
  const [isHoveredRight, setIsHoveredRight] = useState(false)
  const [isHoveredLeft, setIsHoveredLeft] = useState(false)
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 224, // Adjust the scroll distance as needed
        behavior: 'smooth',
      }); // Adjust the scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 224, // Adjust the scroll distance as needed
        behavior: 'smooth',
      }); // Adjust the scroll distance as needed
    }
  };

  return (
    <div >
      
      <div className='title-products' style={{backgroundColor:props.color, marginBottom:5,borderRadius:5,fontSize:25}}>
        <stan style={{marginLeft:5}}>
          {props.type}
        </stan>
      </div>
      
      
    
      
      <div style={{backgroundImage:"url("+`${props.image}`+")",backgroundSize: 'cover',backgroundColor:"lightblue",height:365,borderRadius:25,paddingLeft:12,paddingTop:10,paddingBottom:10}} className="row-container" ref={containerRef}>
      <Fab color="defualt" className={`animated-button ${isHoveredLeft ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredLeft(true)}
      onMouseLeave={() => setIsHoveredLeft(false)}
       sx={{width:60,backgroundColor: "transparent", marginTop:20,position:"absolute"}} aria-label="add">
        <NavigateBeforeIcon onClick={scrollLeft} sx={{fontSize:80, color:"blueviolet"}} />
      </Fab>
        {props.products.filter(product=>product.name.includes(props.search)||props.search==undefined).map((product, index) => (
          <ProductCard userIndex={props.userIndex} key={index} prod={product} type={props.type}/>
        ))}
      <Fab color="default" className={`animated-button ${isHoveredRight ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredRight(true)}
      onMouseLeave={() => setIsHoveredRight(false)}
       sx={{backgroundColor: "transparent",marginLeft:132, marginTop:20,position:"absolute"}} aria-label="add">
        <NavigateNextIcon onClick={scrollRight} sx={{fontSize:80, color:"blueviolet"}} />
      </Fab>
      
      </div>
    </div>
  );
}
