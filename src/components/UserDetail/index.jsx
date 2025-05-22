import React, { useState, useEffect } from "react";
import { Typography, Box, Divider, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModelData from "../../lib/fetchModelData";
import PhotoList from "../PhotoList";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const data = await fetchModelData(`/api/photo/user/${userId}`);
        setUser(data.owner);
        setPhotos(data.photos);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      }
    };

    fetchUserPhotos();
  }, [userId]);

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!user || !photos || user._id !== userId) {
    return (
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={20} />
        <Typography variant="body1">Loading user data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {`${user.first_name ?? ''} ${user.last_name ?? ''}`}
      </Typography>

      {user.description && (
        <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
          {user.description}
        </Typography>
      )}

      <Typography variant="body1" paragraph>
        Live: {user.location || 'Unknown'}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <PhotoList photos={photos} owner={user} />
    </Box>
  );
}

export default UserDetail;
