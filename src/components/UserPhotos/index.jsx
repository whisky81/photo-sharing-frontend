import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import {useParams, Link} from "react-router-dom";
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
          <Link to={`/photos/detail/${photo._id}`} key={i}>
          <div key={photo._id}>
            <div>
              <p>Create At: {photo.date_time}</p>
              <img src={`/images/${photo.file_name}`} width="300" height="400"/>
            </div>
          </div>
          </Link>
        ))}
      </Typography>
    );
}

export default UserPhotos;
