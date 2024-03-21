import {React} from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import OptionBar from './OptionBar';
import {useSelector} from 'react-redux'
import { useState,useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

const AboutUs = () => {
    const [userIndex,setUserIndex]=useState(0)
    const data = useSelector(store=>store)

  
    const getUser = () => {
      if (data.users && data.users.length > 0) {
        setUserIndex(data.users.indexOf(data.users.find(use => use.displayed ==true)))
        
      }
    };
    const back=()=>{
        history.back()
    }
    useEffect(() => {
      getUser();
    }, [data.users]); // Add data.users to the dependency array

  return (
    <div className="about-us">
        <OptionBar userIndex={userIndex}/>
        <IconButton onClick={back}>
            <ArrowBackIcon />
        </IconButton>
      <h1 className='heading-2' style={{textAlign:"center",marginTop:150}}>About Us</h1>
      <p className='heading-2'>
        Welcome to our online store! We take pride in offering a diverse selection of high-quality
        products to enhance your lifestyle. At our store, we believe in providing a seamless and
        enjoyable shopping experience for our customers.
      </p>
      <p className='heading-2'>
        Our journey began with a passion for delivering exceptional products that cater to various
        interests and needs. From the latest fashion trends to cutting-edge electronics and
        must-have home decor, we curate a collection that reflects our commitment to style,
        innovation, and functionality.
      </p>
      <p className='heading-2'>
        As a customer-centric brand, we prioritize your satisfaction. Our team is dedicated to
        ensuring that you find the perfect items that not only meet your expectations but also
        exceed them. We strive to stay ahead of the curve, offering a dynamic and ever-expanding
        range of products that resonate with your lifestyle.
      </p>
      <p className='heading-2'>
        Whether you are exploring the latest fashion, upgrading your tech gadgets, or transforming
        your living space, we are here to inspire and provide. Thank you for choosing us as your
        go-to destination for quality products and exceptional service.
      </p>
      <footer
        style={{
          backgroundColor: '#004d40',
          width: '1520px',
          color:"white",
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
};

export default AboutUs;