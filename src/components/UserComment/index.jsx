import React, { useState, useEffect } from 'react';
import fetchModelData from '../../lib/fetchModelData';
import { useParams, Link } from 'react-router-dom';
import {
  Typography,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Container,
  Divider,
} from "@mui/material";
import PhotoComment from '../PhotoComment';
import './styles.css';

export default function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchModelData(`/api/comment/user/${userId}`)
      .then(data => {
        setComments(data.comments || []);
        setUser(data.owner || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch user comments:", err);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <Container className="user-comments-loading">
        <CircularProgress size={30} />
        <Typography variant="body1" sx={{ marginLeft: 2 }}>Loading user comments...</Typography>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container className="user-comments-error">
        <Typography variant="h6" color="error">
          {error || "User not found."}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="user-comments-container">
      <Box className="user-comments-header">
        <Typography variant="h4" component="h1" gutterBottom>
          Comments by {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'} found
        </Typography>
        <Divider className="user-comments-divider" />
      </Box>

      {comments.length === 0 ? (
        <Typography variant="body1" className="user-comments-empty">
          No comments available for this user.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {comments.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card className="user-comments-card">
                <Link to={`/photos/detail/${item._id}`} style={{ textDecoration: 'none' }}>
                  <CardMedia
                    component="img"
                    image={`/images/${item.file_name}?w=300&fit=crop&auto=format`}
                    alt={item.file_name}
                    className="user-comments-card-image"
                  />
                </Link>
                <CardContent className="user-comments-card-content">
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Photo: {item.file_name}
                  </Typography>
                  <PhotoComment comments={item.comments}/>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
