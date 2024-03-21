import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import {useSelector,useDispatch} from 'react-redux'
import EuroIcon from '@mui/icons-material/Euro';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DoneAllIcon from '@mui/icons-material/DoneAll';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const [open, setOpen] = React.useState(props.open);
    useEffect(() => {
        setOpen(props.open);
      }, [props.open]);
const close=(e)=>{  
    e.preventDefault();
    props.toclose(false)
}
const handleClose = () => {
    props.onClose(props.selectedValue);
  };

  return (
    <div>
<Dialog onClose={handleClose} open={open} sx={{maxHeight:700}}>
<DialogTitle sx={{height:40,color:"white",backgroundColor:"teal",paddingBottom:3}}>
    <div style={{fontSize:40,textAlign:"center"}}>{props.name} 
<IconButton onClick={close} sx={{float:"right",height:20,width:20}}>
        <CloseIcon sx={{fontSize:40,color:"white"}}/>
        </IconButton>
        </div>
        
</DialogTitle>
<img src={props.img} alt={props.name} />
    </Dialog>
    </div>
    
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ZoomedImg(props) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClose = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog
      toclose={props.toclose}
        selectedValue={selectedValue}
        open={props.open}
        onClose={handleClose}
        img={props.img}
        name={props.name}
      />
    </div>
  );
}
