import React from "react";
import { Typography, Box, Divider, ImageList, ImageListItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * UserDetail component displays detailed information about a user.
 */
function UserDetail() {
  const { userId } = useParams();
  const userDetail = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  if (!userDetail) {
    return <Typography variant="body1">User not found</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {`${userDetail.first_name} ${userDetail.last_name}`}
      </Typography>

      {userDetail.description && (
        <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
          {userDetail.description}
        </Typography>
      )}

      <Typography variant="body1" paragraph>
        Live: {userDetail.location}
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
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {photos && photos.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`/images/${item.file_name}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`/images/${item.file_name}?w=164&h=164&fit=crop&auto=format`}
              alt={item.date_time}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default UserDetail;