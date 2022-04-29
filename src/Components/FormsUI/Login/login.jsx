import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../../config/Firebase/firebase";
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ActionButton from '../controls/ActionButton';

const Login=()=>{
    const paperStyle={padding :50,height:'60vh',width:280, margin:"70px auto"}
    const avatarStyle={backgroundColor:'#ff6699'}
    const btnstyle={margin:'8px 0'}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  
  function handleEmail(e){
    setEmail(e.target.value)
  }
  
function handlePassword(e){
    setPassword(e.target.value)
  }

  function handleSubmit(){ 
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("session", JSON.stringify(user));
      console.log(user)
      navigate("/shop");
    })
    .catch((error) => {
      alert(error.message)
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error',error.message)
    });
}
      
     
   function submit(e){
    e.preventDefault()
    handleSubmit()
  }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle} color='red'><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField style={{marginTop:'40px'}} variant="outlined" label='Username' placeholder='Enter username' fullWidth required onChange={handleEmail}/>
                <TextField  style={{marginTop:'40px'}} variant="outlined" label='Password' placeholder='Enter password' type='password' fullWidth required  onChange={handlePassword}/>
                <ActionButton style={{marginTop:'40px',height:'50px'}} variant="contained" color="primary" onClick={submit} fullWidth>
                                       Log In
                                    </ActionButton>
                </Paper>
        </Grid>
    )
}

export default Login