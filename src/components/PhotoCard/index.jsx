import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function PhotoCard({ photo, owner }) {
    return (
        <>
            <Card sx={{ borderRadius: '12px', boxShadow: 'none', position: 'relative' }}>
                <Link to={`/photos/detail/${photo._id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    image={`/images/${photo.file_name}`}
                    alt={photo.file_name}
                    sx={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px',
                    }}
                    loading="lazy"
                /></Link>
                <CardContent sx={{ paddingTop: 1.5, paddingBottom: '12px !important', paddingX: 1.5 }}>
                    <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{
                            fontWeight: '500',
                            lineHeight: 1.3,
                            fontSize: '0.875rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        By: {`${owner.first_name} ${owner.last_name}`}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}