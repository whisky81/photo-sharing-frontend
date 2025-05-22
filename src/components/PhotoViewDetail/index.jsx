import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import fetchModelData from '../../lib/fetchModelData';
import {
  Card, CardHeader, CardContent, Typography,
  Avatar, Divider, Box, CircularProgress, Chip,
  Container, Stack, Tooltip
} from '@mui/material';
import { Comment, Schedule, Image } from '@mui/icons-material';
import './styles.css';

export default function PhotoViewDetail() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchModelData(`/api/photo/${photoId}`)
      .then(data => {
        setPhoto(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch photo:", err);
        setError("Failed to load photo data.");
        setLoading(false);
      });
  }, [photoId]);

  if (loading) {
    return (
      <Container className="photo-loading-container">
        <Stack alignItems="center" spacing={2}>
          <CircularProgress size={60} />
          <Typography variant="h6">Loading photo details...</Typography>
        </Stack>
      </Container>
    );
  }

  if (error || !photo) {
    return (
      <Container className="photo-error-container">
        <Typography variant="h5" color="error" gutterBottom>
          {error || "Photo not found"}
        </Typography>
        <Typography variant="body1">
          The photo you're looking for might have been removed or doesn't exist.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="photo-view-container">
      <Card className="photo-card">
        <CardHeader
          avatar={
            <Tooltip title={`Uploaded by ${photo.user?.first_name || 'Unknown'}`}>
              <Link to={`/users/${photo.user_id._id}`} style={{ textDecoration: 'none' }}>
                <Avatar className="photo-avatar">
                  {photo.user_id.first_name[0]}
                </Avatar>
              </Link>
            </Tooltip>
          }
          title={
            <Typography variant="h6" component="div">
              {`${photo.user_id.first_name} ${photo.user_id.last_name}`}
            </Typography>
          }
          subheader={
            <Stack direction="row" spacing={1} alignItems="center" className="photo-header-sub">
              <Schedule fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {new Date(photo.date_time).toLocaleString()}
              </Typography>
            </Stack>
          }
          action={
            <Chip
              icon={<Comment />}
              label={`${photo.comments.length} comments`}
              color="primary"
              variant="outlined"
            />
          }
        />

        <Box className="photo-image-wrapper">
          <img
            src={`/images/${photo.file_name}`}
            alt={photo.file_name}
            className="photo-image"
            loading="lazy"
          />
        </Box>

        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom className="photo-comments-title">
            <Comment color="primary" style={{ marginRight: 8 }} />
            Comments
          </Typography>

          {photo.comments.length === 0 ? (
            <Box className="photo-no-comments">
              <Image className="photo-no-comments-icon" />
              <Typography variant="body1" color="text.secondary">
                No comments yet. Be the first to comment!
              </Typography>
            </Box>
          ) : (
            <Stack spacing={3}>
              {photo.comments.map((commentItem) => (
                <Box key={commentItem._id}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Link to={`/users/${commentItem.user._id}`} style={{ textDecoration: 'none' }}>
                      <Avatar className="photo-avatar">
                        {commentItem.user.first_name[0]}
                      </Avatar>
                    </Link>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {commentItem.user.first_name} {commentItem.user.last_name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Schedule fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(commentItem.date_time).toLocaleString()}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <Box className="photo-comment-box">
                    <Typography variant="body1" paragraph>
                      {commentItem.comment}
                    </Typography>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
