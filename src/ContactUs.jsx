import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './MyStyle.moudle.css';
import CopyrightIcon from '@mui/icons-material/Copyright';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import OptionBar from './OptionBar';
import {useSelector} from 'react-redux'

const ContactUs = () => {
    const data = useSelector(store=>store)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const back=()=>{
    history.back()
}

const [userIndex,setUserIndex]=useState(0)


  
const getUser = () => {
  if (data.users && data.users.length > 0) {
    setUserIndex(data.users.indexOf(data.users.find(use => use.displayed ==true)))
    
  }
};

useEffect(() => {
  getUser();
}, [data.users]); // Add data.users to the dependency array
  const [activeInfo, setActiveInfo] = useState(null);
  const [formSubmissionStatus, setFormSubmissionStatus] = useState({
    submitted: false,
    success: false,
  });
  const [infoMessages, setInfoMessages] = useState({
    Email: '',
    Phone: '',
    Address: '',
  });

  const [formError, setFormError] = useState('');

  const iconRefs = {
    Email: useRef(null),
    Phone: useRef(null),
    Address: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if any field is empty
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all fields.');
      return;
    }

    console.log('Form submitted:', formData);
    setFormSubmissionStatus({ submitted: true, success: true });
    setFormError('');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    
  };

  const handleButtonClick = (info) => {
    setActiveInfo(activeInfo === info ? null : info);
  };

  const displayInfo = () => {
    switch (activeInfo) {
      case 'Email':
        return 'example@example.com';
      case 'Phone':
        return '+1 (123) 456-7890';
      case 'Address':
        return '123 Shop Street, Cityville';
      default:
        return '';
    }
  };

  useEffect(() => {
    // Set the infoMessage for the currently activeInfo
    if (activeInfo ) {
      setInfoMessages((prevMessages) => ({
        ...prevMessages,
        [activeInfo]: displayInfo(),
      }));
    }
  }, [activeInfo]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if the click is outside of any iconRefs
      const isOutside = Object.values(iconRefs).every(
        (ref) => ref.current && !ref.current.contains(e.target)
      );

      // If outside, reset activeInfo
      if (isOutside) {
        setActiveInfo(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [iconRefs]);

  return (
    <div className="contact-us" >
        <OptionBar userIndex={userIndex}/>
        <IconButton onClick={back}>
            <ArrowBackIcon />
        </IconButton>
      <h2 style={{marginLeft:20}}>Contact Us</h2>
      <p style={{marginLeft:20}}>Feel free to reach out to us with any questions or concerns!</p>
      <form onSubmit={handleSubmit} style={{marginLeft:20}}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
          style={{marginLeft:26}}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div style={{marginTop:5}}>
          <label  htmlFor="email">Email:</label>
          <input
          style={{marginLeft:31}}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div> 
        <div style={{marginTop:5}}>
          <label style={{verticalAlign:"top",marginRight:3}} htmlFor="message">Message:</label>
          <textarea
          style={{height:100}}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        {formError && <p style={{color:"red"}} className="message error">{formError}</p>} <br />
        <button type="submit" style={{backgroundColor:"#004d40"}}>Submit</button>
      </form>

      {formSubmissionStatus.submitted && (
        <p className={`message ${formSubmissionStatus.success ? 'success' : 'error'}`} style={{ whiteSpace: 'pre-line',width:500, marginLeft:20 }}>
          {formSubmissionStatus.success
            ? 'massage submitted successfully!\nWe will process your request as quickly as possible.'
            : 'massage submission failed. Please try again.'}
        </p>
      )}
      <h3 style={{marginLeft:20,marginTop:30}}>Contact Information</h3>
      <div  className="contact-info" style={{ display: 'inline-flex' ,marginLeft:20}}>
        <div className="contact-item" onClick={() => handleButtonClick('Email')} ref={iconRefs.Email}>
          <FontAwesomeIcon icon={faEnvelope} />
          {activeInfo === 'Email' && (
            <div className="message info">{infoMessages.Email}</div>
          )}
        </div>
        <div className="contact-item" onClick={() => handleButtonClick('Phone')} ref={iconRefs.Phone}>
          <FontAwesomeIcon icon={faPhone} />
          {activeInfo === 'Phone' && (
            <div className="message info">{infoMessages.Phone}</div>
          )}
        </div>
        <div className="contact-item" onClick={() => handleButtonClick('Address')} ref={iconRefs.Address}>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {activeInfo === 'Address' && (
            <div className="message info">{infoMessages.Address}</div>
          )}
        </div>
      </div>
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

export default ContactUs;
