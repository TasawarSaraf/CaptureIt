import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


     /**Handling when signing in */

     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");


     const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior

        setLoading(true);
        // reset the error
        setError('');
        try {
            const response = await fetch('http://localhost:5000/login', { // Use your backend API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }) // Add other fields as necessary
            });
    
            if(response.ok){
                navigate("/profile");
            } else{
                setError("Could not login.");
            }
            // const responseData = await response.json();
            // console.log(responseData);
            // Handle response data
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
        /**set loading equal to false regardless */
        finally{
            setLoading(false);
        }
    };
    
  return (

    // wrap the entire thing in a box like containr 
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
        Capture It
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex',alignItems: 'center' ,justifyContent: 'center', flexDirection: 'column', width: '50%'}}>
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{width: '50%'}}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                disabled={loading}
                margin="normal"
                required
                style={{width: '50%'}}
                onChange={(e)=>setPassword(e.target.value)}
            />
        
            <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>

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
                {loading ? "Loading..." : "Login"}
            </Button>

    
        </form>

      <Typography variant="body2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
}

export default LoginPage;
