import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchModelData from '../../lib/fetchModelData';
import { Card, CardHeader, CardContent, Typography, Avatar, Divider, Box } from '@mui/material';

export default function PhotoViewDetail() {
    const { photoId } = useParams();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        fetchModelData(`/api/photo/${photoId}`)
            .then(data => {
                setPhoto(data);
            });
    }, [photo]);
    if (!photo) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }
    return (
        <Card sx={{ maxWidth: 800, margin: '20px auto', p: 2 }}>
            <CardHeader
                avatar={
                    <Avatar>{photo?.comments?.[0]?.user?.first_name?.[0]}</Avatar>
                }
                title={`Photo: ${photo.file_name}`}
                subheader={new Date(photo.date_time).toLocaleString()}
            />
            <div>
                <img
                    src={`/images/${photo.file_name}`}
                    alt={photo.file_name}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
            </div>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Comments
                </Typography>
                {photo.comments.map((commentItem) => (
                    <Box key={commentItem._id} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {commentItem.user.first_name} {commentItem.user.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(commentItem.date_time).toLocaleString()}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            {commentItem.comment}
                        </Typography>
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}