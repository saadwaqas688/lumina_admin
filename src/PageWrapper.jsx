import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, createTheme, Link, Stack } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ThemeProvider } from '@emotion/react';



export default function PageWrapper(props) {
  const [mode, setMode] = React.useState("light");
  console.log(props)
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      

          <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
        {props.children}
        </Stack>
      </Box>
      </ThemeProvider>

  );
}
