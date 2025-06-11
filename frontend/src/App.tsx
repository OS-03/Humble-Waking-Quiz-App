import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavBar from './components/Navbar';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        HumbleWalking
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="lg">
      <div className="my-4">
        <NavBar/>
        <Typography variant="h4" align='center' component="h1" sx={{ mb: 2 }}>
         Quiz App
        </Typography>
      </div>
      <Copyright />
    </Container>
  );
}
