import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../../config/Firebase/firebase";
import { addDoc,doc,collection, getDoc, serverTimestamp} from "firebase/firestore"; 
import firebase from "firebase/app";
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ActionButton from '../controls/ActionButton';

const AddAdminUser=({setOpenPopup})=>{
    const paperStyle={padding :50,height:'20vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#ff6699'}
    const btnstyle={margin:'8px 0',backgroundColor:'#ff6699'}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  
  function change1(e){
    setEmail(e.target.value)
  }
  
  function change2(e){
    setPassword(e.target.value)
  }
  
  function submit(e){
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     return addDoc(collection(db, "adminUsers"), {email:userCredential.user.email,id:userCredential.user.uid,time:serverTimestamp()});
    }).then((data)=>{
      setOpenPopup(false)
      console.log('data',data)
    }
    )
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error+++++',error.message)
    });
  }
 
    return(
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                {/* <Grid align='center'>
                     <Avatar style={avatarStyle} ><LockOutlinedIcon/></Avatar>
                </Grid> */}
                <TextField  variant="outlined" label='Username' placeholder='Enter username' fullWidth required onChange={change1}/><br></br><br></br>
                <TextField variant="outlined" label='Password' placeholder='Enter password' type='password' fullWidth required  onChange={change2}/><br></br><br></br>
                {/* <Button type='submit'  variant="contained" style={btnstyle} fullWidth onClick={submit}>
                  
                  Submit
                  
                  </Button> */}
                   <ActionButton variant="contained" style={{marginLeft:'80px',width:'150px'}} color="primary" onClick={submit} >
                                       Submit
                                    </ActionButton>
                </Paper>
        </Grid>
    )
}

export default AddAdminUser