import react, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import AppBar from './AppBar';

export default function Layout(props: any) {
  return (
    <>
      <CssBaseline />
      <AppBar></AppBar>
      <Container maxWidth="lg" component="main" sx={{ mt: "2rem"}}>
        {props.children}
      </Container>
    </>
  );
}
