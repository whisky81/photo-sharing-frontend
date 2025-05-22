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
      <Container sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={30} />
        <Typography variant="body1" sx={{ ml: 2 }}>Loading user comments...</Typography>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          {error || "User not found."}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Comments by {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'} found
        </Typography>
        <Divider sx={{ my: 3 }} />
      </Box>

      {comments.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          No comments available for this user.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {comments.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Link to={`/photos/detail/${item._id}`} style={{ textDecoration: 'none' }}>
                  <CardMedia
                    component="img"
                    image={`/images/${item.file_name}?w=300&fit=crop&auto=format`}
                    alt={item.file_name}
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                      borderBottom: '1px solid rgba(0,0,0,0.12)'
                    }}
                  />
                </Link>
                <CardContent sx={{ flexGrow: 1 }}>
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