import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchModelData from '../../lib/fetchModelData';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    Divider,
    Box,
    CircularProgress,
    Chip,
    Container,
    Stack,
    Tooltip
} from '@mui/material';
import { Comment, Schedule, Image } from '@mui/icons-material';

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
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Stack alignItems="center" spacing={2}>
                    <CircularProgress size={60} />
                    <Typography variant="h6">Loading photo details...</Typography>
                </Stack>
            </Container>
        );
    }

    if (error || !photo) {
        return (
            <Container sx={{ p: 4, textAlign: 'center' }}>
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
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                    avatar={
                        <Tooltip title={`Uploaded by ${photo.user?.first_name || 'Unknown'}`}>
                            <Link to={`/users/${photo.user_id._id}`} style={{ textDecoration: 'none' }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
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
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
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

                <Box sx={{ p: 2 }}>
                    <img
                        src={`/images/${photo.file_name}`}
                        alt={photo.file_name}
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 12,
                            border: '1px solid rgba(0,0,0,0.1)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    />
                </Box>

                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Comment color="primary" sx={{ mr: 1 }} />
                        Comments
                    </Typography>

                    {photo.comments.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Image color="disabled" sx={{ fontSize: 60, mb: 1 }} />
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
                                            <Avatar sx={{ bgcolor: 'primary.main' }}>
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
                                    <Box sx={{ pl: 8, pt: 1 }}>
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