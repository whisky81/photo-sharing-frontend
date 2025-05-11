import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
import PhotoComment from "../PhotoComment/index";
/**
 * Define UserPhotos, a React component of Project 4.
 * 
 */

function UserPhotos () {
    const user = useParams();
    const photos = models.photoOfUserModel(user.userId);
    return (
      <Typography variant="body1">
        {photos.map((photo, i) => (
          <div key={photo._id}>
            <div>
              <p>Create At: {photo.date_time}</p>
              <img src={`/images/${photo.file_name}`} width="300" height="400"/>
            </div>
            <div>
              <h3>Comments</h3>
              {photo.comments && photo.comments.length > 0 ? (
                <PhotoComment comments={photo.comments} />
              ): (
                <div>No comments</div>
              )}
            </div>
          </div>
        ))}
      </Typography>
    );
}

export default UserPhotos;
