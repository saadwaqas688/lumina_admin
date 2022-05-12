import { Box, Grid, Paper } from "@material-ui/core";
import {
  Typography,
} from "@mui/material";
const SingleWorkOUtDetails = ({data}) => {
  return (
    <Paper elevation={6} >
  <Grid container   spacing={2} sx={{padding:'10px'}}>
    <Grid item xs={12}  md={6}>
       <Typography variant="h5" color="text.secondary"  sx={{textAlign:'center',mt:'20px'}}>
          {data.title}
        </Typography>
        {/* <video
             src={data.videoUrl}
             controls
            style={{ width: "100%", height: "100%" }}
          /> */}
                     <Box sx={{marginLeft:"20px",marginRight:"20px"}}>
                                           <video
                                           src={data.videoUrl}
                                               controls
                                           style={{ width: "100%", height: "100%" ,marginTop:"10px",objectFit:"fill"}}
                               />
                                </Box>
      
    {/* <img src={data.image} alt="Paella dish" width="80%" 
    height="400px" style={{marginTop:"20px",marginLeft:"20px",borderRadius:"10px",objectFit:"fill"}}
  /> */}
            </Grid>
        <Grid item xs={12} md={6}>
    <Typography variant="h5" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px'}}>
         Description :
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.description}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px'}}>
         Duration :
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.duration}
        </Typography>

        </Grid>
 

    </Grid>
    </Paper>

//   <Paper elevation={3} >


// </Paper >

  
  );
};

export default SingleWorkOUtDetails;
