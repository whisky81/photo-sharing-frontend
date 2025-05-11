import React from "react";
import { Typography, Box, Divider, ImageList, ImageListItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModelData from "../../lib/fetchModelData";
import { useState, useEffect } from "react";
/**
 * UserDetail component displays detailed information about a user.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState({}); 
  useEffect(() => {
    fetchModelData(`/api/user/${userId}`)
      .then(data => {
        setUser(data.user);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);



  

  if (!user) {
    return <Typography variant="body1">User not found</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {`${user.first_name} ${user.last_name}`}
      </Typography>

      {user.description && (
        <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
          {user.description}
        </Typography>
      )}

      <Typography variant="body1" paragraph>
        Live: {user.location}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" component="h2">
        <Link
          to={`/photos/${userId}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Gallery
        </Link>
      </Typography>
    </Box>
  );
}

export default UserDetail;