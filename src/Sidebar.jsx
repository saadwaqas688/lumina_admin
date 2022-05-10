import {
  AccountBox,
  Article,
  Group,
  Home,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  // Box,
  // Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import {useLocation} from 'react-router';


const Sidebar = ({mode,setMode}) => {
  const { pathname } = useLocation();
  return (
    // <Box flex={1}  sx={{ display: { sm: "none",md:"block" } ,margin:'10',minHeight:'100vh'}}>
    //   <Paper  elevation={6} sx={{mt:'30px',position:'fixed'}}>
        <List >
          <ListItem >
            <ListItemButton component="a" href="/meal">
              <ListItemIcon >
                <Home sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}} primary="Meal" />
            </ListItemButton>
          </ListItem>
          <ListItem  >
            <ListItemButton component="a" href="/AdminUsers" selected={pathname==='/AdminUsers'?true:false}>
              <ListItemIcon >
                <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}} />
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}}  primary="Manage Admin Users" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon >
                <Article sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}} primary="Classes" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton component="a" href="/users">
              <ListItemIcon>
                <Group sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText  sx={{color:"purple"}} primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Storefront sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText  sx={{color:"purple"}} primary="Instructors" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton component="a" href="/orders">
              <ListItemIcon>
                <Person sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}} primary="Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem  >
            <ListItemButton component="a" href="/shop"  selected={pathname==='/shop'?true:false}>
              <ListItemIcon>
                <Settings sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}} primary="Shop" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}} primary="Customer Support" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}}primary="About Us" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}} primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </List>
    //   </Paper>
    // </Box>
  );
};

export default Sidebar;
