import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import PhotoComment from "../PhotoComment/index";
import { useState, useEffect } from "react";
import fetchModelData from "../../lib/fetchModelData";
/**
 * Define UserPhotos, a React component of Project 4.
 * 
 */

function UserPhotos () {
    const { userId } = useParams();
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        fetchModelData(`/api/photosOfUser/${userId}`)
            .then(data => {
                setPhotos(data.photos);
                // alert(data.message);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [photos]);
    return (
      <Typography variant="body1">
        {photos && photos.map((photo, i) => (
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
