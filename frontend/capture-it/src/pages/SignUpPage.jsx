import React from "react";
import { TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function SignUpPage(){

    const [username, setUsername] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[reEnterPass, setReEnterPass] = useState("");

    /**Handling when signing in */

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        const formattedEmail = email.trim().toLowerCase();
        setLoading(true);
        // reset the error
        setError('');
        /**don;t submit form */
        if(password !== reEnterPass){
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('http://localhost:5001/signup', { // Use your backend API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, firstName, lastName, formattedEmail, password }) // Add other fields as necessary
            });

            if(response.ok){
                navigate("/profile");
                
            } else{
                setError("Sign Up was not successful.");
            }
    
            // Handle response data
        } catch (error) {
            setError('An error occurred. Please try again.');
        }

        /**set loading equal to false regardless */
        finally{
            setLoading(false);
        }
    };
    return(
                 // wrap the entire thing in a box like containr 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
        Capture It
        </Typography>

        <form onSubmit={handleSubmit} style={{ display: 'flex',alignItems: 'center' ,justifyContent: 'center', flexDirection: 'column', width: '50%'}}>

            <TextField
                label="Username"
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{width: '70%'}}
                onChange={(e)=> setUsername(e.target.value)}
            />

            <TextField
                label="First Name"
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{ width: '70%' }}
                onChange={(e)=> setFirstName(e.target.value)}
            />

            <TextField
                label="Last Name"
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{ width: '70%' }}
                onChange={(e)=> setLastName(e.target.value)}
            />


            <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{width: '70%'}}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                style={{width: '70%'}}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <TextField
                label="Reenter Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{ width: '70%' }}
                onChange={(e)=>setReEnterPass(e.target.value)}
            />

            <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>
    
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading} // Disable button when loading
                style={{
                    backgroundColor: 'black', 
                    color: 'white', 
                    margin: '20px 0',
                    width: '50%'
                }}
                >
                {loading ? "Loading..." : "SignUp"}
             </Button>

        </form>
        
            <Typography variant="body2">
            Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </Box>    
    );
}


export default SignUpPage;