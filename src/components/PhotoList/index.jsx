import React from "react";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PhotoCard from "../PhotoCard";

export default function PhotoList({ photos = [], owner = null }) {
    return (
        <Box sx={{ width: '100%', height: '100vh', overflowY: 'auto', padding: 2, backgroundColor: '#f0f0f0' }}>
            <ImageList variant="masonry" cols={5} gap={16}>
                {photos.map((photo, index) => (
                    <ImageListItem key={`${photo.file_name}-${index}`} sx={{ breakInside: 'avoid-column' }}>
                        <PhotoCard photo={photo} owner={owner || photo.user_id}/>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}