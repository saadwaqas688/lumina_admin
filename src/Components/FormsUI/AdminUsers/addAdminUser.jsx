import React, { useState } from 'react'
import { createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../../config/Firebase/firebase";
import {  doc, serverTimestamp, setDoc} from "firebase/firestore"; 
import { Grid,Paper, TextField} from '@material-ui/core'
import ActionButton from '../controls/ActionButton';

const AddAdminUser=({setOpenPopup})=>{
    const paperStyle={padding :50,height:'20vh',width:280, margin:"20px auto"}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
      return    setDoc(doc(db, "adminUsers", userCredential.user.uid), {
        id:userCredential.user.uid,
        email: userCredential.user.email,
        status : "active",
        time:serverTimestamp()
      });
    //  return addDoc(collection(db, "adminUsers"), {email:userCredential.user.email,id:userCredential.user.uid,time:serverTimestamp()});
    }).then((data)=>{
      setOpenPopup(false)
      console.log('data',data)
    }
    )
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      alert(error.message)
      console.log('error+++++',error.message)
    });
  }
 
    return(
        <Grid>
            <Paper elevation={0} style={paperStyle}>

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