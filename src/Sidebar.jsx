import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";

const Sidebar = ({mode,setMode}) => {
  return (
    <Box flex={1} p={4} sx={{ display: { xs: "none", sm: "none",md:"block" } ,bgcolor: 'background.paper',margin:'10',minHeight:'100vh'}}>
      <Box position="fixed"  >
        <List >
          <ListItem >
            <ListItemButton component="a" href="#home">
              <ListItemIcon >
                <Home sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}} primary="Meal" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton component="a" href="/AdminUsers">
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
            <ListItemButton component="a" href="#simple-list">
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
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Person sx={{color:'#ff6699' , fontSize:'40px'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:"purple"}} primary="Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem  selected={true} >
            <ListItemButton component="a" href="/shop">
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
      </Box>
    </Box>
  );
};

export default Sidebar;
