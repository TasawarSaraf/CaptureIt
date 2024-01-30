import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';

function ProfilePage() {
  const { username } = useParams();
  const[userProfile, setUserProfile] = useState(null);
  const[isLoading, setIsLoading] = useState(true);
  const[bio, setBio] = useState(true);
  const[clickBio, setClickBio] = useState(false);
  const[isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    // Replace with the actual API endpoint to fetch user profile
    fetch(`http://localhost:5001/user/${username}`)
      .then(response => response.json())
      .then(data => {
        setUserProfile(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      });
  }, [username]);
  
  const handleEditPicture = async () =>{
    // Implement the logic to edit the profile picture
  }

  const handleAddBio = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`http://localhost:5001/user/${username}/bio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bio })
      });
  
      if (!response.ok) {
        throw new Error('Bio update failed');
      }
  
      const data = await response.json();
      setUserProfile(data);
      // You can perform additional actions here, like updating the UI
    } catch (error) {
      console.error('Error updating bio:', error);
    } finally {
      setIsSubmitting(false);
      setClickBio(false);
    }
  };


  const profilePicURL = userProfile?.profilePic || 'default-profile-pic-url';
  
  if (isLoading){
    return <div>Loading...</div>
  }
  return (
    <div>
      {/**Profile picture above here if not there */}
       <Typography variant="h3">{username}</Typography>
      {userProfile && userProfile.bio ? (

        <div>
          <Typography variant="body1">{userProfile.bio}</Typography>
          <Button variant="outlined" onClick={() => {setClickBio(true)}}>Edit</Button>
        </div>
        
      ) : (
        <Button variant="outlined" onClick={() => {setClickBio(true)}}>
          Add Bio
        </Button>
      )}
      
      {clickBio && (
        <>
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
          />
          <Button
            variant="outlined"
            onClick={handleAddBio}
            disabled={isSubmitting}
          >
            Add 
          </Button>
        </>
      )}



    </div>
  );
}




export default ProfilePage;
