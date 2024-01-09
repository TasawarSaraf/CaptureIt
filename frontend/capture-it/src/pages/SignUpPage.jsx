import React from "react";
import { TextField, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function SignUpPage(){
    return(
                 // wrap the entire thing in a box like containr 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
        Capture It
        </Typography>

        <div style={{ display: 'flex',alignItems: 'center' ,justifyContent: 'center', flexDirection: 'column', width: '50%'}}>

            <TextField
                    label="Username"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    style={{width: '70%'}}
            />

            <TextField
            label="First Name"
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            style={{ width: '70%' }}
            />

            <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            style={{ width: '70%' }}
            />


            <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{width: '70%'}}
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                style={{width: '70%'}}
            />

            <TextField
            label="Reenter Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            style={{ width: '70%' }}
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
        SignUp
        </Button>
            <Typography variant="body2">
            Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </Box>    
    );
}


export default SignUpPage;