import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (

    // wrap the entire thing in a box like containr 
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
        Capture It
      </Typography>

      <div style={{ display: 'flex',alignItems: 'center' ,justifyContent: 'center', flexDirection: 'column', width: '50%'}}>
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{width: '50%'}}
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                style={{width: '50%'}}
            />
        
        </div>

<Button
  variant="contained"
  color="primary"
  style={{ 
    backgroundColor: 'black', 
    color: 'white', 
    margin: '20px 0',
    width: '50%' // Set the width to 50%
  }}
>
  Login
</Button>

      <Typography variant="body2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
}

export default LoginPage;
