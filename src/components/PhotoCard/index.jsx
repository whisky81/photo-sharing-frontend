import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import './styles.css';

export default function PhotoCard({ photo, owner }) {
  return (
    <Card className="photo-card">
      <Link to={`/photos/detail/${photo._id}`} className="photo-card-link">
        <CardMedia
          component="img"
          image={`/images/${photo.file_name}`}
          alt={photo.file_name}
          className="photo-card-image"
          loading="lazy"
        />
      </Link>
      <CardContent className="photo-card-content">
        <Typography gutterBottom variant="body2" component="div" className="photo-card-text">
          By: {`${owner.first_name} ${owner.last_name}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
