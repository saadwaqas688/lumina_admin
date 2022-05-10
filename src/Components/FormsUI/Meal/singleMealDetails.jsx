import { Box, Grid, Paper } from "@material-ui/core";
import {
  Rating,
  Typography,
} from "@mui/material";
const SingleMealDetails = ({data}) => {
  return (
    <Paper elevation={6} >
  <Grid container   spacing={2} sx={{padding:'10px'}}>
    <Grid item xs={12}  md={6}>
       <Typography variant="h5" color="text.secondary"  sx={{textAlign:'center',mt:'20px'}}>
          {data.title}
        </Typography>
      
    <img src={data.image} alt="Paella dish" width="80%" 
    height="400px" style={{marginTop:"20px",marginLeft:"20px",borderRadius:"10px",objectFit:"fill"}}
  />
            </Grid>
        <Grid item xs={12} md={6}>
    <Typography variant="h5" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px'}}>
         Recipe :
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.recipe}
        </Typography>
        {/* <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
          Rating :
        </Typography> */}

        {/* <Rating name="read-only" value={data.rating} readOnly sx={{ml:'20px'}}/> */}
        <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
          Ingredients :
          </Typography>
          <Box sx={{display:'flex',mt:'5px',ml:'20px',mr:'20px'}}>
       {   data.ingredients.map((item,index,ingredients)=>{
         return( 
           <Typography variant="body1" color="text.secondary" >
             {index===ingredients.length-1?item.ingredient+'   '+item.quantity
             :item.ingredient+"    "+item.quantity+","}
           </Typography>
         )
       })
       }
         </Box>
         <Box  sx={{display:'flex' ,justifyContent:'space-between',marginRight:'20px'}}>
         <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
           Protien
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
           Fats
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
          Carbs
          </Typography>
          </Box>

        </Grid>
 

    </Grid>
    </Paper>

//   <Paper elevation={3} >


// </Paper >

  
  );
};

export default SingleMealDetails;
